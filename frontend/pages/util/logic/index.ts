import Cookies from "js-cookie";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getCookieValue = (cookieName: string) => {
  return Cookies.get(cookieName);
};
