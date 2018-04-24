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
// =========================== //
// tape comp.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * PropsComponent
     */
    var PropsComponent = /** @class */ (function (_super) {
        __extends(PropsComponent, _super);
        function PropsComponent(props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this) || this;
            _this.props = {};
            _this.props = Object.assign({}, props);
            return _this;
        }
        return PropsComponent;
    }(Laya.Component));
    Tape.PropsComponent = PropsComponent;
    /**
     * Activity
     */
    var Activity = /** @class */ (function (_super) {
        __extends(Activity, _super);
        function Activity(props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, props) || this;
            _this.routeName = "";
            _this.routeKey = "";
            _this.params = {};
            _this.params = Object.assign({}, props['params']);
            _this.routeName = props['routeName'] || "";
            _this.routeKey = props['routeKey'] || "";
            return _this;
        }
        Activity.ROUTE = function (options) {
            if (options === void 0) { options = {}; }
            return Object.assign({}, options, {
                activity: this
            });
        };
        ;
        ///////////////////////
        /// LifeCycle
        ///////////////////////
        Activity.prototype.onCreate = function () {
        };
        Activity.prototype.onResume = function () {
        };
        Activity.prototype.onPause = function () {
        };
        Activity.prototype.onDestroy = function () {
        };
        Activity.prototype.onNextProgress = function (progress) {
        };
        ///////////////////////
        /// Navigator
        ///////////////////////
        Activity.prototype.navigate = function (name, params, action) {
            if (params === void 0) { params = {}; }
            if (action === void 0) { action = null; }
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].navigate(name, params, action);
            }
            return false;
        };
        Activity.prototype.deeplink = function (url, action) {
            if (action === void 0) { action = null; }
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].deeplink(url, action);
            }
            return false;
        };
        Activity.prototype.back = function () {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(this.routeName, this.routeKey);
            }
        };
        Activity.prototype.finish = function (name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(name);
            }
        };
        Activity.prototype.pop = function (number) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(number);
            }
        };
        Activity.prototype.popToTop = function () {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popToTop();
            }
        };
        Activity.prototype.printLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).log.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.printError = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).error.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.printInfo = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).info.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.printWarn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).warn.apply(_a, [" ------ " + this.routeName + "  ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.printDebug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).debug.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        return Activity;
    }(PropsComponent));
    Tape.Activity = Activity;
    /**
     * Toast
     */
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.show = function (type, view, x, y, duration, pivotX, pivoxY) {
            if (duration === void 0) { duration = 500; }
            if (pivotX === void 0) { pivotX = 0.5; }
            if (pivoxY === void 0) { pivoxY = 0.5; }
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                var list_1 = this.__toast_object__[type];
                view.x = x;
                view.y = y;
                view.alpha = 0;
                view.pivot(view.width * pivotX, view.height * pivoxY);
                this.fadeIn(view, duration, 0);
                this.fadeOut(view, duration, duration, function () {
                    list_1.splice(list_1.indexOf(view), 1);
                    view.removeSelf();
                });
                Laya.stage.addChild(view);
                Tape.Display.addChild(view);
                for (var i in list_1) {
                    if (list_1[i]) {
                        list_1[i].y -= list_1[i].height - 5;
                    }
                }
                list_1.push(view);
            }
        };
        Toast.fadeIn = function (view, duration, delay, complete) {
            if (complete === void 0) { complete = null; }
            Laya.Tween.to(view, { alpha: 1 }, duration, Laya.Ease.quintOut, null, delay);
        };
        Toast.fadeOut = function (view, duration, delay, complete) {
            if (complete === void 0) { complete = null; }
            Laya.Tween.to(view, { alpha: 0 }, duration, Laya.Ease.quintOut, Laya.Handler.create(this, function () {
                complete && complete();
            }), delay);
        };
        Toast.__toast_object__ = {};
        return Toast;
    }());
    Tape.Toast = Toast;
})(Tape || (Tape = {}));
