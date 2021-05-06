// import { makeAccountReturnType } from "../interfaces";
import { apiResType } from "../interfaces";
import { Account } from "../../entity/Account";
import makeAccount from "../entity";
import { Repository } from "typeorm";
import { ErrorType } from "src/util/GenInterfaces";

export const createAccountUseCase = async (
  firstName: string,
  lastName: string,
  username: string | null = null,
  email: string,
  password: string,
  accountRepository: Repository<Account>
): Promise<apiResType> => {
  const PG_UNIQUE_CONSTRAINT_VIOLATION = "23505";

  const account: Account = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  const res = await makeAccount(account);

  if (res["errors"]) {
    return {
      errors: res.errors,
      status: 400,
    } as apiResType;
  }

  // handle database calling info and interact with DB folder
  const acc = res.account;

  let resAccount: Account = new Account();
  resAccount.firstName = acc?.firstName;
  resAccount.lastName = acc?.lastName;
  resAccount.uuid = acc?.uuid;
  resAccount.username = acc?.username;
  resAccount.email = acc?.email;
  resAccount.password = acc?.password;

  try {
    await accountRepository.save(resAccount);
  } catch (err) {
    if (err.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {
      let errors: ErrorType[] = [];
      errors.push({
        location: __filename,
        field: "Account creation",
        message: "Username or email already used.",
      } as ErrorType);

      return {
        errors,
        status: 400,
      } as apiResType;
    }
  }

  return {
    accounts: [resAccount],
    status: 200,
  } as apiResType;
};
