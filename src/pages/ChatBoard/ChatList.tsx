import React, { FC, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, format, getDate } from "date-fns";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

import MessageBox from "@component/MessageItem";
import Typography from "@component/Typography";
import { ChatUser } from "@interfaces/entities";
import { getChatList, getUserList } from "@redux/chat/selectors";
import { setChats } from "@redux/chat";
import useGlobalSnackbar from "@hooks/useGlobalSnackbar";
import useAxiosApi from "@hooks/useAxiosApi";
import { message as messageApis } from "@utils/apis";
import { GetMessageApiPayload } from "@interfaces/payloads";
import { GetMessageApiResponse } from "@interfaces/responses";

export interface Props {
  userId?: string | null;
  selectedUser: ChatUser;
}

const ChatList: FC<Props> = (props) => {
  const { userId, selectedUser } = props;
  const dispatch = useDispatch();
  const chatList = useSelector(getChatList);
  const userList = useSelector(getUserList);
  const messageContainer = useRef<HTMLDivElement>(null);

  const { openSnackbar } = useGlobalSnackbar();
  const { execute: getMessages } = useAxiosApi<
    GetMessageApiResponse[],
    GetMessageApiPayload
  >(messageApis.getMessages);

  const scrollMessageContainer = () => {
    if (messageContainer.current) {
      try {
        messageContainer.current.scrollTop =
          messageContainer.current.scrollHeight;
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const handleGetMessages = async () => {
    try {
      if (selectedUser && userId) {
        const response = await getMessages({
          userId,
          toUserId: selectedUser._id
        });

        dispatch(
          setChats({
            messages: response.data
          })
        );
        scrollMessageContainer();
      }
    } catch (error) {
      openSnackbar({
        color: "error",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message: "Fetching message is failure. Please try again.",
        autoHideDuration: 3000
      });
    }
  };

  useEffect(() => {
    scrollMessageContainer();
  }, [chatList]);

  useEffect(() => {
    handleGetMessages();
  }, [selectedUser]);

  return (
    <Grid
      item
      display="flex"
      ref={messageContainer}
      maxHeight="calc(100vh - 361px)"
      overflow="auto"
    >
      <Grid container spacing={1} justifyContent="flex-end">
        {chatList[selectedUser._id]?.map((chat) => {
          const createdAt = chat.createdAt || Date.now();
          let timestamp = format(new Date(createdAt), "yyyy-MM-dd hh:mm");
          if (isEqual(getDate(new Date(createdAt)), getDate(new Date()))) {
            timestamp = `Today ${format(new Date(createdAt), "hh:mm")}`;
          }
          const sender = userList.find((user) => user._id === chat.from);
          return (
            <Grid item xs={12}>
              <Box
                display="flex"
                flexGrow={1}
                justifyContent={
                  chat.from === userId ? "flex-end" : "flex-start"
                }
              >
                {chat.from !== userId && (
                  <Avatar
                    alt={sender?.firstName.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 43, height: 43, marginRight: "15px" }}
                  />
                )}
                <MessageBox
                  gradient
                  type={chat.from === userId ? "sendbox" : "inbox"}
                  sx={{ maxWidth: "80%" }}
                >
                  <Typography variant="h5">{chat.message}</Typography>
                </MessageBox>
              </Box>

              <Typography
                variant="body2"
                textAlign={chat.from === userId ? "right" : "left"}
                padding="20px"
              >
                {timestamp}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ChatList;
