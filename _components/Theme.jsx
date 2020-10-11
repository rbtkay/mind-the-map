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
import { setCity } from "../_actions/game";


const Theme = ({ image, name, setCity }) => {
    const navigation = useNavigation();

    const onPress = () => {
        console.log("theme_name - ", name); // TODO: use name variable to enter city
        // const chosen_ids = [];
        // for (let i = 0; i < NUMBER_OF_QUESTION_PER_ROUND; i++) {
        //     const current_number = `${name}_${Math.floor(Math.random() * 42)}`;
        //     chosen_ids.push(current_number);
        // }
        setCity("Paris");
        // navigation.replace("MainScreen");
        // getMonuments(chosen_ids, "Paris").then((monuments) => { // TODO: this function needs to be on the MainScreen since it is also called on replay game
        //     setMonuments(monuments);
        //     setCity("Paris");
        // });
    };

    return (
        <TouchableOpacity style={styles.th_container} onPress={()=> setCity("Paris")}>
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
    setCity: (city) => dispatch(setCity(city)),
});

const styles = StyleSheet.create({
    th_container: {
        flex: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
