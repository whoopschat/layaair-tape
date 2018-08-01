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
        Platform.getScreenHeightWidthRatio = function () {
            var scale = (Laya.Browser.clientHeight / laya.utils.Browser.clientWidth);
            return scale;
        };
    })(Platform = Tape.Platform || (Tape.Platform = {}));
})(Tape || (Tape = {}));

var Tape;
(function (Tape) {
    var Screen;
    (function (Screen) {
        var __offset_x__ = 0;
        var __offset_y__ = 0;
        var __design_width__ = 0;
        var __design_height__ = 0;
        function init(width, height) {
            var options = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                options[_i - 2] = arguments[_i];
            }
            __design_width__ = width;
            __design_width__ = height;
            var screenRatio = Tape.Platform.getScreenHeightWidthRatio();
            var initRatio = height / width;
            var initWidth = width;
            var initHeight = height;
            __offset_x__ = 0;
            __offset_y__ = 0;
            if (Math.abs(screenRatio / initRatio - 1) > 0.1) {
                if (screenRatio > initRatio) {
                    initHeight = width * screenRatio;
                    __offset_y__ = (initHeight - height) / 2;
                }
                else {
                    initWidth = height / screenRatio;
                    __offset_x__ = (initWidth - width) / 2;
                }
            }
            Laya.init.apply(Laya, [initWidth, initHeight].concat(options));
            Tape.Background.init();
            Laya.stage.x = __offset_x__;
            Laya.stage.y = __offset_y__;
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        }
        Screen.init = init;
        function getOffestX() {
            return __offset_x__;
        }
        Screen.getOffestX = getOffestX;
        function getOffestY() {
            return __offset_y__;
        }
        Screen.getOffestY = getOffestY;
        function getDesignWidth() {
            return __design_width__;
        }
        Screen.getDesignWidth = getDesignWidth;
        function getDesignHeight() {
            return __design_height__;
        }
        Screen.getDesignHeight = getDesignHeight;
    })(Screen = Tape.Screen || (Tape.Screen = {}));
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
            Tape.Screen.init.apply(Tape.Screen, [width, height].concat(options));
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
            Tape.Screen.init.apply(Tape.Screen, [width, height].concat(options));
            __init_rank__();
        };
        MiniHandler.exit = function () {
            __exec_wx__('exitMiniProgram');
        };
    })(MiniHandler = Tape.MiniHandler || (Tape.MiniHandler = {}));
    function fixWidth(width) {
        var systemInfo = __exec_wx__('getSystemInfoSync');
        if (systemInfo) {
            var windowWidth = systemInfo.windowWidth;
            var stageWidth = Laya.stage.width;
            return width * windowWidth / stageWidth;
        }
        return width;
    }
    function fixHeight(height) {
        var systemInfo = __exec_wx__('getSystemInfoSync');
        if (systemInfo) {
            var windowHeight = systemInfo.windowHeight;
            var stageHeight = Laya.stage.height;
            return height * windowHeight / stageHeight;
        }
        return height;
    }
    /** MiniAd */
    var MiniAd;
    (function (MiniAd) {
        var __bannerStack__ = {};
        var __rewardedVideoAd__ = null;
        var __rewardedVideoCallback__ = null;
        function showBannerAd(adUnitId, x, y, w, h, onError) {
            if (onError === void 0) { onError = null; }
            var _a;
            hideBannerAd(adUnitId);
            var left = fixWidth(x + Tape.Screen.getOffestX());
            var top = fixHeight(y + Tape.Screen.getOffestY());
            var width = fixWidth(w);
            var height = fixHeight(h);
            var bannerAd = __exec_wx__('createBannerAd', {
                adUnitId: adUnitId,
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height
                }
            });
            if (bannerAd) {
                Object.assign(__bannerStack__, (_a = {},
                    _a[adUnitId] = bannerAd,
                    _a));
                bannerAd.onResize(function (res) {
                    bannerAd.style.top = bannerAd.style.top + height - res.height;
                });
                bannerAd.onError(function (err) {
                    onError && onError(err);
                });
                bannerAd.show();
            }
            else {
                onError && onError({
                    errMsg: 'showBannerAd:fail',
                    err_code: -1
                });
            }
        }
        MiniAd.showBannerAd = showBannerAd;
        function hideBannerAd(adUnitId) {
            if (__bannerStack__.hasOwnProperty(adUnitId)) {
                var bannerAd = __bannerStack__[adUnitId];
                bannerAd.destroy();
                delete __bannerStack__[adUnitId];
            }
        }
        MiniAd.hideBannerAd = hideBannerAd;
        function showRewardedVideoAd(adUnitId, onRewarded, onCancal, onError) {
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
        }
        MiniAd.showRewardedVideoAd = showRewardedVideoAd;
    })(MiniAd = Tape.MiniAd || (Tape.MiniAd = {}));
    /** MiniButton */
    var MiniButton;
    (function (MiniButton) {
        var clubButton = null;
        var clubIcon = null;
        var userButton = null;
        var userIcon = null;
        var feedbackButton = null;
        var feedbackIcon = null;
        function showFeedbackButton(image, x, y, w, h) {
            var left = fixWidth(x + Tape.Screen.getOffestX());
            var top = fixHeight(y + Tape.Screen.getOffestY());
            var width = fixWidth(w);
            var height = fixHeight(h);
            if (feedbackButton && feedbackIcon !== image) {
                feedbackButton.destroy();
                feedbackButton = null;
            }
            feedbackIcon = image;
            if (!feedbackButton) {
                feedbackButton = __exec_wx__('createFeedbackButton', {
                    type: 'image',
                    image: image,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                        height: height
                    }
                });
            }
            if (feedbackButton) {
                feedbackButton.style.left = left;
                feedbackButton.style.top = top;
                feedbackButton.style.width = width;
                feedbackButton.style.height = height;
                feedbackButton.show();
            }
            return feedbackButton;
        }
        MiniButton.showFeedbackButton = showFeedbackButton;
        function hideFeedbackButton() {
            if (feedbackButton) {
                feedbackButton.style.left = -feedbackButton.style.width;
                feedbackButton.style.top = -feedbackButton.style.height;
                feedbackButton.hide();
            }
            return feedbackButton;
        }
        MiniButton.hideFeedbackButton = hideFeedbackButton;
        function showGameClubButton(icon, x, y, w, h) {
            var left = fixWidth(x + Tape.Screen.getOffestX());
            var top = fixHeight(y + Tape.Screen.getOffestY());
            var width = fixWidth(w);
            var height = fixHeight(h);
            var icons = ['green', 'white', 'dark', 'light'];
            if (clubButton && clubIcon !== icon) {
                clubButton.destroy();
                clubButton = null;
            }
            clubIcon = icon;
            if (!clubButton) {
                clubButton = __exec_wx__('createGameClubButton', {
                    icon: icons.indexOf(icon) < 0 ? icons[0] : icon,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                        height: height
                    }
                });
            }
            if (clubButton) {
                if (icons.indexOf(icon) < 0) {
                    clubButton.image = icon;
                }
                clubButton.style.left = left;
                clubButton.style.top = top;
                clubButton.style.width = width;
                clubButton.style.height = height;
                clubButton.show();
            }
            return clubButton;
        }
        MiniButton.showGameClubButton = showGameClubButton;
        function hideGameClubButton() {
            if (clubButton) {
                clubButton.style.left = -clubButton.style.width;
                clubButton.style.top = -clubButton.style.height;
                clubButton.hide();
            }
            return clubButton;
        }
        MiniButton.hideGameClubButton = hideGameClubButton;
        function checkGetUserInfo(onSuccess, onFail) {
            __exec_wx__('getUserInfo', {
                withCredentials: true,
                success: onSuccess,
                fail: onFail
            });
        }
        MiniButton.checkGetUserInfo = checkGetUserInfo;
        function showGetUserInfoButton(image, x, y, w, h, onSuccess, onFail) {
            var left = fixWidth(x + Tape.Screen.getOffestX());
            var top = fixHeight(y + Tape.Screen.getOffestY());
            var width = fixWidth(w);
            var height = fixHeight(h);
            if (userButton && userIcon !== image) {
                userButton.destroy();
                userButton = null;
            }
            userIcon = image;
            if (!userButton) {
                userButton = __exec_wx__('createUserInfoButton', {
                    withCredentials: true,
                    type: 'image',
                    image: image,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                        height: height
                    }
                });
            }
            if (userButton) {
                userButton.style.left = left;
                userButton.style.top = top;
                userButton.style.width = width;
                userButton.style.height = height;
                userButton.onTap(function (res) {
                    if (res.errMsg.indexOf(':ok') > 0) {
                        onSuccess && onSuccess(res);
                    }
                    else {
                        onFail && onFail(res);
                    }
                });
                userButton.show();
            }
            return userButton;
        }
        MiniButton.showGetUserInfoButton = showGetUserInfoButton;
        function hideGetUserInfoButton() {
            if (userButton) {
                userButton.style.left = -userButton.style.width;
                userButton.style.top = -userButton.style.height;
                userButton.hide();
            }
            return userButton;
        }
        MiniButton.hideGetUserInfoButton = hideGetUserInfoButton;
    })(MiniButton = Tape.MiniButton || (Tape.MiniButton = {}));
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
        MiniRank.showRank = function (ui, options, onlyRefreshData) {
            if (options === void 0) { options = {}; }
            if (onlyRefreshData === void 0) { onlyRefreshData = false; }
            __post_message_to_sub_context__({
                action: onlyRefreshData ? "refreshData" : "showUI",
                data: onlyRefreshData ? options : Object.assign({
                    ui: JSON.stringify(ui || {}),
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
        Activity.open = function (params, action) {
            Tape.NavigatorStack.navigate(this, params, action);
        };
        Activity.finish = function () {
            Tape.NavigatorStack.finish(this);
        };
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
        Activity.prototype._create = function () {
            this.onCreate && this.onCreate();
        };
        Activity.prototype._resume = function () {
            this.onResume && this.onResume();
        };
        Activity.prototype._pause = function () {
            this.onPause && this.onPause();
        };
        Activity.prototype._destroy = function () {
            this.onDestroy && this.onDestroy();
        };
        Activity.prototype._nextProgress = function (progress) {
            this.onNextProgress && this.onNextProgress(progress);
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
    var Background;
    (function (Background) {
        var bgSprite = null;
        var bgColor = '#000000';
        function init() {
            bgSprite = Laya.stage.getChildByName('BackgroundSprite');
            if (!bgSprite) {
                bgSprite = new Laya.Sprite;
                bgSprite.name = 'BackgroundSprite';
                Laya.stage.addChild(bgSprite);
            }
            bgSprite.x = -Tape.Screen.getOffestX();
            bgSprite.y = -Tape.Screen.getOffestY();
            bgSprite.width = Laya.stage.width;
            bgSprite.height = Laya.stage.height;
            bgSprite.graphics.clear();
            bgSprite.graphics.drawRect(0, 0, bgSprite.width, bgSprite.height, bgColor);
        }
        Background.init = init;
        function getBgSprite() {
            return bgSprite;
        }
        Background.getBgSprite = getBgSprite;
        function setBgColor(color) {
            bgColor = color;
            if (!bgSprite) {
                return;
            }
            bgSprite.graphics.clear();
            bgSprite.graphics.drawRect(0, 0, bgSprite.width, bgSprite.height, color);
        }
        Background.setBgColor = setBgColor;
        function getBgColor() {
            return bgColor;
        }
        Background.getBgColor = getBgColor;
    })(Background = Tape.Background || (Tape.Background = {}));
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
            _this.initBg();
            return _this;
        }
        PopView.show = function (params, onHide) {
            Tape.PopManager.showPop(this, params, onHide);
        };
        PopView.hide = function () {
            Tape.PopManager.hidePop(this);
        };
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
        PopView.prototype.initBg = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.isTranslucent) {
                    return;
                }
                var bgSprite = new Laya.Sprite();
                bgSprite.alpha = _this.bgAlpha;
                bgSprite.graphics.clear();
                bgSprite.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, _this.bgColor);
                bgSprite.x = -Tape.Screen.getOffestX();
                bgSprite.y = -Tape.Screen.getOffestY();
                bgSprite.width = Laya.stage.width;
                bgSprite.height = Laya.stage.height;
                bgSprite.on(Laya.Event.CLICK, _this, function (e) {
                    if (_this.canceledOnTouchOutside) {
                        _this.finish();
                    }
                    e.stopPropagation();
                });
                if (_this.canceledOnTouchOutside && _this.ui) {
                    _this.ui.mouseThrough = true;
                }
                _this.addChildAt(bgSprite, 0);
            }, 0);
        };
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
            Laya.Tween.to(view, from, duration, Laya.Ease.quintOut, Laya.Handler.create(this, function () {
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
        function checkInit() {
            if (inited) {
                return;
            }
            var uiManager = new Laya.Sprite();
            mainUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_main_ui_layer';
            popUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_pop_ui_layer';
            topUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_top_ui_layer';
            uiManager.addChild(mainUILayer);
            uiManager.addChild(popUILayer);
            uiManager.addChild(topUILayer);
            Laya.stage.addChild(uiManager);
            inited = true;
        }
        function addMainUI(view) {
            checkInit();
            view && mainUILayer.addChild(view);
        }
        UIManager.addMainUI = addMainUI;
        function clearMainUI() {
            checkInit();
            mainUILayer.removeChildren();
        }
        UIManager.clearMainUI = clearMainUI;
        function addPopUI(view) {
            checkInit();
            view && popUILayer.addChild(view);
        }
        UIManager.addPopUI = addPopUI;
        function clearPopUI() {
            checkInit();
            popUILayer.removeChildren();
        }
        UIManager.clearPopUI = clearPopUI;
        function addTopUI(view) {
            checkInit();
            view && topUILayer.addChild(view);
        }
        UIManager.addTopUI = addTopUI;
        function clearTopUI() {
            checkInit();
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
            this.__activity__._create();
            this.__options__.onShow && this.__options__.onShow();
        };
        NavigatorLoader.prototype.__on_load_progress__ = function (progress) {
            this.__options__.onLoadProgress && this.__options__.onLoadProgress(this, progress);
        };
        NavigatorLoader.prototype.nextProgress = function (progress) {
            this.__activity__._nextProgress(progress);
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
                this.__activity__._resume();
                this.visible = true;
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, function () {
                    callback && callback();
                }));
            }
            else {
                this.__activity__._resume();
                this.visible = true;
                callback && callback();
            }
        };
        NavigatorLoader.prototype.hide = function () {
            if (!this.visible) {
                return;
            }
            this.__activity__._pause();
            this.visible = false;
        };
        NavigatorLoader.prototype.exit = function () {
            this.__activity__._destroy();
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
    function playSound(view, sound) {
        if (sound) {
            Laya.SoundManager.playSound(sound, 1);
        }
        else if (runtime.clickSound) {
            Laya.SoundManager.playSound(runtime.clickSound, 1);
        }
    }
    var btn = /** @class */ (function (_super) {
        __extends(btn, _super);
        function btn() {
            var _this = _super.call(this) || this;
            _this.sound = null;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this, _this.sound); });
            return _this;
        }
        return btn;
    }(Laya.Button));
    runtime.btn = btn;
    var btn_img = /** @class */ (function (_super) {
        __extends(btn_img, _super);
        function btn_img() {
            var _this = _super.call(this) || this;
            _this.sound = null;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this, _this.sound); });
            return _this;
        }
        return btn_img;
    }(Laya.Image));
    runtime.btn_img = btn_img;
    var btn_label = /** @class */ (function (_super) {
        __extends(btn_label, _super);
        function btn_label() {
            var _this = _super.call(this) || this;
            _this.sound = null;
            _this.on(Laya.Event.MOUSE_DOWN, _this, function () { return scaleSmal(_this); });
            _this.on(Laya.Event.MOUSE_UP, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.MOUSE_OUT, _this, function () { return scaleBig(_this); });
            _this.on(Laya.Event.CLICK, _this, function () { return playSound(_this, _this.sound); });
            return _this;
        }
        return btn_label;
    }(Laya.Label));
    runtime.btn_label = btn_label;
})(runtime || (runtime = {}));

