import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, ImageBackground } from 'react-native';
import {
	Container,
	Header,
	Button,
	Body,
	Title,
	Text,
	Content,
	List,
	ListItem,
	Thumbnail,
	Right,
	Left,
	Icon,
} from 'native-base';
import { AsyncStorage, LogBox, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { APP_COLOR } from '../assets/constant_styles';
import { useNavigation } from '@react-navigation/native';
import useFetch from '../_utils/functions/hooks/useFetch';
import { googleLogout } from '../_api/user';
import CustomList from '../_components/CustomList';

//styles
import customStyle from '../_css/styles';
import Banner from '../_components/Banner';
import { thumbnails } from '../_utils/constants';
import { setPois } from '../_actions/game';

const MainScreen = () => {
	const [result, load] = useFetch();
	// const [storage, getItem] = useStorage();
	LogBox.ignoreLogs(['Failed prop type', 'Setting a timer']);
	const navigation = useNavigation();

	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('result');
		if (!result) return;
		dispatch(setPois(result.result.pois));
		// dispatch(prepareTimer());
		navigation.navigate("GameScreen");
		//TODO: listen to the result and redirect to GameScreen
	}, [result]);

	const logout = () => {
		googleLogout();
		AsyncStorage.clear(() => {
			setUser({ email: null, username: null, random_ref: null });
			console.log('destroying user');
		});
	};

	const challengeSomeone = async () => {
		console.log('clicked');
		const postData = { email: 'robert.g.khayat@gmail.com', city: 'Paris' };
		// load({ url: 'randomChallenges', body: postData });

		console.log('storage', storage);
	};

	const startGame = () => {
		console.log('starting game');
		console.log(user);
		load({ url: 'pois', body: { city: user.default_city } });
	};

	const inviteFriend = () => {
		console.lgg('inviting friend . . .');
	};

	return (
		<Container>
			<Content style={{ backgroundColor: 'orchid' }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						padding: 24,
					}}
				>
					<TouchableOpacity
						style={{
							flex: 1,
							flexDirection: 'row',
						}}
						onPress={() => navigation.navigate('CityScreen')}
					>
						<Thumbnail
							source={thumbnails[user.default_city]}
							style={{ tintColor: 'white' }}
							square
						/>
						<Text
							style={{
								flex: 1,
								justifyContent: 'center',
								marginLeft: 20,
								paddingVertical: 20,
								color: 'white',
							}}
						>
							{user.default_city}
						</Text>
					</TouchableOpacity>

					<Button style={customStyle.headerBtn} onPress={() => navigation.navigate("ScoreScreen")}>
						<Thumbnail source={require('../assets/setting.png')} small />
					</Button>
				</View>
				<Banner />

				<View style={customStyle.container}>
					<Button style={customStyle.mainBtn} onPress={challengeSomeone}>
						<Text style={{ fontSize: 50, color: APP_COLOR }}>
							Challenge Opponent
						</Text>
					</Button>
				</View>
				<View style={customStyle.container}>
					<Button style={customStyle.mainBtn} onPress={startGame}>
						<Text style={{ fontSize: 50, color: APP_COLOR }}>
							Single Player
						</Text>
					</Button>
				</View>
				{/* <View style={customStyle.container}>
					<Button style={customStyle.mainBtn} onPress={inviteFriend}>
						<Text style={{ fontSize: 50, color: APP_COLOR }}>
							Invite a Friend
						</Text>
					</Button>
				</View> */}
				<CustomList title={'Ongoing Games'} />
				<CustomList title={'Completed Games'} />
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	menu: {
		flex: 3,
		justifyContent: 'space-evenly',
	},
	menuBtn: {
		width: 300,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
		backgroundColor: APP_COLOR,
	},
	title: { textAlign: 'center', flex: 2 },
	menuTxt: {
		fontSize: 40,
	},
	image_background: {
		flex: 1,
		resizeMode: 'contain',
		justifyContent: 'center',
	},
	bodyContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	profile_pic: {
		width: 50,
		height: 50,
	},
	challenge_opponent_btn: {
		height: 80,
		alignContent: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 20,
	},
	game_btn: {
		margin: 20,
		width: 100,
		height: 80,
		justifyContent: 'center',
		borderRadius: 10,
		backgroundColor: '#4F5D2F',
	},
	align_center: { flex: 1, flexDirection: 'row', justifyContent: 'center' },

	container_game_btn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
});

export default MainScreen;
