// =========================== //
// Tape effect.js
// =========================== //
var Tape;
(function (Tape) {
    var Effect = /** @class */ (function () {
        function Effect() {
        }
        Effect.clickEffect = function (btnView, click) {
            if (btnView && btnView['on']) {
                btnView.on("mouseover", this, function () {
                    btnView.y += 5;
                });
                btnView.on("mouseout", this, function () {
                    btnView.y -= 5;
                });
                btnView.on("click", this, function () {
                    click && click();
                });
            }
        };
        return Effect;
    }());
    Tape.Effect = Effect;
})(Tape || (Tape = {}));
