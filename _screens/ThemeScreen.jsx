// import { View, Dimensions, StyleSheet, LogBox } from "react-native";
// import { Header, Body, Container, Title, Content } from "native-base";
// import React, { useEffect } from "react";
// import { APP_COLOR } from "../assets/constant_styles";
// import { getRandomNumberForQuestions } from "../_utils/Randomizer";
// import { connect } from "react-redux";
// import Choice from "../_components/Theme";
// import { useNavigation } from "@react-navigation/native";
// import { setMonuments } from "../_reducers/game";
// import { themes } from "../_utils/constants";
// const ThemeScreen = () => {
//     const navigation = useNavigation();

//     return (
//         <Container>
//             <Header
//                 androidStatusBarColor={APP_COLOR}
//                 style={{ backgroundColor: APP_COLOR }}
//                 iosBarStyle={APP_COLOR}
//             >
//                 <Body style={styles.bodyContent}>
//                     <Title style={{ fontSize: 40 }}>Choose a theme</Title>
//                 </Body>
//             </Header>
//             <Content style={{ backgroundColor: APP_COLOR }}>
//                 <Choice type={"theme"} name={themes[0].name} image={themes[0].imageUrl} key={1} />
//             </Content>
//         </Container>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     row: {
//         width: Dimensions.get("window").width,
//         flex: 2,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     bodyContent: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignContent: "center",
//     },
//     contentHeader: {
//         textAlign: "center",
//         marginTop: 50,
//         marginBottom: 50,
//     },
// });

// const mapStateToProps = (state) => ({
//     theme: state.game.theme,
// });

// const mapDispatchToProps = (dispatch) => ({
//     setMonuments: (monuments) => dispatch(setMonuments(monuments)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ThemeScreen);
