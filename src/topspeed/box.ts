module Topspeed {

    export const RES_ATLAS = Laya.Loader.ATLAS;
    export const RES_JSON = Laya.Loader.JSON;
    export const RES_FONT = Laya.Loader.FONT;

    export class Box {

        ////////////////////////////
        //// imports module
        ////////////////////////////

        public static Component = function () {
            return Laya.Component
        }

        public static EventDispatcher = function () {
            return Laya.EventDispatcher
        }

        public static Socket = function () {
            return Laya.Socket
        }

        public static Event = function () {
            return Laya.Event
        }

        public static TweenEase = function () {
            return Laya.Ease
        }

        ////////////////////////////
        //// imports method
        ////////////////////////////

        public static tweenTo = function (target: any, props: any, duration: number, ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, autoRecover?: boolean) {
            Laya.Tween.to(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        }

        public static tweenFrom = function (target: any, props: any, duration: number, ease?: Function, complete?: Function, delay?: number, coverBefore?: boolean, autoRecover?: boolean) {
            Laya.Tween.from(target, props, duration, ease, Laya.Handler.create(target, complete), delay, coverBefore, autoRecover);
        }

        public static loadRes = function (res, caller: any, handler: Function = null, progress: Function = null) {
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