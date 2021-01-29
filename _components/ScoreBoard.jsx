import { Container, View, Button, Icon, Thumbnail } from 'native-base';
import { Image, Text } from 'react-native';
import styles from '../_css/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const ScoreBoard = () => {
	const game = useSelector(state => state.game);

	console.log(game);
	return (
		<View
			style={{
				backgroundColor: 'white',
				borderRadius: 20,
				flex: 1,
				margin: 20,
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
					flex: 3,
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
						style={{ height: '100%', width: 100 }}
					/>
				</View>
				<View style={{ flex: 2 }}>
					<View style={{ padding: 30 }}>
						<Text style={{ fontSize: 30, textAlign: 'center' }}>
							{game.total_score}
							{'\n'} points
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<Button style={styles.smallBtn}>
							<Thumbnail
								source={require('../assets/replay.png')}
								style={{ tintColor: 'blue' }}
								small
								square
							/>
						</Button>
						<Button style={styles.smallBtn}>
							<Text style={{ color: 'blue' }}>Next</Text>
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ScoreBoard;
