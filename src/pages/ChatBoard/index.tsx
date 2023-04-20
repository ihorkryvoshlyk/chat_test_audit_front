import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useBeforeunload } from "react-beforeunload";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import initSocket from "@utils/initSocket";
import { getSelectedUser } from "@redux/chat/selectors";
import { setSigninId } from "@redux/chat";
import useGetSigninId from "@hooks/useGetSigninUserId";

import Header from "./Header";
import SideMenu from "./SideMenu";
import UserList from "./UserList";
import Board from "./Board";
import Profile from "./Profile";

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    minHeight: "108px"
  },
  mainContainer: {
    height: "100vh"
  },
  userListWrapper: {
    [theme.breakpoints.up("md")]: {
      borderRight: `2px solid ${theme.customPalette.grey[2]}`
    }
  },
  chatBoardWrapper: {
    [theme.breakpoints.up("md")]: {
      borderRight: `2px solid ${theme.customPalette.grey[2]}`
    },
    flexGrow: 1,
    flexBasis: 0
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
  const dispatch = useDispatch();
  const userId = useGetSigninId();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const selectedUser = useSelector(getSelectedUser);
  const isUpLg = useMediaQuery("(min-width:1750px)");
  const isUpMd = useMediaQuery("(min-width:1200px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (userId) {
      setSocket(initSocket(userId));
      dispatch(setSigninId(userId));
    }
    return () => {
      setSocket(undefined);
    };
  }, [userId]);

  useBeforeunload(() => {
    socket?.emit("logout", {
      userId
    });
  });

  const handleShowUserList = () => {
    setShowUserList(true);
  };

  const handleHideUserList = () => {
    setShowUserList(false);
  };

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
          <Grid
            item
            className={classes.userListWrapper}
            sx={{
              width: isUpMd ? "580px" : undefined,
              flexGrow: !isUpMd ? 1 : undefined,
              display:
                isUpMd || showUserList || !selectedUser ? "block" : "none"
            }}
          >
            <UserList
              userId={userId}
              socket={socket}
              onClickUser={handleHideUserList}
            />
          </Grid>
          <Grid
            item
            className={classes.chatBoardWrapper}
            sx={{
              display:
                (!isUpMd && !selectedUser) || (showUserList && !isUpMd)
                  ? "none"
                  : "block"
            }}
          >
            <Grid container height="100%">
              <Grid item xs={12} height="100%">
                <Board
                  userId={userId}
                  socket={socket}
                  onShowUserList={handleShowUserList}
                />
              </Grid>
            </Grid>
          </Grid>
          {isUpLg && <Profile />}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatBoard;
