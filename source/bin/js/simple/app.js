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
            // Tape.BackgroundMusic.play("res/sound/bg_sound.mp3", 0);
            Tape.Audio.play("res/sound/readygo.mp3");
            this.page1.btn.on(Laya.Event.CLICK, this, function () {
                Tape.Toast.showToast(new ui.MessageToastUI());
                _this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, function () {
                _this.back();
            });
        };
        Main.prototype.onPause = function () {
            this.printDebug("onPause");
        };
        Main.prototype.onResume = function () {
            this.printDebug("onResume");
        };
        Main.prototype.onDestroy = function () {
            this.printDebug("onDestroy");
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
            this.addChild(this.page2);
            this.printDebug("onCreate");
            this.page2.btn.on(Laya.Event.CLICK, this, function () {
                Tape.Toast.showToast(new ui.MessageToastUI());
                Tape.Dialog.showDialog(new ui.DialogViewUI());
                _this.navigate("Main", { name: "你好" }, function () {
                    _this.back();
                });
            });
            this.page2.btnBack.on(Laya.Event.CLICK, this, function () {
                _this.back();
            });
        };
        Page2.prototype.onPause = function () {
            this.printDebug("onPause");
        };
        Page2.prototype.onResume = function () {
            this.printDebug("onResume");
        };
        Page2.prototype.onDestroy = function () {
            this.printDebug("onDestroy");
        };
        Page2.prototype.onNextProgress = function (progress) {
        };
        return Page2;
    }(Tape.Activity));
    App.Page2 = Page2;
})(App || (App = {}));
