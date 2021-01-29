import { USER_ACTIONS } from '../_actions/user';
const user = (
	state = {
		username: null,
		email: null,
		random_ref: null,
		highest_score: 0,
		city: null,
	},
	action
) => {
	switch (action.type) {
		case USER_ACTIONS.SET_USER:
			const { user } = action;
			console.log('setting the user', user);
			return { ...state, ...user };
		case USER_ACTIONS.SET_DEFAULT_CITY:
			const { default_city } = action;
			console.log('setting the default city', default_city);
			return { ...state, default_city };

		default:
			return state;
	}
};

export default user;
