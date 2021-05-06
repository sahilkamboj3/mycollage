import Router, { Request, Response } from "express";
import { Repository } from "typeorm";

import { createAccountUseCase } from "../usecases/createAccount";
import { getAllAccountsUseCase } from "../usecases/getAllAcounts";
import { getOneAccountUseCase } from "../usecases/getOneAccount";
import { loginInAccountUseCase } from "../usecases/loginAccount";

import { apiResType } from "../interfaces";
import { ErrorType } from "../../util/GenInterfaces";
import { Account } from "../../entity/Account";

const accountApi = async (
  accountRepository: Repository<Account>,
  bcrypt: any
) => {
  const accountRouter = Router();

  // authentication
  accountRouter.use((req: Request, res: Response, next) => {
    let isValidUrl =
      req.originalUrl != "/accounts/login" &&
      req.originalUrl != "/accounts/create";

    console.log("authentication:");
    console.log(req.session);

    if (isValidUrl && (!req.session || !req.session.userUUID)) {
      let error: ErrorType = {
        location: __filename,
        field: "Authentication",
        message: "Not authenticated. Please log back in.",
      };

      res.json({
        errors: [error],
        status: 404,
      } as apiResType);
      return;
    }
    next();
  });

  // get all
  accountRouter.get("/getAll", async (_req: Request, res: Response) => {
    const response: apiResType = await getAllAccountsUseCase(accountRepository);
    res.send(response);
  });

  // get one
  accountRouter.get(
    "/getOne/:accountID",
    async (req: Request, res: Response) => {
      const response: apiResType = await getOneAccountUseCase(
        accountRepository,
        parseInt(req.params.accountID)
      );

      res.send(response);
    }
  );

  // add account
  accountRouter.post("/create", async (req: Request, res: Response) => {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;

    let username: string | null;
    if (req.body.username) {
      username = req.body.username;
    } else {
      username = null;
    }

    const email: string = req.body.email;
    const password: string = req.body.password;

    const response: apiResType = await createAccountUseCase(
      firstName,
      lastName,
      username,
      email,
      password,
      accountRepository
    );

    if (response.status == 200) {
      const account: Account = response.accounts[0];
      req.session.userUUID = account.uuid;
    }

    res.send(response);
  });

  accountRouter.get("/retrieveUUID", (req: Request, res: Response) => {
    res.json(req.session);
  });

  // login account
  accountRouter.post("/login", async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const response: apiResType = await loginInAccountUseCase(
      email,
      password,
      bcrypt
    );

    if (!response.errors) {
      req.session.userUUID = response.accounts[0].uuid;
    }

    res.send(response);
  });

  // logout account
  accountRouter.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        const errors = [
          {
            location: __filename,
            field: "Logout",
            message: "Logout unsuccessful. Please try again.",
          } as ErrorType,
        ];

        const fResponse: apiResType = {
          errors,
          status: 400,
        };
        res.send(fResponse);
      }

      res.send({
        status: 200,
      } as apiResType);
    });
  });

  // update account
  accountRouter.put("/:accountID", async (req: Request, res: Response) => {
    let info: Account = req.body.info;
    let res1: apiResType = await getOneAccountUseCase(
      accountRepository,
      parseInt(req.params.accountID)
    );
    if (res1.errors) {
      res.send(res1);
    }

    await accountRepository.update(req.params.accountID, info);
    let res2: apiResType = await getOneAccountUseCase(
      accountRepository,
      parseInt(req.params.accountID)
    );

    res.send(res2);
  });

  // delete account
  accountRouter.delete("/:accountID", async (req: Request, res: Response) => {
    await accountRepository.delete(req.params.accountID);

    req.session.destroy((err: any) => {
      if (err) {
        const errors = [
          {
            location: __filename,
            field: "Delete",
            message: "Delete unsuccessful. Please try again.",
          } as ErrorType,
        ];

        const fResponse: apiResType = {
          errors,
          status: 400,
        };
        res.send(fResponse);
      }

      res.send({
        status: 200,
      } as apiResType);
    });
  });

  return accountRouter;
};

export default accountApi;
