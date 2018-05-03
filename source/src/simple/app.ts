module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        protected onCreate() {
            this.addChild(this.page1);
            // Tape.BackgroundMusic.play("res/sound/bg_sound.mp3", 0);
            Tape.Audio.play("res/sound/readygo.mp3");
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                Tape.Toast.showToast(new ui.MessageToastUI());
                this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
        }

        protected onPause() {
            this.printDebug("onPause");
        }

        protected onResume() {
            this.printDebug("onResume");
        }

        protected onDestroy() {
            this.printDebug("onDestroy");
        }
    }


    export class Page2 extends Tape.Activity {

        private page2 = new ui.Page2UI();

        protected onCreate() {
            this.addChild(this.page2);
            this.printDebug("onCreate");
            this.page2.btn.on(Laya.Event.CLICK, this, () => {
                Tape.Toast.showToast(new ui.MessageToastUI());
                Tape.Dialog.showDialog(new ui.DialogViewUI());
                this.navigate("Main", { name: "你好" }, () => {
                    this.back();
                });
            })
            this.page2.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
        }

        protected onPause() {
            this.printDebug("onPause");
        }

        protected onResume() {
            this.printDebug("onResume");
        }

        protected onDestroy() {
            this.printDebug("onDestroy");
        }

        protected onNextProgress(progress) {
        }

    }

}