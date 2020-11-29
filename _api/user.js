import { GOOGLE_CLIENT_ID } from "./config/env";
import * as Google from "expo-google-app-auth";
import { firebase } from "../_api/config/firebaseConfig";
import { database } from "firebase";

const userRef = firebase.firestore().collection("users");

exports.signInWithGoogleAsync = async () => {
    try {
        const result = await Google.logInAsync({
            androidClientId: GOOGLE_CLIENT_ID,
            scopes: ["profile", "email"],
        });

        if (result.type === "success") {
            const userInfo = await onSignIn(result);
            return {token: result.accessToken, userInfo};
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        return { error: e };
    }
};

const onSignIn = (googleUser) => {
    return new Promise((resolve, reject) => {
        let userInfo;
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase
            .auth()
            .onAuthStateChanged(async function (firebaseUser) {
                unsubscribe();
                // Check if we are already signed-in Firebase with the correct user.
                if (!isUserEqual(googleUser, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    var credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.idToken,
                        googleUser.accessToken
                    );
                    // Sign in with credential from the Google user.
                    firebase
                        .auth()
                        .signInWithCredential(credential)
                        .then(async function (result) {
                            if (result.additionalUserInfo.isNewUser) {
                                // add user to the database
                                const { profile } = result.additionalUserInfo;
                                const { email: profile_email } = profile;
                                await userRef.doc(profile_email).set(profile);

                                userInfo = {email: profile_email, username: profile.given_name}
                                resolve(userInfo);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            reject("an Error occurred, check the server logs for more info");
                        });
                } else {
                    const { email } = firebaseUser;
                    const user = await userRef.doc(email).get();
                    userInfo = { email, username: user.data().given_name }
                    resolve(userInfo);
                }
            });
    });
};

const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (
                providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.user.id
            ) {
                // We don't need to reauth the Firebase connection.
                return true;
            }
        }
    }
    return false;
};
