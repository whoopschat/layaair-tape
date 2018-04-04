module Tape {

    export class Audio {

        private __audio_url__ = "";
        private __audio_chancel__: Laya.SoundChannel = null;
        private __is_playing__ = false;
        public onComplete: Function = null;

        constructor(url) {
            this.__audio_url__ = url;
        }

        public play(loops: number = 1) {
            this.withSBWeixinPlay(() => {
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

        //////////////////////////////////////
        ////  private
        //////////////////////////////////////

        private withSBWeixinPlay(callback: Function) {
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
        
    }

}