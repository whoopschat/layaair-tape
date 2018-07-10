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

var Tape;
(function (Tape) {
    var Env;
    (function (Env) {
        /**
         * get env
         * @return env mode : development or production
         */
        Env.getEnv = function () {
            var env = '${env}';
            if (env.indexOf('${') === 0) {
                return 'development';
            }
            return env;
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
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
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
    var __init_rank__ = function () {
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
        __post_message_to_sub_context__({
            action: 'setDebug',
            data: {
                debug: Tape.Env.isDev()
            }
        });
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
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            __init_rank__();
        };
        MiniHandler.exit = function () {
            __exec_wx__('exitMiniProgram');
        };
    })(MiniHandler = Tape.MiniHandler || (Tape.MiniHandler = {}));
    /** MiniAd */
    var MiniAd;
    (function (MiniAd) {
        var __bannerStack__ = {};
        var __rewardedVideoAd__ = null;
        var __rewardedVideoCallback__ = null;
        MiniAd.showBannerAd = function (adUnitId, x, y, w, h, onError) {
            if (onError === void 0) { onError = null; }
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
                var height_1 = h * windowHeight / stageHeight;
                var bannerAd_1 = __exec_wx__('createBannerAd', {
                    adUnitId: adUnitId,
                    style: {
                        left: left,
                        top: top_1,
                        width: width,
                        height: height_1
                    }
                });
                if (bannerAd_1) {
                    Object.assign(__bannerStack__, (_a = {},
                        _a[adUnitId] = bannerAd_1,
                        _a));
                    bannerAd_1.onResize(function (res) {
                        bannerAd_1.style.top = bannerAd_1.style.top + height_1 - res.height;
                    });
                    bannerAd_1.show().catch(function (err) {
                        bannerAd_1.load().then(function () { return bannerAd_1.show(); }).catch(function (err) {
                            onError && onError(err);
                        });
                    });
                }
            }
        };
        MiniAd.hideBannerAd = function (adUnitId) {
            if (__bannerStack__.hasOwnProperty(adUnitId)) {
                var bannerAd = __bannerStack__[adUnitId];
                bannerAd.destroy();
                delete __bannerStack__[adUnitId];
            }
        };
        MiniAd.showRewardedVideoAd = function (adUnitId, onRewarded, onCancal, onError) {
            if (onError === void 0) { onError = null; }
            __rewardedVideoAd__ = __exec_wx__('createRewardedVideoAd', {
                adUnitId: adUnitId
            });
            if (__rewardedVideoAd__) {
                __rewardedVideoCallback__ && __rewardedVideoAd__.offClose(__rewardedVideoCallback__);
                __rewardedVideoCallback__ = function (res) {
                    if (res && res.isEnded || res === undefined) {
                        onRewarded && onRewarded();
                    }
                    else {
                        onCancal && onCancal();
                    }
                };
                __rewardedVideoAd__.onClose(__rewardedVideoCallback__);
                __rewardedVideoAd__.show().catch(function (err) {
                    __rewardedVideoAd__.load().then(function () { return __rewardedVideoAd__.show(); }).catch(function (err) {
                        onError && onError(err);
                    });
                });
            }
            else {
                onError && onError({
                    errMsg: 'showRewardedVideoAd:fail',
                    err_code: -1
                });
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
                data: onlyRefreshData ? options : Object.assign({
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
        MiniRank.setDebug = function (debug) {
            __post_message_to_sub_context__({
                action: 'setDebug',
                data: { debug: debug }
            });
        };
    })(MiniRank = Tape.MiniRank || (Tape.MiniRank = {}));
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
        function Activity(options) {
            var _this = _super.call(this) || this;
            /** page type */
            _this.page = null;
            /** contentView */
            _this.contentView = null;
            /** params */
            _this.params = {};
            /** res */
            _this.res = [];
            /** turn on and off animation */
            _this.inEaseDuration = 0;
            _this.inEase = null;
            _this.inEaseFromProps = null;
            _this.inEaseToProps = null;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.params = Object.assign({}, options.params || {});
            _this.page = options.page;
            _this.onLoad && _this.onLoad();
            setTimeout(function () {
                var res = _this.res || [];
                if (res.length > 0) {
                    Laya.loader.load(res, Laya.Handler.create(_this, function () {
                        options.onLoaded && options.onLoaded(_this);
                    }), Laya.Handler.create(_this, function (progress) {
                        options.onLoadProgress && options.onLoadProgress(progress);
                    }, null, false));
                }
                else {
                    options.onLoaded && options.onLoaded();
                }
            }, 0);
            return _this;
        }
        Activity.prototype.setContentView = function (view) {
            this.contentView = view;
            this.removeChildren();
            this.addChild(view);
            this.onInitView && this.onInitView(view);
        };
        //////////////////////////
        /// navigator function
        //////////////////////////
        Activity.prototype.redirectTo = function (page, params) {
            var _this = this;
            if (params === void 0) { params = {}; }
            this.navigate(page, params, function () {
                _this.back();
            });
        };
        Activity.prototype.link = function (path) {
            Tape.NavigatorStack.link(path);
        };
        Activity.prototype.navigate = function (page, params, action) {
            if (params === void 0) { params = {}; }
            if (action === void 0) { action = null; }
            Tape.NavigatorStack.navigate(page, params, action);
        };
        Activity.prototype.back = function () {
            Tape.NavigatorStack.finish(this.page, this);
        };
        Activity.prototype.finish = function (page) {
            Tape.NavigatorStack.finish(page);
        };
        Activity.prototype.pop = function (number) {
            Tape.NavigatorStack.pop(number);
        };
        Activity.prototype.popToTop = function () {
            Tape.NavigatorStack.popToTop();
        };
        return Activity;
    }(Laya.Component));
    Tape.Activity = Activity;
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var PopManager;
    (function (PopManager) {
        var pops = {};
        function showPop(pop, data) {
            if (data === void 0) { data = null; }
            var view = pops[pop];
            if (view) {
                view.pop = pop;
                view.data = data || {};
            }
            else {
                view = new pop();
                view.pop = pop;
                view.data = data || {};
                pops[pop] = view;
            }
            view.onShow && view.onShow();
            Tape.UIManager.addPopUI(view);
        }
        PopManager.showPop = showPop;
        function hidePop(pop) {
            var view = pops[pop];
            if (view) {
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
                delete pops[pop];
            }
        }
        PopManager.hidePop = hidePop;
        function refreshPos() {
            for (var str in pops) {
                var view = pops[str];
                if (view) {
                    view.resize && view.resize();
                }
            }
        }
        PopManager.refreshPos = refreshPos;
    })(PopManager = Tape.PopManager || (Tape.PopManager = {}));
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
    var PopView = /** @class */ (function (_super) {
        __extends(PopView, _super);
        function PopView() {
            var _this = _super.call(this) || this;
            _this.bgAlpha = 0.5;
            _this.bgColor = '#000000';
            _this.isTranslucent = false;
            _this.canceledOnTouchOutside = false;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            setTimeout(function () {
                if (!_this.isTranslucent) {
                    var bg = new Laya.Sprite();
                    bg.graphics.save();
                    bg.alpha = _this.bgAlpha;
                    bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, _this.bgColor);
                    bg.graphics.restore();
                    bg.width = Laya.stage.width;
                    bg.height = Laya.stage.height;
                    bg.on(Laya.Event.CLICK, _this, function (e) {
                        if (_this.canceledOnTouchOutside) {
                            _this.finish();
                        }
                        e.stopPropagation();
                    });
                    _this.addChildAt(bg, 0);
                }
            }, 0);
            return _this;
        }
        PopView.prototype.finish = function () {
            Tape.PopManager.hidePop(this.pop);
        };
        return PopView;
    }(Laya.Sprite));
    Tape.PopView = PopView;
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var ToastManager;
    (function (ToastManager) {
        var _toast_list_ = [];
        function showToast(view, duration, fromProps, toProps) {
            if (duration === void 0) { duration = 500; }
            if (fromProps === void 0) { fromProps = null; }
            if (toProps === void 0) { toProps = null; }
            var from = fromProps || { alpha: 0 };
            var to = toProps || { alpha: 1 };
            Object.assign(view, from);
            Laya.Tween.to(view, to, duration, Laya.Ease.quintOut, null, 0);
            Laya.Tween.to(view, to, duration, Laya.Ease.quintOut, Laya.Handler.create(this, function () {
                _toast_list_.splice(_toast_list_.indexOf(view), 1);
                view.destroy();
            }), duration);
            Tape.UIManager.addTopUI(view);
            _toast_list_.push(view);
        }
        ToastManager.showToast = showToast;
        function hideAll() {
            var list = _toast_list_.splice(0, _toast_list_.length);
            list.forEach(function (view) {
                view.destroy();
            });
        }
        ToastManager.hideAll = hideAll;
    })(ToastManager = Tape.ToastManager || (Tape.ToastManager = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var UIManager;
    (function (UIManager) {
        var inited = false;
        var mainUILayer;
        var popUILayer;
        var topUILayer;
        function init() {
            if (inited) {
                return;
            }
            var uiManager = new Laya.Sprite();
            mainUILayer = new Laya.Sprite();
            popUILayer = new Laya.Sprite();
            topUILayer = new Laya.Sprite();
            uiManager.addChild(mainUILayer);
            uiManager.addChild(popUILayer);
            uiManager.addChild(topUILayer);
            Laya.stage.addChild(uiManager);
            inited = true;
        }
        function addMainUI(view) {
            init();
            view && mainUILayer.addChild(view);
        }
        UIManager.addMainUI = addMainUI;
        function clearMainUI() {
            init();
            mainUILayer.removeChildren();
        }
        UIManager.clearMainUI = clearMainUI;
        function addPopUI(view) {
            init();
            view && popUILayer.addChild(view);
        }
        UIManager.addPopUI = addPopUI;
        function clearPopUI() {
            init();
            popUILayer.removeChildren();
        }
        UIManager.clearPopUI = clearPopUI;
        function addTopUI(view) {
            init();
            view && topUILayer.addChild(view);
        }
        UIManager.addTopUI = addTopUI;
        function clearTopUI() {
            init();
            topUILayer.removeChildren();
        }
        UIManager.clearTopUI = clearTopUI;
    })(UIManager = Tape.UIManager || (Tape.UIManager = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var Navigator;
    (function (Navigator) {
        var __options__ = null;
        var __loading__ = false;
        var __inited__ = false;
        function init(options) {
            if (!options || __inited__) {
                return;
            }
            __options__ = options;
            __enableResourceVersion__();
            __inited__ = true;
        }
        Navigator.init = init;
        function __enableResourceVersion__() {
            if (__options__ && __options__.fileVersion) {
                Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
                Laya.ResourceVersion.enable(__options__.fileVersion, Laya.Handler.create(null, function () {
                    __beginLoadStaticRes__();
                }));
            }
            else {
                __beginLoadStaticRes__();
            }
        }
        function __beginLoadStaticRes__() {
            var res = __options__.commonRes || [];
            if (res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(null, function () {
                    __onStaticResLoaded__();
                }));
            }
            else {
                __onStaticResLoaded__();
            }
        }
        function __onStaticResLoaded__() {
            Tape.NavigatorStack.navigate(__options__.mainPage);
        }
    })(Navigator = Tape.Navigator || (Tape.Navigator = {}));
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
    var NavigatorLoader = /** @class */ (function (_super) {
        __extends(NavigatorLoader, _super);
        function NavigatorLoader(options) {
            var _this = _super.call(this) || this;
            _this.__options__ = null;
            _this.__activity__ = null;
            _this.__options__ = options;
            _this.__activity__ = new _this.__options__.page({
                page: _this.__options__.page,
                params: _this.__options__.params,
                onLoaded: function () {
                    _this.__onLoaded__ && _this.__onLoaded__();
                },
                onLoadProgress: function (progress) {
                    _this.__onLoadProgress__ && _this.__onLoadProgress__(progress);
                }
            });
            return _this;
        }
        NavigatorLoader.prototype.__onLoaded__ = function () {
            this.addChild(this.__activity__);
            this.__options__.onLoaded && this.__options__.onLoaded(this);
            this.__activity__.onCreate && this.__activity__.onCreate();
        };
        NavigatorLoader.prototype.__onLoadProgress__ = function (progress) {
            this.__options__.onLoadProgress && this.__options__.onLoadProgress(this, progress);
        };
        NavigatorLoader.prototype.nextProgress = function (progress) {
            this.__activity__.onNextProgress && this.__activity__.onNextProgress(progress);
        };
        NavigatorLoader.prototype.canFinish = function (page, activity) {
            if (page === this.__options__.page && activity === this.__activity__) {
                return true;
            }
            return false;
        };
        NavigatorLoader.prototype.show = function (anim, callback) {
            var ease = this.__activity__.inEase || Laya.Ease.linearIn;
            var duration = this.__activity__.inEaseDuration || 0;
            var fromProps = this.__activity__.inEaseFromProps || {};
            var toProps = this.__activity__.inEaseToProps || {};
            if (anim && ease && duration > 0) {
                Object.assign(this, fromProps);
                this.__activity__.onResume && this.__activity__.onResume();
                this.visible = true;
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, function () {
                    callback && callback();
                }));
            }
            else {
                this.__activity__.onResume && this.__activity__.onResume();
                this.visible = true;
                callback && callback();
            }
        };
        NavigatorLoader.prototype.hide = function () {
            if (!this.visible) {
                return;
            }
            this.__activity__.onPause && this.__activity__.onPause();
            this.visible = false;
        };
        NavigatorLoader.prototype.exit = function () {
            this.__activity__.onDestroy && this.__activity__.onDestroy();
            this.destroy();
        };
        return NavigatorLoader;
    }(Laya.Component));
    Tape.NavigatorLoader = NavigatorLoader;
})(Tape || (Tape = {}));


var Tape;
(function (Tape) {
    var NavigatorRouter;
    (function (NavigatorRouter) {
        var __routes__ = {};
        function findRoute(path) {
            var keys = Object.keys(__routes__);
            for (var index = 0; index < keys.length; index++) {
                var p = keys[index];
                var ps = p.split('\/');
                var paths = path.split('\/');
                var flag = true;
                var len = Math.max(ps.length, paths.length);
                var params = {};
                for (var i = 0; i < len; i++) {
                    var l = ps.length > i ? ps[i] : '';
                    var t = paths.length > i ? paths[i] : '';
                    if (l.indexOf(':') === 0) {
                        params[l.substr(1)] = t;
                    }
                    else {
                        flag = flag && l === t;
                    }
                }
                if (flag) {
                    return {
                        page: __routes__[p],
                        params: params
                    };
                }
            }
            return {
                page: null,
                params: {}
            };
        }
        function configRoutes(routes) {
            __routes__ = routes;
        }
        NavigatorRouter.configRoutes = configRoutes;
        function getRoute(path) {
            if (!path) {
                return {
                    page: null,
                    params: {}
                };
            }
            var qs = path.split('?');
            var _a = findRoute(qs[0]), page = _a.page, params = _a.params;
            if (qs.length > 1) {
                var strs = qs[1].split("&");
                for (var i = 0; i < strs.length; i++) {
                    var ps = strs[i].split("=")[0];
                    if (ps.length > 1) {
                        params[ps[0]] = ps[1];
                    }
                }
            }
            return {
                page: page,
                params: params
            };
        }
        NavigatorRouter.getRoute = getRoute;
    })(NavigatorRouter = Tape.NavigatorRouter || (Tape.NavigatorRouter = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var NavigatorStack;
    (function (NavigatorStack) {
        var __loaders__ = [];
        var __loading__ = false;
        function all() {
            return __loaders__;
        }
        function length() {
            return __loaders__.length;
        }
        function getStack(index) {
            if (index === void 0) { index = 0; }
            var len = length();
            return len > index ? __loaders__[len - 1 - index] : null;
        }
        function showStack(index, anim, callback) {
            if (index === void 0) { index = 0; }
            if (anim === void 0) { anim = false; }
            if (callback === void 0) { callback = null; }
            var stack = getStack(index);
            if (!stack) {
                return;
            }
            stack.show(anim && length() > 1, callback);
        }
        function putStack(stack, callback) {
            __loaders__.push(stack);
            showStack(0, true, function () {
                var stack = getStack(1);
                if (!stack) {
                    return;
                }
                stack.hide();
                callback && callback();
            });
        }
        function finishStack(stacks) {
            if (!stacks || stacks.length <= 0) {
                return;
            }
            for (var i = 0; length() > 1 && i < stacks.length; i++) {
                var stack = stacks[i];
                __loaders__.splice(__loaders__.indexOf(stack), 1);
                stack.hide();
                stack.exit();
            }
            showStack(0);
        }
        function popStack(count) {
            if (count >= length()) {
                count = length() - 1;
            }
            if (count <= 0) {
                return;
            }
            var pops = __loaders__.splice(length() - count, count);
            pops.forEach(function (element) {
                element.hide();
                element.exit();
            });
            showStack(0);
        }
        function link(path) {
            var _a = Tape.NavigatorRouter.getRoute(path), page = _a.page, params = _a.params;
            if (page) {
                navigate(page, params);
            }
        }
        NavigatorStack.link = link;
        /** navigate */
        function navigate(page, params, action) {
            if (params === void 0) { params = {}; }
            if (action === void 0) { action = null; }
            new Tape.NavigatorLoader({
                page: page,
                params: params,
                onLoaded: function (loader) {
                    __loading__ = false;
                    Tape.UIManager.addMainUI(loader);
                    putStack(loader, function () {
                        action && action(true);
                    });
                },
                onLoadProgress: function (loader, progress) {
                    if (__loading__) {
                        var stack = getStack();
                        stack && stack.nextProgress(progress);
                    }
                }
            });
        }
        NavigatorStack.navigate = navigate;
        /** popToTop */
        function popToTop() {
            popStack(length());
        }
        NavigatorStack.popToTop = popToTop;
        /** pop */
        function pop(number) {
            if (number === void 0) { number = 1; }
            popStack(number);
        }
        NavigatorStack.pop = pop;
        /** finish */
        function finish(page, instance) {
            if (instance === void 0) { instance = null; }
            var stacks = [];
            all().forEach(function (stack) {
                if (stack.canFinish(page, instance)) {
                    stacks.push(stack);
                }
            });
            finishStack(stacks);
        }
        NavigatorStack.finish = finish;
    })(NavigatorStack = Tape.NavigatorStack || (Tape.NavigatorStack = {}));
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
    runtime.clickSound = null;
    var scaleTime = 100;
    function center(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }
    function scaleSmal(view) {
        center(view);
        Laya.Tween.to(view, { scaleX: 0.8, scaleY: 0.8 }, scaleTime);
    }
    function scaleBig(view) {
        Laya.Tween.to(view, { scaleX: 1, scaleY: 1 }, scaleTime);
    }
    function playSound(view) {
        if (runtime.clickSound) {
            Laya.SoundManager.playSound(runtime.clickSound, 1);
        }
    }
    var btn = /** @class */ (function (_super) {
        __extends(btn, _super);
        function btn() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this); });
            return _this;
        }
        return btn;
    }(Laya.Button));
    runtime.btn = btn;
    var btn_img = /** @class */ (function (_super) {
        __extends(btn_img, _super);
        function btn_img() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this); });
            return _this;
        }
        return btn_img;
    }(Laya.Image));
    runtime.btn_img = btn_img;
    var btn_label = /** @class */ (function (_super) {
        __extends(btn_label, _super);
        function btn_label() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this); });
            return _this;
        }
        return btn_label;
    }(Laya.Label));
    runtime.btn_label = btn_label;
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
        Tape.setBgColor();
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
    var bgColor = '#ffffff';
    Tape.setBgColor = function (color) {
        if (color === void 0) { color = bgColor; }
        bgColor = color;
        if (Laya.stage) {
            var bgView = Laya.stage.getChildByName('__tape_bg_view__');
            if (bgView) {
                bgView.bgColor = color;
            }
            else {
                bgView = new Laya.Label();
                bgView.bgColor = color;
                bgView.x = 0;
                bgView.y = 0;
                bgView.width = 750;
                bgView.height = 1334;
                Laya.stage.addChild(bgView);
            }
        }
    };
    Tape.getBgColor = function () {
        return bgColor;
    };
})(Tape || (Tape = {}));
