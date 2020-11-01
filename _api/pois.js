import { firebase } from "./config/firebaseConfig";

const monumentsRef = firebase.firestore().collection("monuments");

// filter is an array of ids that will filter the result
exports.getMonuments = (filter_ids = null, city = null) => {
    return new Promise((resolve, reject) => {
        let filter;
        if (filter_ids && city) {
            filter = "both";
        } else if(filter_ids) {
            filter = "ids"
        }else if (city) {
            filter = "city"
        }else{
            filter = "all"
        }
        
        const monuments = [];
        switch (filter) {
            case "all":
                monumentsRef.onSnapshot(
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
                monumentsRef
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
                    monumentsRef
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
                monumentsRef
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
