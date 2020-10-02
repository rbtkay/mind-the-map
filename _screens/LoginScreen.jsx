import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
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
} from "native-base";
import Theme from "../_components/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from 'react-native';

const LoginScreen = () => {
    const navigation = useNavigation();

    const onLoginPress = async() => {
        try {
            await AsyncStorage.setItem(
              'username',
              'Rbtkay'
            );
          } catch (error) {
            console.log(error);
          } 
        navigation.navigate("HomeScreen");
    };

    return (
        <Container>
            <Header>
                <Body></Body>
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
                            placeholder="Email or username"
                            // value={"email"}
                            // onChangeText={(text) => setEmail(text)}
                            autoCapitalize="none"
                            />
                    </Item>
                </Form>

                <View style={styles.loginBtn}>
                    <Button onPress={() => onLoginPress()}>
                        <Text>Login</Text>
                    </Button>
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
});

export default LoginScreen;
