export const TIMER_ACTIONS = {
	START_TIMER: 'START_TIMER',
	STOP_RESTART_TIMER: 'STOP_RESTART_TIMER',
	SET_VALUE: 'SET_VALUE',
};
export const TIMER_STATUS = { ready: 'ready', running: 'running', stopped: 'stopped' };

export const startTimer = () => ({
	type: TIMER_ACTIONS.START_TIMER,
});

export const stopAndRestartTimer = () => ({
	type: TIMER_ACTIONS.STOP_RESTART_TIMER,
});

export const setTimerValue = value => ({
	type: TIMER_ACTIONS.SET_VALUE,
	value,
});

const timer = (state = { value: 0, status: TIMER_STATUS.ready }, action) => {
	switch (action.type) {
		case TIMER_ACTIONS.START_TIMER:
			return { ...state, status: TIMER_STATUS.running };
		case TIMER_ACTIONS.STOP_RESTART_TIMER:
			return { value: 0, status: TIMER_STATUS.stopped };
		case TIMER_ACTIONS.SET_VALUE:
            console.log("setting the value", action)
			return { ...state, value: action.value };
		default:
			return state;
	}
};

export default timer;
