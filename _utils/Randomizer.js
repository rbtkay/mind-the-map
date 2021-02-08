import {
    getPoisCountByCityAndTheme,
    getMonuments,
    getSomePois,
} from "../_api/pois";
const NUMBER_OF_QUESTION_PER_ROUND = 5;

exports.getRandomQuestions = (city, theme) => {
    return new Promise((resolve, reject) => {
        console.log("CALLING", city);
        console.log("CALLING", theme);
        getPoisCountByCityAndTheme(city, theme).then((result) => {
            const chosen_ids = [];
            let current_number = -1;
            console.log("in the promise");
            if (result < NUMBER_OF_QUESTION_PER_ROUND)
                reject("not enough pois for this theme");
            for (let i = 0; i < NUMBER_OF_QUESTION_PER_ROUND; i++) {
                do {
                    // this dowhile is to prevent duplicates
                    current_number = `${city}_${theme}_${Math.floor(
                        Math.random() * result
                    )}`;
                } while (chosen_ids.includes(current_number));
                chosen_ids.push(current_number);
            }
            console.log("before call", chosen_ids);
            getSomePois(chosen_ids).then((result) => {
                resolve(result);
            });
        });
    });
};

exports.getRandomNumberForUsers = (start_limit, end_limit) => {
    // current_number = `${city}_${Math.floor(Math.random() * 42)}`;
};
