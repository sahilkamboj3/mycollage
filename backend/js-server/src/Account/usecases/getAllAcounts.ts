import { Repository } from "typeorm";
import { Account } from "../../entity/Account";
import { apiResType } from "../interfaces";

export const getAllAccountsUseCase = async (
  accountRepository: Repository<Account>
): Promise<apiResType> => {
  const accounts = await accountRepository.find();
  return { accounts, status: 200 } as apiResType;
};
