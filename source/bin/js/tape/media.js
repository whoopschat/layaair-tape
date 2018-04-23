// =========================== //
// tape media.js
// =========================== //
var Tape;
(function (Tape) {
    var fuckWXAudioPlay = function (callback) {
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
        BackgroundMusic.play = function (url, loops, complete) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            this.__on_complete__ = complete;
            if (this.__audio_url__ !== url) {
                this.__audio_url__ = url;
                this.stop();
            }
            fuckWXAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                _this.__audio_chancel__ = Laya.SoundManager.playMusic(_this.__audio_url__, loops, Laya.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.__audio_chancel__ = null;
                    _this.__on_complete__ && _this.__on_complete__();
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
        BackgroundMusic.__on_complete__ = null;
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
            this.__on_complete__ = null;
            this.__audio_url__ = url;
        }
        Audio.config = function (soundDir, soundFormat, soundConchDir, soundConchFormat, showErrorAlert) {
            if (showErrorAlert === void 0) { showErrorAlert = false; }
            this.soundWebDir = soundDir || "";
            this.soundWebFormat = soundFormat || "";
            this.soundConchDir = soundConchDir || "";
            this.soundConchFormat = soundConchFormat || "";
            this.showErrorAlert = showErrorAlert;
        };
        Audio.play = function (url, loops, complete) {
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            var audio = new Audio(url);
            audio.play(loops, complete);
            return audio;
        };
        Audio.prototype.play = function (loops, complete) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            this.__on_complete__ = complete;
            fuckWXAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                var soundUrl = "";
                if (Tape.MarketHandler.isConchApp()) {
                    soundUrl = Audio.soundConchDir + _this.__audio_url__ + Audio.soundConchFormat;
                    var ext = Laya.Utils.getFileExtension(soundUrl);
                    if (!Audio.showErrorAlert && ext != "wav" && ext != "ogg") {
                        return;
                    }
                }
                else {
                    soundUrl = Audio.soundWebDir + _this.__audio_url__ + Audio.soundWebFormat;
                }
                _this.__audio_chancel__ = Laya.SoundManager.playSound(soundUrl, loops, Laya.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.__on_complete__ && _this.__on_complete__();
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
        Audio.showErrorAlert = false;
        Audio.soundWebDir = "";
        Audio.soundWebFormat = "";
        Audio.soundConchDir = "";
        Audio.soundConchFormat = "";
        return Audio;
    }());
    Tape.Audio = Audio;
})(Tape || (Tape = {}));
