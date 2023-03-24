import React, { FC } from "react";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex"
  },
  sendboxWrapper: {
    justifyContent: "end"
  },
  inboxRoot: {
    borderRadius: "24px 24px 24px 0px",
    padding: "20px 30px",
    display: "inline-block"
  },
  sendboxRoot: {
    borderRadius: "24px 24px 0px 24px",
    padding: "20px 30px",
    display: "inline-block"
  },
  inbox: {
    backgroundColor: theme.customPalette.grey[2],
    color: theme.palette.common.black
  },
  sendbox: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  gradientSendbox: {
    background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
  }
}));

export interface MessageBoxProps extends BoxProps {
  type?: "inbox" | "sendbox";
  gradient?: boolean;
  className?: string;
}

const MessageBox: FC<MessageBoxProps> = (props) => {
  const { type = "inbox", gradient = false, className, ...others } = props;
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.wrapper, {
        [classes.sendboxWrapper]: type === "sendbox"
      })}
    >
      <Box
        className={clsx(className, {
          [classes.inboxRoot]: type === "inbox",
          [classes.sendboxRoot]: type === "sendbox",
          [classes.inbox]: type === "inbox",
          [classes.sendbox]: type === "sendbox",
          [classes.gradientSendbox]: type === "sendbox" && gradient
        })}
        {...others}
      />
    </Box>
  );
};

export default MessageBox;
