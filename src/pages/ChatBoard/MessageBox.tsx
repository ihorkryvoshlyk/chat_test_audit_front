import React, { FC, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { EmojiClickData } from "emoji-picker-react";
import { useDebounce, useInterval } from "usehooks-ts";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import useMediaQuery from "@mui/material/useMediaQuery";

import MessageInput from "@component/MessageInput";
import IconButton from "@component/IconButton";
import { ChatUser } from "@interfaces/entities";
import { addChat } from "@redux/chat";
import useGlobalSnackbar from "@hooks/useGlobalSnackbar";
import useUserInfo from "@hooks/useUserInfo";

export interface Props {
  userId?: string | null;
  selectedUser: ChatUser;
  socket?: Socket;
}

const MessageBox: FC<Props> = (props) => {
  const { userId, selectedUser, socket } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messageContainer = useRef<HTMLDivElement>(null);
  const isUpSmall = useMediaQuery("(min-width:420px)");

  const debouncedMessage = useDebounce(message, 500);

  const { openSnackbar } = useGlobalSnackbar();
  const { data: self } = useUserInfo(userId);

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
      openSnackbar({
        color: "error",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message: "Message can't be empty",
        autoHideDuration: 3000
      });
    } else if (userId === "") {
      navigate("/", {
        replace: true
      });
    } else if (selectedUser === undefined) {
      openSnackbar({
        color: "error",
        gradient: true,
        rounded: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        message: "Please select user you want to send message",
        autoHideDuration: 3000
      });
    } else {
      sendAndUpdateMessages({
        from: userId,
        message: message.trim(),
        to: selectedUser._id
      });
      setMessage("");
    }
  };

  useEffect(() => {
    setIsTyping(false);
    if (socket && selectedUser && self) {
      socket.emit("typing-message", {
        from: self._id,
        to: selectedUser._id,
        isTyping: false
      });
    }
  }, [debouncedMessage, socket]);

  useInterval(
    () => {
      if (socket && selectedUser && self) {
        socket.emit("typing-message", {
          from: self._id,
          to: selectedUser._id,
          isTyping
        });
      }
    },
    isTyping ? 1000 : null
  );

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      setMessage(`${message}\n`);
      return;
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSendMessage();
      if (socket && selectedUser && self) {
        socket.emit("typing-message", {
          from: self._id,
          to: selectedUser._id,
          isTyping: false
        });
      }
    }
  };

  const handleChangeEmoji = (emoji: EmojiClickData) => {
    setMessage(`${message}${emoji.emoji}`);
  };

  const handleAttachFile = () => {
    // TODO: file attach
  };
  return (
    <Grid item display="flex" padding={`${isUpSmall ? "20px" : "10px 0px"}`}>
      <Grid container>
        <Box flexGrow={1} display="flex">
          <MessageInput
            value={message}
            onChange={(value) => {
              if (value) {
                setIsTyping(true);
              }
              setMessage(value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Send your message..."
            onChangeEmoji={handleChangeEmoji}
            onClickAttach={handleAttachFile}
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="end"
          paddingY="4px"
          width={isUpSmall ? "auto" : "100%"}
        >
          <IconButton
            backgroundGradient
            onClick={handleSendMessage}
            size={`${isUpSmall ? "medium" : "small"}`}
          >
            <SendRoundedIcon fontSize={`${isUpSmall ? "medium" : "small"}`} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MessageBox;
