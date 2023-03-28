import React, { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, format, getDate } from "date-fns";
import { Socket } from "socket.io-client";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MessageInput from "@component/MessageInput";
import IconButton from "@component/IconButton";
import MessageBox from "@component/MessageBox";
import Typography from "@component/Typography";
import { ChatUser } from "@interfaces/entities";
import { getChatList } from "@redux/chat/selectors";
import { setChats, addChat } from "@redux/chat";

import chatHttpService from "@utils/chatHttpService";

export interface Props {
  userId?: string | null;
  selectedUser?: ChatUser;
  socket?: Socket;
}

const Board: FC<Props> = (props) => {
  const { userId, selectedUser, socket } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const chatList = useSelector(getChatList);
  const messageContainer = useRef<HTMLDivElement>(null);

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

  const sendAndUpdateMessages = (message) => {
    if (socket) {
      try {
        socket.emit("add-message", message);
        dispatch(
          addChat({
            message
          })
        );
        scrollMessageContainer();
      } catch (error) {
        alert(`Can't send your message`);
      }
    }
  };

  const handleSendMessage = () => {
    if (message === "") {
      alert(`Message can't be empty.`);
    } else if (userId === "") {
      navigate("/", {
        replace: true
      });
    } else if (selectedUser === undefined) {
      alert(`Select a user to chat.`);
    } else {
      sendAndUpdateMessages({
        from: userId,
        message: message.trim(),
        to: selectedUser._id
      });
      setMessage("");
    }
  };

  const getMessages = async () => {
    try {
      if (selectedUser) {
        const response = await chatHttpService.getMessages(
          userId,
          selectedUser._id
        );

        dispatch(
          setChats({
            messages: response.data.messages
          })
        );
        scrollMessageContainer();
      }
    } catch (error) {
      console.log(error);
      alert("Unable to fetch messages");
    }
  };

  const receiveSocketMessages = (socketResponse) => {
    console.log(socketResponse, selectedUser?._id);
    if (selectedUser !== null && selectedUser?._id === socketResponse.from) {
      dispatch(
        addChat({
          message: socketResponse
        })
      );
      scrollMessageContainer();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("add-message-response", receiveSocketMessages);
    }
    return () => {
      if (socket) {
        socket.off("add-message-response", receiveSocketMessages);
      }
    };
  }, [socket, selectedUser]);

  useEffect(() => {
    getMessages();
  }, [selectedUser]);
  return (
    <Grid
      container
      flexDirection="column"
      flexGrow={1}
      flexShrink={1}
      alignItems="stretch"
      justifyContent="flex-end"
      height="100%"
    >
      <Grid
        item
        display="flex"
        flexGrow={1}
        ref={messageContainer}
        maxHeight="calc(100vh - 220px)"
        overflow="auto"
      >
        <Grid container spacing={1}>
          {chatList?.map((chat) => {
            const createdAt = chat.createdAt || Date.now();
            let timestamp = format(new Date(createdAt), "yyyy-MM-dd hh:mm");
            if (isEqual(getDate(new Date(createdAt)), getDate(new Date()))) {
              timestamp = `Today ${format(new Date(createdAt), "hh:mm")}`;
            }
            return (
              <Grid item xs={12}>
                <MessageBox
                  gradient
                  type={chat.from === userId ? "sendbox" : "inbox"}
                  sx={{ maxWidth: "80%" }}
                >
                  <Typography variant="h5">{chat.message}</Typography>
                </MessageBox>
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
      <Divider />
      <Grid item display="flex" padding="20px">
        <Grid container>
          <Grid item flexGrow={1} display="flex">
            <MessageInput value={message} onChange={setMessage} />
          </Grid>

          <Grid item display="flex" flexDirection="column" justifyContent="end">
            <IconButton backgroundGradient onClick={handleSendMessage}>
              <SendRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
