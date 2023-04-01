import React, { FC } from "react";
import { Badge as MuiBadge, Theme } from "@mui/material";
import { BadgeProps as MuiBadgeProps } from "@mui/material/Badge";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

export interface BadgeProps extends Omit<MuiBadgeProps, "color"> {
  size?: "xs" | "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}

const useStyles = makeStyles((theme: Theme) => ({
  badge: {
    "& > .MuiBadge-badge": {
      border: "solid white",
      borderRadius: "50%"
    }
  },
  backgroundPrimary: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main
    }
  },
  backgroundSecondary: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main
    }
  },
  backgroundSuccess: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.main
    }
  },
  backgroundError: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main
    }
  },
  backgroundWarning: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.main
    }
  },
  backgroundInfo: {
    "& > .MuiBadge-badge": {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.main
    }
  },
  small: {
    "& > .MuiBadge-badge": {
      width: "18px",
      height: "18px",
      borderWidth: "3px"
    }
  },
  medium: {
    "& > .MuiBadge-badge": {
      width: "23px",
      height: "23px",
      borderWidth: "4px"
    }
  },
  large: {
    "& > .MuiBadge-badge": {
      width: "27px",
      height: "27px",
      borderWidth: "6px"
    }
  }
}));

const Badge: FC<BadgeProps> = (props) => {
  const { size = "medium", color = "primary", ...others } = props;
  const classes = useStyles(props);

  return (
    <MuiBadge
      className={clsx(classes.badge, {
        [classes.backgroundPrimary]: color === "primary",
        [classes.backgroundSecondary]: color === "secondary",
        [classes.backgroundSuccess]: color === "success",
        [classes.backgroundError]: color === "error",
        [classes.backgroundWarning]: color === "warning",
        [classes.backgroundInfo]: color === "info",
        [classes.small]: size === "small",
        [classes.medium]: size === "medium",
        [classes.large]: size === "large"
      })}
      {...others}
    />
  );
};

export default Badge;
