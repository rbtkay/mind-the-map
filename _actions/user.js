export const USER_ACTIONS = { REGISTER_USER: "REGISTER_USER" };

export const registerUser = (username) => ({
    type: USER_ACTIONS.REGISTER_USER,
    username
});
