import React, { useState } from "react";
import { Container, Grid, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Typography from "@component/Typography";

import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

const useStyles = makeStyles({
  container: {
    padding: "80px 0px"
  }
});

const Authentication = () => {
  const [tabValue, setTabValue] = useState<string>("signin");
  const classes = useStyles();

  const handleChangeTab = (e, value) => {
    setTabValue(value);
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography gradient color="primary" variant="h2" textAlign="center">
        Welcome Back!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab value="signin" label="Sign In" />
            <Tab value="signup" label="Sign Up" />
          </Tabs>
          {tabValue === "signin" && <Signin />}
          {tabValue === "signup" && <Signup />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Authentication;
