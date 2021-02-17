import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Content, Text, View } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { setChallengeRoundScore, getChallengeById } from '../_api/challenges';
import { setChallengeId, setPois } from '../_reducers/game';
import styles, { COLORS } from '../_css/styles';
import { clearUser, setChallengeCity } from '../_reducers/user';
import RoundRow from '../_components/RoundRow';
import { ImageBackground } from 'react-native';
import useFetch from '../_utils/functions/hooks/useFetch';

const RoundScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const [result, load] = useFetch();

	const game = useSelector(state => state.game);
	const user = useSelector(state => state.user);

	const [challenge, setChallenge] = useState(null);
	const [user_scores, setUserScores] = useState([]);

	const [user_total_score, setUserTotalScores] = useState(0);
	const [opponent_total_scores, setOpponentTotalScores] = useState(0);

	const [opponent_scores, setOpponentScores] = useState([]);

	const challenge_interval = useRef();

	const { challenge_id, total_score } = game;

	useEffect(() => {
		if (!isFocused) {
			clearInterval(challenge_interval.current);
			return;
		}

		getChallengeById(challenge_id).then(challenge => {
			console.log('challenge is Focused');
			const user_scores = challenge.rounds_scores
				.filter(score => score.user_email == user.email)
				.map(score => score.score);

			const opponent_scores = challenge.rounds_scores
				.filter(score => score.user_email != user.email)
				.map(score => score.score);

			setUserScores(user_scores);
			setOpponentScores(opponent_scores);

			setUserTotalScores(
				user_scores.reduce((agg, score) => agg + parseFloat(score), 0)
			);
			setOpponentTotalScores(
				opponent_scores.reduce((agg, score) => agg + parseFloat(score), 0)
			);

			// clearInterval(challenge_interval.current);
			setChallenge(challenge);
			if (user_scores.length < 3) {
				dispatch(
					setPois(challenge.pois.filter(poi => poi.round == user_scores.length))
				);
			}
		});
	}, [isFocused]);

	// useEffect(() => {
	// 	console.log('challenge for the useEffect');

	// 	if (!challenge) return;

	// 	const user_scores = challenge.rounds_scores
	// 		.filter(score => score.user_email == user.email)
	// 		.map(score => score.score);

	// 	const opponent_scores = challenge.rounds_scores
	// 		.filter(score => score.user_email != user.email)
	// 		.map(score => score.score);

	// 	setUserScores(user_scores);
	// 	setOpponentScores(opponent_scores);

	// 	setUserTotalScores(
	// 		user_scores.reduce((agg, score) => agg + parseFloat(score), 0)
	// 	);
	// 	setOpponentTotalScores(
	// 		opponent_scores.reduce((agg, score) => agg + parseFloat(score), 0)
	// 	);

	// 	// clearInterval(challenge_interval.current);
	// 	if (user_scores.length < 3) {
	// 		dispatch(
	// 			setPois(challenge.pois.filter(poi => poi.round == user_scores.length))
	// 		);
	// 	}
	// }, [challenge]);

	const nextRound = () => {
		if (user_scores.length == 3 && opponent_scores.length == 3) {
			//TODO: rematch
			// load({
			// 	url: 'challengePlayer',
			// 	body: {
			// 		user_email: challenge.player_1,
			// 		opponent_email: challenge.player_2,
			// 		display_name: user.given_name,
			// 		city: user.challenge_city,
			// 	},
			// });
			navigation.navigate('MainScreen');
		} else if (user_scores.length < 3) navigation.navigate('GameScreen');
	};

	if (!challenge) return null;
	return (
		<Container
			style={{
				backgroundColor: COLORS.background,
			}}
		>
			<ImageBackground
				source={require('../assets/image_yan/final-imgs/map-bg2.png')}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				<View
					style={{
						height: 100,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: 'Roboto_medium',
							color: COLORS.white_containers,
							fontSize: 30,
						}}
					>
						{user_scores.length == 3 && opponent_scores.length == 3
							? user_total_score > opponent_total_scores
								? 'YOU WON'
								: 'YOU LOST'
							: user_scores.length >= 3
							? `Finished`
							: `Round ${user_scores.length + 1}/3`}
					</Text>
				</View>
				<Content>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginLeft: 40,
							marginRight: 40,
							bottom: -30,
							elevation: 10,
						}}
					>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.white_containers,
							}}
						>
							{user.given_name}
						</Text>
						<View
							style={{
								borderRadius: 50,
								borderStyle: 'solid',
								borderWidth: 2,
								borderColor: COLORS.white_containers,
								backgroundColor: COLORS.red_buttons,
								padding: 20,
							}}
						>
							<Text
								style={{
									fontFamily: 'Roboto_medium',
									color: COLORS.white_containers,
								}}
							>
								VS
							</Text>
						</View>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.white_containers,
							}}
						>
							{user.given_name == challenge.display_name_1
								? challenge.display_name_2
								: challenge.display_name_1}
						</Text>
					</View>
					<View style={[styles.elevatedContainer, { marginBottom: 50 }]}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{user.challenge_city}</Text>
						</View>
						<RoundRow
							round={'Round 1'}
							user_score={user_scores[0]}
							opponent_score={opponent_scores[0]}
						/>
						<RoundRow
							round={'Round 2'}
							user_score={user_scores[1]}
							opponent_score={opponent_scores[1]}
						/>
						<RoundRow
							round={'Round 3'}
							user_score={user_scores[2]}
							opponent_score={opponent_scores[2]}
						/>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<View style={{ margin: 20 }}>
								<Text
									style={{
										fontFamily: 'Roboto_medium',
										color: COLORS.Main_font_color,
									}}
								>
									Total Points{' '}
								</Text>
								<Text
									style={{
										fontFamily: 'Roboto_medium',
										color: COLORS.Darker_font_color,
									}}
								>
									{parseFloat(user_total_score).toFixed(0)
										?? 'no score'}
								</Text>
							</View>
							<View style={{ margin: 20 }}>
								<Text
									style={{
										fontFamily: 'Roboto_medium',
										color: COLORS.Main_font_color,
									}}
								>
									Total Points{' '}
								</Text>
								<Text
									style={{
										fontFamily: 'Roboto_medium',
										color: COLORS.Darker_font_color,
									}}
								>
									{opponent_scores.length == 3
									&& user_scores.length == 3
										? parseFloat(opponent_total_scores).toFixed(0)
										: 'hidden'}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-evenly',
							}}
						>
							<Button
								onPress={() => navigation.navigate('MainScreen')}
								style={[
									styles.coolBtn,
									{
										backgroundColor: COLORS.Grey_font_color,
										alignItems: 'center',
										justifyContent: 'center',
									},
								]}
							>
								<Text>Home</Text>
							</Button>
							{user_scores.length == 3
							&& opponent_scores.length == 3 ? null : (
								<Button
									onPress={nextRound}
									style={[
										styles.coolBtn,
										{
											backgroundColor: COLORS.red_buttons,
											alignItems: 'center',
											justifyContent: 'center',
										},
									]}
								>
									<Text>
										{user_scores.length == 3
											? opponent_scores.length < 3
												? 'Waiting'
												: 'Rematch'
											: 'Play round'}
									</Text>
								</Button>
							)}
						</View>
					</View>
				</Content>
			</ImageBackground>
		</Container>
	);
};

export default RoundScreen;
