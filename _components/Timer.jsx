import React, { useState, useEffect } from "react";
import { Text, Animated, LogBox } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Container, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { toggleTimer } from "../_actions/Timer";

const Timer = ({ toggleTimer, isRunning }) => {
    LogBox.ignoreLogs(["Failed prop type"]);
    const navigation = useNavigation();

    const [fill, setFill] = useState(new Animated.Value(0)); //TODO: user ref and not state for better rendering

    const navigateTo = (finished, screenToGoTo) => {
        // console.log("screenToGoTo", isRunning);
        if (finished) {
            // console.log(screenToGoTo);
            navigation.navigate(screenToGoTo);
        }
    };

    useEffect(() => {
        Animated.timing(fill, {
            toValue: 100,
            duration: 10000,
            useNativeDriver: false,
        }).start();

        // toggleTimer(true);
    });

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
});
const mapDispatchToProps = (dispatch) => ({
    // hideModal: () => dispatch(hideModal()),
    // showModal: () => dispatch(showModal()),
    // addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    // addIngredientToDatabase: (ingredient) =>
    //     addIngredientToDatabase(ingredient),
    // setMessage: (message) => dispatch(setMessage(message)),
    toggleTimer: (isRunning) => dispatch(toggleTimer(isRunning)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
