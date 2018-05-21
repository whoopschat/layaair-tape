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
            this.addMapChild(this.page2);
            this.printDebug("onCreate");
            var ws = new Tape.MQTTSocket();
            ws.onConnected = () => {
                console.log('onConnected');
            };
            ws.onClosed = () => {
                console.log('onClosed');
            };
            ws.onError = () => {
                console.log('onError');
            };
            ws.connect('192.168.69.74', 8083, '$client/aaa');
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
            Tape.MiniLogin.showLoginPage({
                bgPage: new ui.LoginPageUI(),
                type: 'text',
                text: '授权并登录',
                left: 0,
                top: 0,
                width: 200,
                height: 50
            }, (res) => {
                console.log("获取用户信息成功", res);
                Tape.MiniOpenData.setUserCloudStorage([{ key: 'data', value: '分数520' }]);
            }, (res) => {
                console.log("获取用户信息失败", res);
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