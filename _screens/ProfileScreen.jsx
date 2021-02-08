import React from 'react';
import { View, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { googleLogout } from '../_api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearUser } from '../_reducers/user';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const logout = () => {
		googleLogout();
		AsyncStorage.clear(() => {
			dispatch(clearUser());
			console.log('destroying user');
		});
	};

	return (
		<View>
			<Text>Profile page</Text>
			<Button onPress={logout}>
				<Text>Logout</Text>
			</Button>
			<Button onPress={() => navigation.navigate('MainScreen')}>
				<Text>Back</Text>
			</Button>
		</View>
	);
};

export default ProfileScreen;
