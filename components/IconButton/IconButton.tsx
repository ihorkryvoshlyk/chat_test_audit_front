import React, { FC } from "react";
import { IconButton as MuiIconButton, Theme } from "@mui/material";
import { IconButtonProps as MuiIconButtonProps } from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonRoot: {
    padding: "10px",
    borderRadius: "4px"
  },
  primaryGradient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.primary.dark} 1.74%, ${theme.palette.primary.main} 99.9%)`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  secondaryGradient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.secondary.dark} 1.74%, ${theme.palette.secondary.main} 99.9%)`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  successGradient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.success.dark} 1.74%, ${theme.palette.success.main} 99.9%)`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  errorGradient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.error.dark} 1.74%, ${theme.palette.error.main} 99.9%)`,

      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  infoGrandient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.info.dark} 1.74%, ${theme.palette.info.main} 99.9%)`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  warningGradient: {
    "& .MuiSvgIcon-root": {
      background: `linear-gradient(90.15deg, ${theme.palette.warning.dark} 1.74%, ${theme.palette.warning.main} 99.9%)`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent"
    }
  },
  primaryBackGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.primary.dark} 1.74%, ${theme.palette.primary.main} 99.9%)`,
    color: theme.palette.common.white
  },
  secondaryBackGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.secondary.dark} 1.74%, ${theme.palette.secondary.main} 99.9%)`,
    color: theme.palette.common.white
  },
  successBackGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.success.dark} 1.74%, ${theme.palette.success.main} 99.9%)`,
    color: theme.palette.common.white
  },
  errorBackGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.error.dark} 1.74%, ${theme.palette.error.main} 99.9%)`,
    color: theme.palette.common.white
  },
  infoBackGrandient: {
    background: `linear-gradient(90.15deg, ${theme.palette.info.dark} 1.74%, ${theme.palette.info.main} 99.9%)`,
    color: theme.palette.common.white
  },
  warningBackGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.warning.dark} 1.74%, ${theme.palette.warning.main} 99.9%)`,
    color: theme.palette.common.white
  }
}));

export interface IconButtonProps extends MuiIconButtonProps {
  gradient?: boolean;
  backgroundGradient?: boolean;
}

const IconButton: FC<IconButtonProps> = (props) => {
  const {
    gradient = false,
    backgroundGradient = false,
    color = "primary",
    ...others
  } = props;
  const classes = useStyles();

  return (
    <MuiIconButton
      className={clsx(classes.iconButtonRoot, {
        [classes.primaryGradient]: gradient && color === "primary",
        [classes.secondaryGradient]: gradient && color === "secondary",
        [classes.successGradient]: gradient && color === "success",
        [classes.errorGradient]: gradient && color === "error",
        [classes.infoGrandient]: gradient && color === "info",
        [classes.warningGradient]: gradient && color === "warning",
        [classes.primaryBackGradient]:
          backgroundGradient && color === "primary",
        [classes.secondaryBackGradient]:
          backgroundGradient && color === "secondary",
        [classes.successBackGradient]:
          backgroundGradient && color === "success",
        [classes.errorBackGradient]: backgroundGradient && color === "error",
        [classes.infoBackGrandient]: backgroundGradient && color === "info",
        [classes.warningBackGradient]: backgroundGradient && color === "warning"
      })}
      color={color}
      {...others}
    />
  );
};

export default IconButton;
