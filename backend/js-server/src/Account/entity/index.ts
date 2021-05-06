import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import emailVerifier from "email-verifier-node";
import { buildMakeAccountInputType } from "../interfaces";

import buildMakeAccount from "./account";

const makeAccount = buildMakeAccount({
  bcrypt,
  emailVerifier,
  uuidv4,
} as buildMakeAccountInputType);

export default makeAccount;
