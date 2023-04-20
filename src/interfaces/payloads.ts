export interface SigninApiPayload {
  email: string;
  password: string;
}

export interface SignupApiPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface GetMessageApiPayload {
  userId: string;
  toUserId: string;
}

export interface GetUserInfoApiPayload {
  userId: string;
}
