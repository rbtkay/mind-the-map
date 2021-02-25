import { useIsFocused, useNavigation } from '@react-navigation/native';
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

import { getUserByEmail } from '../_api/user';

import { DEFAULT_USER_IMAGE } from "../_utils/constants";

const ChallengeItemList = ({ challenge }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [opponent, setOpponent] = useState(null);

	const isFocused = useIsFocused();

	const [btn_txt, setBtnTxt] = useState('');

	const [opponent_email, setOpponentEmail] = useState(
		challenge.player_1 == user.email ? challenge.player_2 : challenge.player_1
	);

	useEffect(() => {
		console.log(opponent);
	}, [opponent]);

	useEffect(() => {
		getUserByEmail(opponent_email).then(opp => {
			console.log('opponent', opp);
			setOpponent(opp);
		});

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
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<Image
						style={[styles.mediumImg, { marginRight: 20 }]}
						borderRadius={20}
						source={
							opponent ? opponent.is_image_public
								? { uri: opponent.picture }
								: DEFAULT_USER_IMAGE : DEFAULT_USER_IMAGE 
						}
					/>
					<Text
						style={{
							fontFamily: 'Roboto_medium',
							color: COLORS.Darker_font_color,
						}}
					>
						{opponent ? opponent.given_name : 'Getting challenges...'}
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
			</View>
			<View style={{ flex: 1 }}>
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
			</View>
		</TouchableOpacity>
	);
};

export default ChallengeItemList;
