import React, { useEffect, useState } from "react";
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
import { useNavigation, TabActions } from "@react-navigation/native";
import { addScoreWithUser, getScoresOrderByScore } from "../_api/scores";
import { BackgroundSound } from "../_helpers/singleton";
import AudioButton from "../_components/AudioButton";

const TABS = { user_score: "user_score", leaderboard: "leaderboard" };

const ScoreScreen = ({
    total_score,
    discovered_monuments,
    replayGame,
    username,
}) => {
    const navigation = useNavigation();

    const [tab, setTab] = useState(TABS.user_score);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        (async () => {
            if (!total_score) return;
            const username = await AsyncStorage.getItem("username");

            addScoreWithUser(username, total_score);
        })();
    }, [total_score]);

    useEffect(() => {
        console.log(tab);
        if (tab == TABS.leaderboard)
            getScoresOrderByScore().then((scores) => {
                console.log(scores);
                setScores(scores);
            });
    }, [tab]);

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Title style={{ fontSize: 40 }}>Your Score</Title>
                </Body>
                <Right
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
                >
                    <Icon
                        onPress={() => {
                            BackgroundSound.stop();
                            replayGame("Paris");
                            navigation.replace("HomeScreen");
                        }}
                        name={"refresh"}
                        style={{ color: "white" }}
                    />
                    <AudioButton />
                </Right>
            </Header>
            {tab == TABS.user_score ? (
                <Content>
                    <View style={styles.container}>
                        <H1 style={{fontFamily: 'Roboto_medium', fontSize: 42}}>CONGRATS</H1>

                        <View style={styles.scoreContent}>
                            <H2 style={{fontFamily: 'Roboto_medium', fontSize: 38}}>Your Score: {total_score.toFixed(2)}</H2>
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
                    <View style={{ alignItems: 'center', marginTop: 30}}>
                        <Text style={{fontFamily: 'Roboto_medium', fontSize: 24}}>Any Feedback ?</Text>
                    </View>
                </Content>
            ) : (
                <Content>
                    <View style={styles.container}>
                        <H1>Leaderboard</H1>
                    </View>
                    <View style={styles.scoreList}>
                        <List>
                            {scores.map((score, i) => {
                                console.log("username - ", username);
                                const user =
                                    score.username.split("_")[0] == "user"
                                        ? score.username
                                        : score.username.split("_")[0];
                                const user_style =
                                    user == username
                                        ? { color: APP_COLOR }
                                        : "";
                                return (
                                    <ListItem
                                        key={i}
                                        style={styles.monumentListItem}
                                    >
                                        <Text style={user_style}>{user}</Text>
                                        <Text style={user_style}>
                                            {parseFloat(score.score).toFixed(2)}
                                        </Text>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </View>
                </Content>
            )}
            <Footer>
                <FooterTab>
                    {tab == TABS.user_score ? (
                        <Button
                            style={{ backgroundColor: APP_COLOR }}
                            active
                            onPress={() => setTab(TABS.user_score)}
                        >
                            <Text style={{ fontSize: 20 }}>Your score</Text>
                        </Button>
                    ) : (
                        <Button
                            style={{ backgroundColor: APP_COLOR }}
                            onPress={() => setTab(TABS.user_score)}
                        >
                            <Text style={{ fontSize: 20 }}>Your score</Text>
                        </Button>
                    )}
                    {tab == TABS.leaderboard ? (
                        <Button
                            style={{ backgroundColor: APP_COLOR }}
                            onPress={() => setTab(TABS.leaderboard)}
                            active
                        >
                            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
                        </Button>
                    ) : (
                        <Button
                            style={{ backgroundColor: APP_COLOR }}
                            onPress={() => setTab(TABS.leaderboard)}
                        >
                            <Text style={{ fontSize: 20 }}>Leaderboard</Text>
                        </Button>
                    )}
                </FooterTab>
            </Footer>
        </Container>
    );
};

import { replayGame, setCity } from "../_actions/game";
const mapStateToProps = (state) => ({
    total_score: state.game.total_score,
    discovered_monuments: state.game.monuments,
    username: state.user.username,
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
        marginTop: 80,
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
        alignItems: "center",
    },
    monumentList: {
        marginTop: 50,
        marginLeft: 20,
    },
    scoreList: {
        marginTop: 50,
    },
    monumentListItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);
