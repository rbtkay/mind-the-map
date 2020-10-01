import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Root, Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./_screens/MainScreen";
import ScoreScreen from "./_screens/ScoreScreen";
import HomeScreen from "./_screens/HomeScreen";
import LoginScreen from "./_screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
    const [fontLoading, setFontLoading] = useState(true);

    useEffect(() => {
        (async function () {
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
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
        <Root>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        options={{
                            headerShown: false,
                        }}
                    >
                        {(props) => <LoginScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="ScoreScreen"
                        options={{
                            headerShown: false,
                        }}
                    >
                        {(props) => <ScoreScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="HomeScreen"
                        options={{
                            headerShown: false,
                        }}
                    >
                        {(props) => <HomeScreen {...props} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="MainScreen"
                        options={{
                            headerShown: false,
                        }}
                    >
                        {(props) => <MainScreen {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Root>
    );
}
