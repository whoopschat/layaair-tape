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
            var result = [];
            while (result.length < randomLength) {
                var randomObj = random(copy);
                result.push(randomObj);
                copy.splice(copy.indexOf(randomLength), 1);
            }
            return result;
        }
        ArrayUtil.randomArr = randomArr;
    })(ArrayUtil = Tape.ArrayUtil || (Tape.ArrayUtil = {}));
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
            sharedCanvas.width = 1500;
            sharedCanvas.height = 3000;
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
            sharedCanvas.width = 1500;
            sharedCanvas.height = 3000;
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
                    bannerAd_1.onError(function (err) {
                        onError && onError(err);
                    });
                    bannerAd_1.show();
                }
                else {
                    onError && onError({
                        errMsg: 'showBannerAd:fail',
                        err_code: -1
                    });
                }
            }
            else {
                onError && onError({
                    errMsg: 'showBannerAd:fail',
                    err_code: -1
                });
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
            /** params */
            _this.params = {};
            /** turn on and off animation */
            _this.inEaseDuration = 0;
            _this.inEase = null;
            _this.inEaseFromProps = null;
            _this.inEaseToProps = null;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this.params = Object.assign({}, options.params || {});
            _this.page = options.page;
            return _this;
        }
        Object.defineProperty(Activity.prototype, "ui", {
            get: function () {
                return this.getChildByName('_contentView');
            },
            set: function (view) {
                view.name = '_contentView';
                this.removeChildren();
                this.addChild(view);
            },
            enumerable: true,
            configurable: true
        });
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
        Activity.prototype.finish = function (page, instance) {
            if (instance === void 0) { instance = null; }
            Tape.NavigatorStack.finish(page, instance);
        };
        Activity.prototype.pop = function (number) {
            Tape.NavigatorStack.pop(number);
        };
        Activity.prototype.popToTop = function () {
            Tape.NavigatorStack.popToTop();
        };
        /** res */
        Activity.res = [];
        return Activity;
    }(Laya.Component));
    Tape.Activity = Activity;
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var PopManager;
    (function (PopManager) {
        var pops = {};
        var onhides = {};
        function registerOnHide(pop, onHide) {
            if (!onHide || typeof onHide !== 'function') {
                return;
            }
            var arr = onhides[pop];
            if (arr) {
                arr.push(onHide);
            }
            else {
                onhides[pop] = [onHide];
            }
        }
        function callOnHide(pop) {
            var arr = onhides[pop];
            if (arr && arr.length > 0) {
                arr.forEach(function (element) {
                    element && element(pop);
                });
                arr.splice(0, arr.length);
            }
        }
        function showPop(pop, params, onHide) {
            if (params === void 0) { params = null; }
            if (onHide === void 0) { onHide = null; }
            var view = pops[pop];
            if (view) {
                view.pop = pop;
                view.params = params || {};
            }
            else {
                view = new pop();
                view.pop = pop;
                view.params = params || {};
                pops[pop] = view;
            }
            view.onShow && view.onShow();
            Tape.UIManager.addPopUI(view);
            registerOnHide(pop, onHide);
        }
        PopManager.showPop = showPop;
        function hidePop(pop) {
            var view = pops[pop];
            if (view) {
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
                delete pops[pop];
            }
            callOnHide(pop);
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
                    if (_this.canceledOnTouchOutside && _this.ui) {
                        _this.ui.mouseThrough = true;
                    }
                    _this.addChildAt(bg, 0);
                }
            }, 0);
            return _this;
        }
        Object.defineProperty(PopView.prototype, "ui", {
            get: function () {
                return this.getChildByName('_contentView');
            },
            set: function (view) {
                this.removeChildren();
                view.name = '_contentView';
                this.addChild(view);
            },
            enumerable: true,
            configurable: true
        });
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
            var res = _this.__options__.page.res;
            if (res && res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(_this, function () {
                    _this.__new_activity__();
                    _this.__on_loaded__();
                }), Laya.Handler.create(_this, function (progress) {
                    _this.__on_load_progress__(progress);
                }, null, false));
            }
            else {
                _this.__new_activity__();
                _this.__on_loaded__();
            }
            return _this;
        }
        NavigatorLoader.prototype.__new_activity__ = function () {
            if (this.__activity__) {
                return;
            }
            this.__activity__ = new this.__options__.page({
                page: this.__options__.page,
                params: this.__options__.params
            });
        };
        NavigatorLoader.prototype.__on_loaded__ = function () {
            this.__options__.onLoaded && this.__options__.onLoaded(this);
            this.addChild(this.__activity__);
            this.__activity__.onCreate && this.__activity__.onCreate();
            this.__options__.onShow && this.__options__.onShow();
        };
        NavigatorLoader.prototype.__on_load_progress__ = function (progress) {
            this.__options__.onLoadProgress && this.__options__.onLoadProgress(this, progress);
        };
        NavigatorLoader.prototype.nextProgress = function (progress) {
            this.__activity__.onNextProgress && this.__activity__.onNextProgress(progress);
        };
        NavigatorLoader.prototype.canFinish = function (page, activity) {
            if (page === this.__options__.page) {
                return !activity || activity === this.__activity__;
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
        function pushStack(stack) {
            __loaders__.push(stack);
        }
        function refreshStack(callback) {
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
                onShow: function () {
                    refreshStack(function () {
                        action && action(true);
                    });
                },
                onLoaded: function (loader) {
                    __loading__ = false;
                    Tape.UIManager.addMainUI(loader);
                    pushStack(loader);
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
    var MapTile = /** @class */ (function (_super) {
        __extends(MapTile, _super);
        function MapTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MapTile;
    }(Laya.Image));
    Tape.MapTile = MapTile;
    var MapView = /** @class */ (function (_super) {
        __extends(MapView, _super);
        function MapView(url) {
            var _this = _super.call(this) || this;
            _this._mapUrl_ = '';
            _this._mapData_ = null;
            _this._mapSprite_ = new Laya.Sprite;
            _this._mapTileMouse_ = null;
            _this._mapLoaded_ = null;
            _this.width = Laya.stage.width;
            _this.height = Laya.stage.height;
            _this._mapUrl_ = url;
            _this.addChild(_this._mapSprite_);
            _this.loadMapData();
            _this._mapSprite_.on(Laya.Event.MOUSE_DOWN, _this, function () {
                _this._mapSprite_.startDrag();
            });
            _this._mapSprite_.on(Laya.Event.MOUSE_UP, _this, function () {
                _this._mapSprite_.stopDrag();
            });
            return _this;
        }
        // public props
        MapView.prototype.onMapTileMouse = function (callback) {
            this._mapTileMouse_ = callback;
        };
        MapView.prototype.onMapLoaded = function (callback) {
            this._mapLoaded_ = callback;
        };
        MapView.prototype.getMapData = function () {
            return this._mapData_;
        };
        MapView.prototype.getMapUrl = function () {
            return this._mapUrl_;
        };
        MapView.prototype.getMapPath = function () {
            return this._mapUrl_.substr(0, this._mapUrl_.lastIndexOf('\/'));
        };
        MapView.prototype.getMapTileSets = function () {
            return this._mapData_.tilesets || [];
        };
        MapView.prototype.getMapTileField = function (id, field) {
            var tilesets = this._mapData_.tilesets || [];
            if (tilesets.length > 0) {
                var filter = tilesets.filter(function (res) {
                    return res.id == id;
                });
                if (filter.length > 0) {
                    return filter[0][field];
                }
            }
            return null;
        };
        MapView.prototype.getMapCustomLayer = function (name) {
            return this._mapSprite_.getChildByName("layer_custom_" + name);
        };
        MapView.prototype.getMapBgLayer = function () {
            return this._mapSprite_.getChildByName("layer_bg");
        };
        MapView.prototype.getMapLayer = function (name) {
            return this._mapSprite_.getChildByName("layer_" + name);
        };
        MapView.prototype.loadMapData = function () {
            var _this = this;
            Laya.loader.load(this._mapUrl_, Laya.Handler.create(this, function (res) {
                _this._mapData_ = res || {};
                _this.loadMapRes();
            }), null, Laya.Loader.JSON);
        };
        MapView.prototype.loadMapRes = function () {
            var _this = this;
            var tilesets = this._mapData_.tilesets || [];
            if (tilesets.length > 0) {
                Laya.loader.load(tilesets.map(function (val) {
                    return { url: _this.getMapPath() + "/" + val.image, type: Laya.Loader.IMAGE };
                }), Laya.Handler.create(this, function () {
                    _this.loadComplete();
                }));
            }
            else {
                this.loadComplete();
            }
        };
        MapView.prototype.loadComplete = function () {
            var _this = this;
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var padding = this._mapData_.padding || 0;
            var layers = this._mapData_.layers || [];
            var width = columns * tilewidth;
            var height = rows * tileheight;
            var bgSp = new Laya.Sprite;
            bgSp.name = "layer_bg";
            this._mapSprite_.addChild(bgSp);
            var gridSp = new Laya.Sprite;
            gridSp.name = "layer_grid";
            this._mapSprite_.addChild(gridSp);
            layers.forEach(function (layer) {
                var layerSp = new Laya.Sprite;
                layerSp.name = "layer_" + layer.name;
                _this._mapSprite_.addChild(layerSp);
                var customSp = new Laya.Sprite;
                customSp.name = "layer_custom_" + layer.name;
                _this._mapSprite_.addChild(customSp);
            });
            var pointSp = new Laya.Sprite;
            pointSp.name = "layer_point";
            this._mapSprite_.addChild(pointSp);
            this._mapLoaded_ && this._mapLoaded_(this._mapData_);
            this.frameLoop(1, this, this.drawMapLayer);
        };
        MapView.prototype.refreshSize = function () {
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var padding = this._mapData_.padding || 0;
            var layers = this._mapData_.layers || [];
            var width = columns * tilewidth;
            var height = rows * tileheight;
            this._mapSprite_.width = width + 2 * padding;
            this._mapSprite_.height = height + 2 * padding;
            var num = this._mapSprite_.numChildren;
            for (var index = 0; index < num; index++) {
                var layer = this._mapSprite_.getChildAt(index);
                layer.x = padding;
                layer.y = padding;
                layer.width = width;
                layer.height = height;
            }
        };
        MapView.prototype.checkVisible = function (r, c) {
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var oblique = this._mapData_.oblique === true;
            var mapX = -this._mapSprite_.x;
            var mapY = -this._mapSprite_.y;
            var offsetR = Math.floor(mapY / tileheight) - 2;
            var offsetC = Math.floor(mapX / tilewidth) - 2;
            var countR = Math.floor(this.height / tileheight) + 4;
            var countC = Math.floor(this.width / tilewidth) + 4;
            if (r >= offsetR && c >= offsetC && r < offsetR + countR && c < offsetC + countC) {
                return true;
            }
            return false;
        };
        MapView.prototype.drawPoint = function () {
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var pointSp = this._mapSprite_.getChildByName("layer_point");
            if (pointSp) {
                pointSp.visible = this._mapData_.showPoint === true;
                pointSp.alpha = this._mapData_.pointAlpha || 1;
                var color = this._mapData_.pointColor || '#3399ff';
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        var checkVisible = this.checkVisible(r, c);
                        var tile = pointSp.getChildByName(r + "_" + c);
                        if (!checkVisible) {
                            if (tile) {
                                tile.removeSelf();
                                Laya.Pool.recover('layer_point_tile', tile);
                            }
                        }
                        else {
                            if (!tile) {
                                tile = Laya.Pool.getItemByCreateFun('layer_point_tile', function () {
                                    return new Laya.Label;
                                });
                                tile.name = r + "_" + c;
                                pointSp.addChild(tile);
                            }
                            tile.text = "(" + r + "," + c + ")";
                            tile.fontSize = 20;
                            tile.color = color;
                            tile.x = c * tilewidth + tilewidth / 2;
                            tile.y = r * tileheight + tileheight / 2;
                            tile.width = tilewidth;
                            tile.height = tileheight;
                            tile.anchorX = 0.5;
                            tile.anchorY = 0.5;
                        }
                    }
                }
            }
        };
        MapView.prototype.drawGrid = function () {
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var gridSp = this._mapSprite_.getChildByName("layer_grid");
            if (gridSp) {
                gridSp.visible = this._mapData_.showGrid === true;
                gridSp.alpha = this._mapData_.gridAlpha || 1;
                var bgColor = this._mapData_.gridColor || '#000000';
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        var checkVisible = this.checkVisible(r, c);
                        var tile = gridSp.getChildByName(r + "_" + c);
                        if (!checkVisible) {
                            if (tile) {
                                tile.removeSelf();
                                Laya.Pool.recover('layer_grid_tile', tile);
                            }
                        }
                        else {
                            if (!tile) {
                                tile = Laya.Pool.getItemByCreateFun('layer_grid_tile', function () {
                                    return new Laya.Label;
                                });
                                tile.name = r + "_" + c;
                                gridSp.addChild(tile);
                            }
                            tile.fontSize = 20;
                            if ((c + r) % 2 == 1) {
                                tile.bgColor = bgColor;
                            }
                            else {
                                tile.bgColor = '#ffffff';
                            }
                            tile.x = c * tilewidth + tilewidth / 2;
                            tile.y = r * tileheight + tileheight / 2;
                            tile.width = tilewidth;
                            tile.height = tileheight;
                            tile.anchorX = 0.5;
                            tile.anchorY = 0.5;
                        }
                    }
                }
            }
        };
        MapView.prototype.drawMapLayer = function () {
            var _this = this;
            this.refreshSize();
            this.drawGrid();
            this.drawPoint();
            var rows = this._mapData_.rows || 0;
            var columns = this._mapData_.columns || 0;
            var tilewidth = this._mapData_.tilewidth || 0;
            var tileheight = this._mapData_.tileheight || 0;
            var oblique = this._mapData_.oblique === true;
            var layers = this._mapData_.layers || [];
            layers.forEach(function (layer) {
                var alpha = layer.alpha || 1;
                var datas = layer.data || [];
                var layerSp = _this._mapSprite_.getChildByName("layer_" + layer.name);
                if (layerSp) {
                    layerSp.visible = layer.visible !== false;
                    layerSp.alpha = alpha;
                    for (var r = 0; r < rows; r++) {
                        var _loop_1 = function () {
                            var index = r * columns + c;
                            var id = datas[index];
                            if (id > 0) {
                                var tile_1 = layerSp.getChildByName(r + "_" + c + "_" + id);
                                var checkVisible = _this.checkVisible(r, c);
                                if (!checkVisible) {
                                    if (tile_1) {
                                        tile_1.removeSelf();
                                        Laya.Pool.recover("layer_tild", tile_1);
                                    }
                                }
                                else {
                                    if (!tile_1) {
                                        tile_1 = Laya.Pool.getItemByCreateFun("layer_tild", function () {
                                            return new MapTile();
                                        });
                                        Object.assign(tile_1, {
                                            alpha: 1,
                                            rotation: 0,
                                            scaleX: 1,
                                            scaleY: 1,
                                            visible: true
                                        });
                                        tile_1.zOrder = index;
                                        tile_1.name = r + "_" + c + "_" + id;
                                        tile_1.tag = layer;
                                        tile_1.on(Laya.Event.CLICK, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.CLICK,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_DOWN, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_DOWN,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_MOVE, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_MOVE,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_OUT, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_OUT,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_OVER, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_OVER,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_UP, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_UP,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        tile_1.on(Laya.Event.MOUSE_WHEEL, _this, function (event) {
                                            if (layer.clickable) {
                                                _this._mapTileMouse_ && _this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_WHEEL,
                                                    event: event
                                                }, tile_1, r, c, id);
                                            }
                                        });
                                        layerSp.addChild(tile_1);
                                    }
                                    tile_1.width = undefined;
                                    tile_1.height = undefined;
                                    tile_1.skin = _this.getMapPath() + "/" + _this.getMapTileField(id, 'image');
                                    var b = tile_1.height / tile_1.width;
                                    tile_1.x = c * tilewidth + tilewidth / 2;
                                    tile_1.y = r * tileheight + tileheight / 2;
                                    tile_1.width = tilewidth;
                                    tile_1.height = tile_1.width * b;
                                    tile_1.anchorX = 0.5;
                                    tile_1.anchorY = 0.5;
                                    tile_1.y = tile_1.y - (tile_1.height - tileheight) / 2;
                                }
                            }
                        };
                        for (var c = 0; c < columns; c++) {
                            _loop_1();
                        }
                    }
                }
            });
        };
        return MapView;
    }(Laya.Sprite));
    Tape.MapView = MapView;
})(Tape || (Tape = {}));

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
                bgView.name = '__tape_bg_view__';
                bgView.bgColor = color;
                bgView.x = 0;
                bgView.y = 0;
                bgView.width = Laya.stage.width;
                bgView.height = Laya.stage.height;
                Laya.stage.addChild(bgView);
            }
        }
    };
    Tape.getBgColor = function () {
        return bgColor;
    };
})(Tape || (Tape = {}));
