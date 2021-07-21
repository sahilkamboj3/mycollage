import { NextRouter } from "next/router";
import { useEffect } from "react";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const authorizeUser = async (): Promise<boolean> => {
  let isAuthorized = false;
  await fetch("http://localhost:5000/accounts/authorize", {
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
  await fetch("http://localhost:5000/accounts/getUserUUID", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => (userUUID = data["accounts"][0].uuid));

  return userUUID;
};

/*
export const socketSend = (socket) => {
  for (let i = 0; i < 5; i++) {
    console.log("Try #" + i);
    try {
      console.log("sending");
      socket.send("/app/test");
      break;
    } catch (err) {
      console.log("sleeping");
      sleep(1000);
    }
  }
};
*/
