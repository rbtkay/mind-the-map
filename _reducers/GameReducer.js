import { GAME_ACTIONS } from '../_actions/game';
import {
	getTimeTakenFromAnimation,
	getDistanceFromLatLonInKm,
	calculatePoints,
} from '../_helpers';

const game = (
	state = {
		pois: [],
		city: '',
		theme: '',
		scores: [],
		currentScore: 0,
		total_score: 0,
		round_distance_in_m: 0,
		round_time: 0,
		is_game_done: false,
	},
	action
) => {
	console.log('in redux');
	console.log(action);
	switch (action.type) {
		case GAME_ACTIONS.SET_POIS:
			const { pois } = action;
			return { ...state, pois };
		case GAME_ACTIONS.SET_CITY:
			const { city } = action;
			return { ...state, city };
		case GAME_ACTIONS.SET_THEME:
			const { theme } = action;
			return { ...state, theme };
		case GAME_ACTIONS.SET_SCORE:
			const { animation_value, coordinates, is_time_done } = action;

			// console.log('setting score');
			// console.log(typeof animation_value);
			// console.log(typeof animation_value._value);
			// console.log(animation_value._value);
			if (is_time_done)
				return {
					...state,
					currentScore: 0,
					is_time_done: true,
				};

			// get the time it took for the user to set a marker
			const round_time = getTimeTakenFromAnimation(animation_value._value, 10000);

			// get the distance between the marker chosen and the correct one
			const round_distance_in_m = getDistanceFromLatLonInKm(
				coordinates.lat1,
				coordinates.long1,
				coordinates.lat2,
				coordinates.long2
			);

			// console.log('round_time', typeof round_time);
			// console.log('round_time', round_time);
			// console.log('round_distance_in_m', typeof round_distance_in_m);
			// console.log('round_distance_in_m', round_distance_in_m);

			// calculate the score of the current round
			const new_score = parseFloat(
				calculatePoints(round_distance_in_m, round_time)
			);

			console.log('new_score');
			console.log(typeof scores);
			// console.log(scores);
			// const t = [...scores, new_score];
			// console.log(t);
			// {pois: [],
			// city: '',
			// theme: '',
			// scores: [],
			// currentScore: 0,
			// total_score: 0,
			// round_distance_in_m: 0,
			// round_time: 0,
			// is_time_done: false,}
			return {
				...state,
				currentScore: new_score,
				round_time,
				round_distance_in_m,
				is_time_done: false,
			};
		case GAME_ACTIONS.CALCULATE_TOTAL_SCORE:
			// sum the scores of different ones into one total_score
			const total_score = score.reduce((a, b) => a + b, 0);
			return { ...state, total_score };

		case GAME_ACTIONS.REPLAY_GAME:
			return {
				...state,
				pois: [],
				currentScore: 0,
				total_score: 0,
				round_distance_in_m: 0,
				round_time: 0,
			};
		case GAME_ACTIONS.SET_LOST:
			console.log('setting lost', action.is_time_done);
			return {
				...state,
				is_time_done: action.is_time_done,
			};
		case GAME_ACTIONS.SET_ROUND_SCORE:
			const { scores } = state;
			console.log("scores", scores); //TODO: I need to see why it doesnt accept to spred scores
			return { ...state, scores: [...scores, action.round_score] };
		default:
			return state;
	}
};

export default game;
