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

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(null);

    const onLoginPress = async () => {
        let chosen_username = "user";
        if (username) chosen_username = username;
        try {
            await AsyncStorage.setItem(
                "username",
                `${chosen_username}_${Date.now()}`
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

                    <Text
                        style={{ color: "blue" }}
                        onPress={() => Linking.openURL("http://wikipedia.com")}
                    >
                        Google
                    </Text>
                    {/* <TouchableOpacity style={{ paddingTop: 10 }}>
                        <Text> New member ?</Text>
                    </TouchableOpacity> */}
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

export default LoginScreen;
