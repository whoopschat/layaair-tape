var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.page1 = new ui.Page1UI();
            return _this;
        }
        Main.prototype.onCreate = function () {
            var _this = this;
            this.addChild(this.page1);
            this.inEase = Laya.Ease.linearIn;
            this.inEaseDuration = 300;
            this.inEaseFromProps = {
                y: this.height
            };
            this.inEaseToProps = {
                y: 0
            };
            this.outEase = Laya.Ease.linearIn;
            this.outEaseDuration = 300;
            this.outEaseFromProps = {
                y: 0
            };
            this.outEaseToProps = {
                y: this.height
            };
            // Tape.BackgroundMusic.play("res/sound/bg_sound.mp3", 0);
            Tape.Audio.play("res/sound/readygo.mp3");
            this.page1.btn.on(Laya.Event.CLICK, this, function () {
                var a = new ui.MessageToastUI();
                a.text.text = JSON.stringify(_this.params);
                Tape.Toast.showToast(a);
                _this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, function () {
                _this.back();
            });
        };
        Main.prototype.onPause = function () {
        };
        Main.prototype.onResume = function () {
        };
        Main.prototype.onDestroy = function () {
        };
        return Main;
    }(Tape.Activity));
    App.Main = Main;
    var Page2 = /** @class */ (function (_super) {
        __extends(Page2, _super);
        function Page2() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.page2 = new ui.Page2UI();
            return _this;
        }
        Page2.prototype.onCreate = function () {
            var _this = this;
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
            Tape.EventBus.on('ABC', function (data) {
                Tape.Logger.log(data);
            });
            Tape.EventBus.post('ABC', '11111111111111');
            this.addChild(this.page2);
            var ws = new Tape.MQTTSocket();
            ws.onConnected = function () {
                console.log('onConnected');
            };
            ws.onClosed = function () {
                console.log('onClosed');
            };
            ws.onError = function () {
                console.log('onError');
            };
            ws.connect('192.168.69.74', 8083, '$client/aaa');
            this.page2.btn.on(Laya.Event.CLICK, this, function () {
                Tape.Toast.showToast(new ui.MessageToastUI());
                Tape.Dialog.showDialog(new ui.DialogViewUI());
                Tape.MiniUI.showUserInfoButton({
                    type: 'text',
                    text: '授权并登录',
                    style: {
                        width: 300,
                        height: 100
                    },
                    onGetUserInfo: function (res) {
                        console.log("获取用户信息成功", res);
                        _this.navigate("Main", res, function () {
                            _this.back();
                        });
                    },
                    onFailed: function (res) {
                        console.log("获取用户信息失败", res);
                    }
                });
            });
            Tape.Effect.clickEffect(this.page2.btnBack, function () {
                _this.back();
            });
        };
        Page2.prototype.onPause = function () {
        };
        Page2.prototype.onResume = function () {
        };
        Page2.prototype.onDestroy = function () {
        };
        Page2.prototype.onNextProgress = function (progress) {
        };
        return Page2;
    }(Tape.Activity));
    App.Page2 = Page2;
})(App || (App = {}));
