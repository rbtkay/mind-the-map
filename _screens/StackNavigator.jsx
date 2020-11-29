import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./MainScreen";
import ScoreScreen from "./ScoreScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { connect } from "react-redux";
import { firebase } from "../_api/config/firebaseConfig";

const Stack = createStackNavigator();

const Router = ({ username, registerUser }) => {
    useEffect(() => {
        console.log("username in router", username);
        AsyncStorage.getItem("username", (error, value) => {
            if (error) {
                console.log(error);
                return;
            }
            // if (value) registerUser(value);
        });
    }, []);

    checkIfLogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user sign in");
            } else {
                console.log("user not recognized");
            }
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <>
                    {username ? (
                        <>
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
                            <Stack.Screen
                                name="ScoreScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <ScoreScreen {...props} />}
                            </Stack.Screen>
                        </>
                    ) : (
                        <Stack.Screen
                            name="LoginScreen"
                            options={{
                                headerShown: false,
                            }}
                        >
                            {(props) => <LoginScreen {...props} />}
                        </Stack.Screen>
                    )}
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

import { registerUser } from "../_actions/user";
import SignUp from "./SignUpScreen";
const mapStateToProps = (state) => ({
    username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
    registerUser: (username) => dispatch(registerUser(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
