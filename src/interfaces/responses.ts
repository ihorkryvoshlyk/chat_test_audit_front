import { IsOnlineValue } from "@interfaces/entities";

export interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}

export interface SigninApiResponse {
  userId: string;
}

export interface SignupApiResponse extends TimeStamp {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isOnline: IsOnlineValue;
  socketId: string;
}

export interface GetMessageApiResponse extends TimeStamp {
  message: string;
  from: string;
  to: string;
  task?: string;
}

export interface GetUserInfoApiResponse extends TimeStamp {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isOnline: IsOnlineValue;
  socketId: string;
}
