export enum IsOnlineValue {
  online = "Y",
  offline = "N"
}

export interface Chat {
  message: string;
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string;
  unread?: boolean;
}

export interface ChatUser {
  firstName: string;
  lastName: string;
  email: string;
  isOnline: IsOnlineValue;
  _id: string;
  isTyping?: boolean;
  lastMessage?: Chat;
}
