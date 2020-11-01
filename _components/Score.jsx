import React from "react";

import { StyleSheet, View, Image } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";

const distance_icon = require("../assets/distance.png");
const time_icon = require("../assets/stopwatch.png");

const Score = ({ score, round_distance, round_time }) => {
    console.log(round_time, round_distance, "!!!");
    return (
        <View style={{ flex: 5, paddingLeft: 25 }}>
            <View
                style={{
                    flex: 1.25,
                    flexDirection: "row",
                    marginTop: 10
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
                        {parseFloat(round_distance).toFixed(0)}m
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1.25,
                    flexDirection: "row",
                    marginTop: 5
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
                        {(parseFloat(round_time) / 1000).toFixed(2)}s
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
                            paddingBottom: 50,
                            marginTop: 10
                        }}
                    >
                        Score: {score}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    round_distance: state.game.round_distance_in_m,
    round_time: state.game.round_time,
});

const styles = StyleSheet.create({
    icon_image: {
        width: 50,
        height: 50,
    },
});

export default connect(mapStateToProps, null)(Score);
