/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarProps } from "@component/Snackbar";

export type GlobalSnackbarState = SnackbarProps;

const initialState: GlobalSnackbarState = {
  open: false,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  message: "",
  gradient: false,
  rounded: false,
  color: "primary"
};

const globalSnackbarSlice = createSlice({
  name: "globalSnackbar",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<any>) => ({
      ...state,
      open: action.payload
    }),
    setData: (state, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload
    })
  }
});

export const { setOpen, setData } = globalSnackbarSlice.actions;
export default globalSnackbarSlice.reducer;
