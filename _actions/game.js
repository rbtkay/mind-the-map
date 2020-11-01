export const GAME_ACTIONS = {
    SET_MONUMENTS: "SET_MONUMENTS",
    SET_CITY: "SET_CITY",
    SET_SCORE: "SET_SCORE",
    CALCULATE_TOTAL_SCORE: "CALCULATE_TOTAL_SCORE",
    REPLAY_GAME: "REPLAY_GAME",
};

export const setMonuments = (monuments) => ({
    type: GAME_ACTIONS.SET_MONUMENTS,
    monuments,
});

export const setCity = (city) => ({
    type: GAME_ACTIONS.SET_CITY,
    city,
});

export const setScore = (
    animation_value,
    coordinates,
    is_time_done = false
) => ({
    type: GAME_ACTIONS.SET_SCORE,
    animation_value,
    coordinates,
    is_time_done,
});

export const calculateTotalScore = () => ({
    type: GAME_ACTIONS.CALCULATE_TOTAL_SCORE,
});

export const replayGame = (city = "") => ({
    type: GAME_ACTIONS.REPLAY_GAME,
    city,
});
