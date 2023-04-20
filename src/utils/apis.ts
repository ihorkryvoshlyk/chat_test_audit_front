import { fetcher } from "@hooks/fetchers";
import {
  SigninApiPayload,
  SignupApiPayload,
  GetMessageApiPayload,
  GetUserInfoApiPayload
} from "@interfaces/payloads";

export const auth = {
  signin: (payload?: SigninApiPayload) => fetcher.post("/auth/signin", payload),
  signup: (payload?: SignupApiPayload) => fetcher.post("/auth/signup", payload)
};

export const message = {
  getMessages: (payload?: GetMessageApiPayload) =>
    fetcher.post("/message/get-messages", payload)
};

export const user = {
  getUserInfo: (payload?: GetUserInfoApiPayload) => {
    const { userId } = payload || {};
    return fetcher.get(`user/user-info/${userId}`);
  }
};
