export const TIMER_ACTIONS = {
    RESTART_TIMER: "RESTART_TIMER",
    TOGGLE_TIMER: "TOGGLE",
    SET_TIMER_VALUE: "SET_TIMER_VALUE",
};

export const toggleTimer = (isRunning) => ({
    type: TIMER_ACTIONS.TOGGLE_TIMER,
    isRunning,
});

export const resetTimer = () => ({
    type: TIMER_ACTIONS.RESTART_TIMER,
});

export const setTimerValue = (value) => ({
    type: TIMER_ACTIONS.SET_TIMER_VALUE,
    value,
});
