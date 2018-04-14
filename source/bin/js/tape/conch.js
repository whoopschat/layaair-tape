// =========================== //
// tape conch.js
// =========================== //
var Tape;
(function (Tape) {
    var Conch = /** @class */ (function () {
        function Conch() {
        }
        Conch.is_conch = function () {
            return window.hasOwnProperty('conch');
        };
        return Conch;
    }());
    Tape.Conch = Conch;
})(Tape || (Tape = {}));
