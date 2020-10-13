import React, { useState } from "react";
import { View, Dimensions, StyleSheet, Image, Linking } from "react-native";
import {
    Content,
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Text,
    List,
    ListItem,
    H2,
    Form,
    Input,
    Item,
    H1,
} from "native-base";
import Theme from "../_components/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { APP_COLOR } from "../assets/constant_styles";
import { connect } from "react-redux";

const LoginScreen = ({registerUser}) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);

    const onLoginPress = async () => {
        let chosen_username = "user";
        if (username) chosen_username = username;
        chosen_username = `${chosen_username}_${Date.now()}`
        try {
            console.log("chosen_username", chosen_username)
            registerUser(chosen_username);
            await AsyncStorage.setItem(
                "username",
                chosen_username
            );
        } catch (error) {
            console.log(error);
        }
        navigation.navigate("HomeScreen");
    };

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Title>Mind the map</Title>
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
                <H2 style={styles.title}>Welcome Back!</H2>
                <Form style={styles.form}>
                    <Item>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            autoCapitalize="none"
                        />
                    </Item>
                </Form>

                <View style={styles.loginBtn}>
                    <Button onPress={() => onLoginPress()}>
                        <Text>Login</Text>
                    </Button>
                </View>
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
        flex: 2,
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

import { registerUser } from "../_actions/user";
const mapDispatchToProps = (dispatch) =>({
    registerUser: (username) => dispatch(registerUser(username))
})

export default connect(null, mapDispatchToProps)(LoginScreen);
