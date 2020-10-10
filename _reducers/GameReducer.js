import { GAME_ACTIONS } from "../_actions/game";
import {
    getTimeTakenFromAnimation,
    getDistanceFromLatLonInKm,
    calculatePoints,
} from "../_helpers";
import { TIMER_ACTIONS } from "../_actions/Timer";

const game = (
    state = { monuments: [], city: "", score: [], total_score: 0 },
    action
) => {
    const { score } = state;
    switch (action.type) {
        case GAME_ACTIONS.SET_MONUMENTS:
            const { monuments } = action;
            return { ...state, monuments };
        case GAME_ACTIONS.SET_CITY:
            const { city } = action;
            return { ...state, city };
        case GAME_ACTIONS.SET_SCORE:
            const { animation_value, coordinates } = action;

            // get the time it took for the user to set a marker
            const time_taken = getTimeTakenFromAnimation(
                animation_value,
                10000
            );
            
            // get the distance between the marker chosen and the correct one
            const distance_between_pins_in_m = getDistanceFromLatLonInKm(
                coordinates.lat1,
                coordinates.long1,
                coordinates.lat2,
                coordinates.long2
            );

            // calculate the score of the current round
            const new_score = parseFloat(
                calculatePoints(distance_between_pins_in_m, time_taken)
            );

            return { ...state, score: [...score, new_score] };
        case GAME_ACTIONS.CALCULATE_TOTAL_SCORE:
            // sum the scores of different ones into one total_score
            const total_score = score.reduce((a, b) => a + b, 0);
            return { ...state, total_score };

        default:
            return state;
    }
};

export default game;
