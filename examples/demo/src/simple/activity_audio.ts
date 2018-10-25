class AudioActivity extends Tape.Activity {

    ui = new ui.page.audioUI;
    private musicAudio: Tape.AudioController = null;
    private soundAudio: Tape.AudioController = null;

    onCreate() {
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
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
            this.soundAudio = Tape.audio.playSound('res/sound/bgm.mp3');
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

}
