import React, { useState, useEffect } from 'react';
import { Text, Animated, LogBox, SectionList } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Container, Button, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setLost, setScore } from '../_reducers/game';
import {
	setTimerValue,
	startTimer,
	stopAndRestartTimer,
	TIMER_STATUS,
} from '../_reducers/timer';

const Timer = ({ endTurn }) => {
	LogBox.ignoreLogs(['Failed prop type']);
	const timer = useSelector(state => state.timer);
	const dispatch = useDispatch();
	const { status } = timer;

	const [fill, setFill] = useState(new Animated.Value(0)); //TODO: user ref and not state for better rendering

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
					console.log('setting value', value);
				});
				break;

			default:
				break;
		}
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
						dispatch(setTimerValue(fill._value));
					}
				}}
				backgroundColor="#860CE6"
			></AnimatedCircularProgress>
		</View>
	);
};

export default Timer;
