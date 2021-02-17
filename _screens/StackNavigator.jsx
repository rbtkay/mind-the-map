import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './GameScreen';
import ScoreScreen from './ScoreScreen';
import CityScreen from './CityScreen';
import LoginScreen from './LoginScreen';
import ThemeScreen from './ThemeScreen';
import MainScreen from './MainScreen';
import RoundScreen from './RoundScreen';
import CreateGameScreen from './CreateGameScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByEmail } from '../_api/user';
import { setUser } from '../_reducers/user';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

const Router = () => {
	// in case we need persistent login with firebaseauth we use this
	// checkIfLogin = () => {
	//     firebase.auth().onAuthStateChanged((user) => {
	//         if (user) {
	//             console.log("user sign in");
	//         } else {
	//             console.log("user not recognized");
	//         }
	//     });
	// };
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const [isLogin, setIsLogin] = useState(user.email != null);

	useEffect(() => {
		setIsLogin(user.email != null);
	}, [user]);

	useEffect(() => {
		(async () => {
			// the persistent signin is done by leaving the user info in the asyncstorage
			const local_user = await AsyncStorage.multiGet([
				'user_email',
				'username',
				'heighest_score',
				'picture_url',
			]);

			const user_info = await getUserByEmail(local_user[0][1]);

			dispatch(setUser(user_info));
		})();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<>
					{isLogin ? (
						<>
							<Stack.Screen
								name="MainScreen"
								options={{
									headerShown: false,
								}}
							>
								{props => <MainScreen {...props} />}
							</Stack.Screen>
							<Stack.Screen
								name="CreateGameScreen"
								options={{
									headerShown: false,
								}}
							>
								{props => <CreateGameScreen {...props} />}
							</Stack.Screen>
							<Stack.Screen
								name="GameScreen"
								options={{
									headerShown: false,
								}}
							>
								{props => <GameScreen {...props} />}
							</Stack.Screen>
							<Stack.Screen
								name="RoundScreen"
								options={{
									headerShown: false,
								}}
							>
								{props => <RoundScreen {...props} />}
							</Stack.Screen>
							<Stack.Screen
								name="ScoreScreen"
								options={{
									headerShown: false,
								}}
								e
							>
								{props => <ScoreScreen {...props} />}
							</Stack.Screen>
							<Stack.Screen
								name="ProfileScreen"
								options={{
									headerShown: false,
								}}
								e
							>
								{props => <ProfileScreen {...props} />}
							</Stack.Screen>
						</>
					) : (
						<Stack.Screen
							name="LoginScreen"
							options={{
								headerShown: false,
							}}
						>
							{props => <LoginScreen {...props} />}
						</Stack.Screen>
					)}
				</>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Router;
