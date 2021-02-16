import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles, { COLORS } from '../_css/styles';
import {
	GAME_TYPES,
	setChallengeId,
	setCity,
	setGameType,
	setPois,
} from '../_reducers/game';
import { setChallengeCity } from '../_reducers/user';
import { CHALLENGES_STATUS } from '../_utils/constants';
const ChallengeItemList = ({ challenge }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [btn_txt, setBtnTxt] = useState('');

	const user = useSelector(state => state.user);

	useEffect(() => {
		if (challenge.status == CHALLENGES_STATUS.COMPLETED) {
			setBtnTxt('');
			return;
		}

		const user_scores_count = challenge.rounds_scores.filter(
			score => score.user_email == user.email
		).length;
		if (user_scores_count == 0) setBtnTxt('New\nGame');
		else
			setBtnTxt(
				user_scores_count
					<= challenge.rounds_scores.filter(
						score => score.user_email != user.email
					).length
					? 'Your\nTurn'
					: 'Their\nTurn'
			);
	}, [challenge]);

	const joinChallenge = () => {
		dispatch(setChallengeId(challenge.id));
		dispatch(setGameType(GAME_TYPES.MULTI_PLAYER));
		dispatch(setCity(challenge.city));
		dispatch(
			setPois(
				challenge.pois.filter(
					poi => poi.round == Math.ceil(challenge.rounds_scores.length / 2)
				)
			)
		);
		navigation.navigate('RoundScreen');
	};

	return (
		<TouchableOpacity
			onPress={joinChallenge}
			style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
		>
			<View style={{ flex: 3 }}>
				{challenge.player_1 == user.email ? (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<Image
							style={[styles.mediumImg, { marginRight: 20 }]}
							source={require('../assets/image_yan/final-imgs/profile.png')}
						/>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.Darker_font_color,
							}}
						>
							{challenge.display_name_2}
							{'\n'}
							<Text
								style={{
									fontFamily: 'Roboto_medium',
									color: COLORS.Main_font_color,
								}}
							>
								{challenge.city}
							</Text>
						</Text>
					</View>
				) : (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center',
						}}
					>
						<Image
							style={[styles.mediumImg, { marginRight: 20 }]}
							source={require('../assets/image_yan/final-imgs/profile.png')}
						/>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.Darker_font_color,
							}}
						>
							{challenge.display_name_1}
						</Text>
					</View>
				)}
			</View>
			<View style={{ flex: 1 }}>
				{/* {challenge.status == CHALLENGES_STATUS.COMPLETED ? null : isReady ? ( */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: 'Roboto_medium',
							color: COLORS.red_buttons,
						}}
					>
						{btn_txt}
					</Text>
					<Image
						style={styles.tinyImg}
						source={require('../assets/image_yan/final-imgs/arrow-red.png')}
					/>
				</View>
				{/* ) : ( */}
				{/* <View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.red_buttons,
							}}
						>
							Their{'\n'}Turn
						</Text>
						<Image
							style={styles.tinyImg}
							source={require('../assets/image_yan/final-imgs/arrow-red.png')}
						/>
					</View> */}
				{/* )} */}
			</View>
		</TouchableOpacity>
	);
};

export default ChallengeItemList;
