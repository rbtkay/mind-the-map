import React, { useState, useEffect } from "react";
import { Text, Animated, LogBox } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Container, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { toggleTimer, setTimerValue, TIMER_STATUS, getReady } from "../_actions/Timer";

const Timer = ({ toggleTimer, value, setTimerValue, status, getReady }) => {
    LogBox.ignoreLogs(["Failed prop type"]);
    const navigation = useNavigation();

    const [fill, setFill] = useState(new Animated.Value(value)); //TODO: user ref and not state for better rendering
    console.log("timerValue", value);
    // fill.setValue(value);
    const navigateTo = (finished, screenToGoTo) => {
        // console.log("screenToGoTo", isRunning);
        if (finished) {
            // console.log(screenToGoTo);
            // navigation.navigate(screenToGoTo);
        }
    };

    // useEffect(() => {
    //     console.log("timerValue ", value);
    //     fill.setValue(value);
    // }, [value]);

    // useEffect(() => {
    //     console.log("isRunning ", isRunning);
    //     if (isRunning) {
    //         Animated.timing(fill, {
    //             toValue: 100,
    //             duration: 10000,
    //             useNativeDriver: false,
    //         }).start();
    //     } else {
    //         fill.stopAnimation((value) => {
    //             console.log("setting value", value), setTimerValue(value);
    //         });
    //         fill.setValue(0);
    //     }
    // }, [isRunning]);

    useEffect(() => {
        //TOTEST: this was developped with little testing

        console.log("status - ", status);
        if (status == TIMER_STATUS.running) {
            Animated.timing(fill, {
                toValue: 100,
                duration: 10000,
                useNativeDriver: false,
            }).start();
        } else if (status == TIMER_STATUS.paused) {
        console.log("status - Pausing");

            fill.stopAnimation((value) => {
                console.log("setting value", value), setTimerValue(value);
            });
        } else if (status == TIMER_STATUS.resetting) {
            fill.setValue(0);
            getReady();
            // TODO: try resetAnimation(()=> {}) from https://reactnative.dev/docs/animatedvaluexy#setvalue
            //TODO: set time out and maybe animation for reset 
        }
        else if(status == TIMER_STATUS.atzero) {
            toggleTimer(); // starts the timer when the player land on the map
        }
    }, [status]);

    return (
        <AnimatedCircularProgress
            size={50}
            width={15}
            fill={fill}
            tintColor="#F8F8F8"
            onAnimationComplete={({ finished }) =>
                navigateTo(finished, "ScoreScreen")
            }
            backgroundColor="#3F51B5"
        >
            {(fill) => <Text>{Number(((100 - fill) / 10).toFixed(2))}</Text>}
        </AnimatedCircularProgress>
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
