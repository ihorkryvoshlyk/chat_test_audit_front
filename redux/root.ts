import { combineReducers } from "redux";

import chat from "./chat";

export const rootReducer = combineReducers({
  chat
});

export type RootState = ReturnType<typeof rootReducer>;
