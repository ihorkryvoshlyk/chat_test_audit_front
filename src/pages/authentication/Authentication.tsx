import React, { useState } from "react";
import { Grid, Tabs, Tab } from "@mui/material";

import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

const Authentication = () => {
  const [tabValue, setTabValue] = useState<string>("signin");

  const handlChangeTab = (value) => {
    setTabValue(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tabs
          value={tabValue}
          onChange={handlChangeTab}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="signin" label="Sign In" />
          <Tab value="signup" label="Sign Up" />
        </Tabs>
        {tabValue === "signin" && <Signin />}
        {tabValue === "signup" && <Signup />}
      </Grid>
    </Grid>
  );
};

export default Authentication;
