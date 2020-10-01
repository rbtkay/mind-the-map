import React, { useState, useEffect } from "react";
import { Text, Animated, LogBox } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Container, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Timer = ({}) => {
    LogBox.ignoreLogs(["Failed prop type"]);
    const navigation = useNavigation();

    const [fill, setFill] = useState(new Animated.Value(0)); //TODO: user ref and not state for better rendering

    const navigateTo = (finished, screenToGoTo) =>{
        console.log("screenToGoTo", finished);
        if(finished){
            console.log(screenToGoTo);
            navigation.navigate(screenToGoTo)
        }
    }

    useEffect(() => {
        Animated.timing(fill, {
            toValue: 100,
            duration: 10000,
            useNativeDriver: false,
        }).start();
    });

    return (
        <AnimatedCircularProgress
            size={50}
            width={15}
            fill={fill}
            tintColor="#F8F8F8"
            onAnimationComplete={({finished}) => navigateTo(finished, "ScoreScreen")}
            backgroundColor="#3F51B5"
        >
            {(fill) => <Text>{Number(((100 - fill) / 10).toFixed(2))}</Text>}
        </AnimatedCircularProgress>
    );
};

export default Timer;
