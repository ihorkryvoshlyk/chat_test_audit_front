import { RootState } from "../root";

export const getUserList = (state: RootState) => state.chat.users;
export const getChatList = (state: RootState) => state.chat.chats;
export const getSelectedUser = (state: RootState) => state.chat.selectedUser;
