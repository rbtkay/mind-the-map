import { Audio } from "expo-av";

export const STATUS = { PLAYING: "PLAYING", PAUSED: "PAUSED", STOPPED: "STOPPED" };

export class BackgroundSound {
    static music = new Audio.Sound();
    static status = STATUS.PLAYING;

    static start = async () => {
        if (this.music._loaded) return;

        this.music.loadAsync(
            require("../assets/audio/Carefree_background_music.mp3"),
            { shouldPlay: true, isLooping: true, volume: 1.0 },
            false
        );

        status = STATUS.PLAYING;
    };

    static stop = async () => {
        if (!this.music._loaded) return;

        await this.music.stopAsync();
        await this.music.unloadAsync();
    };

    static play = () => {
        if (!this.music._loaded) return;
        this.music.playAsync();
        this.status = STATUS.PLAYING;
    };

    static pause = () => {
        if (!this.music._loaded) return;
        console.log("pausing", this.status);
        this.music.pauseAsync();
        this.status = STATUS.PAUSED
    };
}
