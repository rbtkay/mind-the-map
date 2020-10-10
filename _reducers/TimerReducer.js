import { TIMER_ACTIONS, TIMER_STATUS } from "../_actions/Timer";
const timer = (
    state = { value: 0, status: TIMER_STATUS.atzero },
    action
) => {
    console.log("in the reducer", action.type);
    console.log("in the reducer", state.status);

    let newState;
    switch (action.type) {
        case TIMER_ACTIONS.TOGGLE_TIMER:
            if (state.status == TIMER_STATUS.running)
                return { ...state, status: TIMER_STATUS.paused };
            else return { ...state, status: TIMER_STATUS.running };

            return { ...state, isRunning };
        case TIMER_ACTIONS.RESTART_TIMER:
            return { value: 0, status: TIMER_STATUS.resetting };
        case TIMER_ACTIONS.SET_TIMER_VALUE:
            const { value } = action;
            return { ...state, value };
        case TIMER_ACTIONS.GET_READY:
            return {value: 0, status: TIMER_STATUS.ready}
        default:
            return state;
    }
};

export default timer;
