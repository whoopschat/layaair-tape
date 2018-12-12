class AudioActivity extends Tape.Activity {

    ui = new ui.page.audioUI;
    private musicAudio: Tape.AudioController = null;
    private soundAudio: Tape.AudioController = null;

    onCreate() {
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        this.ui.btnStopAll.on(Laya.Event.CLICK, this, () => {
            Tape.audio.stopAll();
        });
        this.ui.btnStopAllSound.on(Laya.Event.CLICK, this, () => {
            Tape.audio.stopAllSound();
        });
        this.ui.btnPlayMusic.on(Laya.Event.CLICK, this, () => {
            this.musicAudio = Tape.audio.playMusic('res/sound/bgm.mp3');
            this.musicAudio.onProgress(res => {
                this.ui.output.text = JSON.stringify(res);
            });
        });
        this.ui.btnMusicPause.on(Laya.Event.CLICK, this, () => {
            if (this.musicAudio) {
                this.musicAudio.pause();
            }
        });
        this.ui.btnMusicResume.on(Laya.Event.CLICK, this, () => {
            if (this.musicAudio) {
                this.musicAudio.resume();
            }
        });
        this.ui.btnMusicStop.on(Laya.Event.CLICK, this, () => {
            if (this.musicAudio) {
                this.musicAudio.stop();
            }
        });
        this.ui.btnPlaySound.on(Laya.Event.CLICK, this, () => {
            this.soundAudio = Tape.audio.playSound('https://yx-static.oss-cn-shanghai.aliyuncs.com/bubbledragon/beta/sound/sound_bomb.mp3');
            this.soundAudio.onProgress(res => {
                this.ui.output.text = JSON.stringify(res);
            });
        });
        this.ui.btnSoundPause.on(Laya.Event.CLICK, this, () => {
            if (this.soundAudio) {
                this.soundAudio.pause();
            }
        });
        this.ui.btnSoundResume.on(Laya.Event.CLICK, this, () => {
            if (this.soundAudio) {
                this.soundAudio.resume();
            }
        });
        this.ui.btnSoundStop.on(Laya.Event.CLICK, this, () => {
            if (this.soundAudio) {
                this.soundAudio.stop();
            }
        });
    }

    onDestroy() {
        this.musicAudio && this.musicAudio.destroy();
        this.soundAudio && this.soundAudio.destroy();
    }

}
