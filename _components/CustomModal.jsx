import React, { useState } from 'react';
import { Button, Text, View } from 'native-base';
import { Modal, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles, { COLORS } from '../_css/styles';

const CustomModal = ({isVisible = false, chosen_edit, closeModal}) => {

    //TODO: set the chosen city

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
								source={require('../assets/image_yan/final-imgs/close.png')}
							/>
						</TouchableOpacity>
					</View>
					<Text>Choose a city</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
						}}
					>
						<Text>Paris</Text>
						<Text>Beirut</Text>
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
						onPress={closeModal}
					>
						<Text>Save city</Text>
					</Button>
				</View>
			</View>
		</Modal>
	);
};

export default CustomModal;
