/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Badge as MuiBadge, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Typography from "@component/Typography";
import Badge from "@component/Badge";

import {
  getUserList,
  getChatList,
  getSelectedUser
} from "@redux/chat/selectors";
import { setSelectedUser, setUsers, addChat } from "@redux/chat";

const useStyles = makeStyles((theme: Theme) => ({
  taskListItem: {
    borderRadius: "14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.customPalette.grey[3]
    }
  },
  taskTitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "26px"
  }
}));

interface Props {
  userId?: string | null;
  socket?: Socket;
  onClickUser?: () => void;
}

const UserList: FC<Props> = (props) => {
  const { userId, socket, onClickUser } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const userList = useSelector(getUserList);
  const chatList = useSelector(getChatList);
  const selectedUser = useSelector(getSelectedUser);
  const ringRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (socket && userId) {
      socket.emit("chat-list", { userId });
    }
  }, [socket]);

  const receiveSocketMessages = (socketResponse) => {
    ringRef.current?.play();
    dispatch(
      addChat({
        message: socketResponse
      })
    );
  };

  const receiverUserList = (socketResponse) => {
    dispatch(setUsers(socketResponse));
  };

  useEffect(() => {
    if (socket) {
      socket.on("add-message-response", receiveSocketMessages);
      socket.on("chat-list-response", receiverUserList);
    }
    return () => {
      if (socket) {
        socket.off("add-message-response", receiveSocketMessages);
        socket.off("chat-list-response", receiverUserList);
      }
    };
  }, [socket, selectedUser]);

  const handleSelectUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {userList?.map((user) => {
          const unreadMessages = chatList[user._id]?.filter(
            (el) => el.unread
          ).length;
          return (
            <MuiBadge
              overlap="circular"
              color="error"
              badgeContent={unreadMessages}
              sx={{
                width: "100%",
                "& .MuiBadge-anchorOriginTopRight": {
                  right: "20px",
                  top: "15px"
                }
              }}
            >
              <ListItem
                alignItems="flex-start"
                className={classes.taskListItem}
                key={user._id}
                onClick={() => {
                  handleSelectUser(user);
                  if (onClickUser) onClickUser();
                }}
                selected={selectedUser?._id === user._id}
              >
                <ListItemAvatar>
                  <Badge
                    color={user.isOnline === "Y" ? "success" : "grey"}
                    size="small"
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt={user.firstName.toUpperCase()}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      gradient
                      sx={{ display: "inline" }}
                      variant="h5"
                      className={classes.taskTitle}
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  }
                  secondary={
                    user.lastMessage && (
                      <Typography sx={{ display: "inline" }} variant="body1">
                        {user.lastMessage.message}
                      </Typography>
                    )
                  }
                />
              </ListItem>
            </MuiBadge>
          );
        })}
      </List>
      <audio ref={ringRef} src="/sounds/new_message.mp3" />
    </>
  );
};

export default UserList;
