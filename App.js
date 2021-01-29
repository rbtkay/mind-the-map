import "react-native-gesture-handler";

import {
    StatusBar,
    setStatusBarNetworkActivityIndicatorVisible,
} from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Root, Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./_screens/MainScreen";
import ScoreScreen from "./_screens/ScoreScreen";
import CityScreen from "./_screens/CityScreen";
import LoginScreen from "./_screens/LoginScreen";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./_reducers";
import StackNavigator from "./_screens/StackNavigator";
require("firebase/functions");


const store = createStore(rootReducer);

const App = () => {
    const [fontLoading, setFontLoading] = useState(true);

    useEffect(() => {
        (async function () {
            await Font.loadAsync({
                Roboto_medium: require("./assets/fonts/ReallyFree-ALwl7.ttf"),
                ...Ionicons.font,
            });

            setFontLoading(false);
        })();
    }, []);

    // wait until the font are loaded
    if (fontLoading) {
        return <View />;
    }

    return (
        <Provider store={store}>
            <Root>
                <StackNavigator />
            </Root>
        </Provider>
    );
};

export default App;
