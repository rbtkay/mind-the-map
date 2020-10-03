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
import { getDistanceFromLatLonInKm } from "../_helpers";

const MainScreen = ({ navigation, monuments }) => {
    LogBox.ignoreLogs(["Failed prop type", "Setting a timer"]);

    const [marker, setMarker] = useState(null);
    const [correctMarker, setCorrectMarker] = useState(null);
    const [correctMarkerArray, setCorrectMarkerArray] = useState([]);
    const [numberOfAttempts, setNumberOfAttemps] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const placeMarker = (e) => {
        if (!isPlaying) return;

        setMarker(e.nativeEvent.coordinate);
        setCorrectMarker(correctMarkerArray[numberOfAttempts]);
        setIsPlaying(false);
    };

    const nextPoi = () => {
        if (numberOfAttempts >= correctMarkerArray.length - 1) {
            navigation.navigate("ScoreScreen");
        } else {
            setNumberOfAttemps(numberOfAttempts + 1);
            setMarker(null);
            setCorrectMarker(null);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (marker) {
            console.log("marker", marker);
            console.log("correctMarker", correctMarker);
            let distanceBetweenPinsInKm = getDistanceFromLatLonInKm(
                marker.latitude,
                marker.longitude,
                correctMarker.latitude,
                correctMarker.longitude
            );

            distanceBetweenPinsInKm = Number(
                distanceBetweenPinsInKm
            ).toFixed(3);

            console.log(
                "distanceBetweenPinsInKm - ",
                distanceBetweenPinsInKm
            );
        }
    }, [marker]);

    useEffect(() => {
        // console.log("monuments:", monuments);
        const correctCoordinates = [];
        monuments.forEach((mon) => {
            // console.log("name", mon.name);
            // // console.log(mon);
            // console.log("latitude", mon.latitude_decimal);
            // if(mon.name == "Lake Annecy"){
            //     console.log(mon);
            // }
            correctCoordinates.push({
                name: mon.name,
                latitude: mon.latitude_decimal,
                longitude: mon.longitude_decimal,
            });
            // setCorrectMarker([
            //     ...correctMarker,
            //     {
            //         latitude: mon.latitude,
            //         longitude: mon.longitude,
            //     },
            // ]);
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
                        {/* <Timer /> */}
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

const mapStateToProps = (state) => ({
    monuments: state.game.monuments,
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

export default connect(mapStateToProps, null)(MainScreen);

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
