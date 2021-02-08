import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'native-base';
import { Modal, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles, { COLORS } from '../../_css/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setChallengeCity, setPracticeCity } from '../../_reducers/user';
import { updateUserCity } from '../../_api/user';

const ChooseCityModal = ({ isVisible = false, chosen_edit, closeModal }) => {
	const user = useSelector(state => state.user);

	const dispatch = useDispatch();
	const [city, setCity] = useState();
	//TODO: set the chosen city
	useEffect(() => {
		setCity(chosen_edit == 'Practice' ? user.practice_city : user.challenge_city);
	}, [chosen_edit]);

	const saveCity = () => {
		updateUserCity(user.email, chosen_edit, city);

		dispatch(
			chosen_edit == 'Practice' ? setPracticeCity(city) : setChallengeCity(city)
		);
		closeModal();
	};

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', flex: 1 }}>
				<View
					style={{
						margin: 20,
						marginTop: 120,
						backgroundColor: 'white',
						borderRadius: 20,
						padding: 20,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={styles.title}>{`Edit ${chosen_edit}`}</Text>
						<TouchableOpacity onPress={closeModal}>
							<Image
								style={styles.tinyImg}
								source={require('../../assets/image_yan/final-imgs/close.png')}
							/>
						</TouchableOpacity>
					</View>

					<Text
						style={{
							fontFamily: 'Roboto_medium',
							color: COLORS.Main_font_color,
						}}
					>
						Choose a city
					</Text>
					<View
						style={{
							marginTop: 20,
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<Button transparent onPress={() => setCity('Paris')}>
							<Text
								style={[
									city == 'Paris'
										? { color: COLORS.Red_font_color }
										: { color: COLORS.Darker_font_color },
								]}
							>
								Paris
							</Text>
						</Button>
						<Button transparent onPress={() => setCity('Beirut')}>
							<Text
								style={[
									city == 'Beirut'
										? { color: COLORS.Red_font_color }
										: { color: COLORS.Darker_font_color },
								]}
							>
								Beirut
							</Text>
						</Button>
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
								top: 0,
								width: '80%',
								backgroundColor: COLORS.green_buttons,
								justifyContent: 'center',
							},
						]}
						onPress={saveCity}
					>
						<Text>Save city</Text>
					</Button>
				</View>
			</View>
		</Modal>
	);
};

export default ChooseCityModal;
