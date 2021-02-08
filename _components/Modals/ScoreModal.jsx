import React, { useState } from 'react';
import { Button, H2, Text, View } from 'native-base';
import { Modal, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles, { COLORS } from '../../_css/styles';

const distance_icon = require('../../assets/distance.png');
const time_icon = require('../../assets/stopwatch.png');

const ScoreModal = ({
	isVisible = false,
	score,
	time,
	distance,
	total_score,
	closeModal,
}) => {
	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
				<View
					style={{
						flex: 0.15,
						justifyContent: 'space-around',
						backgroundColor: COLORS.white_containers,
						borderRadius: 20,
						marginBottom: 80,
						padding: 12,
						width: '80%',
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
					{!time ? (
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginRight: 20,
							}}
						>
							<H2
								style={{
									color: COLORS.Darker_font_color,
									fontFamily: 'Roboto_medium',
								}}
							>
								You Got Lost!
							</H2>
							<Button
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
								onPress={closeModal}
							>
								<Text>Next</Text>
							</Button>
						</View>
					) : (
						<>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}
							>
								<Image source={distance_icon} style={styles.tinyImg} />

								<Text
									style={{
										color: COLORS.Darker_font_color,
										fontFamily: 'Roboto_medium',
									}}
								>
									{parseFloat(distance).toFixed(0)}m
								</Text>
								<Image source={time_icon} style={styles.tinyImg} />

								<Text
									style={{
										color: COLORS.Darker_font_color,
										fontFamily: 'Roboto_medium',
									}}
								>
									{(parseFloat(time) / 1000).toFixed(2)}s
								</Text>
								<Image
									style={styles.tinyImg}
									source={require('../../assets/star.png')}
								/>
								<Text
									style={{
										color: COLORS.Darker_font_color,
										fontFamily: 'Roboto_medium',
									}}
								>
									{parseFloat(score).toFixed(2)}pts
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}
							>
								<View>
									<Text
										style={{
											color: COLORS.Main_font_color,
											fontFamily: 'Roboto_medium',
										}}
									>
										Total Score
									</Text>
									<Text
										style={{
											color: COLORS.Darker_font_color,
											fontFamily: 'Roboto_medium',
										}}
									>
										{parseFloat(total_score).toFixed(3)}pts
									</Text>
								</View>
								<Button
									style={{
										alignItems: 'center',
										justifyContent: 'center',
									}}
									onPress={closeModal}
								>
									<Text>Next</Text>
								</Button>
							</View>
						</>
					)}
				</View>
			</View>
		</Modal>
	);
};

export default ScoreModal;
