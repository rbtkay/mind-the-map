// import React, { useEffect, useState } from "react";
// import { View, Image, Text } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// // const Theme = ({ name, image }) => {
// //     if (!name) {
// //         return null;
// //     } else {
// //         return (
// //             <TouchableOpacity
// //                 style={{
// //                     alignContent: "center",
// //                     justifyContent: "center",
// //                 }}
// //                 // onPress={() => navigation.navigate("MainScreen")}
// //             >
// //                 <Image
// //                     source={image}
// //                     resizeMode="contain"
// //                     style={{ width: 200, height: 200 }}
// //                 />
// //                 <Text style={{ textAlign: "center" }}>{name}</Text>
// //             </TouchableOpacity>
// //         );
// //     }
// // };

// // export default Theme;

///////////////////////////////

import React, { Component } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { getMonuments } from "../_api/pois";
import { setMonuments, setCity } from "../_actions/game";

const NUMBER_OF_QUESTION_PER_ROUND = 5;

const Theme = ({ image, name, setMonuments, setCity }) => {
    const navigation = useNavigation();

    const onPress = () => {
        const chosen_ids = [];
        for (let i = 0; i < NUMBER_OF_QUESTION_PER_ROUND; i++) {
            const current_number = `${name}_${Math.floor(Math.random() * 42)}`;
            chosen_ids.push(current_number);
        }
        getMonuments(chosen_ids, "Paris").then((monuments) => {
            setMonuments(monuments);
            setCity("Paris");
            navigation.navigate("MainScreen");
        });
    };

    return (
        <TouchableOpacity style={styles.th_container} onPress={onPress}>
            <Card>
                <CardItem cardBody bordered>
                    <Body>
                        <Image
                            source={image}
                            resizeMode="stretch"
                            style={{
                                width: "100%",
                                height: 150,
                            }}
                        />
                        <Button transparent style={{ marginBottom: 0 }}>
                            <Text>{name}</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
};

const mapStateToProps = (state) => ({
    monuments: state.monuments,
});
const mapDispatchToProps = (dispatch) => ({
    setMonuments: (monuments) => dispatch(setMonuments(monuments)),
    setCity: (city) => dispatch(setCity(city)),
});

const styles = StyleSheet.create({
    th_container: {
        flex: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
