import React, { useState, useEffect, createRef, useCallback } from 'react';
import { View, Dimensions, LogBox, StyleSheet, Image } from 'react-native';
import { Content, Container, Header, Left, Body, Title, H2 } from 'native-base';

import MapView, { Overlay } from 'react-native-maps';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavigationContext, useNavigation } from '@react-navigation/native';
import {
	calculatePoints,
	getDistanceFromLatLonInKm,
	getTimeTakenFromAnimation,
} from '../_helpers';
import Timer from '../_components/Timer';
import Score from '../_components/Score';
import AudioButton from '../_components/AudioButton';
import { APP_COLOR } from '../assets/constant_styles';

import { setRoundScore, setScore } from '../_actions/game';
import { calculateTotalScore } from '../_actions/game';
import { TIMER_STATUS } from '../_actions/Timer';

const INITIAL_REGION = {
	latitude: 48.8555, // south / north
	longitude: 2.34, // west / east
	latitudeDelta: 0.1,
	longitudeDelta: 0.16, // zoom in / out
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

	const [scores, setScores] = useState([]);
	const [distance, setDistance] = useState(null);
	const [time, setTime] = useState(null);

	const dispatch = useDispatch();
	const game = useSelector(state => state.game);
	const timer = useSelector(state => state.timer);

	const navigation = useNavigation();

	const { pois } = game;

	const mapRef = createRef();

	useEffect(() => {
		console.log(correctMarkerArray);
	}, [correctMarkerArray]);

	useEffect(() => {
		if (!pois) return;
		setIsPlaying(true);
		setCorrectMarkerArray(() =>
			pois.map(poi => ({ name: poi.name, latitude: poi.lat, longitude: poi.long }))
		);

		if (timer.status == TIMER_STATUS.ready) dispatch(startTimer());
	}, [pois]);

	// useEffect(() => {
	// 	console.log('changing time is done', is_time_done);
	// 	if (!is_time_done) return;
	// 	stopTurn();
	// }, [is_time_done]);

	useEffect(() => {
		if (!marker) return;
		dispatch(stopAndRestartTimer());
		setCorrectMarker(correctMarkerArray[numberOfAttempts]);
		// console.log(game);
		// dispatch(setTimerState)
		// setIsPlaying(false);
		// stopTurn();
		// console.log("timer",timer)
		// endTurn();
	}, [marker]);

	useEffect(() => {
		if (!correctMarker) return;
		// endTurn();
		console.log('the timer', timer);
	}, [correctMarker]);

	useEffect(() => {
		console.log('timer value', timer);
		if (timer.value > 0) {
			endTurn();
		}
	}, [timer.value]);

	const stopTurn = () => {
		// the game should be stop when player set a marker or when the time is up
		setCorrectMarker(correctMarkerArray[numberOfAttempts]);

		setIsPlaying(false);
		// dispatch(stopAndRestartTimer());
		// toggleTimer(); // stop timer
		mapRef.current.animateToRegion(INITIAL_REGION);
	};

	const endTurn = useCallback(() => {
		console.log('ending turn...');
		if (marker) {
			console.log('timer', timer);

			// get the time it took for the user to set a marker
			const round_time = getTimeTakenFromAnimation(timer.value, 10000);

			// get the distance between the marker chosen and the correct one
			const round_distance_in_m = getDistanceFromLatLonInKm(
				marker.latitude,
				marker.longitude,
				correctMarker.latitude,
				correctMarker.longitude
			);

			console.log('round_time', round_time);
			console.log('round_distance', round_distance_in_m);

			const res = calculatePoints(round_distance_in_m, round_time);

			console.log('result', res);
			setScores([...scores, res]);
			setDistance(round_time);
			setTime(round_distance_in_m);
			// setS({...s, [numberOfAttempts]: res});
			// dispatch(
			// 	setScore(timer.value, {
			// 		lat1: marker.latitude,
			// 		long1: marker.longitude,
			// 		lat2: correctMarker.latitude,
			// 		long2: correctMarker.longitude,
			// 	})
			// );
		} else {
			dispatch(setScore(100, null, false));
		}
	}, [timer.value]);

	useEffect(() => {
		console.log('score', scores);
		console.log('time', time);
		console.log('distance', distance);
		if (time && distance && scores.length > 0) setIsPlaying(false);
	}, [time, distance, scores]);

	// useEffect(() => {
	// 	console.log('score', scores);
	// }, [scores]);

	// useEffect(() => {
	// 	console.log('numberOfAttempts', numberOfAttempts);
	// 	console.log('score');
	// 	// console.log(currentScore);
	// }, [currentScore]);

	// useEffect(() => {
	// 	if (value == 0) return;

	// 	setScore(value, {
	// 		lat1: marker.latitude,
	// 		long1: marker.longitude,
	// 		lat2: correctMarker.latitude,
	// 		long2: correctMarker.longitude,
	// 	});
	// 	resetTimer();
	// }, [value]);

	// useEffect(() => {
	// 	// setIsPlaying(false);
	// }, [score]);

	const nextPoi = () => {
		dispatch(startTimer());
		if (numberOfAttempts >= correctMarkerArray.length - 1) {
			// dispatch(calculateTotalScore());
			console.log('scores', scores);
			const round_score = scores.reduce((sum, score) => sum + parseFloat(score));
			dispatch(setRoundScore(round_score));
			// 	calculateTotalScore();
			navigation.replace('ScoreScreen');
		} else {
			setNumberOfAttemps(numberOfAttempts + 1);
			setMarker(null);
			setCorrectMarker(null);
			setIsPlaying(true);
		}
	};

	return (
		<Container>
			<Header
				androidStatusBarColor={APP_COLOR}
				style={{ backgroundColor: APP_COLOR }}
				iosBarStyle={APP_COLOR}
			>
				<Body style={{ alignItems: 'center' }}>
					{correctMarkerArray.length > 0 && (
						<Title style={{ fontSize: 40 }}>
							{correctMarkerArray[numberOfAttempts].name}
						</Title>
					)}
				</Body>
				<Left style={{ alignItems: 'flex-end' }}>
					<AudioButton />
				</Left>
			</Header>
			<Content>
				<View style={styles.container}>
					<MapView
						style={styles.mapStyle}
						initialRegion={INITIAL_REGION}
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
						{isPlaying ? (
							<Timer />
						) : (
							<View style={styles.score_view}>
								{!isPlaying ? (
									<Score
										score={scores[numberOfAttempts]}
										distance={distance}
										time={time}
									/>
								) : (
									<View style={styles.lost_text}>
										<H2 style={{ color: 'white' }}>You Got Lost!</H2>
									</View>
								)}
								<View style={{ flex: 2 }}>
									<View style={styles.next_btn}>
										<TouchableOpacity onPress={nextPoi}>
											<Image
												source={next_icon}
												style={styles.next_icon}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						)}
					</Overlay>
				</View>
			</Content>
		</Container>
	);
};

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	setTimerValue,
	startTimer,
	stopAndRestartTimer,
} from '../_reducers/TimerReducer';

// const mapStateToProps = state => ({
// 	value: state.timer.value,
// 	timer: state.timer,
// 	score: state.game.score,
// 	is_time_done: state.game.is_time_done,
// });
// const mapDispatchToProps = dispatch => ({
// 	toggleTimer: isRunning => dispatch(toggleTimer(isRunning)),
// 	resetTimer: () => dispatch(resetTimer()),
// 	setTimerValue: value => dispatch(setTimerValue(value)),
// 	setScore: (animated_value, coordinates) => dispatch(setScore(animated_value, coordinates)),
// 	startTimer: () => dispatch(startTimer()),
// });
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
		position: 'absolute',
		bottom: 0,
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
		backgroundColor: APP_COLOR,
		paddingRight: 10,
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
