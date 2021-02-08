import React, { useState, useEffect, createRef, useCallback } from 'react';
import { View, Dimensions, LogBox, StyleSheet, Image, Modal } from 'react-native';
import { Content, Container, Header, Left, Body, Title, H2 } from 'native-base';

import MapView, { Overlay } from 'react-native-maps';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
	CurrentRenderContext,
	NavigationContext,
	useIsFocused,
	useNavigation,
} from '@react-navigation/native';
import {
	calculatePoints,
	getDistanceFromLatLonInKm,
	getTimeTakenFromAnimation,
} from '../_helpers';
import Timer from '../_components/Timer';
import Score from '../_components/Score';
import AudioButton from '../_components/AudioButton';
import { APP_COLOR } from '../assets/constant_styles';

import { setTotalScore } from '../_reducers/game';
import { TIMER_STATUS } from '../_reducers/timer';

import { setTimerValue, startTimer, stopAndRestartTimer } from '../_reducers/timer';
import { GAME_TYPES } from '../_reducers/game';
import { COLORS } from '../_css/styles';
import ScoreModal from '../_components/Modals/ScoreModal';
import { setChallengeRoundScore } from '../_api/challenges';

const REGIONS = {
	Paris: {
		latitude: 48.8555, // south / north
		longitude: 2.34, // west / east
		latitudeDelta: 0.1,
		longitudeDelta: 0.16, // zoom in / out
	},
	Beirut: {
		latitude: 33.8938,
		longitude: 35.5018,
		latitudeDelta: 0.1,
		longitudeDelta: 0.16, // zoom in / out
	},
};

const customMapStyle = [
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'poi.park',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'transit',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
];

