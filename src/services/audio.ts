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

class AudioController {

    private _auidoUrl = '';
    private _auidoType: 'sound' | 'music' = 'sound';
    private _chancel: Laya.SoundChannel = null;
    private _playing = false;
    private _onComplete = null;
    private _onStop = null;
    private _onPlay = null;
    private _onPause = null;
    private _onResume = null;
    private _onProgress = null;
    private _position = -1;
    private _duration = -1;
    private _paused = false;

    constructor(url, type: 'sound' | 'music') {
        this._auidoUrl = url;
        this._auidoType = type;
    }

    private _update() {
        if (this._chancel) {
            this._position = this._chancel.position;
            this._duration = this._chancel.duration;
            if (!this._playing && this._position > 0) {
                this._playing = true;
                this._onPlay && this._onPlay();
            }
            this._onProgress && this._onProgress({
                position: this.position,
                duration: this.duration,
            });
        }
    }

    public onPlay(callback) {
        this._onPlay = callback;
    }

    public onStop(callback) {
        this._onStop = callback;
    }

    public onPause(callback) {
        this._onResume = callback;
    }

    public onResume(callback) {
        this._onResume = callback;
    }

    public onProgress(callback) {
        this._onProgress = callback;
    }

    public onComplete(callback) {
        this._onComplete = callback;
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
        return this._auidoType;
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
            this.stop();
            if (this._auidoType === 'music') {
                this._chancel = Laya.SoundManager.playMusic(this._auidoUrl, loops, Laya.Handler.create(this, () => {
                    this._onComplete && this._onComplete();
                    this.stop();
                }));
            } else {
                this._chancel = Laya.SoundManager.playSound(this._auidoUrl, loops, Laya.Handler.create(this, () => {
                    this._onComplete && this._onComplete();
                    this.stop();
                }));
            }
            Laya.timer.frameLoop(1, this, this._update);
        });
    }

    public stop() {
        if (this._chancel) {
            this._onStop && this._onStop();
            this._chancel.stop();
            this._chancel = null;
            this._paused = false;
            this._playing = false;
            Laya.timer.clear(this, this._update);
        }
    }

    public pause() {
        if (this._chancel && this._playing) {
            this._onPause && this._onPause();
            this._chancel.pause();
            this._playing = false;
            this._paused = true;
            Laya.timer.clear(this, this._update);
        }
    }

    public resume() {
        if (this._chancel) {
            this._paused = false;
            this._playing = true;
            this._chancel.resume();
            this._onResume && this._onResume();
            Laya.timer.frameLoop(1, this, this._update);
        }
    }

}

let _musicAudio = new AudioController('', 'music')

function playMusic(url: string, loops: number = 1) {
    _musicAudio.url = url;
    _musicAudio.play(loops);
    return _musicAudio;
}

function playSound(url: string, loops: number = 1) {
    let audio = new AudioController(url, 'sound');
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