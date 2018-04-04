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
            _this.__play_music_list__ = [];
            _this.routeName = "";
            _this.params = {};
            _this.params = Object.assign({}, props['params']);
            _this.routeName = props['routeName'] || "";
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
        /// Music
        ///////////////////////
        Activity.prototype.playMusic = function (url, loops, complete) {
            var audio = new Tape.Audio(url);
            audio.play(loops);
            audio.onComplete = complete;
            return this.__play_music_list__.push(audio);
        };
        Activity.prototype.stopMusic = function (id) {
            if (id === void 0) { id = 0; }
            if (id == 0) {
                while (this.__play_music_list__.length > 0) {
                    this.__play_music_list__.pop().stop();
                }
            }
            else {
                if (id - 1 >= 0 && id - 1 < this.__play_music_list__.length) {
                    var splice = this.__play_music_list__.splice(id - 1, 1);
                    splice.forEach(function (chancel) {
                        chancel.stop();
                    });
                }
            }
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
        Activity.prototype.finish = function (name) {
            if (name === void 0) { name = this.routeName; }
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
        ///////////////////////
        /// Logger
        ///////////////////////
        Activity.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).log.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).error.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).info.apply(_a, [" ------ " + this.routeName + " ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).warn.apply(_a, [" ------ " + this.routeName + "  ------ :", message].concat(optionalParams));
            var _a;
        };
        Activity.prototype.debug = function (message) {
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
