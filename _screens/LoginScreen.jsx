import React, { useEffect, useState } from 'react';
import {
	View,
	Dimensions,
	StyleSheet,
	Image,
	Linking,
	ImageBackground,
} from 'react-native';
import { Container, Header, Button, Body, Title, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage, LogBox } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { signInWithGoogleAsync } from '../_api/user';
import { googleLogout } from '../_api/user';
import { setUser } from '../_reducers/user';
import customStyles, { COLORS } from '../_css/styles';

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
				userInfo: {
					email,
					practice_city,
					challenge_city,
					given_name,
					heighest_score,
					picture,
				},
			} = result;
			console.log('login successfull');
			AsyncStorage.multiSet(
				[
					['user_email', email],
					['username', given_name],
					['heighest_score', heighest_score.toString()],
				],
				error => {
					console.log(error);
				}
			);

			dispatch(
				setUser({
					email,
					given_name,
					practice_city,
					challenge_city,
					username: given_name,
					heighest_score,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container style={{ backgroundColor: COLORS.background }}>
			<ImageBackground
				source={require('../assets/image_yan/final-imgs/map-bg2.png')}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				<View style={{ flex: 8 }}>
					<View style={styles.image}>
						<Image
							source={require('../assets/image_yan/final-imgs/logo2.png')}
							resizeMode="contain"
							style={{
								width: '100%',
								height: '100%', //Dimensions.get("window").height / 3,
							}}
						/>
					</View>
					<View
						style={{
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Text
							style={{
								fontStyle: 'italic',
								fontSize: 25,
								margin: 75,
								marginTop: 20,
								color: COLORS.white_containers,
							}}
						>
							Can you locate places on an unlabeled map ?
						</Text>
					</View>
					<View style={styles.loginBtn}>
						<Button
							style={{
								backgroundColor: COLORS.green_buttons,
								borderRadius: 20,
								height: 80,
								width: '80%',
								justifyContent: 'center',
							}}
							onPress={() => onLoginPress()}
						>
							<Text style={{ fontSize: 20, color: 'white' }}>
								Continue using Google
							</Text>
						</Button>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}
					>
						<Text style={{ color: COLORS.white_containers }}>
							&copy; mindthemap 2021
						</Text>
					</View>
				</View>
			</ImageBackground>
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
