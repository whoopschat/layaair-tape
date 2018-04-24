// =========================== //
// tape box.js
// =========================== //
module Tape {

    export class Display {

        public static addChild = function (view) {
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