export const GAME_ACTIONS = {SET_MONUMENTS: "SET_MONUMENTS", SET_CITY: "SET_CITY", SET_SCORE: "SET_SCORE"};

export const setMonuments = (monuments) => ({
	type: GAME_ACTIONS.SET_MONUMENTS,
	monuments,
});

export const setCity = (city) => ({
	type: GAME_ACTIONS.SET_CITY,
	city,
});

export const setScore = (animation_value, coordinates) => ({
	type: GAME_ACTIONS.SET_SCORE,
	animation_value,
	coordinates
});