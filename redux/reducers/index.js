import { combineReducers } from "redux";

import authReducer from "./auth";
import historyReducer from "./history";

export default combineReducers({
  authReducer,
  historyReducer
});
