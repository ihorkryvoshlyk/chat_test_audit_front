import React, { FC } from "react";
import { Chip as MuiChip, Theme } from "@mui/material";
import { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
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
  }
}));

export interface ChipProps extends MuiChipProps {
  /**
   * Gradient backgroun
   * @default false
   */
  gradient?: boolean;
}

const Chip: FC<ChipProps> = (props) => {
  const { gradient = false, color = "primary", variant, ...others } = props;
  const classes = useStyles();

  return (
    <MuiChip
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
          gradient && color === "warning" && variant !== "outlined"
      })}
      variant={variant}
      color={color}
      {...others}
    />
  );
};

export default Chip;
