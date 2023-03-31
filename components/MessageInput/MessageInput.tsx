import React, { FC } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Popover from "@mui/material/Popover";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import AddRoundeIcon from "@mui/icons-material/AddRounded";

import IconButton from "@component/IconButton";

export interface MessageInputPrpos
  extends Omit<InputBaseProps, "onChange" | "value"> {
  onChange?: (message: string) => void;
  onChangeEmoji?: (emoji: EmojiClickData) => void;
  onClickAttach?: () => void;
  value?: string;
}

const MessageInput: FC<MessageInputPrpos> = (props) => {
  const { value, onChange, onChangeEmoji, onClickAttach, ...others } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleShowEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (emojiData: EmojiClickData) => {
    if (onChangeEmoji) onChangeEmoji(emojiData);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <InputBase
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        fullWidth
        multiline
        maxRows={5}
        startAdornment={
          <IconButton gradient onClick={handleShowEmoji}>
            <EmojiEmotionsRoundedIcon />
          </IconButton>
        }
        endAdornment={
          <IconButton gradient onClick={onClickAttach}>
            <AddRoundeIcon />
          </IconButton>
        }
        {...others}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} />
      </Popover>
    </>
  );
};

export default MessageInput;
