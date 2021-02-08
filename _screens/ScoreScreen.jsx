import React from 'react';
import { Container, View, Text, Button, Content } from 'native-base';
import CustomList from '../_components/CustomList';
import ScoreBoard from '../_components/ScoreBoard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLORS } from '../_css/styles';
import { ImageBackground } from 'react-native';

const ScoreScreen = () => {
	const game = useSelector(state => state.game);

	const { pois, total_score, round_number } = game;

	return (
		<Container style={{backgroundColor: COLORS.background}}>
			<ImageBackground
				source={require('../assets/image_yan/final-imgs/map-bg2.png')}
				style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
			>
				<Content>
					<View
						style={{
							height: 100,
							backgroundColor: COLORS.background,
							justifyContent: 'center',
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								color: 'white',
								fontFamily: 'Roboto_medium',
								fontSize: 30,
							}}
						>
							Score
						</Text>
					</View>
					<ScoreBoard score={total_score} />
					<CustomList title="You Discovered" items={pois} list_type={'pois'} />
				</Content>
			</ImageBackground>
		</Container>
	);
};

export default ScoreScreen;
