// import { TIMER_ACTIONS, TIMER_STATUS } from "../_actions/Timer";
// const timer = (
//     state = { value: 0, status: TIMER_STATUS.atzero },
//     action
// ) => {
//     switch (action.type) {
//         case TIMER_ACTIONS.TOGGLE_TIMER:
//             if (state.status == TIMER_STATUS.running)
//                 return { ...state, status: TIMER_STATUS.paused };
//             else return { ...state, status: TIMER_STATUS.running };
//         case TIMER_ACTIONS.RESTART_TIMER:
//             return { value: 0, status: TIMER_STATUS.resetting };
//         case TIMER_ACTIONS.SET_TIMER_VALUE:
//             const { value } = action;
//             return { ...state, value };
//         case TIMER_ACTIONS.GET_READY:
//             return {value: 0, status: TIMER_STATUS.ready}
//         case TIMER_ACTIONS.START_TIMER:
//             return {value: 0, status: TIMER_STATUS.atzero}
//         default:
//             return state;
//     }

// };
export const TIMER_ACTIONS = {
	START_TIMER: 'START_TIMER',
	STOP_TIMER: 'STOP_TIMER',
	SET_VALUE: 'SET_VALUE',
};
export const TIMER_STATUS = { ready: 'ready', running: 'running', stopped: 'stopped' };

export const startTimer = () => ({
	type: TIMER_ACTIONS.START_TIMER,
});

export const stopAndRestartTimer = () => ({
	type: TIMER_ACTIONS.STOP_TIMER,
});

export const setTimerValue = value => ({
	type: TIMER_ACTIONS.SET_VALUE,
	value,
});

const timer = (state = { value: 0, status: TIMER_STATUS.ready }, action) => {
	switch (action.type) {
		case TIMER_ACTIONS.START_TIMER:
			return { ...state, status: TIMER_STATUS.running };
		case TIMER_ACTIONS.STOP_TIMER:
			return { value: 0, status: TIMER_STATUS.stopped };
		case TIMER_ACTIONS.SET_VALUE:
            console.log("setting the value", action)
			return { ...state, value: action.value };
		default:
			return state;
	}
};

export default timer;
