import React, { useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
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
    H1,
} from "native-base";
import Theme from "../_components/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";

const themes = [
    {
        name: "Berlin",
        imageUrl: require("../assets/Berlin.jpg"),
    },
    {
        name: "Paris",
        imageUrl: require("../assets/Paris.jpeg"),
    },
    {
        name: "London",
        imageUrl: require("../assets/London.jpeg"),
    },
];

const HomeScreen = () => {
    useEffect(() => {
        (async function () {
            try {
                const value = await AsyncStorage.getItem("username");
                if (value !== null) {
                    console.log(value);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    });
    return (
        <Container>
            <Header>
                <Body style={styles.bodyContent}>
                    <Title>Choose a city</Title>
                </Body>
            </Header>
            <Content>
                <View>
                    <H1 style={styles.contentHeader}>
                        Can you locate places on an unlabeled map ?
                    </H1>
                </View>
                {themes.map((th, index) => {
                    if (index % 2 != 0 && index != 0) {
                        return (
                            <Row themes={themes} index={index} key={index} />
                        );
                    } else if (index == themes.length - 1) {
                        return (
                            <Theme
                                name={th.name}
                                image={th.imageUrl}
                                key={index}
                            />
                        );
                    }
                })}
            </Content>
        </Container>
    );
};

const Row = ({ themes, index }) => {
    return (
        <View style={{ flex: 2, flexDirection: "row" }}>
            <Theme
                name={themes[index - 1].name}
                image={themes[index - 1].imageUrl}
            />
            <Theme name={themes[index].name} image={themes[index].imageUrl} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        width: Dimensions.get("window").width,
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bodyContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
    contentHeader: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
});

export default HomeScreen;
