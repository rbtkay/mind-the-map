import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Thumbnail } from 'native-base';
import { useSelector } from 'react-redux';

const Banner = () => {
	const user = useSelector(state => state.user);
	console.log('the banner', user);

	return (
		<View style={styles.banner}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
				}}
			>
				<View style={{ padding: 12 }}>
					<Thumbnail
						square
						source={require('../assets/user.png')}
						small
						style={{ tintColor: 'white' }}
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white' }}>{user.username}</Text>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
				}}
			>
				<View style={{ padding: 12 }}>
					<Thumbnail square source={require('../assets/star.png')} small />
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white' }}>{user.highest_score}</Text>
				</View>
			</View>
			{/* //TODO: Invite a friend  */}
			{/* <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}>
				<View style={{ padding: 12 }}>
					<Thumbnail
						square
						source={require('../assets/add-button.png')}
						style={{ tintColor: 'white' }}
						small
					/>
				</View>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white' }}>Invite a friend</Text>
				</View>
			</TouchableOpacity> */}
			{/* <View style={{flex: 1, backgroundColor: 'green'}}>
				<Thumbnail
					square
					source={require('../assets/add-button.png')}
					style={{ tintColor: 'white' }}
					small
				/>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: 'white' }}>Invite a friend</Text>
				</View>
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	banner: {
		backgroundColor: 'steelblue',
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		// height: 60,
		marginBottom: 30,
	},
});

export default Banner;
