import React, { FC, ReactNode } from "react";

import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  CssBaseline
} from "@mui/material";
import { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles/ThemeProvider";

export interface ThemeProviderProps extends MuiThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({
  theme,
  children,
  ...other
}) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme} {...other}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </StyledEngineProvider>
);

export default ThemeProvider;
