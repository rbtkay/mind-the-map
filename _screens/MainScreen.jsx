import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
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

import Timer from "../_components/Timer";

const MainScreen = ({ navigation }) => {
    const [marker, setMarker] = useState(null); 
    const [numberOfAttempts, setNumberOfAttemps] = useState(0);

    const placeMarker = (e) => {
        setNumberOfAttemps(numberOfAttempts + 1);
        setMarker(e.nativeEvent.coordinate);
    };

    useEffect(() => {
        if (numberOfAttempts >= 5) {
            navigation.navigate("ScoreScreen");
        }
    }, [numberOfAttempts]);

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right>
                    <Text>X</Text>
                </Right>
            </Header>
            <Content>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        
                        initialRegion={{
                            latitude: 48.8582222,
                            longitude: 2.2944999999999998,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={placeMarker}
                    >
                        {marker && <MapView.Marker coordinate={marker} />}
                    </MapView>
                    <Overlay style={styles.overlay} >
                        <Timer  />
                    </Overlay>
                </View>
            </Content>
        </Container>
    );
};

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
    overlay:{
        position: 'absolute',
        bottom: 100,
        right: 40
    }
};


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
export default MainScreen;
