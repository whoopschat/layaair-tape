// =========================== //
// tape box.js
// =========================== //
var Tape;
(function (Tape) {
    var Display = /** @class */ (function () {
        function Display() {
        }
        Display.addChild = function (view) {
            Laya.stage.addChild(view);
        };
        Display.width = function () {
            return Laya.stage.width;
        };
        Display.height = function () {
            return Laya.stage.height;
        };
        return Display;
    }());
    Tape.Display = Display;
})(Tape || (Tape = {}));
