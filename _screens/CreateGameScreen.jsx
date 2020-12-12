import {
    Header,
    Container,
    Content,
    Body,
    Title,
    Button,
    Left,
    Right,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { APP_COLOR } from '../assets/constant_styles';
import Theme from '../_components/Theme';
import { Ionicons } from '@expo/vector-icons';
import { getRandomQuestions } from '../_utils/Randomizer';

// import { cities, themes, QUESTION_MARK_ICON } from '../_utils/constants';

const QUESTION_MARK_ICON = require('../assets/question-mark-circle-icon.png')
const PARIS_IMG = require("../assets/Paris.jpeg");
const BEIRUT_IMG = require("../assets/beirut.jpeg")
const MONUMENTS_IMG = require("../assets/monuments.jpg");

const cities = [
    //TODO: change this to city and adapt the page
    {
        name: "Beirut",
        imageUrl: require("../assets/beirut.jpeg"),
    },
    {
        name: "Paris",
        imageUrl: require("../assets/Paris.jpeg"),
    },
];

const themes = [
    {
        name: "MONUMENTS",
        imageUrl: require("../assets/monuments.jpg"),
    },
]


const CreateGameScreen = ({ city = null, theme = null, pois, setPois }) => {
    const navigation = useNavigation();
    const [isReadyToStart, setReadyToStart] = useState(false);
    // const [img_city, setImgCity] = useState(QUESTION_MARK_ICON);
    // const [img_theme, setImgTheme] = useState(QUESTION_MARK_ICON);

    useEffect(() => {
        if (city && theme) {
            setReadyToStart(true);
        }
    });

    const startGame = () => {
        if (!isReadyToStart) return;
        getRandomQuestions(city, theme).then(result => {
            setPois(result);
            // navigation.navigate("GameScreen");
        })
    };

    useEffect(() => {
        if (pois.length > 0) {
            console.log(pois);
            BackgroundSound.play();
            navigation.navigate('GameScreen');
        }
    }, [pois]);

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Left>
                    <Button transparent onPress={() => navigation.navigate('MainScreen')}>
                        <Ionicons name="ios-arrow-back" size={24} color="white" />
                    </Button>
                </Left>
                <Body style={styles.bodyContent}>
                    <Title style={{ fontSize: 40 }}>Create a game</Title>
                </Body>
                <Right></Right>
            </Header>
            <View style={styles.optionsContent}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{ height: 100, width: 100 }}
                        onPress={() => navigation.navigate('CityScreen')}
                    >
                        <Image
                            source={QUESTION_MARK_ICON}
                            style={{ height: 100, width: 100 }}
                        />
                        <Text>{city || "Choose a city"}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={{ height: 100, width: 100 }}
                        onPress={() => navigation.navigate('ThemeScreen')}
                    >
                        <Image
                            source={QUESTION_MARK_ICON}
                            style={{ height: 100, width: 100 }}
                        />
                        <Text>{theme || "Choose a theme"}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Button
                        disabled={!isReadyToStart}
                        rounded
                        style={{
                            width: '50%',
                            height: 60,
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: isReadyToStart ? APP_COLOR : '',
                        }}
                        onPress={startGame}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Roboto_medium',
                                fontSize: 30,
                            }}
                        >
                            Start Game
                        </Text>
                    </Button>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    optionsContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 80,
    },
    contentHeader: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
});

import { setPois } from '../_actions/game';
import { BackgroundSound } from '../_helpers/singleton';
const mapStateToProps = state => ({
    city: state.game.city,
    theme: state.game.theme,
    pois: state.game.pois,
});

const mapDispatchToProps = dispatch => ({
    setPois: pois => dispatch(setPois(pois)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);
