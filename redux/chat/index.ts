/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatUser, IsOnlineValue, Chat } from "@interfaces/entities";

export type ChatState = {
  users: ChatUser[];
  chats: {
    [key: string]: Chat[];
  };
  selectedUser?: ChatUser;
};

const initialState: ChatState = {
  users: [],
  chats: {}
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
                  return {
                    ...action.payload.chatList[0],
                    lastMessage: user.lastMessage
                  };
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
          console.log(action.payload);
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
      if (state.selectedUser) {
        return {
          ...state,
          chats: {
            ...state.chats,
            [state.selectedUser?._id]: action.payload.messages
          }
        };
      }
      return state;
    },
    addChat(state, action: PayloadAction<any>) {
      const { from, to } = action.payload.message;
      const myId = localStorage.getItem("userid");
      if (from === myId) {
        // const newUserList = [...state.users];
        // const idx = newUserList.findIndex((user) => user._id === myId);
        // const me = newUserList.find((user) => user._id === myId);
        // if (me) {
        //   me.lastMessage = action.payload.message;
        //   newUserList[idx] = me;
        // }
        return {
          ...state,
          // users: newUserList,
          chats: {
            ...state.chats,
            [to]: [...(state.chats[to] || []), action.payload.message]
          }
        };
      }
      if (from === state.selectedUser?._id) {
        // const newUserList = [...state.users];
        // const idx = newUserList.findIndex((user) => user._id === from);
        // const receiver = newUserList.find((user) => user._id === from);
        // if (receiver) {
        //   receiver.lastMessage = action.payload.message;
        //   newUserList[idx] = receiver;
        // }
        return {
          ...state,
          // users: newUserList,
          chats: {
            ...state.chats,
            [from]: [...(state.chats[from] || []), action.payload.message]
          }
        };
      }

      return {
        ...state,
        chats: {
          ...state.chats,
          [from]: [
            ...(state.chats[from] || []),
            { ...action.payload.message, unread: true }
          ]
        }
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
        return {
          ...state,
          users: newUsers
        };
      }
      return state;
    },
    setSelectedUser(state, action: PayloadAction<any>) {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
  }
});

export const { setUsers, setChats, addChat, setTypingUser, setSelectedUser } =
  chatSlice.actions;
export default chatSlice.reducer;
