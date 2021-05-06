import { Account } from "../../entity/Account";
import { createQueryBuilder } from "typeorm";
import { apiResType } from "../interfaces";

export const loginInAccountUseCase = async (
  email: string,
  password: string,
  bcrypt
): Promise<apiResType> => {
  const account = await createQueryBuilder("account")
    .select("account")
    .from(Account, "account")
    .where("account.email = :email", { email: email })
    .getOne();

  if (account === undefined) {
    return {
      errors: [
        {
          location: __filename,
          field: "Login",
          message: "Email not found",
        },
      ],
      status: 400,
    } as apiResType;
  }

  // check password
  const bcryptRes = await bcrypt.compare(password, account?.password);

  if (bcryptRes) {
    return {
      accounts: [account],
      status: 200,
    } as apiResType;
  } else {
    return {
      errors: [
        {
          location: __filename,
          field: "Login",
          message: "Password incorrect",
        },
      ],
      status: 400,
    } as apiResType;
  }
};
