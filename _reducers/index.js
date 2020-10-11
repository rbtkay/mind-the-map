// modules
import { combineReducers } from "redux";
// reducers
import timer from "./TimerReducer";
import game from "./GameReducer";
import user from "./UserReducer";

export default combineReducers({
    timer,
    game,
    user
});
