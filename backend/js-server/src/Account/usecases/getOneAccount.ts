import { Repository } from "typeorm";
import { Account } from "../../entity/Account";
import { apiResType } from "../interfaces";

export const getOneAccountUseCase = async (
  accountRepository: Repository<Account>,
  id: number
): Promise<apiResType> => {
  const account = await accountRepository.find({
    where: [{ id: id }],
  });

  if (account.length == 0) {
    const res: apiResType = {
      errors: [
        {
          location: __filename,
          field: "Get one",
          message: "Account not found.",
        },
      ],
      status: 400,
    };
    return res;
  }

  return {
    accounts: account,
    status: 200,
  } as apiResType;
};
