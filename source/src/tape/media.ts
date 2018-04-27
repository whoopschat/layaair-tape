// =========================== //
// tape media.js
// =========================== //
module Tape {

    const fuckWXAudioPlay = function (callback: Function) {
        var wsb = window;
        if (wsb['WeixinJSBridge']) {
            try {
                wsb['WeixinJSBridge'].invoke("getNetworkType", {}, () => {
                    callback && callback();
                });
            } catch (e) {
                callback && callback();
            }
        } else {
            callback && callback();
        }
    }

    /**
     * BackgroundMusic
     */
    export class BackgroundMusic {

        private static __audio_url__: string = "";
        private static __audio_chancel__: Laya.SoundChannel = null;
        private static __is_playing__: boolean = false;
        private static __on_complete__: Function = null;

        public static play(url, loops: number = 1, complete: Function = null) {
            this.__on_complete__ = complete;
            if (this.__audio_url__ !== url) {
                this.__audio_url__ = url;
                this.stop();
            }
            fuckWXAudioPlay(() => {
                if (this.__audio_chancel__) {
                    if (!this.__is_playing__) {
                        this.__audio_chancel__.play();
                    }
                    return;
                }
                this.__is_playing__ = true;
                this.__audio_chancel__ = Laya.SoundManager.playMusic(this.__audio_url__, loops, Laya.Handler.create(this, () => {
                    this.__is_playing__ = false;
                    this.__audio_chancel__ = null;
                    this.__on_complete__ && this.__on_complete__();
                }));
            });
        }

        public static stop() {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        }

        public static pause() {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        }

    }

    /**
     * Audio
     */
    export class Audio {

        private static showErrorAlert = Build.isDebug();
        private static soundWebDir = "";
        private static soundWebExt = "";
        private static soundConchDir = "";
        private static soundConchExt = "";

        public static config(dir: string, ext: string, conchDir: string, conchExt: string) {
            this.soundWebDir = dir || "";
            this.soundWebExt = ext || "";
            this.soundConchDir = conchDir || "";
            this.soundConchExt = conchExt || "";
        }

        public static play(url, loops: number = 1, complete: Function = null): Audio {
            let audio = new Audio(url);
            audio.play(loops, complete);
            return audio;
        }

        private __audio_url__: string = "";
        private __audio_chancel__: Laya.SoundChannel = null;
        private __is_playing__: boolean = false;
        private __on_complete__: Function = null;

        constructor(url: string) {
            this.__audio_url__ = url;
        }

        public play(loops: number = 1, complete: Function = null) {
            this.__on_complete__ = complete;
            fuckWXAudioPlay(() => {
                if (this.__audio_chancel__) {
                    if (!this.__is_playing__) {
                        this.__audio_chancel__.play();
                    }
                    return;
                }
                this.__is_playing__ = true;
                let soundUrl = "";
                if (MarketHandler.isConchApp()) {
                    soundUrl = Audio.soundConchDir + this.__audio_url__ + Audio.soundConchExt;
                    let ext = Laya.Utils.getFileExtension(soundUrl);
                    if (!Audio.showErrorAlert && ext != "wav" && ext != "ogg") {
                        return;
                    }
                } else {
                    soundUrl = Audio.soundWebDir + this.__audio_url__ + Audio.soundWebExt;
                }
                this.__audio_chancel__ = Laya.SoundManager.playSound(soundUrl, loops, Laya.Handler.create(this, () => {
                    this.__is_playing__ = false;
                    this.__on_complete__ && this.__on_complete__();
                }));
            });
        }

        public stop() {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        }

        public pause() {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        }

    }

}