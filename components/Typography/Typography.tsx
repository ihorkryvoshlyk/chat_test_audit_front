import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { Theme, Typography as MuiTypography } from "@mui/material";
import { TypographyProps as MuiTypographyProps } from "@mui/material/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  primaryGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.primary.dark} 1.74%, ${theme.palette.primary.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  },
  secondaryGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.secondary.dark} 1.74%, ${theme.palette.secondary.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  },
  successGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.success.dark} 1.74%, ${theme.palette.success.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  },
  errorGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.error.dark} 1.74%, ${theme.palette.error.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  },
  infoGrandient: {
    background: `linear-gradient(90.15deg, ${theme.palette.info.dark} 1.74%, ${theme.palette.info.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  },
  warningGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.warning.dark} 1.74%, ${theme.palette.warning.main} 99.9%)`,
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
  }
}));

export interface TypographyProps extends MuiTypographyProps {
  gradient?: boolean;
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
}

const Typography: FC<TypographyProps> = (props) => {
  const { gradient, className, color = "primary", ...others } = props;
  const classes = useStyles();

  return (
    <MuiTypography
      className={clsx(className, {
        [classes.primaryGradient]: gradient && color === "primary",
        [classes.secondaryGradient]: gradient && color === "secondary",
        [classes.successGradient]: gradient && color === "success",
        [classes.errorGradient]: gradient && color === "error",
        [classes.infoGrandient]: gradient && color === "info",
        [classes.warningGradient]: gradient && color === "warning"
      })}
      {...others}
    />
  );
};

export default Typography;
