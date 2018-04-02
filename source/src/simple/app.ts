module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        protected onCreate() {
            this.addChild(this.page1);
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                let message = new ui.MessageToastUI();
                message.text.text = this.routeName + JSON.stringify(this.params);
                Tape.Toast.show("msg", message, 500, 0.5, 0.2);
                this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.finish();
            });
        }

        protected onPause() {
            this.debug("onPause");
        }

        protected onResume() {
            this.debug("onResume");
        }
    }


    export class Page2 extends Tape.Activity {

        private page2 = new ui.Page2UI();

        protected onCreate() {
            let socket = new Tape.WebSocket();
            socket.onConnected = () => {
                this.link("baidu://elm/Main?name=你好");
            };
            this.addChild(this.page2);
            this.page2.btn.on(Laya.Event.CLICK, this, () => {
                // this.link("baidu://elm/Main?name=你好");
                socket.connect("wss://127.0.0.1:9011/websocket");
            })
            this.page2.btnBack.on(Laya.Event.CLICK, this, () => {
                this.finish();
            });
        }

    }

}