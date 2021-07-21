import { ErrorType } from "../util/GenInterfaces";
import { Account } from "../entity/Account";

export interface buildMakeAccountInputType {
  bcrypt: any;
  emailVerifier: any;
  uuidv4: any;
}

export interface makeAccountReturnType {
  account?: Account;
  errors?: ErrorType[] | null;
}

export interface verifyEmailType {
  format: boolean;
  is_verified: boolean;
  accept_all: boolean;
  message: string;
  errors: string;
}

export interface apiResType {
  accounts?: Account[];
  errors?: ErrorType[];
  isAuthorized?: boolean;
  status: number;
}
