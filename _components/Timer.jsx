import React, { useState, useEffect } from 'react';
import { Text, Animated, LogBox, SectionList } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Container, Button, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setLost, setScore } from '../_actions/game';
import {
	setTimerValue,
	startTimer,
	stopAndRestartTimer,
	TIMER_STATUS,
} from '../_reducers/TimerReducer';

const Timer = () => {
	LogBox.ignoreLogs(['Failed prop type']);
	const timer = useSelector(state => state.timer);
	const dispatch = useDispatch();
	const { status } = timer;

	const [fill, setFill] = useState(new Animated.Value(0)); //TODO: user ref and not state for better rendering
	// fill.setValue(value);
	// const endTimer = finished => {
	// 	// console.log("screenToGoTo", isRunning);
	// 	if (finished) {
	// 		setScore(undefined, undefined, true);
	// 		// console.log(screenToGoTo);
	// 		// navigation.navigate(screenToGoTo);
	// 	}
	// };
	// useEffect(() => {
	// 	return () => {
	// 		console.log('unmounting...');
	// 		dispatch(setTimerValue(fill));
	// 	};
	// }, []);

	useEffect(() => {
		switch (status) {
			case TIMER_STATUS.running:
				Animated.timing(fill, {
					toValue: 100,
					duration: 10000,
					useNativeDriver: false,
				}).start();
				break;

			case TIMER_STATUS.stopped:
				fill.stopAnimation(value => {
					console.log('setting value', value), dispatch(setTimerValue(value));
				});
				break;

			default:
				break;
		}
		// if (status == TIMER_STATUS.running) {
		//     Animated.timing(fill, {
		//         toValue: 100,
		//         duration: 10000,
		//         useNativeDriver: false,
		//     }).start();
		// } else if (status == TIMER_STATUS.paused) {
		//     fill.stopAnimation((value) => {
		//         console.log("setting value", value), setTimerValue(value);
		//     });
		// } else if (status == TIMER_STATUS.resetting) {
		//     fill.setValue(0);
		//     getReady();
		// } else if (status == TIMER_STATUS.atzero) {
		//     toggleTimer(); // starts the timer when the player land on the map
		// }
	}, [status]);

	return (
		<View style={{ padding: 30 }}>
			<AnimatedCircularProgress
				size={50}
				width={15}
				fill={fill}
				tintColor="#F8F8F8"
				onAnimationComplete={({ finished }) => {
					if (finished) {
						console.log('aniamtion', finished);
						// dispatch(setLost(finished));
					}
				}}
				backgroundColor="#860CE6"
			>
				{/* {(fill) => (
                    <Text>{Number(((100 - fill) / 10).toFixed(2))}</Text>
                )} */}
			</AnimatedCircularProgress>
		</View>
	);
};

export default Timer;
