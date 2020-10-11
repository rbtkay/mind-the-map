import React, { useEffect } from "react";
import { View, StyleSheet, Linking, AsyncStorage } from "react-native";
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
    H2,
    H1,
    FooterTab,
    Footer,
    ListItem,
    List,
    H3,
    Row,
} from "native-base";
import Theme from "../_components/Theme";
import { connect } from "react-redux";
import { APP_COLOR } from "../assets/constant_styles";
import { useNavigation } from "@react-navigation/native";
import { addScoreWithUser } from "../_api/scores";

const ScoreScreen = ({ total_score, discovered_monuments, replayGame }) => {
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            if (!total_score) return;
            const username = await AsyncStorage.getItem("username");

            // if (value !== null) {
            //   // We have data!! 
            addScoreWithUser(username, total_score);
            console.log(username);
            // }
        })();
    }, [total_score]);

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Title>Your Score</Title>
                </Body>
                <Right
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Button
                        transparent
                        onPress={() => {
                            replayGame("Paris");
                            navigation.replace("HomeScreen");
                        }}
                    >
                        <Icon name={"refresh"} style={{ color: "white" }} />
                    </Button>
                    <Button
                        transparent
                        onPress={() => {
                            replayGame();
                            navigation.replace("HomeScreen");
                        }}
                    >
                        <Icon name={"flame"} style={{ color: "white" }} />
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={styles.container}>
                    <H1>CONGRATS</H1>

                    <View style={styles.scoreContent}>
                        <H2>Your Score: {total_score.toFixed(2)}</H2>
                    </View>
                </View>
                <View style={styles.monumentList}>
                    <H3>You've discovered:</H3>

                    <List>
                        {discovered_monuments.map((monument, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    style={styles.monumentListItem}
                                >
                                    <Text>{monument.name}</Text>
                                    <Icon
                                        onPress={() =>
                                            Linking.openURL(
                                                `https://en.wikipedia.org/wiki/${monument.name}`
                                            )
                                        }
                                        name="paper-plane"
                                        style={{ color: APP_COLOR }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </View>
            </Content>
            <Footer>
                <FooterTab>
                    <Button style={{ backgroundColor: APP_COLOR }} active>
                        <Text>Your score</Text>
                    </Button>
                    <Button style={{ backgroundColor: APP_COLOR }}>
                        <Text>Leaderboard</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

import { replayGame, setCity } from "../_actions/game";
const mapStateToProps = (state) => ({
    total_score: state.game.total_score,
    discovered_monuments: state.game.monuments,
});

const mapDispatchToProps = (dispatch) => ({
    setCity: (city) => dispatch(setCity(city)),
    replayGame: (city) => dispatch(replayGame(city)),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },

    scoreContent: {
        marginTop: 25,
        padding: 25,
        borderColor: "red",
        borderRadius: 5,
        borderWidth: 5,
        borderStyle: "dashed",
    },

    button: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    bodyContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
    monumentList: {
        marginTop: 50,
        marginLeft: 20,
    },
    monumentListItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);
