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
    /////////////////////////////////////////////////////
    //////// Component
    /////////////////////////////////////////////////////
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
    }(Tape.Box.Component));
    Tape.PropsComponent = PropsComponent;
    var Activity = /** @class */ (function (_super) {
        __extends(Activity, _super);
        function Activity(props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this, props) || this;
            _this.routeName = "";
            _this.params = {};
            _this.params = Object.assign({}, props['params']);
            _this.routeName = props['routeName'] || "";
            return _this;
        }
        Activity.prototype.onCreate = function () {
        };
        Activity.prototype.onResume = function () {
        };
        Activity.prototype.onPause = function () {
        };
        Activity.prototype.onDestroy = function () {
        };
        ///////////////////////
        /// Navigator
        ///////////////////////
        Activity.prototype.navigate = function (name, params) {
            if (params === void 0) { params = {}; }
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].navigate(name, params);
            }
        };
        Activity.prototype.link = function (url) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].link(url);
            }
        };
        Activity.prototype.finish = function (n) {
            if (n === void 0) { n = 0; }
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(n);
            }
        };
        Activity.prototype.finishByName = function (name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finishByName(name);
            }
        };
        Activity.prototype.pop = function (n) {
            if (n === void 0) { n = 0; }
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(n);
            }
        };
        Activity.prototype.popByName = function (name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popByName(name);
            }
        };
        Activity.prototype.popToTop = function () {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popToTop();
            }
        };
        ///////////////////////
        /// Logger
        ///////////////////////
        Activity.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).error.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).info.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).warn.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).debug.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        return Activity;
    }(PropsComponent));
    Tape.Activity = Activity;
})(Tape || (Tape = {}));
