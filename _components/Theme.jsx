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

const Theme = ({ image, name }) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("MainScreen");
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

const styles = StyleSheet.create({
    th_container: {
        flex: 1,
    },
});

export default Theme;
