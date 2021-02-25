import React, { useState } from 'react';
import { Button, Form, Input, Item, Text, View, Switch } from 'native-base';
import { Modal, Image, TouchableOpacity } from 'react-native';
import styles, { COLORS } from '../../_css/styles';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_USER_IMAGE } from '../../_utils/constants';
import { updateUserPublicImage } from "../../_api/user";

const ProfileModal = ({ isVisible = false, chosen_edit, closeModal }) => {
	const user = useSelector(state => state.user);

	const dispatch = useDispatch();
	const [isPublic, setIsPublic] = useState(user.is_image_public);

	const saveChanges = async () => {
		await updateUserPublicImage(user.email, isPublic);
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
						<Text style={styles.title}>{`Edit profile`}</Text>
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
						Change username
					</Text>
					<Form
						style={{
							marginTop: 20,
							flexDirection: 'row',
							justifyContent: 'flex-start',
						}}
					>
						<Item style={{ flex: 0.3, borderColor: 'transparent' }}>
							<Image
								borderRadius={50}
								style={styles.mediumImg}
								source={
									isPublic ? { uri: user.picture } : DEFAULT_USER_IMAGE
								}
							/>
						</Item>
						<Item style={{ flex: 1 }}>
							<Input
								placeholder={user.given_name}
								onChange={e => setUsername(e.nativeEvent.text)}
							/>
						</Item>
					</Form>
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
							Display your profile picture
						</Text>

						<Switch
							onTouchEnd={() => setIsPublic(!isPublic)}
							value={isPublic}
						/>
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

export default ProfileModal;
