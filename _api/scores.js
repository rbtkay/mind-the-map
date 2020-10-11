import { firebase } from "./config/firebaseConfig";

const scoresRef = firebase.firestore().collection("scores");

exports.getScores = () => {
    return new Promise((resolve, reject) => {
        const scores = [];
        scoresRef.onSnapshot(
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    scores.push(doc.data());
                });
                resolve(scores);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

exports.getScoresOrderByScore = () => {
    return new Promise((resolve, reject) => {
        const scores = [];
        scoresRef
            .orderBy("score")
            .get()
            .then((querySnapshot) => {})
            .catch(() => {});
    });
};
exports.getScoresByUserOrderByScore = (username) => {
    return new Promise((resolve, reject) => {
        scoresRef
            .where("username", "==", username)
            .orderBy("score")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    monuments.push(doc.data());
                });
                resolve(monuments);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.addScoreWithUser = (username, score) => {
    return new Promise((resolve, reject) => {
        scoresRef.add({
            username,
            score,
            date: new Date().toGMTString()
        })
    });
};
