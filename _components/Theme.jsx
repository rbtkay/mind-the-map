import React, { Component } from "react";
import { Image, TouchableOpacity, View, StyleSheet, AsyncStorage } from "react-native";
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
import { setCity } from "../_actions/game";
import {BackgroundSound} from "../_helpers/singleton";

const Theme = ({ image, name, setCity }) => {
    const navigation = useNavigation();

    const onPress = () => {
        console.log("theme_name - ", name); // TODO: use name variable to enter city
        BackgroundSound.start();
        setCity("Paris");
    };

    return (
        <TouchableOpacity
            style={styles.th_container}
            onPress={async () => {
                AsyncStorage.getItem("musicStatus", (error, value) => {
                    console.log("value", value)
                    if (error) {
                        console.log(error);
                        return;
                    }
                    if (value == "on") BackgroundSound.start();
                    setCity("Paris");
                });
            }}
        >
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
                            <Text style={{ fontSize: 30 }}>{name}</Text>
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
    setCity: (city) => dispatch(setCity(city)),
});

const styles = StyleSheet.create({
    th_container: {
        flex: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
