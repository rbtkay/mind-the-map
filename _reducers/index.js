// modules
import { combineReducers } from "redux";
// reducers
import timer from "./TimerReducer";
import game from "./GameReducer";

export default combineReducers({
    timer,
    game
});
