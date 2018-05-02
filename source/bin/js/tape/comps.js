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
     * Dialog
     */
    var Dialog = /** @class */ (function () {
        function Dialog() {
        }
        Dialog.instance = function () {
            if (!this.__dialog_manager_instance__) {
                this.__dialog_manager_instance__ = new Laya.DialogManager();
            }
            return this.__dialog_manager_instance__;
        };
        Dialog.showDialog = function (dialog, onOpened, onClosed) {
            if (onOpened === void 0) { onOpened = null; }
            if (onClosed === void 0) { onClosed = null; }
            this.closeDialog();
            dialog.onClosed = function (type) {
                onClosed && onClosed(type);
            };
            dialog.onOpened = function () {
                onOpened && onOpened();
            };
            this.instance().open(new ui.DialogViewUI(), true, true);
        };
        Dialog.closeDialog = function () {
            this.instance().closeAll();
        };
        Dialog.showLockView = function (lockView) {
            this.instance().setLockView(lockView);
            this.instance().lock(true);
        };
        Dialog.closeLockView = function () {
            this.instance().lock(false);
        };
        Dialog.__dialog_manager_instance__ = null;
        return Dialog;
    }());
    Tape.Dialog = Dialog;
    /**
     * Toast
     */
    var Toast = /** @class */ (function () {
        function Toast() {
        }
        Toast.showToast = function (view, duration, previousHnadler) {
            if (duration === void 0) { duration = 500; }
            if (previousHnadler === void 0) { previousHnadler = null; }
            if (view && !view.parent) {
                var type = view.name || '_default_toast';
                if (!this.__toast_group__.hasOwnProperty(type)) {
                    this.__toast_group__[type] = new Array();
                }
                var list_1 = this.__toast_group__[type];
                view.alpha = 0;
                view.zOrder = 99999;
                Laya.Tween.to(view, { alpha: 1 }, duration, Laya.Ease.quintOut, null, 0);
                Laya.Tween.to(view, { alpha: 0 }, duration, Laya.Ease.quintOut, Laya.Handler.create(this, function () {
                    list_1.splice(list_1.indexOf(view), 1);
                    view.removeSelf();
                }), duration);
                Laya.stage.addChild(view);
                for (var i in list_1) {
                    if (list_1[i]) {
                        if (previousHnadler) {
                            previousHnadler(list_1[i]);
                        }
                        else {
                            list_1[i].visible = false;
                        }
                    }
                }
                list_1.push(view);
            }
        };
        Toast.__toast_group__ = {};
        return Toast;
    }());
    Tape.Toast = Toast;
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
})(Tape || (Tape = {}));
