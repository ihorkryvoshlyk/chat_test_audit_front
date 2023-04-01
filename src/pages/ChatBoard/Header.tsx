import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Typography from "@component/Typography";
import Button from "@component/Button";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: `solid 2px ${theme.customPalette.grey[2]}`,
    padding: "20px 30px",
    backgroundColor: theme.customPalette.common.white
  },
  headerTitle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "39.7151px",
    lineHeight: "34px",
    flexGrow: 1
  }
}));

interface Props {
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const Header: FC<Props> = (props) => {
  const { handleDrawerToggle, drawerWidth } = props;
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
      className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          gradient
          noWrap
          className={classes.headerTitle}
        >
          Your Task
        </Typography>
        <Button gradient variant="contained" type="submit" rounded size="large">
          <AddRoundedIcon />
          Add new task
        </Button>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
