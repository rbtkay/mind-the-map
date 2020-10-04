import React, { useState, useEffect } from "react";
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

const MainScreen = ({
    navigation,
    monuments,
    toggleTimer,
    resetTimer,
    value,
    setScore,
    setTimerValue,
}) => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const [marker, setMarker] = useState(null);
    const [correctMarker, setCorrectMarker] = useState(null);
    const [correctMarkerArray, setCorrectMarkerArray] = useState([]);
    const [numberOfAttempts, setNumberOfAttemps] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const placeMarker = (e) => {
        if (!isPlaying) return;
        console.log("onPlay - ", value);
        setMarker(e.nativeEvent.coordinate);
        setCorrectMarker(correctMarkerArray[numberOfAttempts]);
        toggleTimer(false);
    };

    const nextPoi = () => {
        if (numberOfAttempts >= correctMarkerArray.length - 1) {
            navigation.navigate("ScoreScreen");
        } else {
            setNumberOfAttemps(numberOfAttempts + 1);
            setMarker(null);
            setCorrectMarker(null);
            setIsPlaying(true);
            toggleTimer(true);
        }
    };

    useEffect(() => {
        if (!marker || value == 0) return;
        setIsPlaying(false);
    }, [marker, value]);

    useEffect(() => {
        if (isPlaying) return;
        console.log(marker);
        console.log(value);
        setScore(value, {
            lat1: marker.latitude,
            long1: marker.longitude,
            lat2: correctMarker.latitude,
            long2: correctMarker.longitude,
        });
    }, [isPlaying]);

    useEffect(() => {
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
                {/* <Right>
                    <Button onPress={() => setCorrectMarker(null)}>
                        <Text>Next</Text>
                    </Button>
                </Right> */}
            </Header>
            <Content>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: 48.8555,
                            longitude: 2.3522,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.13,
                        }}
                        onPress={placeMarker}
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
                        {/* TODO: move back to position on every question
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
                        {!isPlaying && (
                            <Button onPress={() => nextPoi()}>
                                <Text>Next</Text>
                            </Button>
                        )}
                    </Overlay>
                </View>
            </Content>
        </Container>
    );
};

import { toggleTimer, resetTimer, setTimerValue } from "../_actions/Timer";
import { setScore } from "../_actions/game";

const mapStateToProps = (state) => ({
    monuments: state.game.monuments,
    value: state.timer.value,
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
