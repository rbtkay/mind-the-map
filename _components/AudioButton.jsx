import React, { useState } from 'react';

import { Entypo } from '@expo/vector-icons';
import { BackgroundSound, STATUS } from '../_helpers/singleton';
import { Image, TouchableOpacity } from 'react-native';
import styles from '../_css/styles';

const sound_on = require('../assets/image_yan/final-imgs/sound-on.png');
const sound_off = require('../assets/image_yan/final-imgs/sound-off.png');

const AudioButton = () => {
	const sound_icon_status =
		BackgroundSound.status == STATUS.PLAYING ? 'sound' : 'sound-mute';
	const [soundIcon, setSoundIcon] = useState(sound_icon_status);

	const toggleSound = () => {
		if (BackgroundSound.status == STATUS.PLAYING) {
			BackgroundSound.pause();
		} else {
			BackgroundSound.play();
		}
		const soundIconValue = soundIcon == 'sound' ? 'sound-mute' : 'sound';
		setSoundIcon(soundIconValue);
	};

	return (
		// <Entypo
		//     onPress={toggleSound}
		//     name={soundIcon}
		//     size={24}
		//     color="white"
		// />
		<TouchableOpacity onPress={toggleSound}>
			<Image
				source={soundIcon == 'sound' ? sound_on : sound_off}
				style={styles.tinyImg}
			/>
		</TouchableOpacity>
	);
};

export default AudioButton;
