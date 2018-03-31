var Topspeed;
(function (Topspeed) {
    Topspeed.RES_ATLAS = Laya.Loader.ATLAS;
    Topspeed.RES_JSON = Laya.Loader.JSON;
    Topspeed.RES_FONT = Laya.Loader.FONT;
    var Box = /** @class */ (function () {
        function Box() {
        }
        ////////////////////////////
        //// imports module
        ////////////////////////////
        Box.Component = function () {
            return Laya.Component;
        };
        Box.EventDispatcher = function () {
            return Laya.EventDispatcher;
        };
        Box.Socket = function () {
            return Laya.Socket;
        };
        Box.Event = function () {
            return Laya.Event;
        };
        Box.TweenEase = function () {
            return Laya.Ease;
        };
        ////////////////////////////
        //// imports method
        ////////////////////////////
        Box.tweenTo = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        };
        Box.tweenFrom = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            Laya.Tween.from(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        };
        Box.loadRes = function (res, caller, handler, progress) {
            if (handler === void 0) { handler = null; }
            if (progress === void 0) { progress = null; }
            Laya.loader.load(res, Laya.Handler.create(caller, handler), Laya.Handler.create(caller, progress));
        };
        Box.drawView = function (view) {
            Laya.stage.addChild(view);
        };
        Box.width = function () {
            return Laya.stage.width;
        };
        Box.height = function () {
            return Laya.stage.height;
        };
        return Box;
    }());
    Topspeed.Box = Box;
})(Topspeed || (Topspeed = {}));
