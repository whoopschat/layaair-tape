module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        protected onCreate() {
            this.addChild(this.page1);
            this.inEase = Laya.Ease.linearIn;
            this.inEaseDuration = 300;
            this.inEaseFromProps = {
                y: this.height
            }
            this.inEaseToProps = {
                y: 0
            }
            this.outEase = Laya.Ease.linearIn;
            this.outEaseDuration = 300;
            this.outEaseFromProps = {
                y: 0
            }
            this.outEaseToProps = {
                y: this.height
            }
            // Tape.BackgroundMusic.play("res/sound/bg_sound.mp3", 0);
            Tape.Audio.play("res/sound/readygo.mp3");
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                var a = new ui.MessageToastUI();
                a.text.text = JSON.stringify(this.params);
                Tape.Toast.showToast(a);
                this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
        }

        protected onPause() {
        }

        protected onResume() {
        }

        protected onDestroy() {
        }
    }


    export class Page2 extends Tape.Activity {

        private page2 = new ui.Page2UI();

        protected onCreate() {
            Tape.MiniUI.showSharedCanvas();
            Laya.timer.once(400, null, function () {
                var context = Tape.MiniOpenContext.postMessageToOpenDataContext({
                    data: {
                        action: "loginUI",
                        value: JSON.stringify(ui.LoginPageUI.uiView)
                    }
                });
            });
            console.log('Page2.onCreate');
            Tape.EventBus.on('ABC', (data) => {
                Tape.Logger.log(data);
            });
            Tape.EventBus.post('ABC', '11111111111111');
            this.addChild(this.page2);
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
                Tape.MiniUI.showUserInfoButton({
                    type: 'text',
                    text: '授权并登录',
                    style: {
                        width: 300,
                        height: 80
                    },
                    success: (res) => {
                        console.log("获取用户信息成功", res);
                        this.navigate("Main", res, () => {
                            this.back();
                        });
                    },
                    fail: (res) => {
                        console.log("获取用户信息失败", res);
                    }
                });
            })
            Tape.Effect.clickEffect(this.page2.btnBack, () => {
                this.back();
            });
        }

        protected onPause() {
        }

        protected onResume() {
        }

        protected onDestroy() {
        }

        protected onNextProgress(progress) {
        }

    }

}