export const TIMER_ACTIONS = {
    RESTART_TIMER: "RESTART_TIMER",
    TOGGLE_TIMER: "TOGGLE",
    SET_TIMER_VALUE: "SET_TIMER_VALUE",
    GET_READY: "GET_READY",
    START_TIMER: "START_TIMER",
};
export const TIMER_STATUS = {
    paused: "paused",
    running: "running",
    atzero: "atzero",
    resetting: "resetting",
    ready: "ready",
};

export const toggleTimer = () => ({
    type: TIMER_ACTIONS.TOGGLE_TIMER,
});

export const resetTimer = () => ({
    type: TIMER_ACTIONS.RESTART_TIMER,
});

export const getReady = () => ({
    type: TIMER_ACTIONS.GET_READY,
});

export const setTimerValue = (value) => ({
    type: TIMER_ACTIONS.SET_TIMER_VALUE,
    value,
});

export const startTimer = () => ({
    type: TIMER_ACTIONS.START_TIMER
});
