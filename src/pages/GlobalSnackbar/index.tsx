import React from "react";
import { useSelector } from "react-redux";

import Snackbar from "@component/Snackbar";
import { getGlobalSnackbar } from "@redux/globalSnackbar/selector";
import useGlobalSnackbar from "@hooks/useGlobalSnackbar";

const GlobalSnackbar = () => {
  const snackbarProps = useSelector(getGlobalSnackbar);
  const { closeSnackbar } = useGlobalSnackbar();

  const handleCloseSnackbar = () => {
    closeSnackbar();
  };
  return <Snackbar {...snackbarProps} onClose={handleCloseSnackbar} />;
};

export default GlobalSnackbar;
