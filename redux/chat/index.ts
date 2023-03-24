/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatUser, IsOnlineValue, Chat } from "@interfaces/entities";

export type ChatState = {
  users: ChatUser[];
  chats: Chat[];
};

const initialState: ChatState = {
  users: [],
  chats: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<any>) {
      if (!action.payload.error) {
        let newUserList = state.users;
        if (action.payload.singleUser) {
          if (state.users.length > 0) {
            newUserList = state.users.filter(
              (obj) => obj._id !== action.payload.chatList[0]._id
            );
          } else {
            newUserList = [...state.users, ...action.payload.chatList];
          }
        } else if (action.payload.userDisconnected) {
          newUserList = state.users.map((user) => {
            if (user._id === action.payload.userid) {
              return {
                ...user,
                isOnline: IsOnlineValue.offline
              };
            }
            return user;
          });
        } else {
          newUserList = action.payload.chatList;
        }
        return {
          ...state,
          users: newUserList
        };
      }
      alert(`Unable to load Chat list, Redirecting to Login.`);
      return state;
    },
    setChats(state, action: PayloadAction<any>) {
      return {
        ...state,
        chats: action.payload.messages
      };
    },
    addChat(state, action: PayloadAction<any>) {
      return {
        ...state,
        chats: [...state.chats, action.payload.message]
      };
    }
  }
});

export const { setUsers, setChats, addChat } = chatSlice.actions;
export default chatSlice.reducer;
