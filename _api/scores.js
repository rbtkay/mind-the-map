import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
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

// exports.getScoresOrderByScore = async () => {
//     return new Promise((resolve, reject) => {
//         scoresRef
//             .orderBy("score", "desc")
//             .limit(10)
//             .get()
//             .then(async (querySnapshot) => {
//                 let query_result = [];
//                 querySnapshot.forEach(async (doc) => {
//                     const { email } = doc.data();
//                     query_result.push({...doc.data()})
//                 });

//                 const scores = []
//                 for (const s of query_result) {
//                     const {user} = await getUserByEmail(s.email);
//                     scores.push({...s, username: user.given_name})
//                 }
//                 resolve(scores);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// };
// exports.getScoresByUserOrderByScore = (username) => {
//     return new Promise((resolve, reject) => {
//         scoresRef
//             .where("username", "==", username)
//             .orderBy("score")
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     monuments.push(doc.data());
//                 });
//                 resolve(monuments);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// };

exports.addScoreWithUser = (email, score) => {
    return new Promise((resolve, reject) => {
        scoresRef.add({
            email,
            score,
            date: new Date().toGMTString(),
        });
    });
};
