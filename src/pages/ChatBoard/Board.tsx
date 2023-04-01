import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";

import Typography from "@component/Typography";
import { getSelectedUser } from "@redux/chat/selectors";

import BoardHeader from "./BoardHeader";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";

export interface Props {
  userId?: string;
  socket?: Socket;
  onShowUserList?: () => void;
}

const Board: FC<Props> = (props) => {
  const { userId, socket, onShowUserList } = props;
  const selectedUser = useSelector(getSelectedUser);

  return (
    <>
      {selectedUser && (
        <Grid
          container
          flexDirection="column"
          flexGrow={1}
          flexShrink={1}
          alignItems="stretch"
          justifyContent="flex-end"
          height="100%"
        >
          <Grid item xs={12}>
            <Grid
              container
              boxSizing="border-box"
              display="flex"
              paddingX="14px"
            >
              <BoardHeader
                selectedUser={selectedUser}
                userId={userId}
                socket={socket}
                onShowUserList={onShowUserList}
              />
            </Grid>
            <Grid
              container
              flexDirection="column"
              flexGrow={1}
              flexShrink={1}
              alignItems="stretch"
              justifyContent="flex-end"
              height="calc(100vh - 225px)"
            >
              <ChatList selectedUser={selectedUser} userId={userId} />
              <Divider />
              <MessageBox
                selectedUser={selectedUser}
                userId={userId}
                socket={socket}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {!selectedUser && (
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <SupervisedUserCircleRoundedIcon
            color="disabled"
            sx={{
              fontSize: "150px"
            }}
          />
          <Typography gradient color="primary" variant="h4">
            Pick up You want chat with.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Board;
