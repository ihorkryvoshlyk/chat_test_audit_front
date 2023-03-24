import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { Button as MuiButton, Theme } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  primaryGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.primary.dark} 1.74%, ${theme.palette.primary.main} 99.9%)`
  },
  secondaryGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.secondary.dark} 1.74%, ${theme.palette.secondary.main} 99.9%)`
  },
  successGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.success.dark} 1.74%, ${theme.palette.success.main} 99.9%)`
  },
  errorGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.error.dark} 1.74%, ${theme.palette.error.main} 99.9%)`
  },
  infoGrandient: {
    background: `linear-gradient(90.15deg, ${theme.palette.info.dark} 1.74%, ${theme.palette.info.main} 99.9%)`
  },
  warningGradient: {
    background: `linear-gradient(90.15deg, ${theme.palette.warning.dark} 1.74%, ${theme.palette.warning.main} 99.9%)`
  },
  rounded: {
    borderRadius: "1000px"
  }
}));

export interface ButtonProps extends MuiButtonProps {
  /**
   * Gradient backgroun
   * @default false
   */
  gradient?: boolean;
  /**
   * Border Rounded Button
   * @default false
   */
  rounded?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    gradient = false,
    rounded = false,
    color = "primary",
    variant,
    ...others
  } = props;
  const classes = useStyles();

  return (
    <MuiButton
      className={clsx({
        [classes.primaryGradient]:
          gradient && color === "primary" && variant !== "outlined",
        [classes.secondaryGradient]:
          gradient && color === "secondary" && variant !== "outlined",
        [classes.successGradient]:
          gradient && color === "success" && variant !== "outlined",
        [classes.errorGradient]:
          gradient && color === "error" && variant !== "outlined",
        [classes.infoGrandient]:
          gradient && color === "info" && variant !== "outlined",
        [classes.warningGradient]:
          gradient && color === "warning" && variant !== "outlined",
        [classes.rounded]: rounded
      })}
      variant={variant}
      color={color}
      {...others}
    />
  );
};

export default Button;
