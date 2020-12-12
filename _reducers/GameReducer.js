import { GAME_ACTIONS } from "../_actions/game";
import {
    getTimeTakenFromAnimation,
    getDistanceFromLatLonInKm,
    calculatePoints,
} from "../_helpers";

const game = (
    state = {
        pois: [],
        city: "",
        theme: "",
        score: [],
        total_score: 0,
        round_distance_in_m: 0,
        round_time: 0,
        is_time_done: false,
    },
    action
) => {
    const { score, city } = state;
    switch (action.type) {
        case GAME_ACTIONS.SET_POIS:
            console.log("action", action)
            const { pois } = action;
            return { ...state, pois };
        case GAME_ACTIONS.SET_CITY:
            const { city } = action;
            return { ...state, city };
        case GAME_ACTIONS.SET_THEME:
            const { theme } = action;
            return { ...state, theme };
        case GAME_ACTIONS.SET_SCORE:
            const { animation_value, coordinates, is_time_done } = action;

            if (is_time_done)
                return {
                    ...state,
                    score: [...score, 0],
                    is_time_done: true,
                };

            // get the time it took for the user to set a marker
            const round_time = getTimeTakenFromAnimation(
                animation_value,
                10000
            );

            // get the distance between the marker chosen and the correct one
            const round_distance_in_m = getDistanceFromLatLonInKm(
                coordinates.lat1,
                coordinates.long1,
                coordinates.lat2,
                coordinates.long2
            );

            // calculate the score of the current round
            const new_score = parseFloat(
                calculatePoints(round_distance_in_m, round_time)
            );

            return {
                ...state,
                score: [...score, new_score],
                round_time,
                round_distance_in_m,
                is_time_done: false,
            };
        case GAME_ACTIONS.CALCULATE_TOTAL_SCORE:
            // sum the scores of different ones into one total_score
            const total_score = score.reduce((a, b) => a + b, 0);
            return { ...state, total_score };

        case GAME_ACTIONS.REPLAY_GAME:
            return {
                ...state,
                pois: [],
                score: [],
                total_score: 0,
                round_distance_in_m: 0,
                round_time: 0,
            };
        default:
            return state;
    }
};

export default game;
