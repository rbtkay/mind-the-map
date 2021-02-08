import { Icon, List, ListItem, Thumbnail, View } from 'native-base';
import { StyleSheet, TouchableOpacity, Linking, Text } from 'react-native';
import React from 'react';
import styles from '../_css/styles';
import PoisItemList from './PoisItemList';
import ChallengeItemList from './ChallengeItemList';

const CustomList = ({ title, items, no_item_message, list_type = 'challenges' }) => {
	return (
		<View style={styles.elevatedContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<List>
				{items && items.length > 0 ? (
					items.map((item, index) => (
						<ListItem
							key={index}
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							{list_type == 'pois' ? (
								<PoisItemList poi={item} key={index} />
							) : (
								<ChallengeItemList challenge={item} key={index} />
							)}
						</ListItem>
					))
				) : (
					<ListItem>
						<Text>{no_item_message}</Text>
					</ListItem>
				)}
			</List>
		</View>
	);
};

export default CustomList;
