import { Audio } from "expo-av";
import { AsyncStorage } from "react-native";

export const STATUS = {
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
};

export class BackgroundSound {
    static music = new Audio.Sound();
    static status = STATUS.STOPPED;

    static start = async () => {
        if (this.music._loaded) return;

        this.music.loadAsync(
            require("../assets/audio/64_Sundays1.mp3"),
            { shouldPlay: true, isLooping: true, volume: 1.0 },
            false
        );
        AsyncStorage.setItem("musicStatus", "on");

        this.status = STATUS.PLAYING;
    };

    static stop = async () => {
        this.status = STATUS.STOPPED;

        if (!this.music._loaded) return; // if the sound is not loaded there is no need to stop it

        await this.music.stopAsync();
        this.music.unloadAsync();
    };

    static play = () => {
        if (!this.music._loaded) this.start();
        else {
            this.music.playAsync();
            this.status = STATUS.PLAYING;
            AsyncStorage.setItem("musicStatus", "on");
        }
    };

    static pause = () => {
        this.status = STATUS.PAUSED;
        AsyncStorage.setItem("musicStatus", "off");

        if (!this.music._loaded) return;
        this.music.pauseAsync();
    };
}
