import { USER_ACTIONS } from "../_actions/user";
const user = (state = { username: null, email: null, random_ref: null }, action) => {
    switch (action.type) {
        case USER_ACTIONS.SET_USER:
            const { user } = action;
            return user;

        default:
            return state;
    }
};

export default user;
