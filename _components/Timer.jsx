import React, { useState, useEffect } from "react";
import { Text, Animated, LogBox } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Container, Button, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
    toggleTimer,
    setTimerValue,
    TIMER_STATUS,
    getReady,
} from "../_actions/Timer";

const Timer = ({ toggleTimer, value, setTimerValue, status, getReady }) => {
    LogBox.ignoreLogs(["Failed prop type"]);
    const navigation = useNavigation();

    const [fill, setFill] = useState(new Animated.Value(value)); //TODO: user ref and not state for better rendering
    // fill.setValue(value);
    const navigateTo = (finished, screenToGoTo) => {
        // console.log("screenToGoTo", isRunning);
        if (finished) { 
            // console.log(screenToGoTo);
            // navigation.navigate(screenToGoTo);
        }
    };

    useEffect(() => {
        if (status == TIMER_STATUS.running) {
            Animated.timing(fill, {
                toValue: 100,
                duration: 10000,
                useNativeDriver: false,
            }).start();
        } else if (status == TIMER_STATUS.paused) {
            fill.stopAnimation((value) => {
                console.log("setting value", value), setTimerValue(value);
            });
        } else if (status == TIMER_STATUS.resetting) {
            fill.setValue(0);
            getReady();
        } else if (status == TIMER_STATUS.atzero) {
            toggleTimer(); // starts the timer when the player land on the map
        }
    }, [status]);

    return (
        <View style={{padding: 30}}>
            <AnimatedCircularProgress
                size={50}
                width={15}
                fill={fill}
                tintColor="#F8F8F8"
                onAnimationComplete={({ finished }) =>
                    navigateTo(finished, "ScoreScreen")
                }
                backgroundColor="#860CE6"
            >
                {/* {(fill) => (
                    <Text>{Number(((100 - fill) / 10).toFixed(2))}</Text>
                )} */}
            </AnimatedCircularProgress>
        </View>
    );
};

const mapStateToProps = (state) => ({
    isRunning: state.timer.isRunning,
    value: state.timer.value,
    status: state.timer.status,
});
const mapDispatchToProps = (dispatch) => ({
    toggleTimer: (isRunning) => dispatch(toggleTimer(isRunning)),
    setTimerValue: (value) => dispatch(setTimerValue(value)),
    getReady: () => dispatch(getReady()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
