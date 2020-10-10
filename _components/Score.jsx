import React from "react";

import { StyleSheet, View, Image } from "react-native";
import { Text } from "native-base";

const distance_icon = require("../assets/distance.png");
const time_icon = require("../assets/stopwatch.png");

const Score = ({score}) => {
    return (
        <View style={{ flex: 5, paddingLeft: 25 }}>
            <View
                style={{
                    flex: 1.25,
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 0.33,
                    }}
                >
                    <Image source={distance_icon} style={styles.icon_image} />
                </View>
                <View
                    style={{
                        flex: 0.67,
                        alignContent: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            marginLeft: 5,
                        }}
                    >
                        {"distance"}m
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1.25,
                    flexDirection: "row",
                }}
            >
                <View style={{ flex: 0.33 }}>
                    <Image source={time_icon} style={styles.icon_image} />
                </View>
                <View
                    style={{
                        flex: 0.67,
                        alignContent: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            marginLeft: 5,
                        }}
                    >
                        {"time"}s
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 2.5,
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontSize: 24,
                            paddingBottom: 50
                        }}
                    >
                        Score: {score}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon_image: {
        width: 50,
        height: 50,
    },
});

export default Score;
