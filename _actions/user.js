export const USER_ACTIONS = { SET_USER: "SET_USER", MODIFY_EMAIL: "MODIFY_EMAIL" };

export const setUser = (user) => ({
    type: USER_ACTIONS.SET_USER,
    user
});
