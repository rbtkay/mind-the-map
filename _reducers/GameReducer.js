import { GAME_ACTIONS } from "../_actions/game";
import {
    getTimeTakenFromAnimation,
    getDistanceFromLatLonInKm,
    calculatePoints,
} from "../_helpers";

const game = (state = { monuments: [], city: "", score: 0 }, action) => {
    let newState;
    switch (action.type) {
        case GAME_ACTIONS.SET_MONUMENTS:
            const { monuments } = action;
            return { ...state, monuments };
        case GAME_ACTIONS.SET_CITY:
            const { city } = action;
            return { ...state, city };
        case GAME_ACTIONS.SET_SCORE:
            const { score } = state;
            const { animation_value, coordinates } = action;

            const time_taken = getTimeTakenFromAnimation(
                animation_value,
                10000
            );

            const distance_between_pins_in_m = getDistanceFromLatLonInKm(
                coordinates.lat1,
                coordinates.long1,
                coordinates.lat2,
                coordinates.long2
            );

            const new_score =
                parseFloat(score) +
                parseFloat(
                    calculatePoints(distance_between_pins_in_m, time_taken)
                );
            console.log("animation_value", animation_value);
            console.log("coordinates", coordinates);
            console.log("score", score);
            console.log("new_score", new_score);
            // console.log("time_taken", time_taken);
            // console.log(
            //     "distance_between_pins_in_m",
            //     distance_between_pins_in_m
            // );
            return { ...state, score: new_score };
        default:
            return state;
    }
};

export default game;
