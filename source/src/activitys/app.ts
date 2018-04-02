module App {

    export class Main extends Topspeed.Activity {

        protected onCreate() {
        }

        protected onPause() {
            this.debug("onPause");
        }

        protected onResume() {
            this.debug("onResume");
            let page1 = new ui.Page1UI();
            this.addChild(page1);
            page1.btn.on(Laya.Event.CLICK, this, () => {
                let message = new ui.MessageToastUI();
                message.text.text = this.routeName + JSON.stringify(this.params);
                Topspeed.Toast.show("msg", message, 500, 0.5, 0.2);
                this.navigate("Page2");
            });
            page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.finish();
            });
        }
    }


    export class Page2 extends Topspeed.Activity {

        protected onResume() {
            let page2 = new ui.Page2UI();
            let socket = new Topspeed.WebSocket();
            socket.onConnected = () => {
                this.link("baidu://elm/Main?name=你好");
            };
            this.addChild(page2);
            page2.btn.on(Laya.Event.CLICK, this, () => {
                socket.connect("wss://127.0.0.1:9011/websocket");
            })
            page2.btnBack.on(Laya.Event.CLICK, this, () => {
                this.finish();
            });
        }

    }

}