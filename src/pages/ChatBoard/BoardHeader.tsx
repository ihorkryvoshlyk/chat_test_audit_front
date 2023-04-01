import React, { FC, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-dots-loader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import WestRoundedIcon from "@mui/icons-material/WestRounded";

import Typography from "@component/Typography";
import Badge from "@component/Badge";
import IconButton from "@component/IconButton";
import { ChatUser } from "@interfaces/entities";
import useUserInfo from "@hooks/useUserInfo";
import { setTypingUser } from "@redux/chat";
import { getUserList } from "@redux/chat/selectors";

import "react-dots-loader/index.css";

export interface Props {
  userId?: string;
  selectedUser: ChatUser;
  socket?: Socket;
  onShowUserList?: () => void;
}

const BoardHeader: FC<Props> = (props) => {
  const { selectedUser, userId, socket, onShowUserList } = props;
  const { data: self } = useUserInfo(userId);
  const dispatch = useDispatch();
  const userList = useSelector(getUserList);
  const theme = useTheme();
  const isUpMd = useMediaQuery("(min-width:1200px)");

  const handleTypingUser = (socketResponse) => {
    dispatch(setTypingUser(socketResponse));
  };

  useEffect(() => {
    if (socket) {
      socket.on("typing-message-response", handleTypingUser);
    }
    return () => {
      if (socket) {
        socket.off("typing-message-response", handleTypingUser);
      }
    };
  }, [socket, selectedUser]);

  return (
    <Grid
      item
      xs={12}
      display="flex"
      paddingY="12px"
      borderBottom={`2px solid ${theme.customPalette.grey[0]}`}
    >
      {!isUpMd && (
        <Box display="flex" alignItems="center">
          <IconButton onClick={onShowUserList}>
            <WestRoundedIcon color="primary" />
          </IconButton>
        </Box>
      )}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Badge
            color={selectedUser.isOnline === "Y" ? "success" : "error"}
            size="small"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt={selectedUser.firstName.toUpperCase()}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          sx={{
            marginLeft: "16px"
          }}
          primary={
            <Typography
              fontWeight={600}
              fontSize={16}
              sx={{ display: "inline" }}
              variant="h6"
            >
              {`${selectedUser.firstName} ${selectedUser.lastName}`}
            </Typography>
          }
          secondary={
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ display: "inline" }}
              variant="body1"
            >
              {selectedUser.isOnline === "Y" ? "Online" : "Offline"}

              {userList.findIndex(
                (li) => li._id === selectedUser._id && li.isTyping
              ) !== -1 && (
                <>
                  {"  "}Typing{"  "}
                  <Loader size={6} distance={2} />
                </>
              )}
            </Typography>
          }
        />
      </ListItem>
      <Box flexGrow={1} />
      <Box display="flex" alignItems="center">
        <Typography
          fontWeight={600}
          fontSize={16}
          sx={{ display: "inline", marginRight: "15px" }}
          variant="h6"
        >
          Members
        </Typography>
        <Badge
          color={selectedUser.isOnline === "Y" ? "success" : "error"}
          size="small"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={selectedUser.firstName.toUpperCase()}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 48, height: 48 }}
          />
        </Badge>
        <Badge
          color={self?.isOnline === "Y" ? "success" : "error"}
          size="small"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          sx={{
            marginLeft: "-20px"
          }}
        >
          <Avatar
            alt={self?.firstName.toUpperCase()}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 48, height: 48 }}
          />
        </Badge>
      </Box>
    </Grid>
  );
};

export default BoardHeader;
