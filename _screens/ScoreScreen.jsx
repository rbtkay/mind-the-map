import React from 'react';
import { Container, View, Text, Button, Content } from 'native-base';
import CustomList from '../_components/CustomList';
import ScoreBoard from '../_components/ScoreBoard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ScoreScreen = () => {
	const navigation = useNavigation();
	const game = useSelector(state => state.game);
	const { pois } = game;
	return (
		<Container>
			<Content>
				<View style={{ height: 100, backgroundColor: 'blue' }}>
					<Text style={{ textAlign: 'center', color: 'white' }}>Score</Text>
					<Button onPress={() => navigation.navigate('MainScreen')}>
						<Text>+</Text>
					</Button>
				</View>
				<ScoreBoard />
				<CustomList title="You Discovered" pois={pois} />
			</Content>
		</Container>
	);
};

export default ScoreScreen;
