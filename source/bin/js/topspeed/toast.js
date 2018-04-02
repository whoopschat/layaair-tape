// toast
var Topspeed;
(function (Topspeed) {
    /**
     * Toast
     */
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.show = function (type, view, duration, widthRatio, heightRatio) {
            if (duration === void 0) { duration = 500; }
            if (widthRatio === void 0) { widthRatio = 0.5; }
            if (heightRatio === void 0) { heightRatio = 0.618; }
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                var list_1 = this.__toast_object__[type];
                view.x = Topspeed.Box.width() * widthRatio;
                view.y = Topspeed.Box.height() * heightRatio;
                view.alpha = 0;
                view.pivot(view.width / 2, view.height / 2);
                Topspeed.Box.tweenTo(view, { alpha: 1 }, duration, Topspeed.Box.TweenEase().quintOut);
                Topspeed.Box.tweenTo(view, { alpha: 0 }, duration, Topspeed.Box.TweenEase().quintIn, function () {
                    list_1.splice(list_1.indexOf(view), 1);
                    view.removeSelf();
                }, duration);
                Topspeed.Box.drawView(view);
                for (var i in list_1) {
                    if (list_1[i]) {
                        list_1[i].y -= list_1[i].height - 5;
                    }
                }
                list_1.push(view);
            }
        };
        Toast.__toast_object__ = {};
        return Toast;
    }());
    Topspeed.Toast = Toast;
})(Topspeed || (Topspeed = {}));
