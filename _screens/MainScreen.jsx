import React, { useState, useEffect, createRef } from "react";
import { View, Text, Dimensions, LogBox, Settings } from "react-native";
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
} from "native-base";

import MapView, { Overlay } from "react-native-maps";
import { connect } from "react-redux";
import { NavigationContext } from "@react-navigation/native";
import {
    getDistanceFromLatLonInKm,
    getTimeTakenFromAnimation,
} from "../_helpers";
import Timer from "../_components/Timer";

const INITIAL_REGION = {
    latitude: 48.8555, // south / north
    longitude: 2.34, // west / east
    latitudeDelta: 0.1,
    longitudeDelta: 0.16, // zoom in / out
};

const MainScreen = ({
    navigation,
    monuments,
    toggleTimer,
    resetTimer,
    value,
    setScore,
    score,
    calculateTotalScore
}) => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const [marker, setMarker] = useState(null);
    const [correctMarker, setCorrectMarker] = useState(null);
    const [correctMarkerArray, setCorrectMarkerArray] = useState([]);
    const [numberOfAttempts, setNumberOfAttemps] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const mapRef = createRef();

    // const placeMarker = (e) => {
    //     if (!isPlaying) return;
    //     console.log("onPlay - ", value);
    //     setMarker(e.nativeEvent.coordinate);
    //     setCorrectMarker(correctMarkerArray[numberOfAttempts]);
    //     toggleTimer(); // stop timer
    //     //TODO: setScore here
    //     // setScore();
    // };

    useEffect(() => {
        if (!marker) return;

        setCorrectMarker(correctMarkerArray[numberOfAttempts]);
        toggleTimer(); // stop timer
        mapRef.current.animateToRegion(INITIAL_REGION);
    }, [marker]);

    useEffect(() => {
        if(value == 0) return;

        setScore(value, {
            lat1: marker.latitude,
            long1: marker.longitude,
            lat2: correctMarker.latitude,
            long2: correctMarker.longitude,
        });
        resetTimer();
    }, [value]);

    useEffect(()=>{
        setIsPlaying(false)
    },[score])

    const nextPoi = () => {
        if (numberOfAttempts >= correctMarkerArray.length - 1) {
            calculateTotalScore();
            navigation.navigate("ScoreScreen");
        } else {
            setNumberOfAttemps(numberOfAttempts + 1);
            setMarker(null);
            setCorrectMarker(null);
            setIsPlaying(true);
            toggleTimer();
        }
    };

    //TODO: when game status is resetting make the timer appear back with the map not clickable

    // useEffect(() => {
    //     if (!marker || value == 0) return;
    //     setIsPlaying(false);
    // }, []);

    // useEffect(() => {
    //     if (isPlaying) return;
    //     console.log(marker);
    //     console.log(value);
    //     setScore(value, {
    //         lat1: marker.latitude,
    //         long1: marker.longitude,
    //         lat2: correctMarker.latitude,
    //         long2: correctMarker.longitude,
    //     });
    // }, [isPlaying]);

    useEffect(() => {
        setIsPlaying(true)
        const correctCoordinates = [];
        monuments.forEach((mon) => {
            correctCoordinates.push({
                name: mon.name,
                latitude: mon.latitude_decimal,
                longitude: mon.longitude_decimal,
            });
        });
        setCorrectMarkerArray(correctCoordinates);
    }, []);

    return (
        <Container>
            <Header>
                <Left></Left>
                <Body>
                    {correctMarkerArray.length > 0 && (
                        <Title>
                            {correctMarkerArray[numberOfAttempts].name}
                        </Title>
                    )}
                </Body>
            </Header>
            <Content>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={INITIAL_REGION}
                        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
                        ref={mapRef}
                    >
                        {marker && <MapView.Marker coordinate={marker} />}
                        {correctMarker && (
                            <MapView.Marker
                                coordinate={{
                                    latitude: correctMarker.latitude,
                                    longitude: correctMarker.longitude,
                                }}
                                pinColor={"green"}
                            />
                        )}
                        {/*
                         {correctMarkerArray.map((mark, i) => {
                            return (
                                <MapView.Marker
                                    key={i}
                                    coordinate={{
                                        latitude: mark.latitude,
                                        longitude: mark.longitude,
                                    }}
                                    pinColor={"green"}
                                />
                            );
                        })} */}
                    </MapView>
                    <Overlay style={styles.overlay} image={null}>
                        {isPlaying && <Timer />}
                        {/* <Timer/> */}
                        {!isPlaying && (
                            <Button onPress={() => nextPoi()}>
                                <Text>Next</Text>
                            </Button>
                        )}
                        {/* <View
                            style={{
                                backgroundColor: "red",
                                width: Dimensions.get("window").width,
                                height: 100,
                            }}
                        ></View> */}
                    </Overlay>
                </View>
            </Content>
        </Container>
    );
};

import { toggleTimer, resetTimer, setTimerValue } from "../_actions/Timer";
import { setScore, calculateTotalScore } from "../_actions/game";

const mapStateToProps = (state) => ({
    monuments: state.game.monuments,
    value: state.timer.value,
    score: state.game.score
});
const mapDispatchToProps = (dispatch) => ({
    // hideModal: () => dispatch(hideModal()),
    // showModal: () => dispatch(showModal()),
    // addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    // addIngredientToDatabase: (ingredient) =>
    //     addIngredientToDatabase(ingredient),
    // setMessage: (message) => dispatch(setMessage(message)),
    toggleTimer: (isRunning) => dispatch(toggleTimer(isRunning)),
    resetTimer: () => dispatch(resetTimer()),
    setTimerValue: (value) => dispatch(setTimerValue(value)),
    setScore: (animated_value, coordinates) =>
        dispatch(setScore(animated_value, coordinates)),
    calculateTotalScore: () => dispatch(calculateTotalScore())
});
const styles = {
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
        position: "absolute",
        bottom: 100,
        right: 40,
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

// customMapStyle={[
//     {
//         featureType: "administrative",
//         elementType: "geometry",
//         stylers: [
//             {
//                 visibility: "off",
//             },
//         ],
//     },
//     {
//         featureType: "poi",
//         stylers: [
//             {
//                 visibility: "off",
//             },
//         ],
//     },
//     {
//         featureType: "road",
//         elementType: "labels.icon",
//         stylers: [
//             {
//                 visibility: "off",
//             },
//         ],
//     },
//     {
//         featureType: "transit",
//         stylers: [
//             {
//                 visibility: "off",
//             },
//         ],
//     },
// ]}
