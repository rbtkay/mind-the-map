export const TIMER_ACTIONS = {RESTART: "RESTART", TOGGLE_TIMER: "TOGGLE"};

export const toggleTimer = isRunning => ({
	type: TIMER_ACTIONS.TOGGLE_TIMER,
	isRunning,
});
