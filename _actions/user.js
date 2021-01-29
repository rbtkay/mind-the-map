export const USER_ACTIONS = {
	SET_USER: 'SET_USER',
	MODIFY_EMAIL: 'MODIFY_EMAIL',
	SET_DEFAULT_CITY: 'SET_DEFAULT_CITY',
};

export const setUser = user => ({
	type: USER_ACTIONS.SET_USER,
	user,
});

export const setDefaultCity = default_city => ({
	type: USER_ACTIONS.SET_DEFAULT_CITY,
	default_city,
});
