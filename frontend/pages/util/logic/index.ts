import { NextRouter } from "next/router";
import { useEffect } from "react";
import { NODE_BACKEND_SERVER } from "../../../config";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const authorizeUser = async (): Promise<boolean> => {
  let isAuthorized = false;
  //await fetch("http://localhost:5000/accounts/authorize", {
  await fetch(`${NODE_BACKEND_SERVER}/accounts/authorize`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["isAuthorized"]) {
        isAuthorized = true;
      }
    });

  return isAuthorized;
};

export const prerenderAuthorizationCheck = (router: NextRouter | string[]) => {
  useEffect(() => {
    authorizeUser().then((authorizeRes) => {
      if (!authorizeRes) {
        router.push("/login");
      }
    });
  }, []);
};

export const getUserUUID = async () => {
  let userUUID: string;
  await fetch(`${NODE_BACKEND_SERVER}/accounts/getUserUUID`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      userUUID = data["accounts"][0].uuid;
    });

  return userUUID;
};
