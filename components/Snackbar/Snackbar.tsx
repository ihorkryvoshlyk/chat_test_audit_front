import React, { FC } from "react";
import { Snackbar as MuiSnackbar, Theme } from "@mui/material";
import { SnackbarProps as MuiSnackbarProps } from "@mui/material/Snackbar";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  primaryGradient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.primary.dark} 1.74%, ${theme.palette.primary.main} 99.9%)`
    }
  },
  secondaryGradient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.secondary.dark} 1.74%, ${theme.palette.secondary.main} 99.9%)`
    }
  },
  successGradient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.success.dark} 1.74%, ${theme.palette.success.main} 99.9%)`
    }
  },
  errorGradient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.error.dark} 1.74%, ${theme.palette.error.main} 99.9%)`
    }
  },
  infoGrandient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.info.dark} 1.74%, ${theme.palette.info.main} 99.9%)`
    }
  },
  warningGradient: {
    "& .MuiSnackbarContent-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.warning.dark} 1.74%, ${theme.palette.warning.main} 99.9%)`
    }
  },
  rounded: {
    borderRadius: "1000px",
    "& .MuiSnackbarContent-root": {
      borderRadius: "1000px"
    }
  }
}));

export interface SnackbarProps extends MuiSnackbarProps {
  gradient?: boolean;
  rounded?: boolean;
  color: "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const Snackbar: FC<SnackbarProps> = (props) => {
  const { gradient = false, rounded = false, color, ...others } = props;
  const classes = useStyles();

  return (
    <MuiSnackbar
      className={clsx({
        [classes.primaryGradient]: gradient && color === "primary",
        [classes.secondaryGradient]: gradient && color === "secondary",
        [classes.successGradient]: gradient && color === "success",
        [classes.errorGradient]: gradient && color === "error",
        [classes.infoGrandient]: gradient && color === "info",
        [classes.warningGradient]: gradient && color === "warning",
        [classes.rounded]: rounded
      })}
      {...others}
    />
  );
};

export default Snackbar;
