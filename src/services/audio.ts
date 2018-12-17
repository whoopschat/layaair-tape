import env from "../utils/env";
import loop from "../utils/looper";

function fixWechatAudioPlay(callback: Function) {
    if (window && window['WeixinJSBridge']) {
        try {
            window['WeixinJSBridge'].invoke("getNetworkType", {}, () => {
                callback && callback();
            });
        } catch (e) {
            callback && callback();
        }
    } else {
        callback && callback();
    }
}

function fixAudioExtension(targetUrl, replaceExt) {
    let ext = Laya.Utils.getFileExtension(targetUrl);
    let searchExt = !!ext ? `.${ext}` : '';
    if (env.isConchApp() && searchExt != ".wav" && searchExt != ".ogg") {
        return targetUrl.substr(0, targetUrl.length - searchExt.length) + replaceExt;
    }
    return targetUrl;
}

class AudioController {

    private _auidoUrl = '';
    private _chancel: Laya.SoundChannel = null;
    private _playing = false;
    private _onPlay = null;
    private _onPause = null;
    private _onStop = null;
    private _onError = null;
    private _onProgress = null;
    private _onComplete = null;
    private _position = -1;
    private _duration = -1;
    private _paused = false;
    private _type = 'sound';
    private _playTime = 0;

    constructor(type) {
        this._type = type;
    }

    private _update() {
        if (this._chancel) {
            this._position = this._chancel.position;
            this._duration = this._chancel.duration;
            if (!this._playing && this._position > 0) {
                this._playing = true;
                this._onPlay && this._onPlay();
            }
            if (this._playing && this._duration > 0) {
                this._onProgress && this._onProgress({
                    position: this.position,
                    duration: this.duration,
                });
            } else if (Date.now() - this._playTime > 2000) {
                this._onError && this._onError();
                this.stop();
            }
        }
    }

    public onPlay(callback) {
        this._onPlay = callback;
    }

    public onStop(callback) {
        this._onStop = callback;
    }

    public onPause(callback) {
        this._onPause = callback;
    }

    public onProgress(callback) {
        this._onProgress = callback;
    }

    public onComplete(callback) {
        this._onComplete = callback;
    }

    public onError(callback) {
        this._onError = callback;
    }

    public set url(url) {
        if (this._auidoUrl != url) {
            this._auidoUrl = url;
            this.stop();
        }
    }

    public get url() {
        return this._auidoUrl;
    }

    public get type() {
        return this._type;
    }

    public get position() {
        return this._position;
    }

    public get duration() {
        return this._duration;
    }

    public isPaused() {
        return this._paused;
    }

    public isPlaying() {
        return this._playing;
    }

    public play(loops: number = 1) {
        fixWechatAudioPlay(() => {
            if (this._auidoUrl) {
                this.stop();
                let playUrl = fixAudioExtension(this._auidoUrl, '.ogg');
                this._playTime = Date.now();
                this._chancel = Laya.SoundManager.playSound(playUrl, loops, Laya.Handler.create(this, () => {
                    this._onComplete && this._onComplete();
                    this.stop();
                }), null, 0);
                loop.loop(this, this._update);
            }
        });
    }

    public pause() {
        if (this._chancel && this._playing) {
            this._onPause && this._onPause();
            this._chancel.pause();
            this._paused = true;
            this._playing = false;
            loop.clear(this, this._update);
        }
    }

    public resume() {
        if (this._chancel && this._paused) {
            this._paused = false;
            this._chancel.resume();
            loop.loop(this, this._update);
        }
    }

    public stop() {
        if (this._chancel) {
            this._onStop && this._onStop();
            this._chancel.stop();
            this._chancel = null;
            this._paused = false;
            this._playing = false;
            Laya.SoundManager.removeChannel(this._chancel);
            Laya.SoundManager.destroySound(this._auidoUrl);
            loop.clear(this, this._update);
        }
    }

    public destroy() {
        this.stop();
        this._onComplete = null;
        this._onProgress = null;
        this._onPlay = null;
        this._onStop = null;
        this._onPause = null;
    }

}

let _musicAudio = new AudioController('music')

function playMusic(url: string, loops: number = 1) {
    _musicAudio.url = url;
    _musicAudio.play(loops);
    return _musicAudio;
}

function playSound(url: string, loops: number = 1) {
    let audio = new AudioController('sound');
    audio.url = url;
    audio.play(loops);
    return audio;
}

function stopMusic() {
    _musicAudio.stop();
}

function stopAll() {
    Laya.SoundManager.stopAll();
}

function stopAllSound() {
    Laya.SoundManager.stopAllSound();
}

export default {
    playMusic,
    playSound,
    stopAll,
    stopMusic,
    stopAllSound,
}