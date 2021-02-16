import React, { useState, useEffect } from 'react';
import { Text, Animated, LogBox, SectionList, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Container, Button, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setLost, setScore } from '../_reducers/game';

import { Bar } from 'react-native-progress';

import {
	setTimerValue,
	startTimer,
	stopAndRestartTimer,
	TIMER_STATUS,
} from '../_reducers/timer';
import { APP_COLOR } from '../assets/constant_styles';

const timer_max_width = Dimensions.get('window').width;
const getRightTime = (time, timer_max_width) => {
	return ((timer_max_width - time) / timer_max_width) * 100;
};

const Timer = ({ endTurn }) => {
	LogBox.ignoreLogs(['Failed prop type']);
	const timer = useSelector(state => state.timer);
	const dispatch = useDispatch();
	const { status } = timer;

	const [fill, setFill] = useState(new Animated.Value(timer_max_width)); //TODO: user ref and not state for better rendering
	const [timer_color, setTimerColor] = useState('gold');

	fill.addListener(({ value }) => {
		if (getRightTime(value, timer_max_width) > 70) setTimerColor('red');
		// else if (getRightTime(value, timer_max_width) > 30) setTimerColor('gold');
	});

	useEffect(() => {
		console.log(status);
		switch (status) {
			case TIMER_STATUS.running:
				Animated.timing(fill, {
					toValue: 0,
					duration: 10000,
					useNativeDriver: false,
				}).start(({ finished }) => {
					if (finished) {
						dispatch(
							setTimerValue(getRightTime(fill._value, timer_max_width))
						);
					}
				});
				break;

			case TIMER_STATUS.stopped:
				fill.stopAnimation(value => {
					dispatch(setTimerValue(getRightTime(value, timer_max_width)));
				});
				break;

			default:
				break;
		}
	}, [status]);

	return (
		<Animated.View
			style={{ width: fill, height: 15, backgroundColor: timer_color }}
		></Animated.View>
	);
};

export default Timer;
