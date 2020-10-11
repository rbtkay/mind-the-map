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
import { APP_COLOR } from "../assets/constant_styles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { getMonuments } from "../_api/pois";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
import { setMonuments } from "../_actions/game";
import { addScoreWithUser } from "../_api/scores";
const NUMBER_OF_QUESTION_PER_ROUND = 5;

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

const HomeScreen = ({ city, setMonuments }) => {
    const navigation = useNavigation();
    console.log(city);
    useEffect(() => {
        if (!city) return;
        const chosen_ids = [];
        let current_number = -1;
        for (let i = 0; i < NUMBER_OF_QUESTION_PER_ROUND; i++) {
            do {
                // this dowhile is to prevent duplicates
                current_number = `${city}_${Math.floor(Math.random() * 42)}`;
            } while (chosen_ids.includes(current_number));
            chosen_ids.push(current_number);
        }

        getMonuments(chosen_ids, "Paris").then((monuments) => {
            // TODO: this function needs to be on the MainScreen since it is also called on replay game
            setMonuments(monuments);
            navigation.replace("MainScreen");
        });
    }, [city]);

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
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

const mapStateToProps = (state) => ({
    city: state.game.city,
});

const mapDispatchToProps = (dispatch) => ({
    setMonuments: (monuments) => dispatch(setMonuments(monuments)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
