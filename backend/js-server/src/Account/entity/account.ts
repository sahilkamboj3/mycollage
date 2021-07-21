import {
  buildMakeAccountInputType,
  verifyEmailType,
  makeAccountReturnType,
} from "../interfaces";
import { ErrorType } from "../../util/GenInterfaces";
import { Account } from "../../entity/Account";

export default function buildMakeAccount({
  bcrypt,
  emailVerifier,
  uuidv4,
}: buildMakeAccountInputType) {
  return async function makeAccount({
    firstName,
    lastName,
    username = null,
    email,
    password,
  }: Account): Promise<makeAccountReturnType> {
    // constants
    let data: verifyEmailType = {
      format: true,
      is_verified: true,
      accept_all: true,
      message: "Email Verified",
      errors: "",
    };
    let errors: ErrorType[] = [];

    // verify email
    await emailVerifier
      .verify_email(email)
      .then((res: any) => (data = res as verifyEmailType));

    // requirements
    if (data["is_verified"] == false) {
      const error: ErrorType = {
        location: __filename,
        field: "Account creation",
        message: "That email does not exist.",
      };
      errors.push(error);
    }

    if (username && username.length < 3) {
      const error: ErrorType = {
        location: __filename,
        field: "Account creation",
        message: "Username must be at least 3 characters.",
      };
      errors.push(error);
    }

    if (password && password.length < 3) {
      const error: ErrorType = {
        location: __filename,
        field: "Account creation",
        message: "Password must be at least 3 characters.",
      };
      errors.push(error);
    }

    if (errors.length > 0) {
      return {
        errors,
      } as makeAccountReturnType;
    }

    // return account since no errors
    const rounds = 10;
    const account: Account = {
      uuid: uuidv4().toString(), // generate random UUID
      firstName,
      lastName,
      username,
      email,
      password: await bcrypt.hash(password, rounds), // hash password
    };

    return {
      account,
    } as makeAccountReturnType;
  };
}
