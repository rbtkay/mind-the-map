import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Item, Text, View, Switch } from 'native-base';
import { Modal, Image, TouchableOpacity } from 'react-native';
import styles, { COLORS } from '../../_css/styles';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_USER_IMAGE } from '../../_utils/constants';

import { BackgroundSound, STATUS } from '../../_helpers/singleton';
import { useIsFocused } from '@react-navigation/native';
import { googleLogout } from '../../_api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from '../../_reducers/user';


const SettingsModal = ({ isVisible = false, chosen_edit, closeModal }) => {
	const user = useSelector(state => state.user);

	const [isOn, setIsOn] = useState(BackgroundSound.status == STATUS.PLAYING);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(isOn);
		if (isOn) BackgroundSound.start();
		else BackgroundSound.stop();
	}, [isOn]);

	useEffect(() => {
		setIsOn(BackgroundSound.status == STATUS.PLAYING);
		console.log(isOn);
	}, [isVisible]);

	const saveChanges = () => {
		closeModal();
	};

	const logout = () => {
		googleLogout();
		AsyncStorage.clear(() => {
			dispatch(clearUser());
			console.log('destroying user');
		});
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
						<Text style={styles.title}>{`Settings`}</Text>
						<TouchableOpacity onPress={closeModal}>
							<Image
								style={styles.tinyImg}
								source={require('../../assets/image_yan/final-imgs/close.png')}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 20,
						}}
					>
						<Text
							style={{
								fontFamily: 'Roboto_medium',
								color: COLORS.Main_font_color,
							}}
						>
							Music
						</Text>

						<Switch onTouchEnd={() => setIsOn(!isOn)} value={isOn} />
					</View>
					<View
						style={{
							margin: 20,
							flexDirection: 'row',
						}}
					>
						<Button style={{ borderRadius: 20, backgroundColor: 'white' }} onPress={() => logout()}>
							<Text style={{ color: COLORS.Red_font_color }}>Logout</Text>
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
						onPress={saveChanges}
					>
						<Text>Save changes</Text>
					</Button>
				</View>
			</View>
		</Modal>
	);
};

export default SettingsModal;
