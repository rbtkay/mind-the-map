import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useStorage = () => {
	const [storage, setStorage] = useState();

	useEffect(() => {
		AsyncStorage.getItem('username').then(username => setStorage(username));
		AsyncStorage.getItem('city').then(city => setStorage(city || "Paris"));
    }, [storage]);
    
	const setItem = async (username, email, city) => {
		// const new_username = await AsyncStorage.setItem('username', username);
		// const city = await AsyncStorage.setItem('city', city || "Paris");
		// // const asyncContent = await AsyncStorage.setItem('city', city);
		// setStorage({username: new_username, city});
	};

	return [storage, setItem];
};

export default useStorage;