const next_icon = require('../assets/navigation.png');
const GameScreen = () => {
	LogBox.ignoreLogs(['Failed prop type', 'Setting a timer']);

	const [marker, setMarker] = useState(null);
	const [correctMarker, setCorrectMarker] = useState(null);
	const [correctMarkerArray, setCorrectMarkerArray] = useState([]);
	const [numberOfAttempts, setNumberOfAttemps] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isLost, setIsLost] = useState(false);

	const [scores, setScores] = useState([]);
	const [distance, setDistance] = useState(null);
	const [time, setTime] = useState(null);

	const dispatch = useDispatch();
	const game = useSelector(state => state.game);
	const timer = useSelector(state => state.timer);
	const user = useSelector(state => state.user);

	const navigation = useNavigation();

	const isFocused = useIsFocused();

	const { pois, game_type } = game;

	const mapRef = createRef();

	useEffect(() => {
		if (isFocused) dispatch(startTimer());
		else dispatch(stopAndRestartTimer());
	}, [isFocused]);

	useEffect(() => {
		if (!pois) return;
		setIsPlaying(true);
		setCorrectMarkerArray(() =>
			pois.map(poi => ({ name: poi.name, latitude: poi.lat, longitude: poi.long }))
		);

		if (timer.status == TIMER_STATUS.ready) dispatch(startTimer());
	}, [pois]);

	// the selection of a marker make the correct marker appear and start the endgame process
	useEffect(() => {
		if (!marker) return;

		dispatch(stopAndRestartTimer());
		setCorrectMarker(correctMarkerArray[numberOfAttempts]);
	}, [marker]);

	// we need to wait for the time to endTurn
	useEffect(() => {
		if (timer.value > 0) {
			endTurn(timer.value);
		}
	}, [timer.value]);

	const endTurn = () => {
		if (marker && timer.value < 100) {
			// get the time it took for the user to set a marker
			const round_time = getTimeTakenFromAnimation(timer.value, 10000);

			// get the distance between the marker chosen and the correct one
			const round_distance_in_m = getDistanceFromLatLonInKm(
				marker.latitude,
				marker.longitude,
				correctMarker.latitude,
				correctMarker.longitude
			);
			const res = calculatePoints(round_distance_in_m, round_time);

			setScores([...scores, res]);
			setDistance(round_time);
			setTime(round_distance_in_m);
		} else {
			// this case happens when the timer gets to zero before the player's move
			setScores([...scores, 0]);
			setDistance(null);
			setTime(null);
			setCorrectMarker(correctMarkerArray[numberOfAttempts]);
			setIsLost(true);
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (time && distance && scores.length > 0) setIsPlaying(false);
	}, [time, distance, scores]);

	const nextPoi = async () => {
		// if all questions are done
		if (numberOfAttempts >= correctMarkerArray.length - 1) {
			let screen_to_navigate;
			const current_score = scores.reduce(
				(sum, score) => parseFloat(sum) + parseFloat(score)
			);

			dispatch(setTotalScore(current_score));

			if (game_type == GAME_TYPES.SINGLE_PLAYER) {
				screen_to_navigate = 'ScoreScreen';
			} else if (game_type == GAME_TYPES.MULTI_PLAYER) {
				screen_to_navigate = 'RoundScreen';
				await setChallengeRoundScore(game.challenge_id, current_score, user.email);
			}

			resetValues();
			navigation.navigate(screen_to_navigate);
		} else {
			dispatch(startTimer());

			setNumberOfAttemps(numberOfAttempts + 1);
			setMarker(null);
			setCorrectMarker(null);
			setIsPlaying(true);
			setIsLost(false);
		}
	};

	const resetValues = () => {
		setNumberOfAttemps(0);
		setMarker(null);
		setCorrectMarker(null);
		setIsPlaying(true);
		setIsLost(false);
		dispatch(setTimerValue(0));
	};

	return (
		<Container>
			<ScoreModal
				isVisible={!isPlaying}
				closeModal={() => nextPoi()}
				score={scores[numberOfAttempts]}
				distance={distance}
				time={time}
				total_score={scores.reduce((agg, score) => agg + parseFloat(score), 0)}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					padding: 24,
					backgroundColor: COLORS.background,
				}}
			>
				{correctMarkerArray.length > 0 && (
					<Title>{correctMarkerArray[numberOfAttempts].name}</Title>
				)}
				<Left style={{ alignItems: 'flex-end' }}>
					<AudioButton />
				</Left>
			</View>
			<Content>
				<View style={styles.container}>
					<MapView
						style={styles.mapStyle}
						initialRegion={
							REGIONS[game.city]
						}
						onPress={e => setMarker(e.nativeEvent.coordinate)}
						ref={mapRef}
						customMapStyle={customMapStyle}
					>
						{marker && (
							<MapView.Marker coordinate={marker} pinColor={APP_COLOR} />
						)}
						{correctMarker && (
							<MapView.Marker
								coordinate={{
									latitude: correctMarker.latitude,
									longitude: correctMarker.longitude,
								}}
								pinColor={'green'}
							/>
						)}
					</MapView>
					<Overlay style={styles.overlay} image={null}>
						{
							isPlaying && <Timer endTurn={endTurn} />
							// ) : (
							// <View style={styles.score_view}>
							// 	{!isLost && scores ? (
							// 		<Score
							// 			score={scores[numberOfAttempts]}
							// 			distance={distance}
							// 			time={time}
							// 		/>
							// 	) : (
							// 		<View style={styles.lost_text}>
							// 			<H2 style={{ color: 'white' }}>You Got Lost!</H2>
							// 		</View>
							// 	)}
							// 	<View style={{ flex: 2 }}>
							// 		<View style={styles.next_btn}>
							// 			<TouchableOpacity onPress={nextPoi}>
							// 				<Image
							// 					source={next_icon}
							// 					style={styles.next_icon}
							// 				/>
							// 			</TouchableOpacity>
							// 		</View>
							// 	</View>
							// </View>
						}
					</Overlay>
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	overlay: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignContent: 'center',
		bottom: 20,
		padding: 20,
		width: Dimensions.get('window').width,
	},
	next_btn: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{ rotate: '90deg' }],
	},
	score_view: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: COLORS.white_containers,
		borderRadius: 20,
		paddingRight: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 10.32,
	},
	next_icon: {
		width: 100,
		height: 100,
	},
	lost_text: {
		height: 120,
		flex: 2,
		justifyContent: 'center',
		marginLeft: 30,
	},
});

export default GameScreen;
