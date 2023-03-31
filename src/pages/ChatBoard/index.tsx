import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Typography from "@component/Typography";
import { ChatUser } from "@interfaces/entities";
import initSocket from "@utils/initSocket";

import Header from "./Header";
import SideMenu from "./SideMenu";
import UserList from "./UserList";
import Board from "./Board";

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    minHeight: "108px"
  },
  mainContainer: {
    height: "100vh"
  },
  taskListWrapper: {
    borderRight: `2px solid ${theme.customPalette.grey[2]}`
  },
  chatBoardWrapper: {
    borderRight: `2px solid ${theme.customPalette.grey[2]}`
  },
  mainPanel: {
    height: "calc(100% - 68px)"
  },
  userName: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "24.35px",
    lineHeight: "37px",
    textAlign: "center"
  }
}));

const drawerWidth = 155;

const ChatBoard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const userId = localStorage.getItem("userid");
  const [selectedUser, setSelectedUser] = useState<ChatUser | undefined>();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const isUpLg = useMediaQuery("(min-width:1750px)");
  // const isUpMd = useMediaQuery('(min-width:1200px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (userId) {
      setSocket(initSocket(userId));
    }
    return () => {
      setSocket(undefined);
    };
  }, [userId]);

  useEffect(() => {
    if (socket) {
      window.onbeforeunload = () =>
        socket.emit("logout", {
          userId
        });
    }
  }, [socket]);

  console.log(isUpLg);

  if (!userId) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <SideMenu
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
      />
      <Box
        component="main"
        className={classes.mainContainer}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar className={classes.toolBar} />
        <Grid container spacing={2} className={classes.mainPanel}>
          <Box width="580px" className={classes.taskListWrapper}>
            <UserList
              userId={userId}
              onChangeSelectedUser={setSelectedUser}
              socket={socket}
            />
          </Box>
          <Box flexGrow={1} className={classes.chatBoardWrapper}>
            <Board
              selectedUser={selectedUser}
              userId={userId}
              socket={socket}
            />
          </Box>
          {isUpLg && (
            <Box width="350px" justifyContent="center">
              <Avatar
                alt="Ralph Edwards"
                src="images/avatars/Avatars.png"
                sx={{ width: 130, height: 130, margin: "auto" }}
              />
              <Typography className={classes.userName}>
                Ralph Edwards
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatBoard;
