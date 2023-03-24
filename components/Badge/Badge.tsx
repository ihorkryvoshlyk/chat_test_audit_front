import React, { FC } from "react";
import { Badge as MuiBadge } from "@mui/material";
import { BadgeProps as MuiBadgeProps } from "@mui/material/Badge";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

export interface BadgeProps extends Omit<MuiBadgeProps, "variant"> {
  size?: "small" | "medium" | "large";
}

const borderSizeList = {
  small: "3px",
  medium: "4px",
  large: "6px"
};

const useStyles = makeStyles(() => ({
  badge: {
    border: ({ size }: BadgeProps) =>
      `solid ${borderSizeList[size || "medium"]} white`,
    borderRaius: "50%"
  },
  small: {
    width: "18px",
    height: "18px"
  },
  medium: {
    width: "23px",
    height: "23px"
  },
  large: {
    width: "27px",
    height: "27px"
  }
}));

const Badge: FC<BadgeProps> = (props) => {
  const { size = "medium", ...others } = props;
  const classes = useStyles(props);

  return (
    <MuiBadge
      className={clsx(classes.badge, {
        [classes.small]: size === "small",
        [classes.medium]: size === "medium",
        [classes.large]: size === "large"
      })}
      {...others}
    />
  );
};

export default Badge;
