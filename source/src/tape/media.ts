// =========================== //
// tape media.js
// =========================== //
module Tape {

    const withWeixinAudioPlay = function (callback: Function) {
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

        private static __audio_url__ = "";
        private static __audio_chancel__: Laya.SoundChannel = null;
        private static __is_playing__ = false;
        public static onComplete: Function = null;

        public static play(url, loops: number = 1) {
            if (this.__audio_url__ !== url) {
                this.__audio_url__ = url;
                this.stop();
            }
            withWeixinAudioPlay(() => {
                if (this.__audio_chancel__) {
                    if (!this.__is_playing__) {
                        this.__audio_chancel__.play();
                    }
                    return;
                }
                this.__is_playing__ = true;
                this.__audio_chancel__ = Laya.SoundManager.playMusic(this.__audio_url__, loops, Tape.Box.Handler.create(this, () => {
                    this.__is_playing__ = false;
                    this.__audio_chancel__ = null;
                    this.onComplete && this.onComplete();
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

        public static play(url, loops: number = 1): Audio {
            let audio = new Audio(url);
            audio.play(loops);
            return audio;
        }

        private __audio_url__ = "";
        private __audio_chancel__: Laya.SoundChannel = null;
        private __is_playing__ = false;
        public onComplete: Function = null;

        constructor(url) {
            this.__audio_url__ = url;
        }

        public play(loops: number = 1) {
            withWeixinAudioPlay(() => {
                if (this.__audio_chancel__) {
                    if (!this.__is_playing__) {
                        this.__audio_chancel__.play();
                    }
                    return;
                }
                this.__is_playing__ = true;
                this.__audio_chancel__ = Laya.SoundManager.playSound(this.__audio_url__, loops, Tape.Box.Handler.create(this, () => {
                    this.__is_playing__ = false;
                    this.onComplete && this.onComplete();
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