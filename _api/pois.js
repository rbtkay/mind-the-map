import { firebase } from "./config/firebaseConfig";

const poisRef = firebase.firestore().collection("pois");

// filter is an array of ids that will filter the result
exports.getMonuments = (filter_ids = null, city = null) => {
    return new Promise((resolve, reject) => {
        let filter;
        if (filter_ids && city) {
            filter = "both";
        } else if (filter_ids) {
            filter = "ids";
        } else if (city) {
            filter = "city";
        } else {
            filter = "all";
        }

        const monuments = [];
        switch (filter) {
            case "all":
                poisRef.onSnapshot(
                    (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            monuments.push(doc.data());
                        });
                        resolve(monuments);
                    },
                    (error) => {
                        reject(error);
                    }
                );
                break;
            case "city":
                poisRef
                    .where("city", "==", city)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            monuments.push(doc.data());
                        });
                        resolve(monuments);
                    });
                break;
            case "ids":
                poisRef
                    .where("id", "in", filter_ids)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            monuments.push(doc.data());
                        });
                        resolve(monuments);
                    });
                break;
            default:
                poisRef
                    .where("city", "==", city)
                    .where("id", "in", filter_ids)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            monuments.push(doc.data());
                        });
                        resolve(monuments);
                    });
                break;
        }
    });
};

exports.getPoisCountByCityAndTheme = (city, theme) => {
    console.log("gettign count", theme);
    console.log("getting count", city)
    return new Promise((resolve, reject) => {
        poisRef
            .where("city", "==", city)
            .where("theme", "==", theme)
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot.size)
                resolve(querySnapshot.size);
            });
    });
};

exports.getSomePois = (ids) => {
    console.log("CALLING")
    return new Promise((resolve, reject) => {
        const pois = [];
        poisRef
            .where("unique_id", "in", ids)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    pois.push(doc.data());
                });
                resolve(pois);
            });
    });
};
