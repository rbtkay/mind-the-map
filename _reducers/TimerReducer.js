import { TIMER_ACTIONS } from "../_actions/Timer";

const timer = (state = { value: 0, isRunning: false }, action) => {
    let newState;
    switch (action.type) {
        case TIMER_ACTIONS.TOGGLE_TIMER:
            const { isRunning } = action;
            return { ...state, isRunning };
        default:
            return state;
    }
};

export default timer;
