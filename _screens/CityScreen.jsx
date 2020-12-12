import React, { useEffect } from "react";
import { View, Dimensions, StyleSheet, LogBox } from "react-native";
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
import Choice from "../_components/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import { APP_COLOR } from "../assets/constant_styles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { getMonuments } from "../_api/pois";
import { disableExpoCliLogging } from "expo/build/logs/Logs";
import { setMonuments } from "../_actions/game";
import { addScoreWithUser } from "../_api/scores";
import { getRandomNumberForQuestions } from "../_utils/Randomizer";
import { cities } from "../_utils/constants";

const singleton = require("../_helpers/singleton");


const Row = ({ cities, index }) => {
    return (
        <View style={{ flex: 2, flexDirection: "row" }}>
            <Choice
                type={"city"}
                name={cities[index - 1].name}
                image={cities[index - 1].imageUrl}
            />
            <Choice
                type={"city"}
                name={cities[index].name}
                image={cities[index].imageUrl}
            />
        </View>
    );
};

const CityScreen = () => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const navigation = useNavigation();

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Title style={{ fontSize: 40 }}>Choose a city</Title>
                </Body>
            </Header>
            <Content style={{ backgroundColor: APP_COLOR }}>
                <View style={{ marginTop: 150 }}>
                    {cities.map((th, index) => {
                        if (index % 2 != 0 && index != 0) {
                            return (
                                <Row
                                    cities={cities}
                                    index={index}
                                    key={index}
                                />
                            );
                        } else if (index == cities.length - 1) {
                            return (
                                <Choice
                                    type={"city"}
                                    name={th.name}
                                    image={th.imageUrl}
                                    key={index}
                                />
                            );
                        }
                    })}
                </View>
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
    game: state.game
});

const mapDispatchToProps = (dispatch) => ({
    setMonuments: (monuments) => dispatch(setMonuments(monuments)),
    startMusic: () => dispatch(startMusic()),
});

export default connect(null, null)(CityScreen);
