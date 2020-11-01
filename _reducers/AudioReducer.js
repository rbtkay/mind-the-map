import { AUDIO_ACTIONS } from "../_actions/audio";
import { Audio } from "expo-av";

const audio = (state = { sound: new Audio.Sound() }, action) => {
    switch (action.type) {
        case AUDIO_ACTIONS.START:
            state.sound.playAsync();
        case AUDIO_ACTIONS.STOP:
            state.sound.stopAsync();
        default:
            return state;
    }
};

export default audio;
