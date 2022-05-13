import { combineReducers } from "redux";

import authReducer from "./auth";
import historyReducer from "./history";
import userReducer from './user';
import transactionReducer from './transaction';

export default combineReducers({
  authReducer,
  historyReducer,
  userReducer,
  transactionReducer
});
