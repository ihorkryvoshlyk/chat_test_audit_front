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
      const userId = localStorage.getItem("userid");
      if (!action.payload.error) {
        let newUserList: ChatUser[] = [];
        if (action.payload.singleUser && action.payload.chatList[0]) {
          if (state.users.length > 0) {
            const idx = state.users.findIndex(
              (user) => user._id === action.payload.chatList[0]?._id
            );
            if (idx !== -1) {
              newUserList = state.users.map((user, index) => {
                if (index === idx) {
                  return action.payload.chatList[0];
                }
                return user;
              });
            } else {
              newUserList = [
                ...state.users,
                ...action.payload.chatList.filter((li) => li._id !== userId)
              ];
            }
          } else {
            newUserList = [...state.users, ...(action.payload.chatList || [])];
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
    },
    setTypingUser(state, action: PayloadAction<any>) {
      if (!action.payload.error) {
        const newUsers = state.users.map((user) => {
          if (user._id === action.payload.from) {
            return {
              ...user,
              isTyping: action.payload.isTyping
            };
          }
          return user;
        });
        console.log(newUsers);
        return {
          ...state,
          users: newUsers
        };
      }
      return state;
    }
  }
});

export const { setUsers, setChats, addChat, setTypingUser } = chatSlice.actions;
export default chatSlice.reducer;
