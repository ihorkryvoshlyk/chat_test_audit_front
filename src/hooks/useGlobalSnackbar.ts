import { useSelector, useDispatch } from "react-redux";
import { setOpen, setData } from "@redux/globalSnackbar";
import { getGlobalSnackbar } from "@redux/globalSnackbar/selector";
import { SnackbarProps } from "@component/Snackbar";

const useGlobalSnackbar = () => {
  const dispatch = useDispatch();
  const globalSnackbar = useSelector(getGlobalSnackbar);

  const openSnackbar = (snackbar: Omit<SnackbarProps, "open">) => {
    dispatch(
      setData({
        ...snackbar
      })
    );
    dispatch(setOpen(true));
  };

  const closeSnackbar = () => {
    dispatch(setOpen(false));
  };

  return {
    openSnackbar,
    closeSnackbar,
    isOpen: globalSnackbar.open
  };
};

export default useGlobalSnackbar;
