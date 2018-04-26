module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        protected onCreate() {
            this.addChild(this.page1);
            Tape.BackgroundMusic.play("res/sound/bg_sound.mp3", 0);
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                let message = new ui.MessageToastUI();
                message.text.text = this.routeName + this.routeKey + "\n" + JSON.stringify(this.params);
                Tape.Toast.show("msg", message, 200, 200, 500);
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
                this.openDialog(new ui.DialogViewUI());
                this.navigate("Main", { name: "你好" }, () => {
                    this.back();
                    this.closeDialog();
                });
            })
            this.page2.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
            console.log(Tape.Build.getEnv());
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