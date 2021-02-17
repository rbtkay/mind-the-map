import React, { useEffect, useRef, useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { Container, Button, Text, Content } from 'native-base';
import { LogBox, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useFetch from '../_utils/functions/hooks/useFetch';
import CustomList from '../_components/CustomList';
import { useIsFocused } from '@react-navigation/native';

//styles
import customStyle, { COLORS } from '../_css/styles';
import { CHALLENGES_STATUS } from '../_utils/constants';
import { setCity, setGameType, setPois } from '../_reducers/game';
import { GAME_TYPES } from '../_reducers/game';

import { getUserChallenges } from '../_api/challenges';
import ChooseCityModal from '../_components/Modals/ChooseCityModal';

const MainScreen = () => {
	LogBox.ignoreLogs(['Failed prop type', 'Setting a timer']);
	const waiting_challenge_interval = useRef();

	const [on_going_challenges, setOnGoingChallenges] = useState([]);
	const [completed_challenges, setCompletedChallenges] = useState([]);
	const [waiting_challenges, setWaitingChallenges] = useState([]);

	const [practice_btn, setPracticeBtn] = useState('Practice Round');
	const [challenge_btn, setChallengeBtn] = useState('Challenge random opponent');
	
	// modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [chosen_edit, setChosenEdit] = useState();

	const navigation = useNavigation();
	const [result, load, isLoading] = useFetch();

	const isFocused = useIsFocused();

	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isFocused) {
			clearTimeout(waiting_challenge_interval.current);
			return;
		}

		getChallenges();

		if (waiting_challenges.length > 0) {
			setChallengeBtn('Waiting for opponent...');
			waiting_challenge_interval.current = setInterval(() => {
				console.log('calling');
				getChallenges();
			}, 5000);
		}
	}, [isFocused]);

	useEffect(() => {
		if (waiting_challenges.length <= 0) {
			console.log('clearing interval');
			setChallengeBtn('Challenge random opponent');
			clearInterval(waiting_challenge_interval.current);
		} else if (!waiting_challenge_interval.current) {
			setChallengeBtn('Waiting for opponent...');
			waiting_challenge_interval.current = setInterval(() => {
				console.log('calling');
				getChallenges();
			}, 5000);
		}
	}, [waiting_challenges]);

	useEffect(() => {
		if (!result) return;

		console.log('result', result);

		if (result.pois) {
			// when the pois are returned
			dispatch(setPois(result.pois));
			setPracticeBtn('Practice round');
			navigation.navigate('GameScreen');
		} else if (result.new_challenge_id) {
			// when the new challenge is created
			console.log('the new challenge id - ', result.new_challenge_id);
			getChallenges();
		}
	}, [result]);

	const getChallenges = () => {
		getUserChallenges(user.email).then(result => {
			setOnGoingChallenges(
				result.filter(challenge => challenge.status == CHALLENGES_STATUS.ONGOING)
			);
			setCompletedChallenges(
				result.filter(
					challenge => challenge.status == CHALLENGES_STATUS.COMPLETED
				)
			);
			setWaitingChallenges(
				result.filter(challenge => challenge.status == CHALLENGES_STATUS.WAITING)
			);
		});
	};

	const challengeSomeone = async () => {
		if (isLoading) return;
		if (waiting_challenges.length > 0) return;

		setChallengeBtn('Waiting for opponent...');

		waiting_challenge_interval.current = setInterval(() => getChallenges(), 5000);

		load({
			url: 'randomChallenges',
			body: {
				email: user.email,
				display_name: user.given_name,
				city: user.challenge_city,
			},
		});
	};

	const startGame = () => {
		if (isLoading) return;
		setPracticeBtn('Preparing pois...');
		dispatch(setGameType(GAME_TYPES.SINGLE_PLAYER));
		dispatch(setCity(user.practice_city));
		load({ url: 'pois', body: { city: user.practice_city } });
	};

	const inviteFriend = () => {
		//TODO: implement the invite system
		console.lgg('inviting friend . . .');
	};

	return (
		<Container style={{ backgroundColor: COLORS.background }}>
			<ImageBackground
				source={require('../assets/image_yan/final-imgs/map-bg2.png')}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				<Content>
					<ChooseCityModal
						isVisible={isModalVisible}
						chosen_edit={chosen_edit}
						closeModal={() => setIsModalVisible(false)}
					/>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							padding: 24,
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate('ProfileScreen')}
						>
							<Image
								style={{ width: 80, height: 80 }}
								source={require('../assets/image_yan/final-imgs/profile.png')}
							/>
						</TouchableOpacity>
						<Image
							style={{ width: 150, height: 80, resizeMode: 'contain' }}
							source={require('../assets/image_yan/final-imgs/logo2.png')}
						/>
						<TouchableOpacity>
							<Image
								style={{ width: 80, height: 80 }}
								source={require('../assets/image_yan/final-imgs/settings.png')}
							/>
						</TouchableOpacity>
					</View>

					<Button
						style={[
							customStyle.mainBtn,
							{
								backgroundColor: COLORS.green_buttons,
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingRight: 10,
							},
						]}
						onPress={challengeSomeone}
					>
						<Text style={{ fontSize: 20, color: 'white' }}>
							{challenge_btn}
						</Text>
						<Image
							style={customStyle.tinyImg}
							source={require('../assets/image_yan/final-imgs/arrow-white.png')}
						/>
					</Button>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.white_containers,
							flexDirection: 'row',
						}}
						onPress={() => {
							setChosenEdit('Challenge');
							setIsModalVisible(true);
						}}
					>
						<Image
							style={[customStyle.tinyImg, { margin: 5 }]}
							source={require('../assets/image_yan/final-imgs/edit-red.png')}
						/>
						<Text style={{ color: COLORS.background, margin: 5 }}>
							{user.challenge_city}
						</Text>
					</TouchableOpacity>
					<Button
						style={[
							customStyle.mainBtn,
							{
								backgroundColor: COLORS.red_buttons,
								marginTop: 20,
								flexDirection: 'row',
								justifyContent: 'space-between',
								paddingRight: 10,
							},
						]}
						onPress={startGame}
					>
						<Text style={{ fontSize: 20, color: 'white' }}>
							{practice_btn}
						</Text>
						<Image
							style={customStyle.tinyImg}
							source={require('../assets/image_yan/final-imgs/arrow-white.png')}
						/>
					</Button>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.white_containers,
							flexDirection: 'row',
						}}
						onPress={() => {
							setChosenEdit('Practice');
							setIsModalVisible(true);
						}}
					>
						<Image
							style={[customStyle.tinyImg, { margin: 5 }]}
							source={require('../assets/image_yan/final-imgs/edit-green.png')}
						/>
						<Text style={{ color: COLORS.background, margin: 5 }}>
							{user.practice_city}
						</Text>
					</TouchableOpacity>

					<CustomList
						title={'Ongoing Games'}
						no_item_message={'No ongoing games'}
						items={on_going_challenges}
					/>
					<CustomList
						title={'Completed Games'}
						no_item_message={'No completed games'}
						items={completed_challenges}
					/>
				</Content>
			</ImageBackground>
		</Container>
	);
};
export default MainScreen;
