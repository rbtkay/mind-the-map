import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Root } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
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
                Roboto_medium: require("./assets/fonts/rubik/Rubik/Rubik-Black.ttf"),
                ...Ionicons.font,
            });

            setFontLoading(false);
        })();
    }, []);

    // wait until the font are loaded
    if (fontLoading) {
        return null;
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
