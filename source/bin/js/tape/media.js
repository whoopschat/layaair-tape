// =========================== //
// tape media.js
// =========================== //
var Tape;
(function (Tape) {
    var withWeixinAudioPlay = function (callback) {
        var wsb = window;
        if (wsb['WeixinJSBridge']) {
            try {
                wsb['WeixinJSBridge'].invoke("getNetworkType", {}, function () {
                    callback && callback();
                });
            }
            catch (e) {
                callback && callback();
            }
        }
        else {
            callback && callback();
        }
    };
    /**
     * BackgroundMusic
     */
    var BackgroundMusic = /** @class */ (function () {
        function BackgroundMusic() {
        }
        BackgroundMusic.play = function (url, loops) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (this.__audio_url__ !== url) {
                this.__audio_url__ = url;
                this.stop();
            }
            withWeixinAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                _this.__audio_chancel__ = Laya.SoundManager.playMusic(_this.__audio_url__, loops, Tape.Box.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.__audio_chancel__ = null;
                    _this.onComplete && _this.onComplete();
                }));
            });
        };
        BackgroundMusic.stop = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        };
        BackgroundMusic.pause = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        };
        BackgroundMusic.__audio_url__ = "";
        BackgroundMusic.__audio_chancel__ = null;
        BackgroundMusic.__is_playing__ = false;
        BackgroundMusic.onComplete = null;
        return BackgroundMusic;
    }());
    Tape.BackgroundMusic = BackgroundMusic;
    /**
     * Audio
     */
    var Audio = /** @class */ (function () {
        function Audio(url) {
            this.__audio_url__ = "";
            this.__audio_chancel__ = null;
            this.__is_playing__ = false;
            this.onComplete = null;
            this.__audio_url__ = url;
        }
        Audio.prototype.play = function (loops) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            withWeixinAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                _this.__audio_chancel__ = Laya.SoundManager.playSound(_this.__audio_url__, loops, Tape.Box.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.onComplete && _this.onComplete();
                }));
            });
        };
        Audio.prototype.stop = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        };
        Audio.prototype.pause = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        };
        return Audio;
    }());
    Tape.Audio = Audio;
})(Tape || (Tape = {}));
