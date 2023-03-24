import React, { FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { makeStyles } from "@mui/styles";
// import { Theme } from "@mui/material";

import Typography from "@component/Typography";
import MenuIcon from "@component/MenuIcon";

const useStyles = makeStyles(() => ({
  logoWrapper: {
    padding: "40px 24px",
    textTransform: "uppercase",
    textAlign: "center",
    width: "100%"
  },
  logo: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "30px"
  },
  logoText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.78em"
  },
  listItem: {
    justifyContent: "center",
    marginBottom: "30px"
  }
}));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle: () => void;
  drawerWidth: number;
  mobileOpen?: boolean;
}

const SideMenu: FC<Props> = (props) => {
  const { window, handleDrawerToggle, drawerWidth, mobileOpen = false } = props;
  const classes = useStyles();

  const drawer = (
    <div>
      <Toolbar className={classes.logoWrapper}>
        <Box>
          <Typography
            gradient
            color="primary"
            variant="h5"
            className={classes.logo}
          >
            TEST
          </Typography>
          <Typography variant="h5" className={classes.logoText}>
            AUDIT
          </Typography>
        </Box>
      </Toolbar>
      <List>
        <ListItem disablePadding className={classes.listItem}>
          <ListItemIcon>
            <MenuIcon gradient>
              <CalendarMonthRoundedIcon />
            </MenuIcon>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding className={classes.listItem}>
          <ListItemIcon>
            <MenuIcon gradient>
              <ChatBubbleOutlineRoundedIcon />
            </MenuIcon>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding className={classes.listItem}>
          <ListItemIcon>
            <MenuIcon gradient>
              <AddRoundedIcon />
            </MenuIcon>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding className={classes.listItem}>
          <ListItemIcon>
            <MenuIcon gradient>
              <NotificationsNoneRoundedIcon />
            </MenuIcon>
          </ListItemIcon>
        </ListItem>
        <ListItem disablePadding className={classes.listItem}>
          <ListItemIcon>
            <MenuIcon gradient>
              <SettingsRoundedIcon />
            </MenuIcon>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideMenu;
