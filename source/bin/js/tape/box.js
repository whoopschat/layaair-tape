// =========================== //
// tape box.js
// =========================== //
var Tape;
(function (Tape) {
    var Box = /** @class */ (function () {
        function Box() {
        }
        // RES TYPE
        Box.ATLAS = Laya.Loader.ATLAS;
        Box.JSON = Laya.Loader.JSON;
        Box.FONT = Laya.Loader.FONT;
        Box.SOUND = Laya.Loader.SOUND;
        Box.IMAGE = Laya.Loader.IMAGE;
        ////////////////////////////
        //// imports class
        ////////////////////////////
        Box.Component = Laya.Component;
        Box.ResourceVersion = Laya.ResourceVersion;
        Box.Handler = Laya.Handler;
        Box.EventDispatcher = Laya.EventDispatcher;
        Box.Socket = Laya.Socket;
        Box.Event = Laya.Event;
        Box.Ease = Laya.Ease;
        Box.SoundManager = Laya.SoundManager;
        Box.SoundChannel = Laya.SoundChannel;
        ////////////////////////////
        //// imports method
        ////////////////////////////
        Box.tweenTo = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        };
        Box.tweenFrom = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
            Laya.Tween.from(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        };
        /**
         * load res
         */
        Box.load = function (res, caller, handler, progress) {
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
    Tape.Box = Box;
})(Tape || (Tape = {}));
