import React, { useState, useEffect, createRef } from "react";
import { View, Dimensions, LogBox, StyleSheet, Image } from "react-native";
import { Content, Container, Header, Left, Body, Title, H2 } from "native-base";

import MapView, { Overlay } from "react-native-maps";
import { connect } from "react-redux";
import { NavigationContext } from "@react-navigation/native";
import {
    getDistanceFromLatLonInKm,
    getTimeTakenFromAnimation,
} from "../_helpers";
import Timer from "../_components/Timer";
import Score from "../_components/Score";
import AudioButton from "../_components/AudioButton";
import { APP_COLOR } from "../assets/constant_styles";
import { Audio } from "expo-av";
import { BackgroundSound, STATUS } from "../_helpers/singleton";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

const INITIAL_REGION = {
    latitude: 48.8555, // south / north
    longitude: 2.34, // west / east
    latitudeDelta: 0.1,
    longitudeDelta: 0.16, // zoom in / out
};

const customMapStyle = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

const next_icon = require("../assets/navigation.png");
const GameScreen = ({
    navigation,
    pois,
    toggleTimer,
    resetTimer,
    value,
    setScore,
    score,
    calculateTotalScore,
    startTimer,
    timer,
    is_time_done,
}) => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const [marker, setMarker] = useState(null);
    const [correctMarker, setCorrectMarker] = useState(null);
    const [correctMarkerArray, setCorrectMarkerArray] = useState([]);
    const [numberOfAttempts, setNumberOfAttemps] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const mapRef = createRef();

    useEffect(() => {
        if (!marker) return;

        setCorrectMarker(correctMarkerArray[numberOfAttempts]);
        toggleTimer(); // stop timer
        mapRef.current.animateToRegion(INITIAL_REGION);
    }, [marker]);

    useEffect(() => {
        if (value == 0) return;

        setScore(value, {
            lat1: marker.latitude,
            long1: marker.longitude,
            lat2: correctMarker.latitude,
            long2: correctMarker.longitude,
        });
        resetTimer();
    }, [value]);

    useEffect(() => {
        setIsPlaying(false);
    }, [score]);

    const nextPoi = () => {
        if (numberOfAttempts >= correctMarkerArray.length - 1) {
            calculateTotalScore();
            navigation.replace("ScoreScreen");
        } else {
            setNumberOfAttemps(numberOfAttempts + 1);
            setMarker(null);
            setCorrectMarker(null);
            setIsPlaying(true);
            toggleTimer();
        }
    };

    useEffect(() => {
        console.log(pois);

        if (!pois) return;

        setIsPlaying(true);
        const correctCoordinates = [];
        pois.forEach((poi) => {
            correctCoordinates.push({
                name: poi.name,
                latitude: poi.lat,
                longitude: poi.long,
            });
        });
        setCorrectMarkerArray(correctCoordinates);

        if (timer.status == TIMER_STATUS.ready) startTimer();
    }, []);

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={{ alignItems: "center" }}>
                    {correctMarkerArray.length > 0 && (
                        <Title style={{ fontSize: 40 }}>
                            {correctMarkerArray[numberOfAttempts].name}
                        </Title>
                    )}
                </Body>
                <Left style={{ alignItems: "flex-end" }}>
                    <AudioButton />
                </Left>
            </Header>
            <Content>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={INITIAL_REGION}
                        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
                        ref={mapRef}
                        customMapStyle={customMapStyle}
                    >
                        {marker && (
                            <MapView.Marker
                                coordinate={marker}
                                pinColor={APP_COLOR}
                            />
                        )}
                        {correctMarker && (
                            <MapView.Marker
                                coordinate={{
                                    latitude: correctMarker.latitude,
                                    longitude: correctMarker.longitude,
                                }}
                                pinColor={"green"}
                            />
                        )}
                    </MapView>
                    <Overlay style={styles.overlay} image={null}>
                        {isPlaying && <Timer />}
                        {!isPlaying && score && (
                            <View style={styles.score_view}>
                                {!is_time_done ? (
                                    <Score score={score[numberOfAttempts]} />
                                ) : (
                                    <View style={styles.lost_text}>
                                        <H2 style={{ color: "white" }}>
                                            You Got Lost!
                                        </H2>
                                    </View>
                                )}
                                <View style={{ flex: 2 }}>
                                    <View style={styles.next_btn}>
                                        <TouchableOpacity onPress={nextPoi}>
                                            <Image
                                                source={next_icon}
                                                style={styles.next_icon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Overlay>
                </View>
            </Content>
        </Container>
    );
};

import {
    toggleTimer,
    resetTimer,
    setTimerValue,
    TIMER_STATUS,
    startTimer,
} from "../_actions/Timer";
import { setScore, calculateTotalScore } from "../_actions/game";
import { TouchableOpacity } from "react-native-gesture-handler";

const mapStateToProps = (state) => ({
    pois: state.game.pois,
    value: state.timer.value,
    timer: state.timer,
    score: state.game.score,
    is_time_done: state.game.is_time_done,
});
const mapDispatchToProps = (dispatch) => ({
    toggleTimer: (isRunning) => dispatch(toggleTimer(isRunning)),
    resetTimer: () => dispatch(resetTimer()),
    setTimerValue: (value) => dispatch(setTimerValue(value)),
    setScore: (animated_value, coordinates) =>
        dispatch(setScore(animated_value, coordinates)),
    calculateTotalScore: () => dispatch(calculateTotalScore()),
    startTimer: () => dispatch(startTimer()),
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    overlay: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignContent: "center",
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
    },
    next_btn: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        transform: [{ rotate: "90deg" }],
    },
    score_view: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: APP_COLOR,
        paddingRight: 10,
    },
    next_icon: {
        width: 100,
        height: 100,
    },
    lost_text: {
        height: 120,
        flex: 2,
        justifyContent: "center",
        marginLeft: 30,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
