import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Image, Linking } from "react-native";
import { Container, Header, Button, Body, Title, Text } from "native-base";
import Theme from "../_components/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage, LogBox } from "react-native";
import { APP_COLOR } from "../assets/constant_styles";
import { connect } from "react-redux";
import { signInWithGoogleAsync } from "../_api/user";

const LoginScreen = ({ setUser }) => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const navigation = useNavigation();
    const [username, setUsername] = useState(null);

    const onLoginPress = async () => {
        try {
            const result = await signInWithGoogleAsync();
            const { userInfo } = result;

            await AsyncStorage.setItem("user_email", userInfo.email);
            await AsyncStorage.setItem("username", userInfo.username);
            await AsyncStorage.setItem(
                "random_ref",
                userInfo.random_ref.toString()
            );
            setUser({
                username: userInfo.username,
                email: userInfo.email,
                random_ref: userInfo.random_ref,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container style={{ backgroundColor: APP_COLOR }}>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Title style={{ fontSize: 60 }}>Mind the map</Title>
                </Body>
            </Header>
            <View style={{ flex: 6 }}>
                <View style={styles.image}>
                    <Image
                        source={require("../assets/map_example.png")}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: "100%", //Dimensions.get("window").height / 3,
                        }}
                    />
                </View>
                <View style={styles.loginBtn}>
                    <Button
                        style={{
                            height: "40%",
                            width: "80%",
                            justifyContent: "center",
                        }}
                        transparent
                        onPress={() => onLoginPress()}
                    >
                        <Text style={{ fontSize: 40, color: "white" }}>
                            Login using Google
                        </Text>
                    </Button>
                </View>

                <View></View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    loginBtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    title: { textAlign: "center", marginTop: 50, flex: 1 },
    image: {
        flex: 4,
        marginTop: 50,
    },
    form: {
        flex: 1,
    },
    bodyContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
});

import { setUser } from "../_actions/user";
const mapDispatchToProps = (dispatch) => ({
    setUser: (username) => dispatch(setUser(username)),
});

export default connect(null, mapDispatchToProps)(LoginScreen);
