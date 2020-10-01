import React from "react";
import { View, StyleSheet } from "react-native";
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
    Text,
    H2,
    H1,
    FooterTab,
    Footer,
} from "native-base";
import Theme from "../_components/Theme";

const ScoreScreen = () => {
    return (
        <Container>
            <Header>
                <Body style={styles.bodyContent}>
                    <Title>Your Score</Title>
                </Body>
            </Header>
            <Content>
                <View style={styles.container}>
                    <H1>CONGRATS</H1>

                    <View style={styles.scoreContent}>
                        <H2>Your Score: xxx / xxx</H2>
                    </View>
                    <View>
                        {/* liste de monument decouvert */}
                    </View>
                </View>
            </Content>
            <Footer>
                <FooterTab>
                    <Button active>
                        <Text>Score</Text>
                    </Button>
                    <Button>
                        <Text>Leaderboard</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },

    scoreContent: {
        marginTop: 25,
        padding: 25,
        borderColor: "red",
        borderRadius: 5,
        borderWidth: 5,
        borderStyle: "dashed",
    },

    button: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    bodyContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
});

export default ScoreScreen;
