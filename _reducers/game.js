import {
	getTimeTakenFromAnimation,
	getDistanceFromLatLonInKm,
	calculatePoints,
} from '../_helpers';

export const GAME_TYPES = {
	SINGLE_PLAYER: 'SINGLE_PLAYER',
	MULTI_PLAYER: 'MULTI_PLAYER',
};

export const GAME_ACTIONS = {
	SET_POIS: 'SET_POIS',
	SET_THEME: 'SET_THEME',
	SET_SCORE: 'SET_SCORE',
	CALCULATE_TOTAL_SCORE: 'CALCULATE_TOTAL_SCORE',
	REPLAY_GAME: 'REPLAY_GAME',
	SET_LOST: 'SET_LOST',
	SET_ROUND_SCORE: 'SET_ROUND_SCORE',
	SET_GAME_TYPE: 'SET_GAME_TYPE',
	SET_TOTAL_SCORE: 'SET_TOTAL_SCORE',
	SET_CHALLENGE_ID: 'SET_CHALLENGE_ID',
	SET_CITY: 'SET_CITY',
};

export const setPois = pois => ({
	type: GAME_ACTIONS.SET_POIS,
	pois,
});

export const setChallengeId = challenge_id =>({
	type: GAME_ACTIONS.SET_CHALLENGE_ID,
	challenge_id
})

export const setTotalScore = total_score => ({
	type: GAME_ACTIONS.SET_TOTAL_SCORE,
	total_score,
});

export const setGameType = game_type => ({
	type: GAME_ACTIONS.SET_GAME_TYPE,
	game_type,
});

export const setCity = city => ({
	type: GAME_ACTIONS.SET_CITY,
	city,
});

const game = (
	state = {
		pois: [],
		city: '',
		theme: '',
		round_scores: [],
		currentScore: 0,
		total_score: 0,
		round_distance_in_m: 0,
		round_number: 0,
		is_game_done: false,
		game_type: GAME_TYPES.SINGLE_PLAYER,
		challenge_id: '',
	},
	action
) => {
	switch (action.type) {
		case GAME_ACTIONS.SET_POIS:
			const { pois } = action;
			return { ...state, pois };
		case GAME_ACTIONS.SET_CITY: //used
			const city = action.city;
			return { ...state, city };
		case GAME_ACTIONS.SET_LOST:
			return {
				...state,
				is_time_done: action.is_time_done,
			};
		case GAME_ACTIONS.SET_ROUND_SCORE:
			const { round_scores } = state;
			return { ...state, round_scores: [...round_scores, action.round_score] };
		case GAME_ACTIONS.SET_TOTAL_SCORE:
			const { total_score } = action;
			return { ...state, total_score };
		case GAME_ACTIONS.SET_GAME_TYPE:
			const { game_type } = action;
			return { ...state, game_type };
		case GAME_ACTIONS.SET_CHALLENGE_ID:
			const { challenge_id } = action;
			console.log(action)
			return { ...state, challenge_id };
		default:
			return state;
	}
};

export default game;
