import React from 'react';
import { Thumbnail, View } from 'native-base';
import { Linking, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../_css/styles';

const PoisItemList = ({ poi }) => {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}
		>
			<Thumbnail source={require('../assets/map_example.png')} />
			<TouchableOpacity style={{ marginLeft: 12 }}>
				<Text
					style={{
						fontFamily: 'Roboto_medium',
						color: COLORS.Darker_font_color,
						fontSize: 15,
					}}
					onPress={() =>
						Linking.openURL(`https://en.wikipedia.org/wiki/${poi.name}`)
					}
				>
					{poi.name}
				</Text>
				<Text style={{ fontSize: 15 }}>{poi.city}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PoisItemList;
