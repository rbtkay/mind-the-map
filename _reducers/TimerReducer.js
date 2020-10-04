import { TIMER_ACTIONS } from "../_actions/Timer";

const timer = (state = { value: 0, isRunning: true, isReset: false }, action) => {
    // console.log("in the reducer", action);

    let newState;
    switch (action.type) {
        case TIMER_ACTIONS.TOGGLE_TIMER:
            const { isRunning } = action;
            return { ...state, isRunning };
        case TIMER_ACTIONS.RESTART_TIMER:
            return { isRunning: false, value: 0};
        case TIMER_ACTIONS.SET_TIMER_VALUE:
            const { value } = action;
            return { ...state, value };
        default:
            return state;
    }
};

export default timer;
