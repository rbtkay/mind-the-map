// modules
import { combineReducers } from "redux";
// reducers
import timer from "./timer";
import game from "./game";
import user from "./user";

export default combineReducers({
    timer,
    game,
    user
});
