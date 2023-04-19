import { createTheme, responsiveFontSizes } from "@mui/material";

import { customPalette, palette } from "./themeOptions";

declare module "@mui/material/styles" {
  interface Theme {
    customPalette: {
      primary: string[];
      success: string[];
      error: string[];
      grey: string[];
      text: string[];
      common: {
        [key: string]: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customPalette: {
      primary: string[];
      success: string[];
      error: string[];
      grey: string[];
      text: string[];
      common: {
        [key: string]: string;
      };
    };
  }
}

const customTheme = responsiveFontSizes(
  createTheme({
    customPalette,
    palette
  })
);

export default customTheme;
