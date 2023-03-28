/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

import Typography from "@component/Typography";

import { getUserList } from "@redux/chat/selectors";
import { setUsers } from "@redux/chat";
import { ChatUser } from "@interfaces/entities";

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
  onChangeSelectedUser?: (user?: ChatUser) => void;
  socket?: Socket;
}

const ChatList: FC<Props> = (props) => {
  const { userId, onChangeSelectedUser, socket } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const userList = useSelector(getUserList);
  const [selectedUser, setSelectedUser] = useState<ChatUser | undefined>();

  useEffect(() => {
    if (socket && userId) {
      socket.emit("chat-list", { userId });
      socket.on("chat-list-response", (data) => {
        dispatch(setUsers(data));
      });
    }
    if (false) dispatch(setUsers([]));
  }, [socket]);

  useEffect(() => {
    if (onChangeSelectedUser) onChangeSelectedUser(selectedUser);
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {userList?.map((user) => (
        <ListItem
          alignItems="flex-start"
          className={classes.taskListItem}
          key={user._id}
          onClick={() => {
            handleSelectUser(user);
          }}
          selected={selectedUser?._id === user._id}
        >
          <ListItemAvatar>
            <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
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
              <Typography sx={{ display: "inline" }} variant="body1">
                Lorem ipsum dolor sit amet adipis elit. At at massa varius amet
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