var Tape;
(function (Tape) {
    var TiledMap = /** @class */ (function () {
        function TiledMap(url) {
            this.mCanDrag = false;
            this.mMapUrl = '';
            this.mLastMouseX = 0;
            this.mLastMouseY = 0;
            this.mX = 0;
            this.mY = 0;
            this.onLoaded = null;
            this.mMapUrl = url;
            this.mX = 0;
            this.mY = 0;
            this.mTiledMap = new Laya.TiledMap();
            this.loadMap();
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        }
        TiledMap.prototype.setCanDrag = function (canDrag) {
            this.mCanDrag = canDrag;
        };
        TiledMap.prototype.getMap = function () {
            return this.mTiledMap;
        };
        TiledMap.prototype.destroy = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.destroy();
            this.mTiledMap = null;
        };
        TiledMap.prototype.show = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.mapSprite().visible = true;
        };
        TiledMap.prototype.hide = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.mapSprite().visible = false;
        };
        TiledMap.prototype.loadMap = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.createMap(this.mMapUrl, new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), new Laya.Handler(this, this.completeHandler), new Laya.Rectangle(160, 160, 160, 160), null, true, true);
        };
        TiledMap.prototype.completeHandler = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.onLoaded && this.onLoaded();
            this.resize();
        };
        TiledMap.prototype.mouseDown = function () {
            this.mLastMouseX = Laya.stage.mouseX;
            this.mLastMouseY = Laya.stage.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        TiledMap.prototype.mouseMove = function () {
            if (!this.mCanDrag) {
                return;
            }
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
        };
        TiledMap.prototype.mouseUp = function () {
            this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
            this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        };
        TiledMap.prototype.resize = function () {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
        };
        return TiledMap;
    }());
    Tape.TiledMap = TiledMap;
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
