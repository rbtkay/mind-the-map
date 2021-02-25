import React, { useEffect, useState } from 'react';
import { View, Text, Button, Input, Form, Item } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../_reducers/user';
import { updateUsername } from '../_api/user';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const [username, setUsername] = useState(null);


	return (
		<View>
			<Text>Profile page</Text>
			<Button onPress={logout}>
				<Text>Logout</Text>
			</Button>
			<Form>
				<Item rounded>
					<Input
						placeholder={user.given_name}
						onChange={e => setUsername(e.nativeEvent.text)}
					/>
				</Item>
				<Button
					onPress={() => {
						if(username){
							updateUsername(username, user.email);
							dispatch(setUser({ given_name: username }));
						}
						navigation.navigate('MainScreen');
					}}
				>
					<Text>Save</Text>
				</Button>
			</Form>
			<Button onPress={() => navigation.navigate('MainScreen')}>
				<Text>Back</Text>
			</Button>
		</View>
	);
};

export default ProfileScreen;
