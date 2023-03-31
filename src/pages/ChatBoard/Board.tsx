import React, { FC } from "react";
import { Socket } from "socket.io-client";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";

import Typography from "@component/Typography";
import { ChatUser } from "@interfaces/entities";
import BoardHeader from "./BoardHeader";
import ChatList from "./ChatList";
import MessageBox from "./MessageBox";

export interface Props {
  userId?: string;
  selectedUser?: ChatUser;
  socket?: Socket;
}

const Board: FC<Props> = (props) => {
  const { userId, selectedUser, socket } = props;

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
          <Grid container boxSizing="border-box" display="flex" paddingX="14px">
            <BoardHeader
              selectedUser={selectedUser}
              userId={userId}
              socket={socket}
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
            <ChatList
              selectedUser={selectedUser}
              userId={userId}
              socket={socket}
            />
            <Divider />
            <MessageBox
              selectedUser={selectedUser}
              userId={userId}
              socket={socket}
            />
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
