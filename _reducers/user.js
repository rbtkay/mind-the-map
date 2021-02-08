export const USER_ACTIONS = {
	SET_USER: 'SET_USER',
	MODIFY_EMAIL: 'MODIFY_EMAIL',
	SET_PRACTICE_CITY: 'SET_PRACTICE_CITY',
	SET_CHALLENGE_CITY: 'SET_CHALLENGE_CITY',
	CLEAR_USER: 'CLEAR_USER',
};

export const setUser = user => ({
	type: USER_ACTIONS.SET_USER,
	user,
});

export const setPracticeCity = practice_city => ({
	type: USER_ACTIONS.SET_PRACTICE_CITY,
	practice_city,
});

export const setChallengeCity = challenge_city => ({
	type: USER_ACTIONS.SET_CHALLENGE_CITY,
	challenge_city,
});

export const clearUser = () => ({
	type: USER_ACTIONS.CLEAR_USER,
});

const user = (
	state = {
		given_name: null,
		family_name: null,
		email: null,
		random_ref: null,
		highest_score: 0,
		practice_city: null,
		challenge_city: null,
	},
	action
) => {
	switch (action.type) {
		case USER_ACTIONS.SET_USER:
			const { user } = action;
			return { ...state, ...user };
		case USER_ACTIONS.SET_PRACTICE_CITY:
			const { practice_city } = action;
			return { ...state, practice_city };
		case USER_ACTIONS.SET_CHALLENGE_CITY:
			const { challenge_city } = action;
			return { ...state, challenge_city };
		case USER_ACTIONS.CLEAR_USER:
			return {
				given_name: null,
				family_name: null,
				email: null,
				random_ref: null,
				highest_score: 0,
				practice_city: null,
				challenge_city: null,
			};
		default:
			return state;
	}
};

export default user;
