import { combineReducers } from "redux";
import app from "./app"
import login from './login'
import register from './register'
import global from './global'
import route from './route'
export default combineReducers({
  app,
  login,
  register,
  global,
  route
});
