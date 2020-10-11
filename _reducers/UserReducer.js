import { USER_ACTIONS } from "../_actions/user";
const user = (state = { username: null }, action) => {
    switch (action.type) {
        case USER_ACTIONS.REGISTER_USER:
            const { username } = action;
            return { ...state, username };

        default:
            return state;
    }
};

export default user;
