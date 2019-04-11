import { combineReducers } from "redux";
import app from "./app"
import login from './login'
import register from './register'
export default combineReducers({
  app,
  login,
  register
});
