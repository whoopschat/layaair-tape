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
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.onCreate = function () {
        };
        Main.prototype.onPause = function () {
            this.debug("onPause");
        };
        Main.prototype.onResume = function () {
            var _this = this;
            this.debug("onResume");
            var page1 = new ui.Page1UI();
            this.addChild(page1);
            page1.btn.on(Laya.Event.CLICK, this, function () {
                var message = new ui.MessageToastUI();
                message.text.text = _this.routeName + JSON.stringify(_this.params);
                Topspeed.Toast.show("msg", message, 500, 0.5, 0.2);
                _this.navigate("Page2");
            });
            page1.btnBack.on(Laya.Event.CLICK, this, function () {
                _this.finish();
            });
        };
        return Main;
    }(Topspeed.Activity));
    App.Main = Main;
    var Page2 = /** @class */ (function (_super) {
        __extends(Page2, _super);
        function Page2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Page2.prototype.onResume = function () {
            var _this = this;
            var page2 = new ui.Page2UI();
            this.addChild(page2);
            page2.btn.on(Laya.Event.CLICK, this, function () {
                _this.link("baidu://elm/Main?name=你好");
            });
            page2.btnBack.on(Laya.Event.CLICK, this, function () {
                _this.finish();
            });
        };
        return Page2;
    }(Topspeed.Activity));
    App.Page2 = Page2;
})(App || (App = {}));
