export const GAME_ACTIONS = {SET_MONUMENTS: "SET_MONUMENTS", SET_CITY: "SET_CITY"};

export const setMonuments = (monuments) => ({
	type: GAME_ACTIONS.SET_MONUMENTS,
	monuments,
});

export const setCity = (city) => ({
	type: GAME_ACTIONS.SET_CITY,
	city,
});