// =========================== //
// tape box.js
// =========================== //
module Tape {

    export class Box {
        // RES TYPE
        public static ATLAS = Laya.Loader.ATLAS;
        public static JSON = Laya.Loader.JSON;
        public static FONT = Laya.Loader.FONT;
        public static SOUND = Laya.Loader.SOUND;
        public static IMAGE = Laya.Loader.IMAGE;

        ////////////////////////////
        //// imports class
        ////////////////////////////

        public static Component = Laya.Component;
        public static ResourceVersion = Laya.ResourceVersion;
        public static Handler = Laya.Handler;
        public static EventDispatcher = Laya.EventDispatcher;
        public static Socket = Laya.Socket;
        public static Event = Laya.Event;
        public static Ease = Laya.Ease;
        public static SoundManager = Laya.SoundManager;
        public static SoundChannel = Laya.SoundChannel;

        ////////////////////////////
        //// imports method
        ////////////////////////////

        public static tweenTo = function (target: any, props: any, duration: number, ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, autoRecover?: boolean) {
            Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        }

        public static tweenFrom = function (target: any, props: any, duration: number, ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, autoRecover?: boolean) {
            Laya.Tween.from(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        }

        /**
         * load res
         */
        public static load = function (res, caller: any, handler: Function = null, progress: Function = null) {
            Laya.loader.load(res, Laya.Handler.create(caller, handler), Laya.Handler.create(caller, progress));
        }

        public static drawView = function (view) {
            Laya.stage.addChild(view);
        }

        public static width = function () {
            return Laya.stage.width;
        }

        public static height = function () {
            return Laya.stage.height;
        }

        private constructor() { }
    }

}