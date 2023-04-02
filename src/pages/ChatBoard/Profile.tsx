import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import DuoRoundedIcon from "@mui/icons-material/DuoRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

import Typography from "@component/Typography";
import IconButton from "@component/IconButton";
import { getSelectedUser } from "@redux/chat/selectors";

const useStyles = makeStyles(() => ({
  userName: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "24.35px",
    lineHeight: "37px",
    textAlign: "center"
  }
}));

const Profile = () => {
  const selectedUser = useSelector(getSelectedUser);
  const classes = useStyles();

  return (
    <Grid item width="350px" justifyContent="center">
      <Avatar
        alt="Ralph Edwards"
        src="images/avatars/Avatars.png"
        sx={{ width: 130, height: 130, margin: "auto" }}
      />
      <Typography className={classes.userName}>
        {`${selectedUser?.firstName || ""} ${selectedUser?.lastName || ""}`}
      </Typography>
      <Box textAlign="center">
        <IconButton>
          <DuoRoundedIcon />
        </IconButton>
        <IconButton>
          <LocalPhoneRoundedIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default Profile;
