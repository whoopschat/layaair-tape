// Object.assign
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

var Tape;
(function (Tape) {
    var ArrayUtil;
    (function (ArrayUtil) {
        function random(source) {
            return source[Math.floor(Math.random() * source.length)];
        }
        ArrayUtil.random = random;
        function randomArr(source, length) {
            if (length === void 0) { length = -1; }
            var randomLength = length == -1 ? source.length : length;
            randomLength = Math.min(randomLength, source.length);
            var copy = source.concat([]);
            var result = new Array();
            while (result.length < randomLength) {
                var randomObj = random(copy);
                result.push(randomObj);
                copy.splice(copy.indexOf(randomLength), 1);
            }
            return result;
        }
        ArrayUtil.randomArr = randomArr;
    })(ArrayUtil || (ArrayUtil = {}));
})(Tape || (Tape = {}));

// =========================== //
// Tape build.js
// =========================== //
var Tape;
(function (Tape) {
    var Env;
    (function (Env) {
        /**
         * get build env
         * @return env mode : development or production
         */
        Env.getEnv = function () {
            return '${env}';
        };
        /**
         * isDebug
         */
        Env.isDev = function () {
            return Env.getEnv() !== 'production';
        };
        /**
         * isProd
         */
        Env.isProd = function () {
            return Env.getEnv() === 'production';
        };
    })(Env = Tape.Env || (Tape.Env = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    /** UUID */
    var UUID;
    (function (UUID) {
        function _s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        UUID.randomUUID = function () {
            return (_s4() + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + _s4() + _s4());
        };
    })(UUID = Tape.UUID || (Tape.UUID = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    /** BrowserHandler  */
    var BrowserHandler;
    (function (BrowserHandler) {
        BrowserHandler.init = function (width, height) {
            var options = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                options[_i - 2] = arguments[_i];
            }
            Laya.init.apply(Laya, [width, height].concat(options));
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        };
        BrowserHandler.exit = function () {
        };
    })(BrowserHandler = Tape.BrowserHandler || (Tape.BrowserHandler = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var __rank_texture__ = null;
    /** __exec_wx__ */
    var __exec_wx__ = function (func) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        var _a;
        if (window.hasOwnProperty("wx")) {
            if (window['wx'].hasOwnProperty(func)) {
                return (_a = window['wx'])[func].apply(_a, options);
            }
        }
    };
    /** __post_message_to_sub_context__ */
    var __post_message_to_sub_context__ = function (data) {
        var openDataContext = __exec_wx__('getOpenDataContext');
        openDataContext && openDataContext.postMessage(data || {});
    };
    /** __create_rank_texture__ */
    var __create_rank_texture__ = function () {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = function () {
                };
            }
            if (!__rank_texture__) {
                __rank_texture__ = new Laya.Texture(sharedCanvas, null);
                __rank_texture__.bitmap.alwaysChange = true;
            }
        }
        return __rank_texture__;
    };
    /** MiniHandler */
    var MiniHandler;
    (function (MiniHandler) {
        MiniHandler.init = function (width, height) {
            var options = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                options[_i - 2] = arguments[_i];
            }
            Laya.MiniAdpter.init(true);
            Laya.init.apply(Laya, [width, height].concat(options));
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            if (window.hasOwnProperty('sharedCanvas')) {
                var sharedCanvas = window['sharedCanvas'];
                sharedCanvas.width = Laya.stage.width;
                sharedCanvas.height = Laya.stage.height;
            }
            __post_message_to_sub_context__({
                action: 'init',
                data: {
                    width: Laya.stage.width,
                    height: Laya.stage.height,
                    matrix: Laya.stage._canvasTransform
                }
            });
        };
        MiniHandler.exit = function () {
            __exec_wx__('exitMiniProgram');
        };
    })(MiniHandler = Tape.MiniHandler || (Tape.MiniHandler = {}));
    /** MiniAd */
    var MiniAd;
    (function (MiniAd) {
        var bannerStack = {};
        MiniAd.showBannerAd = function (adUnitId, x, y, w, h) {
            var _a;
            MiniAd.hideBannerAd(adUnitId);
            var systemInfo = __exec_wx__('getSystemInfoSync');
            if (systemInfo) {
                var windowWidth = systemInfo.windowWidth;
                var windowHeight = systemInfo.windowHeight;
                var stageWidth = Laya.stage.width;
                var stageHeight = Laya.stage.height;
                var left = x * windowWidth / stageWidth;
                var top_1 = y * windowHeight / stageHeight;
                var width = w * windowWidth / stageWidth;
                var height = h * windowHeight / stageHeight;
                var bannerAd = __exec_wx__('createBannerAd', {
                    adUnitId: adUnitId,
                    style: {
                        left: left,
                        top: top_1,
                        width: width,
                        height: height
                    }
                });
                if (bannerAd) {
                    bannerAd.show();
                    Object.assign(bannerStack, (_a = {},
                        _a[adUnitId] = bannerAd,
                        _a));
                }
            }
        };
        MiniAd.hideBannerAd = function (adUnitId) {
            if (bannerStack.hasOwnProperty(adUnitId)) {
                var bannerAd = bannerStack[adUnitId];
                bannerAd.destroy();
                delete bannerStack[adUnitId];
            }
        };
    })(MiniAd = Tape.MiniAd || (Tape.MiniAd = {}));
    /** MiniRank */
    var MiniRank;
    (function (MiniRank) {
        MiniRank.createRankView = function (x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = Laya.stage.width; }
            if (height === void 0) { height = Laya.stage.height; }
            var sharedCanvasView = new Laya.Sprite();
            var rankTexture = __create_rank_texture__();
            if (rankTexture) {
                var newTexture = Laya.Texture.createFromTexture(rankTexture, x, y, width, height);
                newTexture.bitmap.alwaysChange = true;
                sharedCanvasView.width = width;
                sharedCanvasView.height = height;
                sharedCanvasView.graphics.drawTexture(newTexture, 0, 0, newTexture.width, newTexture.height);
            }
            return sharedCanvasView;
        };
        MiniRank.showRank = function (uiView, options, onlyRefreshData) {
            if (options === void 0) { options = {}; }
            if (onlyRefreshData === void 0) { onlyRefreshData = false; }
            __post_message_to_sub_context__({
                action: onlyRefreshData ? "refreshData" : "showUI",
                data: Object.assign({
                    ui: JSON.stringify(uiView || {}),
                }, options)
            });
        };
        MiniRank.hideRank = function () {
            __post_message_to_sub_context__({ action: 'hideUI' });
        };
        MiniRank.setRankData = function (list) {
            __post_message_to_sub_context__({ action: 'setUserCloudStorage', data: { KVDataList: list } });
        };
    })(MiniRank = Tape.MiniRank || (Tape.MiniRank = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var Platform;
    (function (Platform) {
        Platform.isWechatApp = function () {
            return window.hasOwnProperty("wx");
        };
        Platform.isLongPhone = function () {
            var scale = (Laya.Browser.clientHeight / laya.utils.Browser.clientWidth);
            return scale > 2.1;
        };
    })(Platform = Tape.Platform || (Tape.Platform = {}));
})(Tape || (Tape = {}));

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
var Tape;
(function (Tape) {
    /** Activity */
    var Activity = /** @class */ (function (_super) {
        __extends(Activity, _super);
        function Activity(props) {
            if (props === void 0) { props = {}; }
            var _this = _super.call(this) || this;
            _this.props = {};
            _this.routeName = "";
            _this.routeKey = "";
            _this.params = {};
            _this.inEaseDuration = 300;
            _this.inEase = null;
            _this.inEaseFromProps = null;
            _this.inEaseToProps = null;
            _this.outEaseDuration = 300;
            _this.outEase = null;
            _this.outEaseFromProps = null;
            _this.outEaseToProps = null;
            _this.props = Object.assign({}, props);
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
        //////////////////////////
        /// life cycle function
        //////////////////////////
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
        //////////////////////////
        /// navigator function
        //////////////////////////
        Activity.prototype.redirectTo = function (name, params) {
            var _this = this;
            if (params === void 0) { params = {}; }
            return this.navigate(name, params, function () {
                _this.back();
            });
        };
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
        return Activity;
    }(Laya.Component));
    Tape.Activity = Activity;
})(Tape || (Tape = {}));

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
// Tape navigation.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * NavigationLoader
     */
    var NavigationLoader = /** @class */ (function (_super) {
        __extends(NavigationLoader, _super);
        function NavigationLoader(activity, routeName, routeKey, props, res, loaded, onLoadProgress) {
            if (props === void 0) { props = {}; }
            if (res === void 0) { res = []; }
            if (loaded === void 0) { loaded = null; }
            if (onLoadProgress === void 0) { onLoadProgress = null; }
            var _this = _super.call(this) || this;
            _this.routeName = "";
            _this.routeKey = "";
            _this.routeRes = [];
            _this.routeActivity = null;
            _this.routeName = routeName;
            _this.routeKey = routeKey;
            _this.routeRes = res;
            if (res != null && res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(_this, function () {
                    var act = Laya.Pool.getItemByCreateFun(_this.routeName, function () {
                        return new activity(props);
                    });
                    _this.create(act);
                    if (loaded) {
                        loaded(_this);
                    }
                }), Laya.Handler.create(_this, function (progress) {
                    if (onLoadProgress) {
                        onLoadProgress(_this, progress);
                    }
                }, null, false));
            }
            else {
                var act = Laya.Pool.getItemByCreateFun(_this.routeName, function () {
                    return new activity(props);
                });
                _this.create(act);
                if (loaded) {
                    loaded(_this);
                }
            }
            return _this;
        }
        NavigationLoader.prototype.create = function (routeActivity) {
            this.routeActivity = routeActivity;
            this.addChild(this.routeActivity);
            this.routeActivity.event('onCreate');
            this.routeActivity.onCreate && this.routeActivity.onCreate();
        };
        NavigationLoader.prototype.nextProgress = function (progress) {
            this.routeActivity.event('nextProgress', progress);
            this.routeActivity.onNextProgress && this.routeActivity.onNextProgress(progress);
        };
        NavigationLoader.prototype.exit = function (anim, callback) {
            var _this = this;
            var ease = this.routeActivity.outEase || Laya.Ease.linearIn;
            var duration = this.routeActivity.outEaseDuration || 300;
            var fromProps = this.routeActivity.outEaseFromProps || { alpha: 1 };
            var toProps = this.routeActivity.outEaseToProps || { alpha: 0 };
            if (anim && ease) {
                Object.assign(this, fromProps);
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, function () {
                    _this.destroy();
                    _this.routeActivity.event('onDestroy');
                    _this.routeActivity.onDestroy && _this.routeActivity.onDestroy();
                    callback && callback();
                    Laya.Pool.clearBySign(_this.routeName);
                }));
            }
            else {
                this.destroy();
                this.routeActivity.event('onDestroy');
                this.routeActivity.onDestroy && this.routeActivity.onDestroy();
                callback && callback();
                Laya.Pool.clearBySign(this.routeName);
            }
        };
        NavigationLoader.prototype.show = function (anim, callback) {
            var ease = this.routeActivity.inEase || Laya.Ease.linearIn;
            var duration = this.routeActivity.inEaseDuration || 300;
            var fromProps = this.routeActivity.inEaseFromProps || { alpha: 0 };
            var toProps = this.routeActivity.inEaseToProps || { alpha: 1 };
            if (anim && ease) {
                Object.assign(this, fromProps);
                this.visible = true;
                this.routeActivity.event('onResume');
                this.routeActivity.onResume && this.routeActivity.onResume();
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, function () {
                    callback && callback();
                }));
            }
            else {
                this.visible = true;
                this.routeActivity.event('onResume');
                this.routeActivity.onResume && this.routeActivity.onResume();
                callback && callback();
            }
        };
        NavigationLoader.prototype.hide = function () {
            this.visible = false;
            this.routeActivity.event('onPause');
            this.routeActivity.onPause && this.routeActivity.onPause();
        };
        return NavigationLoader;
    }(Laya.Component));
    /**
     * NavigationStack
     */
    var NavigationStack = /** @class */ (function () {
        function NavigationStack(navigator) {
            this.__navigator__ = null;
            this.__init_name__ = "";
            this.__routes__ = {};
            this.__static_res__ = [];
            this.__stacks__ = [];
            this.__loaded_handler__ = null;
            this.__load_progress_handler__ = null;
            this.__uri_prefix__ = "://";
            this.__file_version__ = null;
            this.__loading__ = false;
            this.__navigator__ = navigator;
            this.__loaded_handler__ = navigator.props['navigation']['onLoaded'];
            this.__load_progress_handler__ = navigator.props['navigation']['onLoadProgress'];
            this.__routes__ = navigator.props['navigation']['routes'];
            this.__init_name__ = navigator.props['navigation']['initName'];
            this.__static_res__ = navigator.props['navigation']['staticRes'] || [];
            this.__uri_prefix__ = navigator.props['navigation']['uriPrefix'] || "://";
            this.__file_version__ = navigator.props['navigation']['fileVersion'];
        }
        NavigationStack.prototype.initPage = function () {
            var _this = this;
            if (this.__file_version__) {
                Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
                Laya.ResourceVersion.enable(this.__file_version__, Laya.Handler.create(this, function () {
                    _this.navigate(_this.__init_name__);
                }));
            }
            else {
                this.navigate(this.__init_name__);
            }
        };
        /**
         * deeplink
         */
        NavigationStack.prototype.deeplink = function (url, action) {
            if (action === void 0) { action = null; }
            var params = {};
            var delimiter = this.__uri_prefix__ || '://';
            var urlSplit = url.split(delimiter);
            var path = '/';
            if (urlSplit.length > 1) {
                var pathSplit = urlSplit[1].split('?');
                path = pathSplit[0];
                if (pathSplit.length > 1) {
                    var paramsSplit = pathSplit[1].split('&');
                    paramsSplit.forEach(function (value) {
                        var _a;
                        var param = value.split('=');
                        if (param.length === 2) {
                            Object.assign(params, (_a = {},
                                _a[param[0]] = param[1],
                                _a));
                        }
                    });
                }
            }
            else {
                path = url;
            }
            return this.navigate(path, params, action);
        };
        /**
         * navigate
         */
        NavigationStack.prototype.navigate = function (name, params, action) {
            var _this = this;
            if (params === void 0) { params = {}; }
            if (action === void 0) { action = null; }
            if (this.__routes__
                && this.__routes__.hasOwnProperty(name)
                && this.__routes__[name].hasOwnProperty('activity')) {
                var route = this.__routes__[name];
                var activity = route['activity'];
                var resArray_1 = [];
                if (this.__static_res__) {
                    this.__static_res__.forEach(function (res) {
                        resArray_1.push(res);
                    });
                }
                if (route.hasOwnProperty('res')
                    && typeof route['res'] === 'object'
                    && route['res'].length > 0) {
                    route['res'].forEach(function (res) {
                        resArray_1.push(res);
                    });
                }
                var paramsObject = {};
                if (route.hasOwnProperty('res')
                    && route['res'].length > 0) {
                    route['res'].forEach(function (res) {
                        resArray_1.push(res);
                    });
                }
                if (route.hasOwnProperty('params')) {
                    Object.assign(paramsObject, route['params']);
                }
                Object.assign(paramsObject, params);
                this.__loading__ = true;
                var key = Tape.UUID.randomUUID();
                new NavigationLoader(activity, name, key, {
                    navigation: this,
                    routeName: name,
                    routeKey: key,
                    params: paramsObject
                }, resArray_1, function (loader) {
                    _this.__loading__ = false;
                    _this.__navigator__.addChild(loader);
                    _this.putStack(loader, function () {
                        action && action(true);
                    });
                    _this.__loaded_handler__ && _this.__loaded_handler__(loader);
                }, function (loader, progress) {
                    if (_this.__loading__) {
                        var stack = _this.lastStack();
                        stack && stack.nextProgress(progress);
                    }
                    _this.__load_progress_handler__ && _this.__load_progress_handler__(loader, progress);
                });
                return true;
            }
            else {
                action && action(false);
                return false;
            }
        };
        /**
         * finish
         */
        NavigationStack.prototype.finish = function (name, key) {
            if (key === void 0) { key = null; }
            this.finishStack(name, key);
        };
        /**
         * popToTop
         */
        NavigationStack.prototype.popToTop = function () {
            this.pop(this.__stacks__.length);
        };
        /**
         * pop
         */
        NavigationStack.prototype.pop = function (number) {
            if (number === void 0) { number = 1; }
            this.popStack(number);
        };
        NavigationStack.prototype.lenStack = function () {
            return this.__stacks__.length;
        };
        NavigationStack.prototype.lastStack = function () {
            var len = this.lenStack();
            if (len > 0) {
                return this.__stacks__[len - 1];
            }
            return null;
        };
        NavigationStack.prototype.putStack = function (stack, callback) {
            var _this = this;
            this.__stacks__.push(stack);
            this.showStack(true, function () {
                _this.hideStack(1);
                callback && callback();
            });
        };
        NavigationStack.prototype.popStack = function (count) {
            if (this.lenStack() > 1 && count > 0) {
                this.hideStack(0);
                for (var i = 0; i < count; i++) {
                    if (this.lenStack() > 1) {
                        this.__stacks__.pop().exit(false, null);
                    }
                }
                this.showStack(false, null);
            }
        };
        NavigationStack.prototype.finishStack = function (name, key) {
            var _this = this;
            if (key === void 0) { key = null; }
            var len = this.lenStack();
            if (len > 1) {
                var targetIndexs_1 = [];
                for (var i = 0; i < len; i++) {
                    var stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        var flag = true;
                        if (key) {
                            flag = stack.routeKey === key;
                        }
                        if (flag && targetIndexs_1.length < len - 1) {
                            targetIndexs_1.push(i);
                        }
                    }
                }
                if (targetIndexs_1.length > 0) {
                    var first_1 = targetIndexs_1.pop();
                    var flag_1 = first_1 === len - 1;
                    if (flag_1) {
                        this.showStack(false, null, 1);
                    }
                    var slice = this.__stacks__.splice(first_1, 1);
                    slice.forEach(function (stack) {
                        stack.exit(true, function () {
                            while (targetIndexs_1.length > 0) {
                                first_1 = targetIndexs_1.pop();
                                var slice_1 = _this.__stacks__.splice(first_1, 1);
                                slice_1.forEach(function (stack) {
                                    stack.exit(targetIndexs_1.length === 1, null);
                                });
                            }
                            if (flag_1) {
                                _this.showStack(false, null);
                            }
                        });
                    });
                }
            }
        };
        NavigationStack.prototype.hideStack = function (index) {
            var len = this.lenStack();
            if (len - index > 0) {
                this.__stacks__[len - 1 - index].hide();
            }
        };
        NavigationStack.prototype.showStack = function (anim, callback, index) {
            if (index === void 0) { index = 0; }
            var len = this.lenStack();
            if (len - index > 0) {
                this.__stacks__[len - 1 - index].show(anim && len > 1, callback);
            }
        };
        return NavigationStack;
    }());
    /**
     * StackNavigator
     */
    var StackNavigator = /** @class */ (function (_super) {
        __extends(StackNavigator, _super);
        function StackNavigator(props) {
            var _this = _super.call(this) || this;
            _this.__navigator__ = null;
            _this.props = {};
            _this.props = Object.assign({}, props);
            _this.__navigator__ = new NavigationStack(_this);
            _this.__navigator__.initPage();
            return _this;
        }
        return StackNavigator;
    }(Laya.Component));
    /**
     * createNavigator
     * @param routes routes
     * @param initName initName
     * @param options options
     */
    Tape.createNavigator = function (routes, initName, options) {
        if (options === void 0) { options = {}; }
        return new StackNavigator({
            navigation: {
                routes: routes,
                initName: initName,
                staticRes: options['res'],
                fileVersion: options['fileVersion'] || 'version.json',
                uriPrefix: options['uriPrefix'],
                onLoaded: options['onLoaded'],
                onLoadProgress: options['onLoadProgress']
            }
        });
    };
})(Tape || (Tape = {}));

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
var runtime;
(function (runtime) {
    function center(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }
    var btn = /** @class */ (function (_super) {
        __extends(btn, _super);
        function btn() {
            var _this = _super.call(this) || this;
            _this.scaleTime = 100;
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmal);
            _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleBig);
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleBig);
            return _this;
        }
        btn.prototype.scaleBig = function () {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        };
        btn.prototype.scaleSmal = function () {
            center(this);
            // scale 0.8
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        };
        return btn;
    }(Laya.Button));
    runtime.btn = btn;
    var img_btn = /** @class */ (function (_super) {
        __extends(img_btn, _super);
        function img_btn() {
            var _this = _super.call(this) || this;
            _this.scaleTime = 100;
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmal);
            _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleBig);
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleBig);
            return _this;
        }
        img_btn.prototype.scaleBig = function () {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        };
        img_btn.prototype.scaleSmal = function () {
            center(this);
            // scale 0.8
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        };
        return img_btn;
    }(Laya.Image));
    runtime.img_btn = img_btn;
})(runtime || (runtime = {}));

var Tape;
(function (Tape) {
    /**
     * 初始化APP
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    Tape.init = function (width, height) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (Tape.Platform.isWechatApp()) {
            Tape.MiniHandler.init.apply(Tape.MiniHandler, [width, height].concat(options));
        }
        else {
            Tape.BrowserHandler.init.apply(Tape.BrowserHandler, [width, height].concat(options));
        }
    };
    /**
     * 退出APP
     */
    Tape.exit = function () {
        if (Tape.Platform.isWechatApp()) {
            Tape.MiniHandler.exit();
        }
        else {
            Tape.BrowserHandler.exit();
        }
    };
})(Tape || (Tape = {}));
