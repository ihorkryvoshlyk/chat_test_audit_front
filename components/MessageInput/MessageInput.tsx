import React, { FC } from "react";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";

export interface MessageInputPrpos
  extends Omit<InputBaseProps, "onChange" | "value"> {
  onChange?: (message: string) => void;
  value?: string;
}

const MessageInput: FC<MessageInputPrpos> = (props) => {
  const { value, onChange } = props;
  return (
    <InputBase
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
      fullWidth
      multiline
      maxRows={5}
    />
  );
};

export default MessageInput;
