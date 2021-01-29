import { List, ListItem, Text, Thumbnail, View } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';
import { APP_COLOR } from '../assets/constant_styles';
import styles from '../_css/styles';
const CustomList = ({ title, pois }) => {
	console.log(pois);
	return (
		<View
			style={{
				backgroundColor: 'white',
				borderRadius: 20,
				flex: 1,
				margin: 20,
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
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
			{pois
				&& pois.map((poi, index) => (
					<List>
						<ListItem
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'flex-start',
								}}
							>
								<Thumbnail
									source={require('../assets/map_example.png')}
								/>
								<View style={{ marginLeft: 12 }}>
									<Text style={{ fontSize: 30 }}>Simon</Text>
									<Text style={{ fontSize: 15 }}>Paris</Text>
								</View>
							</View>
							<Text>Your turn</Text>
						</ListItem>
					</List>
				))}
		</View>
	);
};

export default CustomList;
