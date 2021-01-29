import { GOOGLE_CLIENT_ID } from './config/env';
import * as Google from 'expo-google-app-auth';
import { firebase } from '../_api/config/firebaseConfig';

const DEFAULT_CITY = 'Paris';

const userRef = firebase.firestore().collection('users');

// TODO: enable signout.

exports.signInWithGoogleAsync = async () => {
	try {
		const result = await Google.logInAsync({
			androidClientId: GOOGLE_CLIENT_ID,
			scopes: ['profile', 'email'],
		});
		console.log('after google login async');
		console.log(result);

		if (result.type === 'success') {
			const userInfo = await onSignIn(result);
			return { token: result.accessToken, userInfo };
		} else {
			return { cancelled: true };
		}
	} catch (e) {
		return { error: e };
	}
};

exports.getUserByEmail = email => {
	return new Promise((resolve, reject) => {
		const user = [];
		userRef
			.where('email', '==', email)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					user.push(doc.data());
				});
				resolve({ user: user[0] });
			})
			.catch(error => {
				console.log(error);
				reject(error);
			});
	});
};

exports.googleLogout = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			console.log('signed out');
		});
};

const onSignIn = googleUser => {
	return new Promise((resolve, reject) => {
		let userInfo;
		// We need to register an Observer on Firebase Auth to make sure auth is initialized.
		var unsubscribe = firebase
			.auth()
			.onAuthStateChanged(async function (firebaseUser) {
				unsubscribe();
				// Check if we are already signed-in Firebase with the correct user.
				if (!isUserEqual(googleUser, firebaseUser)) {
					console.log('user is not signed in');
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
								console.log('new user');
								// add user to the database
								const {
									profile: {
										family_name,
										given_name,
										name,
										picture,
										email,
									},
								} = result.additionalUserInfo;
								const new_user = {
									family_name,
									given_name,
									name,
									picture,
									email,
									city: DEFAULT_CITY,
									heighest_score: 0,
								};
								await userRef.doc(email).set(new_user);

								resolve(new_user);
							} else {
								console.log('not a new user');
								const {
									user: { email },
								} = googleUser;
								const user = await userRef.doc(email).get();
								resolve(user.data());
							}
						})
						.catch(function (error) {
							console.log(error);
							reject('an Error occurred');
						});
				} else {
					console.log('user already signed in');
					const { email } = firebaseUser;
					const user = await userRef.doc(email).get();

					resolve(user.data());
				}
			});
	});
};

const isUserEqual = (googleUser, firebaseUser) => {
	console.log('googleUser', googleUser);
	console.log('firebaseUser', firebaseUser);
	if (firebaseUser) {
		var providerData = firebaseUser.providerData;
		for (var i = 0; i < providerData.length; i++) {
			if (
				providerData[i].providerId
					=== firebase.auth.GoogleAuthProvider.PROVIDER_ID
				&& providerData[i].uid === googleUser.user.id
			) {
				// We don't need to reauth the Firebase connection.
				return true;
			}
		}
	}
	return false;
};
