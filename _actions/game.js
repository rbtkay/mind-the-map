export const GAME_ACTIONS = {
    SET_POIS: "SET_POIS",
    SET_CITY: "SET_CITY",
    SET_THEME: "SET_THEME",
    SET_SCORE: "SET_SCORE",
    CALCULATE_TOTAL_SCORE: "CALCULATE_TOTAL_SCORE",
    REPLAY_GAME: "REPLAY_GAME",
};

export const setPois = (pois) => ({
    type: GAME_ACTIONS.SET_POIS,
    pois,
});

export const setCity = (city) => ({
    type: GAME_ACTIONS.SET_CITY,
    city,
});

export const setTheme = (theme) => ({
    type: GAME_ACTIONS.SET_THEME,
    theme,
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
