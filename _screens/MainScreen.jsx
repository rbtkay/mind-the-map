import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Image, ImageBackground } from 'react-native';
import {
    Container,
    Header,
    Button,
    Body,
    Title,
    Text,
    Content,
    List,
    ListItem,
    Thumbnail,
    Right,
    Left,
} from 'native-base';
import { AsyncStorage, LogBox } from 'react-native';
import { connect } from 'react-redux';
import { APP_COLOR } from '../assets/constant_styles';
import { useNavigation } from '@react-navigation/native';
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP } from 'expo-av/build/Audio';
import { setUser } from '../_actions/user';
import { SimpleLineIcons } from '@expo/vector-icons';
const MainScreen = ({ user, setUser }) => {
    LogBox.ignoreLogs(['Failed prop type', 'Setting a timer']);
    const navigation = useNavigation();

    const challengeSomeone = () => {
        console.log('clicked');
        console.log(user);
        // TODO: make a page where the challenge / game is created.
        // reassign randomref to users
        // challenge someone
        // retrigger challenge

        // AsyncStorage.getItem("random_ref", (error, value) => {
        //     if (error) {
        //         console.log(error);
        //         return;
        //     }
        //     if (value) console.log("random_ref", value);
        // });
    };

    const logout = () => {
        AsyncStorage.clear(() => {
            setUser({ email: null, username: null, random_ref: null });
            console.log('destroying user');
        });
    };

    return (
        <Container>
            <Header
                androidStatusBarColor={APP_COLOR}
                style={{ backgroundColor: APP_COLOR }}
                iosBarStyle={APP_COLOR}
            >
                <Body style={styles.bodyContent}>
                    <Left>
                        <Button transparent onPress={() => logout()}>
                            <SimpleLineIcons name="logout" size={24} color="white" />
                        </Button>
                    </Left>
                    <Title style={{ fontSize: 40 }}>Mind the map</Title>
                    <Right></Right>
                </Body>
            </Header>
            <Content style={{ backgroundColor: APP_COLOR }}>
                <View
                    style={{
                        backgroundColor: 'yellow',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Thumbnail square source={require('../assets/map_example.png')} />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            marginLeft: 20,
                        }}
                    >
                        <Text>Robert</Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        rounded
                        style={styles.challenge_opponent_btn}
                        onPress={() => challengeSomeone()}
                    >
                        <Text style={{ fontSize: 30 }}>Challenge Opponent</Text>
                    </Button>
                </View>
                <View style={styles.container_game_btn}>
                    <View
                        style={{
                            width: '80%',
                            backgroundColor: 'red',
                            borderRadius: 20,
                        }}
                    >
                        <ImageBackground
                            source={require('../assets/map_example.png')}
                            style={styles.image_background}
                        >
                            <View style={styles.align_center}>
                                <Button
                                    style={styles.game_btn}
                                    onPress={() =>
                                        navigation.navigate('CreateGameScreen')
                                    }
                                >
                                    <Text>Single player</Text>
                                </Button>
                                <Button style={styles.game_btn}>
                                    <Text>Invite a friend</Text>
                                </Button>
                            </View>
                            <View style={styles.align_center}>
                                <Button style={styles.game_btn}>
                                    <Text>Settings</Text>
                                </Button>
                                <Button style={styles.game_btn}>
                                    <Text>Credits</Text>
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        flex: 1,
                        margin: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'yellow',
                            flex: 1,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Ongoing Games</Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <List>
                            <ListItem>
                                <View style={styles.list_item}>
                                    <Thumbnail
                                        source={require('../assets/map_example.png')}
                                    />
                                    <Text>VS Simon</Text>
                                    <Text>Your turn</Text>
                                </View>
                            </ListItem>
                            <ListItem>
                                <View style={styles.list_item}>
                                    <Thumbnail
                                        source={require('../assets/map_example.png')}
                                    />
                                    <Text>VS Simon</Text>
                                    <Text>Your turn</Text>
                                </View>
                            </ListItem>
                            <ListItem>
                                <View style={styles.list_item}>
                                    <Thumbnail
                                        source={require('../assets/map_example.png')}
                                    />
                                    <Text>VS Simon</Text>
                                    <Text>Your turn</Text>
                                </View>
                            </ListItem>
                        </List>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

const styles = StyleSheet.create({
    menu: {
        flex: 3,
        justifyContent: 'space-evenly',
    },
    menuBtn: {
        width: 300,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
        backgroundColor: APP_COLOR,
    },
    title: { textAlign: 'center', flex: 2 },
    menuTxt: {
        fontSize: 40,
    },
    image_background: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    bodyContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    profile_pic: {
        width: 50,
        height: 50,
    },
    challenge_opponent_btn: {
        width: '90%',
        height: 80,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#0A8754',
    },
    game_btn: {
        margin: 20,
        width: 100,
        height: 80,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#4F5D2F',
    },
    align_center: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
    list_item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    container_game_btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
});

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
