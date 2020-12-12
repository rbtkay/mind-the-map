import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "./GameScreen";
import ScoreScreen from "./ScoreScreen";
import CityScreen from "./CityScreen";
import LoginScreen from "./LoginScreen";
import ThemeScreen from "./ThemeScreen";
import MainScreen from "./MainScreen";
import CreateGameScreen from "./CreateGameScreen";
import { connect } from "react-redux";
import { firebase } from "../_api/config/firebaseConfig";

const Stack = createStackNavigator();

const Router = ({ user, setUser }) => {
    // in case we need persistent login with firebaseauth we use this
    // checkIfLogin = () => { 
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             console.log("user sign in");
    //         } else {
    //             console.log("user not recognized");
    //         }
    //     });
    // };

    const [isLogin, setIsLogin] = useState(user.email != null);

    useEffect(() => {
        (async () => {
            console.log("in the router!!");
            console.log(user);
            // if the user is set in redux consider the user logged in
            setIsLogin(user.email != null);
        })();
    }, [user]);

    useEffect(() => {
        (async () => {
            // the persistent signin is done by leaving the user info in the asyncstorage
            const local_user = await AsyncStorage.multiGet([
                "user_email",
                "username",
                "random_ref",
            ]);

            // setting the user in redux from the localstorage to trigger automatic login
            setUser({
                email: local_user[0][1],
                username: local_user[1][1],
                random_ref: local_user[2][1],
            });
        })();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <>
                    {isLogin ? (
                        <>
                            <Stack.Screen
                                name="MainScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <MainScreen {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="CreateGameScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <CreateGameScreen {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="CityScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <CityScreen {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="ThemeScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <ThemeScreen {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="GameScreen"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => <GameScreen {...props} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name="ScoreScreen"
                                options={{
                                    headerShown: false,
                                }}
                                e
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

import { setUser } from "../_actions/user";
const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
