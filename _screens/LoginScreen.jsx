import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, Linking } from 'react-native';
import { Container, Header, Button, Body, Title, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage, LogBox } from 'react-native';
import { APP_COLOR } from '../assets/constant_styles';
import { connect, useDispatch } from 'react-redux';
import { signInWithGoogleAsync } from '../_api/user';
import { googleLogout } from '../_api/user';
import { setUser } from '../_actions/user';

const LoginScreen = () => {
	LogBox.ignoreLogs(['Failed prop type', 'Setting a timer']);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	googleLogout();
	// });

	const onLoginPress = async () => {
		try {
			const result = await signInWithGoogleAsync();
			const {
				userInfo: { email, city, given_name, heighest_score, picture },
			} = result;
			// console.log("login successfull");
			AsyncStorage.multiSet(
				[
					['user_email', email],
					['default_city', city],
					['username', given_name],
					['heighest_score', heighest_score.toString()],
					['picture_url', picture],
				],
				error => {
					console.log(error);
				}
			);

			dispatch(
				setUser({
					email,
					given_name,
					default_city: city,
					username: given_name,
					heighest_score,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container style={{ backgroundColor: APP_COLOR }}>
			<Header
				androidStatusBarColor={APP_COLOR}
				style={{ backgroundColor: APP_COLOR }}
				iosBarStyle={APP_COLOR}
			>
				<Body style={styles.bodyContent}>
					<Title style={{ fontSize: 60 }}>Mind the map</Title>
				</Body>
			</Header>
			<View style={{ flex: 6 }}>
				<View style={styles.image}>
					<Image
						source={require('../assets/map_example.png')}
						resizeMode="contain"
						style={{
							width: '100%',
							height: '100%', //Dimensions.get("window").height / 3,
						}}
					/>
				</View>
				<View style={styles.loginBtn}>
					<Button
						style={{
							height: '40%',
							width: '80%',
							justifyContent: 'center',
						}}
						transparent
						onPress={() => onLoginPress()}
					>
						<Text style={{ fontSize: 40, color: 'white' }}>
							Login using Google
						</Text>
					</Button>
				</View>

				<View></View>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	loginBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	title: { textAlign: 'center', marginTop: 50, flex: 1 },
	image: {
		flex: 4,
		marginTop: 50,
	},
	form: {
		flex: 1,
	},
	bodyContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
});

export default LoginScreen;
