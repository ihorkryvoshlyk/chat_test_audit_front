import { combineReducers } from "redux";

import chat from "./chat";
import globalSnackbar from "./globalSnackbar";

export const rootReducer = combineReducers({
  chat,
  globalSnackbar
});

export type RootState = ReturnType<typeof rootReducer>;
