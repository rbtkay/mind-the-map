import React from 'react';
import { Text, View } from 'native-base';
import { COLORS } from '../_css/styles';
import { getNativeSourceFromSource } from 'expo-av/build/AV';

const RoundRow = ({ round, user_score, opponent_score }) => {

	return (
		<View>
			<Text
				style={{
					textAlign: 'center',
					fontFamily: 'Roboto_medium',
					color: COLORS.Main_font_color,
				}}
			>
				{round}
			</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					padding: 20,
					backgroundColor: COLORS.white_containers,
				}}
			>
				<Text
					style={{
						fontFamily: 'Roboto_medium',
						color: COLORS.Darker_font_color,
					}}
				>
					{user_score != undefined
						? parseFloat(user_score).toFixed(0)
						: 'No Score'}
				</Text>
				<Text
					style={{
						fontFamily: 'Roboto_medium',
						color: COLORS.Darker_font_color,
					}}
				>
					{user_score != undefined
						? opponent_score != undefined
							? parseFloat(opponent_score).toFixed(0)
							: 'Hidden'
						: 'Hidden'}
				</Text>
			</View>
		</View>
	);
};

export default RoundRow;
