import { Container, View, Button, Icon, Thumbnail } from 'native-base';
import { Image, Text } from 'react-native';
import styles, { COLORS } from '../_css/styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ScoreBoard = ({ score }) => {
	const navigation = useNavigation();

	return (
		<View
			style={{
				backgroundColor: 'white',
				borderRadius: 20,
				flex: 1,
				margin: 10,
				marginBottom: 30,
				padding: 20,
				paddingTop: 0,
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 8,
				},
				shadowOpacity: 0.44,
				shadowRadius: 10.32,

				elevation: 16,
			}}
		>
			<Text style={styles.title}>Bravo !</Text>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Image
						source={require('../assets/Paris.jpeg')}
						style={{ height: 125, width: 125 }}
					/>
					<View style={{ padding: 30 }}>
						<Text style={{ fontFamily: 'Roboto_medium', fontSize:25, color: COLORS.Darker_font_color, textAlign: 'center' }}>
							{score}
							{'\n'} points
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Button
					style={[
						styles.coolBtn,
						{
							backgroundColor: COLORS.green_buttons,
							top: 50,
							justifyContent: 'center',
							width: '70%',
						},
					]}
					onPress={() => navigation.navigate('MainScreen')}
				>
					<Text
						style={{
							color: COLORS.white_containers,
							fontFamily: 'Roboto_medium',
							fontSize: 20,
						}}
					>
						Back to Homepage
					</Text>
				</Button>
			</View>
		</View>
	);
};

export default ScoreBoard;
