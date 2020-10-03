import { GAME_ACTIONS } from "../_actions/game";

const game = (state = { monuments: [], city: "" }, action) => {
    let newState;
    switch (action.type) {
        case GAME_ACTIONS.SET_MONUMENTS:
            const { monuments } = action;
            return { ...state, monuments };
        case GAME_ACTIONS.SET_CITY:
            const { city } = action;
            return { ...state, city };
        default:
            return state;
    }
};

export default game;
