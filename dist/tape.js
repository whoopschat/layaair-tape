// =========================== //
// Tape polyfill.js
// =========================== //
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

// =========================== //
// Tape build.js
// =========================== //
var Tape;
(function (Tape) {
    var Build = /** @class */ (function () {
        function Build() {
        }
        /**
         * configEnv
         * @param env development or production
         */
        Build.configEnv = function (env) {
            this.__default_env__ = env;
        };
        /**
         * get build env
         * @return env mode : development or production
         */
        Build.getEnv = function () {
            if (this.__default_env__.indexOf('${') >= 0) {
                return 'development';
            }
            return this.__default_env__;
        };
        /**
         * isDebug
         */
        Build.isDebug = function () {
            return this.getEnv() !== 'production';
        };
        Build.__default_env__ = '${env}';
        return Build;
    }());
    Tape.Build = Build;
})(Tape || (Tape = {}));

// =========================== //
// Tape eventbus.js
// =========================== //
var Tape;
(function (Tape) {
    var EventBus = /** @class */ (function () {
        function EventBus() {
        }
        EventBus.post = function (event, data) {
            if (!event) {
                return;
            }
            if (this.__event_group__.hasOwnProperty(event)) {
                var list = this.__event_group__[event];
                if (list.length > 0) {
                    list.forEach(function (value) {
                        value && value(data);
                    });
                }
            }
        };
        EventBus.on = function (event, callback) {
            if (!event || !callback) {
                return;
            }
            if (!this.__event_group__.hasOwnProperty(event)) {
                this.__event_group__[event] = new Array();
            }
            var list = this.__event_group__[event];
            list.push(callback);
        };
        EventBus.__event_group__ = {};
        return EventBus;
    }());
    Tape.EventBus = EventBus;
})(Tape || (Tape = {}));

// =========================== //
// Tape logger.js
// =========================== //
var Tape;
(function (Tape) {
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        /**
         * setDebug
         */
        Logger.setDebug = function (debug) {
            this.__is_debug__ = debug;
        };
        /**
         * isDebug
         */
        Logger.isDebug = function () {
            return this.__is_debug__;
        };
        /**
         * log
         */
        Logger.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.log.apply(console, [message].concat(optionalParams));
        };
        /**
         * error
         */
        Logger.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.error.apply(console, [message].concat(optionalParams));
        };
        /**
         * info
         */
        Logger.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.info.apply(console, [message].concat(optionalParams));
        };
        /**
         * warn
         */
        Logger.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.warn.apply(console, [message].concat(optionalParams));
        };
        /**
         * debug
         */
        Logger.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!this.isDebug()) {
                return;
            }
            console.debug.apply(console, [message].concat(optionalParams));
        };
        Logger.__is_debug__ = Tape.Build.isDebug();
        return Logger;
    }());
    Tape.Logger = Logger;
})(Tape || (Tape = {}));

// =========================== //
// Tape NumUtil.js
// =========================== //
var Tape;
(function (Tape) {
    var NumUtil = /** @class */ (function () {
        function NumUtil() {
        }
        /**
         * rangedNum
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        NumUtil.rangedNum = function (val, min, max) {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        };
        /**
         * randomFloat
         * @param min min number default 0
         * @param max max number default 1
         */
        NumUtil.randomFloat = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            return Math.random() * (max - min) + min;
        };
        /**
         * randomInteger
         * @param min min number
         * @param max max number
         */
        NumUtil.randomInteger = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };
        return NumUtil;
    }());
    Tape.NumUtil = NumUtil;
})(Tape || (Tape = {}));

// =========================== //
// Tape uuid.js
// =========================== //
var Tape;
(function (Tape) {
    var UUID = /** @class */ (function () {
        function UUID() {
        }
        UUID._s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        UUID.randomUUID = function () {
            return (this._s4() + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + this._s4() + this._s4());
        };
        return UUID;
    }());
    Tape.UUID = UUID;
})(Tape || (Tape = {}));

// =========================== //
// Tape conch.js
// =========================== //
var Tape;
(function (Tape) {
    Tape.isConchApp = function () {
        return window.hasOwnProperty('conch');
    };
    /**
     * ConchHandler
     */
    var ConchHandler = /** @class */ (function () {
        function ConchHandler() {
        }
        /**
         * 初始化
         * @param width 宽度
         * @param height 高度
         * @param options 其他拓展
         */
        ConchHandler.init = function (width, height) {
            var options = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                options[_i - 2] = arguments[_i];
            }
            Laya.init.apply(Laya, [width, height].concat(options));
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        };
        ConchHandler.exit = function () {
            if (Tape.isConchApp() && window["conch"].hasOwnProperty("exit")) {
                window["conch"].exit();
            }
        };
        return ConchHandler;
    }());
    Tape.ConchHandler = ConchHandler;
})(Tape || (Tape = {}));

// =========================== //
// Tape mini.js
// =========================== //
var Tape;
(function (Tape) {
    var mockHandler = function (func) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        if (options['fail'] && typeof options['fail'] === 'function') {
            options['fail']();
        }
        return "";
    };
    /**
     * __WX__
     */
    Tape.__WX__ = function (func) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        if (window.hasOwnProperty("wx")) {
            if (window['wx'].hasOwnProperty(func)) {
                if (options['success'] && typeof options['success'] === 'function') {
                    var success = options['success'];
                }
                if (options['fail'] && typeof options['fail'] === 'function') {
                    var fail = options['fail'];
                }
                options['success'] = function (res) {
                    success && success(res);
                    Tape.Logger.debug("__WX__:success", res);
                };
                options['fail'] = function (res) {
                    fail && fail(res);
                    Tape.Logger.debug("__WX__:fail", res);
                };
                return (_a = window['wx'])[func].apply(_a, options);
            }
            else {
                return mockHandler.apply(void 0, [func].concat(options));
            }
        }
        else {
            return mockHandler.apply(void 0, [func].concat(options));
        }
        var _a;
    };
    /**
     * isMiniGame
     */
    Tape.isMiniGame = function () {
        return window.hasOwnProperty("wx");
    };
    /**
     * MiniHandler
     */
    var MiniHandler = /** @class */ (function () {
        function MiniHandler() {
        }
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
            MiniOpenContext.postMessageToOpenDataContext({
                data: {
                    action: 'init',
                    data: {
                        width: Laya.stage.width,
                        height: Laya.stage.height,
                        matrix: Laya.stage._canvasTransform
                    }
                }
            });
        };
        MiniHandler.exit = function () {
            Tape.__WX__('exitMiniProgram');
        };
        return MiniHandler;
    }());
    Tape.MiniHandler = MiniHandler;
    //-------------------------------------------------------
    //-- MiniUI
    //-------------------------------------------------------
    var MiniUI = /** @class */ (function () {
        function MiniUI() {
        }
        MiniUI.createSharedCanvasView = function () {
            var sharedCanvasView = new Laya.Sprite();
            if (window.hasOwnProperty('sharedCanvas')) {
                var sharedCanvas = window['sharedCanvas'];
                sharedCanvas.width = Laya.stage.width;
                sharedCanvas.height = Laya.stage.height;
                if (!sharedCanvas.hasOwnProperty('_addReference')) {
                    sharedCanvas['_addReference'] = function () {
                    };
                }
                var rankTexture = new Laya.Texture(sharedCanvas);
                rankTexture.bitmap.alwaysChange = true;
                sharedCanvasView.width = Laya.stage.width;
                sharedCanvasView.height = Laya.stage.height;
                sharedCanvasView.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
            }
            return sharedCanvasView;
        };
        MiniUI.showUserInfoButton = function (options) {
            if (!options) {
                options = {};
            }
            var showCustom = options['showCustom'];
            var hideCustom = options['hideCustom'];
            var onSuccess = function (res) {
                options['success'] && options['success'](res);
                options['complete'] && options['complete'](res);
            };
            var onFailed = function (res) {
                options['fail'] && options['fail'](res);
                options['complete'] && options['complete'](res);
            };
            MiniUI.hideUserInfoButton();
            Tape.__WX__('getSystemInfo', {
                success: function (systemInfo) {
                    var stageWidth = Laya.stage.width;
                    var stageHeight = Laya.stage.width;
                    var windowWidth = systemInfo.windowWidth || stageWidth;
                    var windowHeight = systemInfo.windowHeight || stageHeight;
                    var style = options['style'] || {};
                    var width = style['width'] || 200;
                    var height = style['height'] || 40;
                    var borderRadius = style['borderRadius'] || height / 5;
                    style['left'] = (style['left'] || (stageWidth / 2 - width / 2)) * windowWidth / stageWidth;
                    style['top'] = (style['top'] || (stageHeight / 2 - height / 2)) * windowHeight / stageHeight;
                    style['lineHeight'] = (style['lineHeight'] || height) * windowHeight / stageHeight;
                    style['width'] = width * windowWidth / stageWidth;
                    style['height'] = height * windowHeight / stageHeight;
                    style['backgroundColor'] = (style['backgroundColor'] || '#348912');
                    style['color'] = (style['color'] || '#ffffff');
                    style['textAlign'] = (style['textAlign'] || 'center');
                    style['borderRadius'] = borderRadius * windowHeight / stageHeight;
                    options['style'] = style;
                    var userInfoButton = Tape.__WX__('createUserInfoButton', options);
                    if (userInfoButton) {
                        MiniUI.onHideUserInfoButton = function () {
                            try {
                                userInfoButton.hide();
                                userInfoButton.destroy();
                            }
                            catch (error) {
                            }
                        };
                        userInfoButton.onTap(function (res) {
                            Tape.__WX__('getSetting', {
                                success: function (authRes) {
                                    var authSetting = authRes.authSetting;
                                    if (authSetting['scope.userInfo'] === true) {
                                        onSuccess && onSuccess(res);
                                    }
                                    else {
                                        onFailed && onFailed({
                                            errMsg: "getUserInfo:fail auth deny"
                                        });
                                    }
                                }
                            });
                        });
                        userInfoButton.show();
                    }
                    else {
                        MiniUI.onHideUserInfoButton = function () {
                            hideCustom && hideCustom();
                        };
                        var getUserInfoFail = function () {
                            onFailed && onFailed({
                                errMsg: "getUserInfo:fail auth deny"
                            });
                        };
                        var getUserInfoSuccess = function (res) {
                            onSuccess && onSuccess(res);
                        };
                        var getUserInfo = function () {
                            Tape.__WX__('getUserInfo', {
                                success: getUserInfoSuccess,
                                fail: getUserInfoFail
                            });
                        };
                        var tap = function () {
                            Tape.__WX__('getSetting', {
                                success: function (res) {
                                    var authSetting = res.authSetting;
                                    if (authSetting['scope.userInfo'] === false) {
                                        var settingGuideTitle = '登录提示';
                                        var settingGuideText = '获取用户信息失败，请到设置页面开启相关权限。';
                                        var settingGuideCancel = '取消';
                                        var settingGuideOpen = '去设置';
                                        Tape.__WX__('showModal', {
                                            title: settingGuideTitle,
                                            content: settingGuideText,
                                            showCancel: true,
                                            cancelText: settingGuideCancel,
                                            confirmText: settingGuideOpen,
                                            success: function (res) {
                                                var cancel = function () {
                                                    getUserInfoFail();
                                                };
                                                var open = function () {
                                                    Tape.__WX__('openSetting', {
                                                        success: function (res) {
                                                            var authSetting = res.authSetting;
                                                            if (authSetting['scope.userInfo'] === true) {
                                                                getUserInfo();
                                                            }
                                                            else {
                                                                getUserInfoFail();
                                                            }
                                                        }
                                                    });
                                                };
                                                if (res.confirm) {
                                                    open();
                                                }
                                                else {
                                                    cancel();
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        getUserInfo();
                                    }
                                }
                            });
                        };
                        showCustom && showCustom(tap);
                    }
                }
            });
        };
        MiniUI.hideUserInfoButton = function () {
            MiniUI.onHideUserInfoButton && MiniUI.onHideUserInfoButton();
            MiniUI.onHideUserInfoButton = null;
        };
        MiniUI.showGameClubButton = function (options) {
            if (!options) {
                options = {};
            }
            MiniUI.hideGameClubButton();
            var onSuccess = function (res) {
                options['success'] && options['success'](res);
                options['complete'] && options['complete'](res);
            };
            var onFailed = function (res) {
                options['fail'] && options['fail'](res);
                options['complete'] && options['complete'](res);
            };
            Tape.__WX__('getSystemInfo', {
                success: function (systemInfo) {
                    var stageWidth = Laya.stage.width;
                    var stageHeight = Laya.stage.width;
                    var windowWidth = systemInfo.windowWidth || stageWidth;
                    var windowHeight = systemInfo.windowHeight || stageHeight;
                    var style = options['style'] || {};
                    style['left'] = (style['left'] || 0) * windowWidth / stageWidth;
                    style['width'] = (style['width'] || 0) * windowWidth / stageWidth;
                    style['top'] = (style['top'] || 40) * windowHeight / stageHeight;
                    style['height'] = (style['height'] || 40) * windowHeight / stageHeight;
                    options['style'] = style;
                    var gameClubButton = Tape.__WX__('createGameClubButton', options);
                    if (gameClubButton) {
                        MiniUI.onHideGameClubButton = function () {
                            try {
                                gameClubButton.hide();
                                gameClubButton.destroy();
                            }
                            catch (error) {
                            }
                        };
                        gameClubButton.onTap(function (res) {
                            onSuccess && onSuccess(res);
                        });
                        gameClubButton.show();
                    }
                    else {
                        onFailed && onFailed({
                            errMsg: "showGameClubButton:fail"
                        });
                    }
                }
            });
        };
        MiniUI.hideGameClubButton = function () {
            MiniUI.onHideGameClubButton && MiniUI.onHideGameClubButton();
            MiniUI.onHideGameClubButton = null;
        };
        MiniUI.onHideGameClubButton = null;
        MiniUI.onHideUserInfoButton = null;
        return MiniUI;
    }());
    Tape.MiniUI = MiniUI;
    //-------------------------------------------------------
    //-- MiniVersion
    //-------------------------------------------------------
    var MiniVersion = /** @class */ (function () {
        function MiniVersion() {
        }
        MiniVersion.forceUpdate = function (options) {
            if (!options) {
                options = {};
            }
            var updateManager = Tape.__WX__('getUpdateManager');
            if (updateManager) {
                updateManager.onCheckForUpdate(function (res) {
                    if (res && res.hasUpdate) {
                        options['loading'] && options['loading']();
                    }
                });
                updateManager.onUpdateReady(function () {
                    if (options['confirm'] && options['confirm']()) {
                        options['success'] && options['success']();
                        updateManager.applyUpdate();
                    }
                });
                updateManager.onUpdateFailed(function () {
                    options['fail'] && options['fail']();
                });
            }
        };
        return MiniVersion;
    }());
    Tape.MiniVersion = MiniVersion;
    //-------------------------------------------------------
    //-- MiniOpenContext
    //-------------------------------------------------------
    var MiniOpenContext = /** @class */ (function () {
        function MiniOpenContext() {
        }
        MiniOpenContext.showByUI = function (uiView, data) {
            MiniOpenContext.postMessageToOpenDataContext({
                data: {
                    type: "showByUI",
                    ui: JSON.stringify(uiView || {}),
                    data: data
                }
            });
        };
        MiniOpenContext.setUserCloudStorage = function (KVDataList) {
            MiniOpenContext.postMessageToOpenDataContext({
                data: {
                    type: "setUserCloudStorage",
                    KVDataList: KVDataList
                }
            });
        };
        MiniOpenContext.postMessageToOpenDataContext = function (options) {
            if (!options) {
                options = {};
            }
            var openDataContext = Tape.__WX__('getOpenDataContext');
            if (openDataContext) {
                openDataContext && openDataContext.postMessage(options['data'] || {});
                options['success'] && options['success']({
                    errMsg: 'postMessageToOpenDataContext:ok'
                });
            }
            else {
                options['fail'] && options['fail']({
                    errMsg: 'postMessageToOpenDataContext:fail getOpenDataContext is undefined'
                });
            }
        };
        return MiniOpenContext;
    }());
    Tape.MiniOpenContext = MiniOpenContext;
})(Tape || (Tape = {}));

// =========================== //
// Tape common.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * 初始化
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    Tape.init = function (width, height) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (Tape.isMiniGame()) {
            Tape.MiniHandler.init.apply(Tape.MiniHandler, [width, height].concat(options));
        }
        else {
            Tape.ConchHandler.init.apply(Tape.ConchHandler, [width, height].concat(options));
        }
    };
    /**
     * 退出
     * @param success 成功回调
     * @param fail 失败回调
     * @param complete 完成回调，失败成功都会回调
     */
    Tape.exit = function () {
        if (Tape.isMiniGame()) {
            Tape.MiniHandler.exit();
        }
        else if (Tape.isConchApp()) {
            Tape.ConchHandler.exit();
        }
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
// =========================== //
// Tape comps.js
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
            this.instance().open(dialog, true, true);
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
            // navigation
            _this.routeName = "";
            _this.routeKey = "";
            _this.params = {};
            // in or out
            _this.inEaseDuration = 300;
            _this.inEase = null;
            _this.inEaseFromProps = null;
            _this.inEaseToProps = null;
            _this.outEaseDuration = 300;
            _this.outEase = null;
            _this.outEaseFromProps = null;
            _this.outEaseToProps = null;
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
    }(PropsComponent));
    Tape.Activity = Activity;
})(Tape || (Tape = {}));

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
            this.routeActivity.onCreate && this.routeActivity.onCreate();
        };
        NavigationLoader.prototype.nextProgress = function (progress) {
            this.routeActivity.onNextProgress && this.routeActivity.onNextProgress(progress);
        };
        NavigationLoader.prototype.postEvent = function (eventName, data) {
            this.event(eventName, data);
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
                    _this.removeSelf();
                    _this.routeActivity.onDestroy && _this.routeActivity.onDestroy();
                    callback && callback();
                    Laya.Pool.clearBySign(_this.routeName);
                }));
            }
            else {
                this.removeSelf();
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
                this.routeActivity.onResume && this.routeActivity.onResume();
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, function () {
                    callback && callback();
                }));
            }
            else {
                this.visible = true;
                this.routeActivity.onResume && this.routeActivity.onResume();
                callback && callback();
            }
        };
        NavigationLoader.prototype.hide = function () {
            this.visible = false;
            this.routeActivity.onPause && this.routeActivity.onPause();
        };
        return NavigationLoader;
    }(Tape.PropsComponent));
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
                        var param = value.split('=');
                        if (param.length === 2) {
                            Object.assign(params, (_a = {},
                                _a[param[0]] = param[1],
                                _a));
                        }
                        var _a;
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
            var _this = _super.call(this, props) || this;
            _this.__navigator__ = null;
            _this.__navigator__ = new NavigationStack(_this);
            _this.__navigator__.initPage();
            return _this;
        }
        return StackNavigator;
    }(Tape.PropsComponent));
    /**
     * createNavigator
     * @param routes routes
     * @param initName initName
     * @param options options
     */
    Tape.createNavigator = function (routes, initName, options) {
        if (options === void 0) { options = {}; }
        console.log('init Navigator, Env: ' + Tape.Build.getEnv());
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

// =========================== //
// Tape media.js
// =========================== //
var Tape;
(function (Tape) {
    var fuckWXAudioPlay = function (callback) {
        var wsb = window;
        if (wsb['WeixinJSBridge']) {
            try {
                wsb['WeixinJSBridge'].invoke("getNetworkType", {}, function () {
                    callback && callback();
                });
            }
            catch (e) {
                callback && callback();
            }
        }
        else {
            callback && callback();
        }
    };
    /**
     * BackgroundMusic
     */
    var BackgroundMusic = /** @class */ (function () {
        function BackgroundMusic() {
        }
        BackgroundMusic.play = function (url, loops, complete) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            this.__on_complete__ = complete;
            if (this.__audio_url__ !== url) {
                this.__audio_url__ = url;
                this.stop();
            }
            fuckWXAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                _this.__audio_chancel__ = Laya.SoundManager.playMusic(_this.__audio_url__, loops, Laya.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.__audio_chancel__ = null;
                    _this.__on_complete__ && _this.__on_complete__();
                }));
            });
        };
        BackgroundMusic.stop = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        };
        BackgroundMusic.pause = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        };
        BackgroundMusic.__audio_url__ = "";
        BackgroundMusic.__audio_chancel__ = null;
        BackgroundMusic.__is_playing__ = false;
        BackgroundMusic.__on_complete__ = null;
        return BackgroundMusic;
    }());
    Tape.BackgroundMusic = BackgroundMusic;
    /**
     * Audio
     */
    var Audio = /** @class */ (function () {
        function Audio(url) {
            this.__audio_url__ = "";
            this.__audio_chancel__ = null;
            this.__is_playing__ = false;
            this.__on_complete__ = null;
            this.__audio_url__ = url;
        }
        Audio.config = function (dir, ext, conchDir, conchExt) {
            this.soundWebDir = dir || "";
            this.soundWebExt = ext || "";
            this.soundConchDir = conchDir || "";
            this.soundConchExt = conchExt || "";
        };
        Audio.play = function (url, loops, complete) {
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            var audio = new Audio(url);
            audio.play(loops, complete);
            return audio;
        };
        Audio.prototype.play = function (loops, complete) {
            var _this = this;
            if (loops === void 0) { loops = 1; }
            if (complete === void 0) { complete = null; }
            this.__on_complete__ = complete;
            fuckWXAudioPlay(function () {
                if (_this.__audio_chancel__) {
                    if (!_this.__is_playing__) {
                        _this.__audio_chancel__.play();
                    }
                    return;
                }
                _this.__is_playing__ = true;
                var soundUrl = "";
                if (Tape.isConchApp()) {
                    soundUrl = Audio.soundConchDir + _this.__audio_url__ + Audio.soundConchExt;
                    var ext = Laya.Utils.getFileExtension(soundUrl);
                    if (!Audio.showErrorAlert && ext != "wav" && ext != "ogg") {
                        return;
                    }
                }
                else {
                    soundUrl = Audio.soundWebDir + _this.__audio_url__ + Audio.soundWebExt;
                }
                _this.__audio_chancel__ = Laya.SoundManager.playSound(soundUrl, loops, Laya.Handler.create(_this, function () {
                    _this.__is_playing__ = false;
                    _this.__on_complete__ && _this.__on_complete__();
                }));
            });
        };
        Audio.prototype.stop = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.stop();
                this.__audio_chancel__ = null;
                this.__is_playing__ = false;
            }
        };
        Audio.prototype.pause = function () {
            if (this.__audio_chancel__) {
                this.__audio_chancel__.pause();
                this.__is_playing__ = false;
            }
        };
        Audio.showErrorAlert = Tape.Build.isDebug();
        Audio.soundWebDir = "";
        Audio.soundWebExt = "";
        Audio.soundConchDir = "";
        Audio.soundConchExt = "";
        return Audio;
    }());
    Tape.Audio = Audio;
})(Tape || (Tape = {}));

// =========================== //
// Tape socket.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Socket TAG
     */
    var SocketTAG = /** @class */ (function () {
        function SocketTAG() {
        }
        // connecting
        SocketTAG.SOCKET_CONNECTE_ING = "connect_ing";
        // connected
        SocketTAG.SOCKET_CONNECTED = "connected";
        // connect closed
        SocketTAG.SOCKET_CONNECT_CLOSDE = "connect_closed";
        // connect error
        SocketTAG.SOCKET_CONNECT_ERROR = "connect_error";
        // connect reveived
        SocketTAG.SOCKET_MESSAGE_RECEIVED = "message_received";
        // connect delivered
        SocketTAG.SOCKET_MESSAGE_DELIVERED = "message_delivered";
        // connect publish
        SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH = "message_publish";
        return SocketTAG;
    }());
    /**
     * WEB Socket
     */
    var WebSocket = /** @class */ (function () {
        function WebSocket() {
            this.__web_socket__ = null;
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReceived = null;
        }
        WebSocket.prototype.connect = function (socketUrl) {
            var _this = this;
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            this.__web_socket__ = new Laya.Socket();
            this.__web_socket__.connectByUrl(socketUrl);
            this.__web_socket__.on(Laya.Event.OPEN, this, function () {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTED);
                _this.__is_connect__ = true;
                _this.onConnected && _this.onConnected();
            });
            this.__web_socket__.on(Laya.Event.CLOSE, this, function (error) {
                if (_this.isConnecting() || _this.isConnected()) {
                    _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    _this.__is_connect__ = false;
                    _this.__is_connect_ing__ = false;
                    _this.onClosed && _this.onClosed(error);
                }
            });
            this.__web_socket__.on(Laya.Event.ERROR, this, function (error) {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                _this.__is_connect__ = false;
                _this.__is_connect_ing__ = false;
                _this.onError && _this.onError(error);
            });
            this.__web_socket__.on(Laya.Event.MESSAGE, this, function (msg) {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, msg);
                _this.onMessageReceived && _this.onMessageReceived(msg);
            });
        };
        WebSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE);
                this.__web_socket__.close();
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed();
            }
        };
        WebSocket.prototype.isConnected = function () {
            return this.__is_connect__;
        };
        WebSocket.prototype.isConnecting = function () {
            return this.__is_connect_ing__;
        };
        WebSocket.prototype.publishMessage = function (message) {
            if (!this.isConnected()) {
                return;
            }
            var messagePayload = "";
            if (typeof message === 'object') {
                messagePayload = JSON.stringify(message);
            }
            else if (typeof message === 'string') {
                messagePayload = message;
            }
            this.printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        };
        WebSocket.prototype.printLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        return WebSocket;
    }());
    Tape.WebSocket = WebSocket;
    /**
     *  MQTT Socket
     */
    var MQTTSocket = /** @class */ (function () {
        function MQTTSocket() {
            this.__mq_socket__ = null;
            this.__default_options__ = {
                timeout: 3,
                keepAliveInterval: 30,
                cleanSession: true,
                useSSL: false,
                reconnect: false
            };
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReceived = null;
            this.onMessageDelivered = null;
        }
        MQTTSocket.prototype.connect = function (host, port, clientId, username, password, options) {
            var _this = this;
            if (username === void 0) { username = ''; }
            if (password === void 0) { password = ''; }
            if (options === void 0) { options = {}; }
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mq_socket__ = new window['Paho'].MQTT.Client(host, port, clientId);
                this.__mq_socket__.onConnectionLost = function (error) {
                    _this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    if (_this.isConnecting() || _this.isConnected()) {
                        _this.__is_connect__ = false;
                        _this.__is_connect_ing__ = false;
                        _this.onClosed && _this.onClosed(error);
                    }
                };
                this.__mq_socket__.onMessageArrived = function (msg) {
                    _this.printLog(" -----MQ---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, _this.formatMessage(msg));
                    _this.onMessageReceived && _this.onMessageReceived(msg);
                };
                this.__mq_socket__.onMessageDelivered = function (msg) {
                    _this.printLog(" -----MQ---" + SocketTAG.SOCKET_MESSAGE_DELIVERED, _this.formatMessage(msg));
                    _this.onMessageDelivered && _this.onMessageDelivered(msg);
                };
                ;
                this.__mq_socket__.connect(Object.assign({}, this.__default_options__, {
                    userName: username,
                    password: password,
                    onSuccess: function () {
                        _this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECTED);
                        _this.__is_connect__ = true;
                        _this.onConnected && _this.onConnected();
                    },
                    onFailure: function (error) {
                        _this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                        _this.__is_connect__ = false;
                        _this.__is_connect_ing__ = false;
                        _this.onError && _this.onError(error);
                    }
                }, options));
            }
            else {
                var error = "Cannot find mqtt client support.";
                this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                this.onError && this.onError(error);
            }
        };
        MQTTSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.printLog(" -----MQ---" + SocketTAG.SOCKET_CONNECT_CLOSDE);
                this.__mq_socket__.disconnect();
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed();
            }
        };
        MQTTSocket.prototype.isConnected = function () {
            return this.__is_connect__;
        };
        MQTTSocket.prototype.isConnecting = function () {
            return this.__is_connect_ing__;
        };
        MQTTSocket.prototype.publishMessage = function (topic, message, qos, retained) {
            if (qos === void 0) { qos = 1; }
            if (retained === void 0) { retained = false; }
            if (!this.isConnected()) {
                return;
            }
            if (window.hasOwnProperty('Paho')) {
                var messagePayload = "";
                if (typeof message === 'object') {
                    messagePayload = JSON.stringify(message);
                }
                else if (typeof message === 'string') {
                    messagePayload = message;
                }
                var mqttMessage = new window['Paho'].MQTT.Message(messagePayload);
                mqttMessage.destinationName = topic;
                mqttMessage.qos = qos;
                mqttMessage.retained = retained;
                this.printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, this.formatMessage(mqttMessage));
                this.__mq_socket__.send(mqttMessage);
            }
        };
        MQTTSocket.prototype.formatMessage = function (message) {
            return message.topic + " " + message.payloadString;
        };
        MQTTSocket.prototype.printLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            var _a;
        };
        return MQTTSocket;
    }());
    Tape.MQTTSocket = MQTTSocket;
})(Tape || (Tape = {}));

/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/
// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho.MQTT module
// only has a single public function, client, which returns
// a Paho.MQTT client object given connection details.
/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.MQTT.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.MQTT.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
    console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho.MQTT
 */
/* jshint shadow:true */
var Paho;
(function (Paho) {
    var PahoMQTT = (function (global) {
        // Private variables below, these are only visible inside the function closure
        // which is used to define the module.
        var version = "@VERSION@";
        var buildLevel = "@BUILDLEVEL@";
        /**
         * Unique message type identifiers, with associated
         * associated integer values.
         * @private
         */
        var MESSAGE_TYPE = {
            CONNECT: 1,
            CONNACK: 2,
            PUBLISH: 3,
            PUBACK: 4,
            PUBREC: 5,
            PUBREL: 6,
            PUBCOMP: 7,
            SUBSCRIBE: 8,
            SUBACK: 9,
            UNSUBSCRIBE: 10,
            UNSUBACK: 11,
            PINGREQ: 12,
            PINGRESP: 13,
            DISCONNECT: 14
        };
        // Collection of utility methods used to simplify module code
        // and promote the DRY pattern.
        /**
         * Validate an object's parameter names to ensure they
         * match a list of expected variables name for this option
         * type. Used to ensure option object passed into the API don't
         * contain erroneous parameters.
         * @param {Object} obj - User options object
         * @param {Object} keys - valid keys and types that may exist in obj.
         * @throws {Error} Invalid option parameter found.
         * @private
         */
        var validate = function (obj, keys) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (keys.hasOwnProperty(key)) {
                        if (typeof obj[key] !== keys[key])
                            throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
                    }
                    else {
                        var errorStr = "Unknown property, " + key + ". Valid properties are:";
                        for (var validKey in keys)
                            if (keys.hasOwnProperty(validKey))
                                errorStr = errorStr + " " + validKey;
                        throw new Error(errorStr);
                    }
                }
            }
        };
        /**
         * Return a new function which runs the user function bound
         * to a fixed scope.
         * @param {function} User function
         * @param {object} Function scope
         * @return {function} User function bound to another scope
         * @private
         */
        var scope = function (f, scope) {
            return function () {
                return f.apply(scope, arguments);
            };
        };
        /**
         * Unique message type identifiers, with associated
         * associated integer values.
         * @private
         */
        var ERROR = {
            OK: { code: 0, text: "AMQJSC0000I OK." },
            CONNECT_TIMEOUT: { code: 1, text: "AMQJSC0001E Connect timed out." },
            SUBSCRIBE_TIMEOUT: { code: 2, text: "AMQJS0002E Subscribe timed out." },
            UNSUBSCRIBE_TIMEOUT: { code: 3, text: "AMQJS0003E Unsubscribe timed out." },
            PING_TIMEOUT: { code: 4, text: "AMQJS0004E Ping timed out." },
            INTERNAL_ERROR: { code: 5, text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}" },
            CONNACK_RETURNCODE: { code: 6, text: "AMQJS0006E Bad Connack return code:{0} {1}." },
            SOCKET_ERROR: { code: 7, text: "AMQJS0007E Socket error:{0}." },
            SOCKET_CLOSE: { code: 8, text: "AMQJS0008I Socket closed." },
            MALFORMED_UTF: { code: 9, text: "AMQJS0009E Malformed UTF data:{0} {1} {2}." },
            UNSUPPORTED: { code: 10, text: "AMQJS0010E {0} is not supported by this browser." },
            INVALID_STATE: { code: 11, text: "AMQJS0011E Invalid state {0}." },
            INVALID_TYPE: { code: 12, text: "AMQJS0012E Invalid type {0} for {1}." },
            INVALID_ARGUMENT: { code: 13, text: "AMQJS0013E Invalid argument {0} for {1}." },
            UNSUPPORTED_OPERATION: { code: 14, text: "AMQJS0014E Unsupported operation." },
            INVALID_STORED_DATA: { code: 15, text: "AMQJS0015E Invalid data in local storage key={0} value={1}." },
            INVALID_MQTT_MESSAGE_TYPE: { code: 16, text: "AMQJS0016E Invalid MQTT message type {0}." },
            MALFORMED_UNICODE: { code: 17, text: "AMQJS0017E Malformed Unicode string:{0} {1}." },
            BUFFER_FULL: { code: 18, text: "AMQJS0018E Message buffer is full, maximum buffer size: {0}." },
        };
        /** CONNACK RC Meaning. */
        var CONNACK_RC = {
            0: "Connection Accepted",
            1: "Connection Refused: unacceptable protocol version",
            2: "Connection Refused: identifier rejected",
            3: "Connection Refused: server unavailable",
            4: "Connection Refused: bad user name or password",
            5: "Connection Refused: not authorized"
        };
        /**
         * Format an error message text.
         * @private
         * @param {error} ERROR.KEY value above.
         * @param {substitutions} [array] substituted into the text.
         * @return the text with the substitutions made.
         */
        var format = function (error, substitutions) {
            var text = error.text;
            if (substitutions) {
                var field, start;
                for (var i = 0; i < substitutions.length; i++) {
                    field = "{" + i + "}";
                    start = text.indexOf(field);
                    if (start > 0) {
                        var part1 = text.substring(0, start);
                        var part2 = text.substring(start + field.length);
                        text = part1 + substitutions[i] + part2;
                    }
                }
            }
            return text;
        };
        //MQTT protocol and version          6    M    Q    I    s    d    p    3
        var MqttProtoIdentifierv3 = [0x00, 0x06, 0x4d, 0x51, 0x49, 0x73, 0x64, 0x70, 0x03];
        //MQTT proto/version for 311         4    M    Q    T    T    4
        var MqttProtoIdentifierv4 = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04];
        /**
         * Construct an MQTT wire protocol message.
         * @param type MQTT packet type.
         * @param options optional wire message attributes.
         *
         * Optional properties
         *
         * messageIdentifier: message ID in the range [0..65535]
         * payloadMessage:	Application Message - PUBLISH only
         * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
         * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
         * requestQoS:		array of QoS values [0..2]
         *
         * "Flag" properties
         * cleanSession:	true if present / false if absent (CONNECT)
         * willMessage:  	true if present / false if absent (CONNECT)
         * isRetained:		true if present / false if absent (CONNECT)
         * userName:		true if present / false if absent (CONNECT)
         * password:		true if present / false if absent (CONNECT)
         * keepAliveInterval:	integer [0..65535]  (CONNECT)
         *
         * @private
         * @ignore
         */
        var WireMessage = function (type, options) {
            this.type = type;
            for (var name in options) {
                if (options.hasOwnProperty(name)) {
                    this[name] = options[name];
                }
            }
        };
        WireMessage.prototype.encode = function () {
            // Compute the first byte of the fixed header
            var first = ((this.type & 0x0f) << 4);
            /*
             * Now calculate the length of the variable header + payload by adding up the lengths
             * of all the component parts
             */
            var remLength = 0;
            var topicStrLength = [];
            var destinationNameLength = 0;
            var willMessagePayloadBytes;
            // if the message contains a messageIdentifier then we need two bytes for that
            if (this.messageIdentifier !== undefined)
                remLength += 2;
            switch (this.type) {
                // If this a Connect then we need to include 12 bytes for its header
                case MESSAGE_TYPE.CONNECT:
                    switch (this.mqttVersion) {
                        case 3:
                            remLength += MqttProtoIdentifierv3.length + 3;
                            break;
                        case 4:
                            remLength += MqttProtoIdentifierv4.length + 3;
                            break;
                    }
                    remLength += UTF8Length(this.clientId) + 2;
                    if (this.willMessage !== undefined) {
                        remLength += UTF8Length(this.willMessage.destinationName) + 2;
                        // Will message is always a string, sent as UTF-8 characters with a preceding length.
                        willMessagePayloadBytes = this.willMessage.payloadBytes;
                        if (!(willMessagePayloadBytes instanceof Uint8Array))
                            willMessagePayloadBytes = new Uint8Array(payloadBytes);
                        remLength += willMessagePayloadBytes.byteLength + 2;
                    }
                    if (this.userName !== undefined)
                        remLength += UTF8Length(this.userName) + 2;
                    if (this.password !== undefined)
                        remLength += UTF8Length(this.password) + 2;
                    break;
                // Subscribe, Unsubscribe can both contain topic strings
                case MESSAGE_TYPE.SUBSCRIBE:
                    first |= 0x02; // Qos = 1;
                    for (var i = 0; i < this.topics.length; i++) {
                        topicStrLength[i] = UTF8Length(this.topics[i]);
                        remLength += topicStrLength[i] + 2;
                    }
                    remLength += this.requestedQos.length; // 1 byte for each topic's Qos
                    // QoS on Subscribe only
                    break;
                case MESSAGE_TYPE.UNSUBSCRIBE:
                    first |= 0x02; // Qos = 1;
                    for (var i = 0; i < this.topics.length; i++) {
                        topicStrLength[i] = UTF8Length(this.topics[i]);
                        remLength += topicStrLength[i] + 2;
                    }
                    break;
                case MESSAGE_TYPE.PUBREL:
                    first |= 0x02; // Qos = 1;
                    break;
                case MESSAGE_TYPE.PUBLISH:
                    if (this.payloadMessage.duplicate)
                        first |= 0x08;
                    first = first |= (this.payloadMessage.qos << 1);
                    if (this.payloadMessage.retained)
                        first |= 0x01;
                    destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
                    remLength += destinationNameLength + 2;
                    var payloadBytes = this.payloadMessage.payloadBytes;
                    remLength += payloadBytes.byteLength;
                    if (payloadBytes instanceof ArrayBuffer)
                        payloadBytes = new Uint8Array(payloadBytes);
                    else if (!(payloadBytes instanceof Uint8Array))
                        payloadBytes = new Uint8Array(payloadBytes.buffer);
                    break;
                case MESSAGE_TYPE.DISCONNECT:
                    break;
                default:
                    break;
            }
            // Now we can allocate a buffer for the message
            var mbi = encodeMBI(remLength); // Convert the length to MQTT MBI format
            var pos = mbi.length + 1; // Offset of start of variable header
            var buffer = new ArrayBuffer(remLength + pos);
            var byteStream = new Uint8Array(buffer); // view it as a sequence of bytes
            //Write the fixed header into the buffer
            byteStream[0] = first;
            byteStream.set(mbi, 1);
            // If this is a PUBLISH then the variable header starts with a topic
            if (this.type == MESSAGE_TYPE.PUBLISH)
                pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
            else if (this.type == MESSAGE_TYPE.CONNECT) {
                switch (this.mqttVersion) {
                    case 3:
                        byteStream.set(MqttProtoIdentifierv3, pos);
                        pos += MqttProtoIdentifierv3.length;
                        break;
                    case 4:
                        byteStream.set(MqttProtoIdentifierv4, pos);
                        pos += MqttProtoIdentifierv4.length;
                        break;
                }
                var connectFlags = 0;
                if (this.cleanSession)
                    connectFlags = 0x02;
                if (this.willMessage !== undefined) {
                    connectFlags |= 0x04;
                    connectFlags |= (this.willMessage.qos << 3);
                    if (this.willMessage.retained) {
                        connectFlags |= 0x20;
                    }
                }
                if (this.userName !== undefined)
                    connectFlags |= 0x80;
                if (this.password !== undefined)
                    connectFlags |= 0x40;
                byteStream[pos++] = connectFlags;
                pos = writeUint16(this.keepAliveInterval, byteStream, pos);
            }
            // Output the messageIdentifier - if there is one
            if (this.messageIdentifier !== undefined)
                pos = writeUint16(this.messageIdentifier, byteStream, pos);
            switch (this.type) {
                case MESSAGE_TYPE.CONNECT:
                    pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
                    if (this.willMessage !== undefined) {
                        pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
                        pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
                        byteStream.set(willMessagePayloadBytes, pos);
                        pos += willMessagePayloadBytes.byteLength;
                    }
                    if (this.userName !== undefined)
                        pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
                    if (this.password !== undefined)
                        pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
                    break;
                case MESSAGE_TYPE.PUBLISH:
                    // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
                    byteStream.set(payloadBytes, pos);
                    break;
                //    	    case MESSAGE_TYPE.PUBREC:
                //    	    case MESSAGE_TYPE.PUBREL:
                //    	    case MESSAGE_TYPE.PUBCOMP:
                //    	    	break;
                case MESSAGE_TYPE.SUBSCRIBE:
                    // SUBSCRIBE has a list of topic strings and request QoS
                    for (var i = 0; i < this.topics.length; i++) {
                        pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                        byteStream[pos++] = this.requestedQos[i];
                    }
                    break;
                case MESSAGE_TYPE.UNSUBSCRIBE:
                    // UNSUBSCRIBE has a list of topic strings
                    for (var i = 0; i < this.topics.length; i++)
                        pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
                    break;
                default:
            }
            return buffer;
        };
        function decodeMessage(input, pos) {
            var startingPos = pos;
            var first = input[pos];
            var type = first >> 4;
            var messageInfo = first &= 0x0f;
            pos += 1;
            // Decode the remaining length (MBI format)
            var digit;
            var remLength = 0;
            var multiplier = 1;
            do {
                if (pos == input.length) {
                    return [null, startingPos];
                }
                digit = input[pos++];
                remLength += ((digit & 0x7F) * multiplier);
                multiplier *= 128;
            } while ((digit & 0x80) !== 0);
            var endPos = pos + remLength;
            if (endPos > input.length) {
                return [null, startingPos];
            }
            var wireMessage = new WireMessage(type);
            switch (type) {
                case MESSAGE_TYPE.CONNACK:
                    var connectAcknowledgeFlags = input[pos++];
                    if (connectAcknowledgeFlags & 0x01)
                        wireMessage.sessionPresent = true;
                    wireMessage.returnCode = input[pos++];
                    break;
                case MESSAGE_TYPE.PUBLISH:
                    var qos = (messageInfo >> 1) & 0x03;
                    var len = readUint16(input, pos);
                    pos += 2;
                    var topicName = parseUTF8(input, pos, len);
                    pos += len;
                    // If QoS 1 or 2 there will be a messageIdentifier
                    if (qos > 0) {
                        wireMessage.messageIdentifier = readUint16(input, pos);
                        pos += 2;
                    }
                    var message = new Paho.MQTT.Message(input.subarray(pos, endPos));
                    if ((messageInfo & 0x01) == 0x01)
                        message.retained = true;
                    if ((messageInfo & 0x08) == 0x08)
                        message.duplicate = true;
                    message.qos = qos;
                    message.destinationName = topicName;
                    wireMessage.payloadMessage = message;
                    break;
                case MESSAGE_TYPE.PUBACK:
                case MESSAGE_TYPE.PUBREC:
                case MESSAGE_TYPE.PUBREL:
                case MESSAGE_TYPE.PUBCOMP:
                case MESSAGE_TYPE.UNSUBACK:
                    wireMessage.messageIdentifier = readUint16(input, pos);
                    break;
                case MESSAGE_TYPE.SUBACK:
                    wireMessage.messageIdentifier = readUint16(input, pos);
                    pos += 2;
                    wireMessage.returnCode = input.subarray(pos, endPos);
                    break;
                default:
                    break;
            }
            return [wireMessage, endPos];
        }
        function writeUint16(input, buffer, offset) {
            buffer[offset++] = input >> 8; //MSB
            buffer[offset++] = input % 256; //LSB
            return offset;
        }
        function writeString(input, utf8Length, buffer, offset) {
            offset = writeUint16(utf8Length, buffer, offset);
            stringToUTF8(input, buffer, offset);
            return offset + utf8Length;
        }
        function readUint16(buffer, offset) {
            return 256 * buffer[offset] + buffer[offset + 1];
        }
        /**
         * Encodes an MQTT Multi-Byte Integer
         * @private
         */
        function encodeMBI(number) {
            var output = new Array(1);
            var numBytes = 0;
            do {
                var digit = number % 128;
                number = number >> 7;
                if (number > 0) {
                    digit |= 0x80;
                }
                output[numBytes++] = digit;
            } while ((number > 0) && (numBytes < 4));
            return output;
        }
        /**
         * Takes a String and calculates its length in bytes when encoded in UTF8.
         * @private
         */
        function UTF8Length(input) {
            var output = 0;
            for (var i = 0; i < input.length; i++) {
                var charCode = input.charCodeAt(i);
                if (charCode > 0x7FF) {
                    // Surrogate pair means its a 4 byte character
                    if (0xD800 <= charCode && charCode <= 0xDBFF) {
                        i++;
                        output++;
                    }
                    output += 3;
                }
                else if (charCode > 0x7F)
                    output += 2;
                else
                    output++;
            }
            return output;
        }
        /**
         * Takes a String and writes it into an array as UTF8 encoded bytes.
         * @private
         */
        function stringToUTF8(input, output, start) {
            var pos = start;
            for (var i = 0; i < input.length; i++) {
                var charCode = input.charCodeAt(i);
                // Check for a surrogate pair.
                if (0xD800 <= charCode && charCode <= 0xDBFF) {
                    var lowCharCode = input.charCodeAt(++i);
                    if (isNaN(lowCharCode)) {
                        throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
                    }
                    charCode = ((charCode - 0xD800) << 10) + (lowCharCode - 0xDC00) + 0x10000;
                }
                if (charCode <= 0x7F) {
                    output[pos++] = charCode;
                }
                else if (charCode <= 0x7FF) {
                    output[pos++] = charCode >> 6 & 0x1F | 0xC0;
                    output[pos++] = charCode & 0x3F | 0x80;
                }
                else if (charCode <= 0xFFFF) {
                    output[pos++] = charCode >> 12 & 0x0F | 0xE0;
                    output[pos++] = charCode >> 6 & 0x3F | 0x80;
                    output[pos++] = charCode & 0x3F | 0x80;
                }
                else {
                    output[pos++] = charCode >> 18 & 0x07 | 0xF0;
                    output[pos++] = charCode >> 12 & 0x3F | 0x80;
                    output[pos++] = charCode >> 6 & 0x3F | 0x80;
                    output[pos++] = charCode & 0x3F | 0x80;
                }
            }
            return output;
        }
        function parseUTF8(input, offset, length) {
            var output = "";
            var utf16;
            var pos = offset;
            while (pos < offset + length) {
                var byte1 = input[pos++];
                if (byte1 < 128)
                    utf16 = byte1;
                else {
                    var byte2 = input[pos++] - 128;
                    if (byte2 < 0)
                        throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), ""]));
                    if (byte1 < 0xE0)
                        utf16 = 64 * (byte1 - 0xC0) + byte2;
                    else {
                        var byte3 = input[pos++] - 128;
                        if (byte3 < 0)
                            throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
                        if (byte1 < 0xF0)
                            utf16 = 4096 * (byte1 - 0xE0) + 64 * byte2 + byte3;
                        else {
                            var byte4 = input[pos++] - 128;
                            if (byte4 < 0)
                                throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                            if (byte1 < 0xF8)
                                utf16 = 262144 * (byte1 - 0xF0) + 4096 * byte2 + 64 * byte3 + byte4;
                            else
                                throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
                        }
                    }
                }
                if (utf16 > 0xFFFF) {
                    utf16 -= 0x10000;
                    output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
                    utf16 = 0xDC00 + (utf16 & 0x3FF); // trail character
                }
                output += String.fromCharCode(utf16);
            }
            return output;
        }
        /**
         * Repeat keepalive requests, monitor responses.
         * @ignore
         */
        var Pinger = function (client, window, keepAliveInterval) {
            this._client = client;
            this._window = window;
            this._keepAliveInterval = keepAliveInterval * 1000;
            this.isReset = false;
            var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();
            var doTimeout = function (pinger) {
                return function () {
                    return doPing.apply(pinger);
                };
            };
            /** @ignore */
            var doPing = function () {
                if (!this.isReset) {
                    this._client._trace("Pinger.doPing", "Timed out");
                    this._client._disconnected(ERROR.PING_TIMEOUT.code, format(ERROR.PING_TIMEOUT));
                }
                else {
                    this.isReset = false;
                    this._client._trace("Pinger.doPing", "send PINGREQ");
                    this._client.socket.send(pingReq);
                    this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
                }
            };
            this.reset = function () {
                this.isReset = true;
                this._window.clearTimeout(this.timeout);
                if (this._keepAliveInterval > 0)
                    this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
            };
            this.cancel = function () {
                this._window.clearTimeout(this.timeout);
            };
        };
        /**
         * Monitor request completion.
         * @ignore
         */
        var Timeout = function (client, window, timeoutSeconds, action, args) {
            this._window = window;
            if (!timeoutSeconds)
                timeoutSeconds = 30;
            var doTimeout = function (action, client, args) {
                return function () {
                    return action.apply(client, args);
                };
            };
            this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);
            this.cancel = function () {
                this._window.clearTimeout(this.timeout);
            };
        };
        /*
         * Internal implementation of the Websockets MQTT V3.1 client.
         *
         * @name Paho.MQTT.ClientImpl @constructor
         * @param {String} host the DNS nameof the webSocket host.
         * @param {Number} port the port number for that host.
         * @param {String} clientId the MQ client identifier.
         */
        var ClientImpl = function (uri, host, port, path, clientId) {
            // Check dependencies are satisfied in this browser.
            if (!("WebSocket" in global && global.WebSocket !== null)) {
                throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
            }
            if (!("localStorage" in global && global.localStorage !== null)) {
                throw new Error(format(ERROR.UNSUPPORTED, ["localStorage"]));
            }
            if (!("ArrayBuffer" in global && global.ArrayBuffer !== null)) {
                throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
            }
            this._trace("Paho.MQTT.Client", uri, host, port, path, clientId);
            this.host = host;
            this.port = port;
            this.path = path;
            this.uri = uri;
            this.clientId = clientId;
            this._wsuri = null;
            // Local storagekeys are qualified with the following string.
            // The conditional inclusion of path in the key is for backward
            // compatibility to when the path was not configurable and assumed to
            // be /mqtt
            this._localKey = host + ":" + port + (path != "/mqtt" ? ":" + path : "") + ":" + clientId + ":";
            // Create private instance-only message queue
            // Internal queue of messages to be sent, in sending order.
            this._msg_queue = [];
            this._buffered_msg_queue = [];
            // Messages we have sent and are expecting a response for, indexed by their respective message ids.
            this._sentMessages = {};
            // Messages we have received and acknowleged and are expecting a confirm message for
            // indexed by their respective message ids.
            this._receivedMessages = {};
            // Internal list of callbacks to be executed when messages
            // have been successfully sent over web socket, e.g. disconnect
            // when it doesn't have to wait for ACK, just message is dispatched.
            this._notify_msg_sent = {};
            // Unique identifier for SEND messages, incrementing
            // counter as messages are sent.
            this._message_identifier = 1;
            // Used to determine the transmission sequence of stored sent messages.
            this._sequence = 0;
            // Load the local state, if any, from the saved version, only restore state relevant to this client.
            for (var key in localStorage)
                if (key.indexOf("Sent:" + this._localKey) === 0 || key.indexOf("Received:" + this._localKey) === 0)
                    this.restore(key);
        };
        // Messaging Client public instance members.
        ClientImpl.prototype.host = null;
        ClientImpl.prototype.port = null;
        ClientImpl.prototype.path = null;
        ClientImpl.prototype.uri = null;
        ClientImpl.prototype.clientId = null;
        // Messaging Client private instance members.
        ClientImpl.prototype.socket = null;
        /* true once we have received an acknowledgement to a CONNECT packet. */
        ClientImpl.prototype.connected = false;
        /* The largest message identifier allowed, may not be larger than 2**16 but
         * if set smaller reduces the maximum number of outbound messages allowed.
         */
        ClientImpl.prototype.maxMessageIdentifier = 65536;
        ClientImpl.prototype.connectOptions = null;
        ClientImpl.prototype.hostIndex = null;
        ClientImpl.prototype.onConnected = null;
        ClientImpl.prototype.onConnectionLost = null;
        ClientImpl.prototype.onMessageDelivered = null;
        ClientImpl.prototype.onMessageArrived = null;
        ClientImpl.prototype.traceFunction = null;
        ClientImpl.prototype._msg_queue = null;
        ClientImpl.prototype._buffered_msg_queue = null;
        ClientImpl.prototype._connectTimeout = null;
        /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
        ClientImpl.prototype.sendPinger = null;
        /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
        ClientImpl.prototype.receivePinger = null;
        ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
        ClientImpl.prototype._reconnecting = false;
        ClientImpl.prototype._reconnectTimeout = null;
        ClientImpl.prototype.disconnectedPublishing = false;
        ClientImpl.prototype.disconnectedBufferSize = 5000;
        ClientImpl.prototype.receiveBuffer = null;
        ClientImpl.prototype._traceBuffer = null;
        ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;
        ClientImpl.prototype.connect = function (connectOptions) {
            var connectOptionsMasked = this._traceMask(connectOptions, "password");
            this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);
            if (this.connected)
                throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
            if (this.socket)
                throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
            if (this._reconnecting) {
                // connect() function is called while reconnect is in progress.
                // Terminate the auto reconnect process to use new connect options.
                this._reconnectTimeout.cancel();
                this._reconnectTimeout = null;
                this._reconnecting = false;
            }
            this.connectOptions = connectOptions;
            this._reconnectInterval = 1;
            this._reconnecting = false;
            if (connectOptions.uris) {
                this.hostIndex = 0;
                this._doConnect(connectOptions.uris[0]);
            }
            else {
                this._doConnect(this.uri);
            }
        };
        ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
            this._trace("Client.subscribe", filter, subscribeOptions);
            if (!this.connected)
                throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
            var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
            wireMessage.topics = [filter];
            if (subscribeOptions.qos !== undefined)
                wireMessage.requestedQos = [subscribeOptions.qos];
            else
                wireMessage.requestedQos = [0];
            if (subscribeOptions.onSuccess) {
                wireMessage.onSuccess = function (grantedQos) { subscribeOptions.onSuccess({ invocationContext: subscribeOptions.invocationContext, grantedQos: grantedQos }); };
            }
            if (subscribeOptions.onFailure) {
                wireMessage.onFailure = function (errorCode) { subscribeOptions.onFailure({ invocationContext: subscribeOptions.invocationContext, errorCode: errorCode, errorMessage: format(errorCode) }); };
            }
            if (subscribeOptions.timeout) {
                wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure, [{ invocationContext: subscribeOptions.invocationContext,
                        errorCode: ERROR.SUBSCRIBE_TIMEOUT.code,
                        errorMessage: format(ERROR.SUBSCRIBE_TIMEOUT) }]);
            }
            // All subscriptions return a SUBACK.
            this._requires_ack(wireMessage);
            this._schedule_message(wireMessage);
        };
        /** @ignore */
        ClientImpl.prototype.unsubscribe = function (filter, unsubscribeOptions) {
            this._trace("Client.unsubscribe", filter, unsubscribeOptions);
            if (!this.connected)
                throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
            var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
            wireMessage.topics = [filter];
            if (unsubscribeOptions.onSuccess) {
                wireMessage.callback = function () { unsubscribeOptions.onSuccess({ invocationContext: unsubscribeOptions.invocationContext }); };
            }
            if (unsubscribeOptions.timeout) {
                wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure, [{ invocationContext: unsubscribeOptions.invocationContext,
                        errorCode: ERROR.UNSUBSCRIBE_TIMEOUT.code,
                        errorMessage: format(ERROR.UNSUBSCRIBE_TIMEOUT) }]);
            }
            // All unsubscribes return a SUBACK.
            this._requires_ack(wireMessage);
            this._schedule_message(wireMessage);
        };
        ClientImpl.prototype.send = function (message) {
            this._trace("Client.send", message);
            wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
            wireMessage.payloadMessage = message;
            if (this.connected) {
                // Mark qos 1 & 2 message as "ACK required"
                // For qos 0 message, invoke onMessageDelivered callback if there is one.
                // Then schedule the message.
                if (message.qos > 0) {
                    this._requires_ack(wireMessage);
                }
                else if (this.onMessageDelivered) {
                    this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
                }
                this._schedule_message(wireMessage);
            }
            else {
                // Currently disconnected, will not schedule this message
                // Check if reconnecting is in progress and disconnected publish is enabled.
                if (this._reconnecting && this.disconnectedPublishing) {
                    // Check the limit which include the "required ACK" messages
                    var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
                    if (messageCount > this.disconnectedBufferSize) {
                        throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
                    }
                    else {
                        if (message.qos > 0) {
                            // Mark this message as "ACK required"
                            this._requires_ack(wireMessage);
                        }
                        else {
                            wireMessage.sequence = ++this._sequence;
                            this._buffered_msg_queue.push(wireMessage);
                        }
                    }
                }
                else {
                    throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
                }
            }
        };
        ClientImpl.prototype.disconnect = function () {
            this._trace("Client.disconnect");
            if (this._reconnecting) {
                // disconnect() function is called while reconnect is in progress.
                // Terminate the auto reconnect process.
                this._reconnectTimeout.cancel();
                this._reconnectTimeout = null;
                this._reconnecting = false;
            }
            if (!this.socket)
                throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));
            wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);
            // Run the disconnected call back as soon as the message has been sent,
            // in case of a failure later on in the disconnect processing.
            // as a consequence, the _disconected call back may be run several times.
            this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);
            this._schedule_message(wireMessage);
        };
        ClientImpl.prototype.getTraceLog = function () {
            if (this._traceBuffer !== null) {
                this._trace("Client.getTraceLog", new Date());
                this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
                for (var key in this._sentMessages)
                    this._trace("_sentMessages ", key, this._sentMessages[key]);
                for (var key in this._receivedMessages)
                    this._trace("_receivedMessages ", key, this._receivedMessages[key]);
                return this._traceBuffer;
            }
        };
        ClientImpl.prototype.startTrace = function () {
            if (this._traceBuffer === null) {
                this._traceBuffer = [];
            }
            this._trace("Client.startTrace", new Date(), version);
        };
        ClientImpl.prototype.stopTrace = function () {
            delete this._traceBuffer;
        };
        ClientImpl.prototype._doConnect = function (wsurl) {
            // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
            if (this.connectOptions.useSSL) {
                var uriParts = wsurl.split(":");
                uriParts[0] = "wss";
                wsurl = uriParts.join(":");
            }
            this._wsuri = wsurl;
            this.connected = false;
            if (this.connectOptions.mqttVersion < 4) {
                this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
            }
            else {
                this.socket = new WebSocket(wsurl, ["mqtt"]);
            }
            this.socket.binaryType = 'arraybuffer';
            this.socket.onopen = scope(this._on_socket_open, this);
            this.socket.onmessage = scope(this._on_socket_message, this);
            this.socket.onerror = scope(this._on_socket_error, this);
            this.socket.onclose = scope(this._on_socket_close, this);
            this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
            this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
            if (this._connectTimeout) {
                this._connectTimeout.cancel();
                this._connectTimeout = null;
            }
            this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected, [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
        };
        // Schedule a new message to be sent over the WebSockets
        // connection. CONNECT messages cause WebSocket connection
        // to be started. All other messages are queued internally
        // until this has happened. When WS connection starts, process
        // all outstanding messages.
        ClientImpl.prototype._schedule_message = function (message) {
            this._msg_queue.push(message);
            // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
            if (this.connected) {
                this._process_queue();
            }
        };
        ClientImpl.prototype.store = function (prefix, wireMessage) {
            var storedMessage = { type: wireMessage.type, messageIdentifier: wireMessage.messageIdentifier, version: 1 };
            switch (wireMessage.type) {
                case MESSAGE_TYPE.PUBLISH:
                    if (wireMessage.pubRecReceived)
                        storedMessage.pubRecReceived = true;
                    // Convert the payload to a hex string.
                    storedMessage.payloadMessage = {};
                    var hex = "";
                    var messageBytes = wireMessage.payloadMessage.payloadBytes;
                    for (var i = 0; i < messageBytes.length; i++) {
                        if (messageBytes[i] <= 0xF)
                            hex = hex + "0" + messageBytes[i].toString(16);
                        else
                            hex = hex + messageBytes[i].toString(16);
                    }
                    storedMessage.payloadMessage.payloadHex = hex;
                    storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
                    storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
                    if (wireMessage.payloadMessage.duplicate)
                        storedMessage.payloadMessage.duplicate = true;
                    if (wireMessage.payloadMessage.retained)
                        storedMessage.payloadMessage.retained = true;
                    // Add a sequence number to sent messages.
                    if (prefix.indexOf("Sent:") === 0) {
                        if (wireMessage.sequence === undefined)
                            wireMessage.sequence = ++this._sequence;
                        storedMessage.sequence = wireMessage.sequence;
                    }
                    break;
                default:
                    throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
            }
            localStorage.setItem(prefix + this._localKey + wireMessage.messageIdentifier, JSON.stringify(storedMessage));
        };
        ClientImpl.prototype.restore = function (key) {
            var value = localStorage.getItem(key);
            var storedMessage = JSON.parse(value);
            var wireMessage = new WireMessage(storedMessage.type, storedMessage);
            switch (storedMessage.type) {
                case MESSAGE_TYPE.PUBLISH:
                    // Replace the payload message with a Message object.
                    var hex = storedMessage.payloadMessage.payloadHex;
                    var buffer = new ArrayBuffer((hex.length) / 2);
                    var byteStream = new Uint8Array(buffer);
                    var i = 0;
                    while (hex.length >= 2) {
                        var x = parseInt(hex.substring(0, 2), 16);
                        hex = hex.substring(2, hex.length);
                        byteStream[i++] = x;
                    }
                    var payloadMessage = new Paho.MQTT.Message(byteStream);
                    payloadMessage.qos = storedMessage.payloadMessage.qos;
                    payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
                    if (storedMessage.payloadMessage.duplicate)
                        payloadMessage.duplicate = true;
                    if (storedMessage.payloadMessage.retained)
                        payloadMessage.retained = true;
                    wireMessage.payloadMessage = payloadMessage;
                    break;
                default:
                    throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
            }
            if (key.indexOf("Sent:" + this._localKey) === 0) {
                wireMessage.payloadMessage.duplicate = true;
                this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
            }
            else if (key.indexOf("Received:" + this._localKey) === 0) {
                this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
            }
        };
        ClientImpl.prototype._process_queue = function () {
            var message = null;
            // Process messages in order they were added
            var fifo = this._msg_queue.reverse();
            // Send all queued messages down socket connection
            while ((message = fifo.pop())) {
                this._socket_send(message);
                // Notify listeners that message was successfully sent
                if (this._notify_msg_sent[message]) {
                    this._notify_msg_sent[message]();
                    delete this._notify_msg_sent[message];
                }
            }
        };
        /**
         * Expect an ACK response for this message. Add message to the set of in progress
         * messages and set an unused identifier in this message.
         * @ignore
         */
        ClientImpl.prototype._requires_ack = function (wireMessage) {
            var messageCount = Object.keys(this._sentMessages).length;
            if (messageCount > this.maxMessageIdentifier)
                throw Error("Too many messages:" + messageCount);
            while (this._sentMessages[this._message_identifier] !== undefined) {
                this._message_identifier++;
            }
            wireMessage.messageIdentifier = this._message_identifier;
            this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
            if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
                this.store("Sent:", wireMessage);
            }
            if (this._message_identifier === this.maxMessageIdentifier) {
                this._message_identifier = 1;
            }
        };
        /**
         * Called when the underlying websocket has been opened.
         * @ignore
         */
        ClientImpl.prototype._on_socket_open = function () {
            // Create the CONNECT message object.
            var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
            wireMessage.clientId = this.clientId;
            this._socket_send(wireMessage);
        };
        /**
         * Called when the underlying websocket has received a complete packet.
         * @ignore
         */
        ClientImpl.prototype._on_socket_message = function (event) {
            this._trace("Client._on_socket_message", event.data);
            var messages = this._deframeMessages(event.data);
            for (var i = 0; i < messages.length; i += 1) {
                this._handleMessage(messages[i]);
            }
        };
        ClientImpl.prototype._deframeMessages = function (data) {
            var byteArray = new Uint8Array(data);
            var messages = [];
            if (this.receiveBuffer) {
                var newData = new Uint8Array(this.receiveBuffer.length + byteArray.length);
                newData.set(this.receiveBuffer);
                newData.set(byteArray, this.receiveBuffer.length);
                byteArray = newData;
                delete this.receiveBuffer;
            }
            try {
                var offset = 0;
                while (offset < byteArray.length) {
                    var result = decodeMessage(byteArray, offset);
                    var wireMessage = result[0];
                    offset = result[1];
                    if (wireMessage !== null) {
                        messages.push(wireMessage);
                    }
                    else {
                        break;
                    }
                }
                if (offset < byteArray.length) {
                    this.receiveBuffer = byteArray.subarray(offset);
                }
            }
            catch (error) {
                var errorStack = ((error.hasOwnProperty('stack') == 'undefined') ? error.stack.toString() : "No Error Stack Available");
                this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, errorStack]));
                return;
            }
            return messages;
        };
        ClientImpl.prototype._handleMessage = function (wireMessage) {
            this._trace("Client._handleMessage", wireMessage);
            try {
                switch (wireMessage.type) {
                    case MESSAGE_TYPE.CONNACK:
                        this._connectTimeout.cancel();
                        if (this._reconnectTimeout)
                            this._reconnectTimeout.cancel();
                        // If we have started using clean session then clear up the local state.
                        if (this.connectOptions.cleanSession) {
                            for (var key in this._sentMessages) {
                                var sentMessage = this._sentMessages[key];
                                localStorage.removeItem("Sent:" + this._localKey + sentMessage.messageIdentifier);
                            }
                            this._sentMessages = {};
                            for (var key in this._receivedMessages) {
                                var receivedMessage = this._receivedMessages[key];
                                localStorage.removeItem("Received:" + this._localKey + receivedMessage.messageIdentifier);
                            }
                            this._receivedMessages = {};
                        }
                        // Client connected and ready for business.
                        if (wireMessage.returnCode === 0) {
                            this.connected = true;
                            // Jump to the end of the list of uris and stop looking for a good host.
                            if (this.connectOptions.uris)
                                this.hostIndex = this.connectOptions.uris.length;
                        }
                        else {
                            this._disconnected(ERROR.CONNACK_RETURNCODE.code, format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
                            break;
                        }
                        // Resend messages.
                        var sequencedMessages = [];
                        for (var msgId in this._sentMessages) {
                            if (this._sentMessages.hasOwnProperty(msgId))
                                sequencedMessages.push(this._sentMessages[msgId]);
                        }
                        // Also schedule qos 0 buffered messages if any
                        if (this._buffered_msg_queue.length > 0) {
                            var msg = null;
                            var fifo = this._buffered_msg_queue.reverse();
                            while ((msg = fifo.pop())) {
                                sequencedMessages.push(msg);
                                if (this.onMessageDelivered)
                                    this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
                            }
                        }
                        // Sort sentMessages into the original sent order.
                        var sequencedMessages = sequencedMessages.sort(function (a, b) { return a.sequence - b.sequence; });
                        for (var i = 0, len = sequencedMessages.length; i < len; i++) {
                            var sentMessage = sequencedMessages[i];
                            if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
                                var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, { messageIdentifier: sentMessage.messageIdentifier });
                                this._schedule_message(pubRelMessage);
                            }
                            else {
                                this._schedule_message(sentMessage);
                            }
                        }
                        // Execute the connectOptions.onSuccess callback if there is one.
                        // Will also now return if this connection was the result of an automatic
                        // reconnect and which URI was successfully connected to.
                        if (this.connectOptions.onSuccess) {
                            this.connectOptions.onSuccess({ invocationContext: this.connectOptions.invocationContext });
                        }
                        var reconnected = false;
                        if (this._reconnecting) {
                            reconnected = true;
                            this._reconnectInterval = 1;
                            this._reconnecting = false;
                        }
                        // Execute the onConnected callback if there is one.
                        this._connected(reconnected, this._wsuri);
                        // Process all queued messages now that the connection is established.
                        this._process_queue();
                        break;
                    case MESSAGE_TYPE.PUBLISH:
                        this._receivePublish(wireMessage);
                        break;
                    case MESSAGE_TYPE.PUBACK:
                        var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                        // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
                        if (sentMessage) {
                            delete this._sentMessages[wireMessage.messageIdentifier];
                            localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                            if (this.onMessageDelivered)
                                this.onMessageDelivered(sentMessage.payloadMessage);
                        }
                        break;
                    case MESSAGE_TYPE.PUBREC:
                        var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                        // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
                        if (sentMessage) {
                            sentMessage.pubRecReceived = true;
                            var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, { messageIdentifier: wireMessage.messageIdentifier });
                            this.store("Sent:", sentMessage);
                            this._schedule_message(pubRelMessage);
                        }
                        break;
                    case MESSAGE_TYPE.PUBREL:
                        var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
                        localStorage.removeItem("Received:" + this._localKey + wireMessage.messageIdentifier);
                        // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
                        if (receivedMessage) {
                            this._receiveMessage(receivedMessage);
                            delete this._receivedMessages[wireMessage.messageIdentifier];
                        }
                        // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
                        var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, { messageIdentifier: wireMessage.messageIdentifier });
                        this._schedule_message(pubCompMessage);
                        break;
                    case MESSAGE_TYPE.PUBCOMP:
                        var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                        delete this._sentMessages[wireMessage.messageIdentifier];
                        localStorage.removeItem("Sent:" + this._localKey + wireMessage.messageIdentifier);
                        if (this.onMessageDelivered)
                            this.onMessageDelivered(sentMessage.payloadMessage);
                        break;
                    case MESSAGE_TYPE.SUBACK:
                        var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                        if (sentMessage) {
                            if (sentMessage.timeOut)
                                sentMessage.timeOut.cancel();
                            // This will need to be fixed when we add multiple topic support
                            if (wireMessage.returnCode[0] === 0x80) {
                                if (sentMessage.onFailure) {
                                    sentMessage.onFailure(wireMessage.returnCode);
                                }
                            }
                            else if (sentMessage.onSuccess) {
                                sentMessage.onSuccess(wireMessage.returnCode);
                            }
                            delete this._sentMessages[wireMessage.messageIdentifier];
                        }
                        break;
                    case MESSAGE_TYPE.UNSUBACK:
                        var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
                        if (sentMessage) {
                            if (sentMessage.timeOut)
                                sentMessage.timeOut.cancel();
                            if (sentMessage.callback) {
                                sentMessage.callback();
                            }
                            delete this._sentMessages[wireMessage.messageIdentifier];
                        }
                        break;
                    case MESSAGE_TYPE.PINGRESP:
                        /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
                        this.sendPinger.reset();
                        break;
                    case MESSAGE_TYPE.DISCONNECT:
                        // Clients do not expect to receive disconnect packets.
                        this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
                        break;
                    default:
                        this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
                }
            }
            catch (error) {
                var errorStack = ((error.hasOwnProperty('stack') == 'undefined') ? error.stack.toString() : "No Error Stack Available");
                this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, errorStack]));
                return;
            }
        };
        /** @ignore */
        ClientImpl.prototype._on_socket_error = function (error) {
            if (!this._reconnecting) {
                this._disconnected(ERROR.SOCKET_ERROR.code, format(ERROR.SOCKET_ERROR, [error.data]));
            }
        };
        /** @ignore */
        ClientImpl.prototype._on_socket_close = function () {
            if (!this._reconnecting) {
                this._disconnected(ERROR.SOCKET_CLOSE.code, format(ERROR.SOCKET_CLOSE));
            }
        };
        /** @ignore */
        ClientImpl.prototype._socket_send = function (wireMessage) {
            if (wireMessage.type == 1) {
                var wireMessageMasked = this._traceMask(wireMessage, "password");
                this._trace("Client._socket_send", wireMessageMasked);
            }
            else
                this._trace("Client._socket_send", wireMessage);
            this.socket.send(wireMessage.encode());
            /* We have proved to the server we are alive. */
            this.sendPinger.reset();
        };
        /** @ignore */
        ClientImpl.prototype._receivePublish = function (wireMessage) {
            switch (wireMessage.payloadMessage.qos) {
                case "undefined":
                case 0:
                    this._receiveMessage(wireMessage);
                    break;
                case 1:
                    var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, { messageIdentifier: wireMessage.messageIdentifier });
                    this._schedule_message(pubAckMessage);
                    this._receiveMessage(wireMessage);
                    break;
                case 2:
                    this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
                    this.store("Received:", wireMessage);
                    var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, { messageIdentifier: wireMessage.messageIdentifier });
                    this._schedule_message(pubRecMessage);
                    break;
                default:
                    throw Error("Invaild qos=" + wireMmessage.payloadMessage.qos);
            }
        };
        /** @ignore */
        ClientImpl.prototype._receiveMessage = function (wireMessage) {
            if (this.onMessageArrived) {
                this.onMessageArrived(wireMessage.payloadMessage);
            }
        };
        /**
         * Client has connected.
         * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
         * @param {uri} [string] fully qualified WebSocket URI of the server.
         */
        ClientImpl.prototype._connected = function (reconnect, uri) {
            // Execute the onConnected callback if there is one.
            if (this.onConnected)
                this.onConnected(reconnect, uri);
        };
        /**
         * Attempts to reconnect the client to the server.
       * For each reconnect attempt, will double the reconnect interval
       * up to 128 seconds.
         */
        ClientImpl.prototype._reconnect = function () {
            this._trace("Client._reconnect");
            if (!this.connected) {
                this._reconnecting = true;
                this.sendPinger.cancel();
                this.receivePinger.cancel();
                if (this._reconnectInterval < 128)
                    this._reconnectInterval = this._reconnectInterval * 2;
                if (this.connectOptions.uris) {
                    this.hostIndex = 0;
                    this._doConnect(this.connectOptions.uris[0]);
                }
                else {
                    this._doConnect(this.uri);
                }
            }
        };
        /**
         * Client has disconnected either at its own request or because the server
         * or network disconnected it. Remove all non-durable state.
         * @param {errorCode} [number] the error number.
         * @param {errorText} [string] the error text.
         * @ignore
         */
        ClientImpl.prototype._disconnected = function (errorCode, errorText) {
            this._trace("Client._disconnected", errorCode, errorText);
            if (errorCode !== undefined && this._reconnecting) {
                //Continue automatic reconnect process
                this._reconnectTimeout = new Timeout(this, window, this._reconnectInterval, this._reconnect);
                return;
            }
            this.sendPinger.cancel();
            this.receivePinger.cancel();
            if (this._connectTimeout) {
                this._connectTimeout.cancel();
                this._connectTimeout = null;
            }
            // Clear message buffers.
            this._msg_queue = [];
            this._buffered_msg_queue = [];
            this._notify_msg_sent = {};
            if (this.socket) {
                // Cancel all socket callbacks so that they cannot be driven again by this socket.
                this.socket.onopen = null;
                this.socket.onmessage = null;
                this.socket.onerror = null;
                this.socket.onclose = null;
                if (this.socket.readyState === 1)
                    this.socket.close();
                delete this.socket;
            }
            if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) {
                // Try the next host.
                this.hostIndex++;
                this._doConnect(this.connectOptions.uris[this.hostIndex]);
            }
            else {
                if (errorCode === undefined) {
                    errorCode = ERROR.OK.code;
                    errorText = format(ERROR.OK);
                }
                // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
                if (this.connected) {
                    this.connected = false;
                    // Execute the connectionLostCallback if there is one, and we were connected.
                    if (this.onConnectionLost) {
                        this.onConnectionLost({ errorCode: errorCode, errorMessage: errorText, reconnect: this.connectOptions.reconnect, uri: this._wsuri });
                    }
                    if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
                        // Start automatic reconnect process for the very first time since last successful connect.
                        this._reconnectInterval = 1;
                        this._reconnect();
                        return;
                    }
                }
                else {
                    // Otherwise we never had a connection, so indicate that the connect has failed.
                    if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
                        this._trace("Failed to connect V4, dropping back to V3");
                        this.connectOptions.mqttVersion = 3;
                        if (this.connectOptions.uris) {
                            this.hostIndex = 0;
                            this._doConnect(this.connectOptions.uris[0]);
                        }
                        else {
                            this._doConnect(this.uri);
                        }
                    }
                    else if (this.connectOptions.onFailure) {
                        this.connectOptions.onFailure({ invocationContext: this.connectOptions.invocationContext, errorCode: errorCode, errorMessage: errorText });
                    }
                }
            }
        };
        /** @ignore */
        ClientImpl.prototype._trace = function () {
            // Pass trace message back to client's callback function
            if (this.traceFunction) {
                for (var i in arguments) {
                    if (typeof arguments[i] !== "undefined")
                        arguments.splice(i, 1, JSON.stringify(arguments[i]));
                }
                var record = Array.prototype.slice.call(arguments).join("");
                this.traceFunction({ severity: "Debug", message: record });
            }
            //buffer style trace
            if (this._traceBuffer !== null) {
                for (var i = 0, max = arguments.length; i < max; i++) {
                    if (this._traceBuffer.length == this._MAX_TRACE_ENTRIES) {
                        this._traceBuffer.shift();
                    }
                    if (i === 0)
                        this._traceBuffer.push(arguments[i]);
                    else if (typeof arguments[i] === "undefined")
                        this._traceBuffer.push(arguments[i]);
                    else
                        this._traceBuffer.push("  " + JSON.stringify(arguments[i]));
                }
            }
        };
        /** @ignore */
        ClientImpl.prototype._traceMask = function (traceObject, masked) {
            var traceObjectMasked = {};
            for (var attr in traceObject) {
                if (traceObject.hasOwnProperty(attr)) {
                    if (attr == masked)
                        traceObjectMasked[attr] = "******";
                    else
                        traceObjectMasked[attr] = traceObject[attr];
                }
            }
            return traceObjectMasked;
        };
        // ------------------------------------------------------------------------
        // Public Programming interface.
        // ------------------------------------------------------------------------
        /**
         * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
         * <p>
         * Most applications will create just one Client object and then call its connect() method,
         * however applications can create more than one Client object if they wish.
         * In this case the combination of host, port and clientId attributes must be different for each Client object.
         * <p>
         * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
         * (even though the underlying protocol exchange might be synchronous in nature).
         * This means they signal their completion by calling back to the application,
         * via Success or Failure callback functions provided by the application on the method in question.
         * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
         * of the script that made the invocation.
         * <p>
         * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
         * that are defined on the {@link Paho.MQTT.Client} object.
         * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
         *
         * @name Paho.MQTT.Client
         *
         * @constructor
         *
         * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
         * @param {number} port - the port number to connect to - only required if host is not a URI
         * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
         * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
         *
         * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
         * @property {number} port - <i>read only</i> the server's port.
         * @property {string} path - <i>read only</i> the server's path.
         * @property {string} clientId - <i>read only</i> used when connecting to the server.
         * @property {function} onConnectionLost - called when a connection has been lost.
         *                            after a connect() method has succeeded.
         *                            Establish the call back used when a connection has been lost. The connection may be
         *                            lost because the client initiates a disconnect or because the server or network
         *                            cause the client to be disconnected. The disconnect call back may be called without
         *                            the connectionComplete call back being invoked if, for example the client fails to
         *                            connect.
         *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
         *                            <ol>
         *                            <li>errorCode
         *                            <li>errorMessage
         *                            </ol>
         * @property {function} onMessageDelivered - called when a message has been delivered.
         *                            All processing that this Client will ever do has been completed. So, for example,
         *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
         *                            and the message has been removed from persistent storage before this callback is invoked.
         *                            Parameters passed to the onMessageDelivered callback are:
         *                            <ol>
         *                            <li>{@link Paho.MQTT.Message} that was delivered.
         *                            </ol>
         * @property {function} onMessageArrived - called when a message has arrived in this Paho.MQTT.client.
         *                            Parameters passed to the onMessageArrived callback are:
         *                            <ol>
         *                            <li>{@link Paho.MQTT.Message} that has arrived.
         *                            </ol>
         * @property {function} onConnected - called when a connection is successfully made to the server.
         *                                  after a connect() method.
         *                                  Parameters passed to the onConnected callback are:
         *                                  <ol>
         *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
         *                                  <li>URI (string) - The URI used to connect to the server.</li>
         *                                  </ol>
         * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
         *                                            in the event that the connection to the server is lost.
         * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
         *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
         * @property {function} trace - called whenever trace is called. TODO
         */
        var Client = function (host, port, path, clientId) {
            var uri;
            if (typeof host !== "string")
                throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));
            if (arguments.length == 2) {
                // host: must be full ws:// uri
                // port: clientId
                clientId = port;
                uri = host;
                var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
                if (match) {
                    host = match[4] || match[2];
                    port = parseInt(match[7]);
                    path = match[8];
                }
                else {
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [host, "host"]));
                }
            }
            else {
                if (arguments.length == 3) {
                    clientId = path;
                    path = "/mqtt";
                }
                if (typeof port !== "number" || port < 0)
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
                if (typeof path !== "string")
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));
                var ipv6AddSBracket = (host.indexOf(":") !== -1 && host.slice(0, 1) !== "[" && host.slice(-1) !== "]");
                uri = "ws://" + (ipv6AddSBracket ? "[" + host + "]" : host) + ":" + port + path;
            }
            var clientIdLength = 0;
            for (var i = 0; i < clientId.length; i++) {
                var charCode = clientId.charCodeAt(i);
                if (0xD800 <= charCode && charCode <= 0xDBFF) {
                    i++; // Surrogate pair.
                }
                clientIdLength++;
            }
            if (typeof clientId !== "string" || clientIdLength > 65535)
                throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));
            var client = new ClientImpl(uri, host, port, path, clientId);
            this._getHost = function () { return host; };
            this._setHost = function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };
            this._getPort = function () { return port; };
            this._setPort = function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };
            this._getPath = function () { return path; };
            this._setPath = function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };
            this._getURI = function () { return uri; };
            this._setURI = function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };
            this._getClientId = function () { return client.clientId; };
            this._setClientId = function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); };
            this._getOnConnected = function () { return client.onConnected; };
            this._setOnConnected = function (newOnConnected) {
                if (typeof newOnConnected === "function")
                    client.onConnected = newOnConnected;
                else
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnected, "onConnected"]));
            };
            this._getDisconnectedPublishing = function () { return client.disconnectedPublishing; };
            this._setDisconnectedPublishing = function (newDisconnectedPublishing) {
                client.disconnectedPublishing = newDisconnectedPublishing;
            };
            this._getDisconnectedBufferSize = function () { return client.disconnectedBufferSize; };
            this._setDisconnectedBufferSize = function (newDisconnectedBufferSize) {
                client.disconnectedBufferSize = newDisconnectedBufferSize;
            };
            this._getOnConnectionLost = function () { return client.onConnectionLost; };
            this._setOnConnectionLost = function (newOnConnectionLost) {
                if (typeof newOnConnectionLost === "function")
                    client.onConnectionLost = newOnConnectionLost;
                else
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
            };
            this._getOnMessageDelivered = function () { return client.onMessageDelivered; };
            this._setOnMessageDelivered = function (newOnMessageDelivered) {
                if (typeof newOnMessageDelivered === "function")
                    client.onMessageDelivered = newOnMessageDelivered;
                else
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
            };
            this._getOnMessageArrived = function () { return client.onMessageArrived; };
            this._setOnMessageArrived = function (newOnMessageArrived) {
                if (typeof newOnMessageArrived === "function")
                    client.onMessageArrived = newOnMessageArrived;
                else
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
            };
            this._getTrace = function () { return client.traceFunction; };
            this._setTrace = function (trace) {
                if (typeof trace === "function") {
                    client.traceFunction = trace;
                }
                else {
                    throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
                }
            };
            /**
             * Connect this Messaging client to its server.
             *
             * @name Paho.MQTT.Client#connect
             * @function
             * @param {object} connectOptions - Attributes used with the connection.
             * @param {number} connectOptions.timeout - If the connect has not succeeded within this
             *                    number of seconds, it is deemed to have failed.
             *                    The default is 30 seconds.
             * @param {string} connectOptions.userName - Authentication username for this connection.
             * @param {string} connectOptions.password - Authentication password for this connection.
             * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
             *                    disconnects abnormally.
             * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
             *                    there is no activity for this number of seconds.
             *                    The default value of 60 seconds is assumed if not set.
             * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
             *                    persistent state is deleted on successful connect.
             * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
             * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
             * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
             *                    has been received from the server.
             * A single response object parameter is passed to the onSuccess callback containing the following fields:
             * <ol>
             * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
             * </ol>
         * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
             * A single response object parameter is passed to the onFailure callback containing the following fields:
             * <ol>
             * <li>invocationContext as passed in to the onFailure method in the connectOptions.
             * <li>errorCode a number indicating the nature of the error.
             * <li>errorMessage text describing the error.
             * </ol>
         * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
             * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
             * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
             * one of then succeeds.
         * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
             * is not used.
         * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
         * to the server if the connection is lost.
         *<ul>
         *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
         * connection is lost.</li>
         *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
         * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
         * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
         *</ul>
         * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
         *<ul>
         *<li>3 - MQTT V3.1</li>
         *<li>4 - MQTT V3.1.1</li>
         *</ul>
         * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
         * selected MQTT Version or will fail to connect.
         * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
         * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
         * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
         * the hosts array will be converted to uris and will overwrite this property.
             * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
             * or disconnected before calling connect for a second or subsequent time.
             */
            this.connect = function (connectOptions) {
                connectOptions = connectOptions || {};
                validate(connectOptions, { timeout: "number",
                    userName: "string",
                    password: "string",
                    willMessage: "object",
                    keepAliveInterval: "number",
                    cleanSession: "boolean",
                    useSSL: "boolean",
                    invocationContext: "object",
                    onSuccess: "function",
                    onFailure: "function",
                    hosts: "object",
                    ports: "object",
                    reconnect: "boolean",
                    mqttVersion: "number",
                    mqttVersionExplicit: "boolean",
                    uris: "object" });
                // If no keep alive interval is set, assume 60 seconds.
                if (connectOptions.keepAliveInterval === undefined)
                    connectOptions.keepAliveInterval = 60;
                if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
                }
                if (connectOptions.mqttVersion === undefined) {
                    connectOptions.mqttVersionExplicit = false;
                    connectOptions.mqttVersion = 4;
                }
                else {
                    connectOptions.mqttVersionExplicit = true;
                }
                //Check that if password is set, so is username
                if (connectOptions.password !== undefined && connectOptions.userName === undefined)
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]));
                if (connectOptions.willMessage) {
                    if (!(connectOptions.willMessage instanceof Message))
                        throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
                    // The will message must have a payload that can be represented as a string.
                    // Cause the willMessage to throw an exception if this is not the case.
                    connectOptions.willMessage.stringPayload = null;
                    if (typeof connectOptions.willMessage.destinationName === "undefined")
                        throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
                }
                if (typeof connectOptions.cleanSession === "undefined")
                    connectOptions.cleanSession = true;
                if (connectOptions.hosts) {
                    if (!(connectOptions.hosts instanceof Array))
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
                    if (connectOptions.hosts.length < 1)
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
                    var usingURIs = false;
                    for (var i = 0; i < connectOptions.hosts.length; i++) {
                        if (typeof connectOptions.hosts[i] !== "string")
                            throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                        if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
                            if (i === 0) {
                                usingURIs = true;
                            }
                            else if (!usingURIs) {
                                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                            }
                        }
                        else if (usingURIs) {
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts[" + i + "]"]));
                        }
                    }
                    if (!usingURIs) {
                        if (!connectOptions.ports)
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                        if (!(connectOptions.ports instanceof Array))
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                        if (connectOptions.hosts.length !== connectOptions.ports.length)
                            throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
                        connectOptions.uris = [];
                        for (var i = 0; i < connectOptions.hosts.length; i++) {
                            if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
                                throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports[" + i + "]"]));
                            var host = connectOptions.hosts[i];
                            var port = connectOptions.ports[i];
                            var ipv6 = (host.indexOf(":") !== -1);
                            uri = "ws://" + (ipv6 ? "[" + host + "]" : host) + ":" + port + path;
                            connectOptions.uris.push(uri);
                        }
                    }
                    else {
                        connectOptions.uris = connectOptions.hosts;
                    }
                }
                client.connect(connectOptions);
            };
            /**
             * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
             *
             * @name Paho.MQTT.Client#subscribe
             * @function
             * @param {string} filter describing the destinations to receive messages from.
             * <br>
             * @param {object} subscribeOptions - used to control the subscription
             *
             * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent
             *                                  as a result of making this subscription.
             * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
             *                                  or onFailure callback.
             * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
             *                                  has been received from the server.
             *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
             *                                  <ol>
             *                                  <li>invocationContext if set in the subscribeOptions.
             *                                  </ol>
             * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
             *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
             *                                  <ol>
             *                                  <li>invocationContext - if set in the subscribeOptions.
             *                                  <li>errorCode - a number indicating the nature of the error.
             *                                  <li>errorMessage - text describing the error.
             *                                  </ol>
             * @param {number} subscribeOptions.timeout - which, if present, determines the number of
             *                                  seconds after which the onFailure calback is called.
             *                                  The presence of a timeout does not prevent the onSuccess
             *                                  callback from being called when the subscribe completes.
             * @throws {InvalidState} if the client is not in connected state.
             */
            this.subscribe = function (filter, subscribeOptions) {
                if (typeof filter !== "string")
                    throw new Error("Invalid argument:" + filter);
                subscribeOptions = subscribeOptions || {};
                validate(subscribeOptions, { qos: "number",
                    invocationContext: "object",
                    onSuccess: "function",
                    onFailure: "function",
                    timeout: "number"
                });
                if (subscribeOptions.timeout && !subscribeOptions.onFailure)
                    throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
                if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2))
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
                client.subscribe(filter, subscribeOptions);
            };
            /**
             * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
             *
             * @name Paho.MQTT.Client#unsubscribe
             * @function
             * @param {string} filter - describing the destinations to receive messages from.
             * @param {object} unsubscribeOptions - used to control the subscription
             * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
                                                  or onFailure callback.
             * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
             *                                    A single response object parameter is passed to the
             *                                    onSuccess callback containing the following fields:
             *                                    <ol>
             *                                    <li>invocationContext - if set in the unsubscribeOptions.
             *                                    </ol>
             * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
             *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
             *                                    <ol>
             *                                    <li>invocationContext - if set in the unsubscribeOptions.
             *                                    <li>errorCode - a number indicating the nature of the error.
             *                                    <li>errorMessage - text describing the error.
             *                                    </ol>
             * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
             *                                    after which the onFailure callback is called. The presence of
             *                                    a timeout does not prevent the onSuccess callback from being
             *                                    called when the unsubscribe completes
             * @throws {InvalidState} if the client is not in connected state.
             */
            this.unsubscribe = function (filter, unsubscribeOptions) {
                if (typeof filter !== "string")
                    throw new Error("Invalid argument:" + filter);
                unsubscribeOptions = unsubscribeOptions || {};
                validate(unsubscribeOptions, { invocationContext: "object",
                    onSuccess: "function",
                    onFailure: "function",
                    timeout: "number"
                });
                if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
                    throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
                client.unsubscribe(filter, unsubscribeOptions);
            };
            /**
             * Send a message to the consumers of the destination in the Message.
             *
             * @name Paho.MQTT.Client#send
             * @function
             * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
             * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
             * @param {String|ArrayBuffer} payload - The message data to be sent.
             * @param {number} qos The Quality of Service used to deliver the message.
             * 		<dl>
             * 			<dt>0 Best effort (default).
             *     			<dt>1 At least once.
             *     			<dt>2 Exactly once.
             * 		</dl>
             * @param {Boolean} retained If true, the message is to be retained by the server and delivered
             *                     to both current and future subscriptions.
             *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
             *                     A received message has the retained boolean set to true if the message was published
             *                     with the retained boolean set to true
             *                     and the subscrption was made after the message has been published.
             * @throws {InvalidState} if the client is not connected.
             */
            this.send = function (topic, payload, qos, retained) {
                var message;
                if (arguments.length === 0) {
                    throw new Error("Invalid argument." + "length");
                }
                else if (arguments.length == 1) {
                    if (!(topic instanceof Message) && (typeof topic !== "string"))
                        throw new Error("Invalid argument:" + typeof topic);
                    message = topic;
                    if (typeof message.destinationName === "undefined")
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, "Message.destinationName"]));
                    client.send(message);
                }
                else {
                    //parameter checking in Message object
                    message = new Message(payload);
                    message.destinationName = topic;
                    if (arguments.length >= 3)
                        message.qos = qos;
                    if (arguments.length >= 4)
                        message.retained = retained;
                    client.send(message);
                }
            };
            /**
             * Publish a message to the consumers of the destination in the Message.
             * Synonym for Paho.Mqtt.Client#send
             *
             * @name Paho.MQTT.Client#publish
             * @function
             * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
             * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
             * @param {String|ArrayBuffer} payload - The message data to be published.
             * @param {number} qos The Quality of Service used to deliver the message.
             * 		<dl>
             * 			<dt>0 Best effort (default).
             *     			<dt>1 At least once.
             *     			<dt>2 Exactly once.
             * 		</dl>
             * @param {Boolean} retained If true, the message is to be retained by the server and delivered
             *                     to both current and future subscriptions.
             *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
             *                     A received message has the retained boolean set to true if the message was published
             *                     with the retained boolean set to true
             *                     and the subscrption was made after the message has been published.
             * @throws {InvalidState} if the client is not connected.
             */
            this.publish = function (topic, payload, qos, retained) {
                console.log("Publising message to: ", topic);
                var message;
                if (arguments.length === 0) {
                    throw new Error("Invalid argument." + "length");
                }
                else if (arguments.length == 1) {
                    if (!(topic instanceof Message) && (typeof topic !== "string"))
                        throw new Error("Invalid argument:" + typeof topic);
                    message = topic;
                    if (typeof message.destinationName === "undefined")
                        throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, "Message.destinationName"]));
                    client.send(message);
                }
                else {
                    //parameter checking in Message object
                    message = new Message(payload);
                    message.destinationName = topic;
                    if (arguments.length >= 3)
                        message.qos = qos;
                    if (arguments.length >= 4)
                        message.retained = retained;
                    client.send(message);
                }
            };
            /**
             * Normal disconnect of this Messaging client from its server.
             *
             * @name Paho.MQTT.Client#disconnect
             * @function
             * @throws {InvalidState} if the client is already disconnected.
             */
            this.disconnect = function () {
                client.disconnect();
            };
            /**
             * Get the contents of the trace log.
             *
             * @name Paho.MQTT.Client#getTraceLog
             * @function
             * @return {Object[]} tracebuffer containing the time ordered trace records.
             */
            this.getTraceLog = function () {
                return client.getTraceLog();
            };
            /**
             * Start tracing.
             *
             * @name Paho.MQTT.Client#startTrace
             * @function
             */
            this.startTrace = function () {
                client.startTrace();
            };
            /**
             * Stop tracing.
             *
             * @name Paho.MQTT.Client#stopTrace
             * @function
             */
            this.stopTrace = function () {
                client.stopTrace();
            };
            this.isConnected = function () {
                return client.connected;
            };
            return this;
        };
        Client.prototype = {
            get host() { return this._getHost(); },
            set host(newHost) { this._setHost(newHost); },
            get port() { return this._getPort(); },
            set port(newPort) { this._setPort(newPort); },
            get path() { return this._getPath(); },
            set path(newPath) { this._setPath(newPath); },
            get clientId() { return this._getClientId(); },
            set clientId(newClientId) { this._setClientId(newClientId); },
            get onConnected() { return this._getOnConnected(); },
            set onConnected(newOnConnected) { this._setOnConnected(newOnConnected); },
            get disconnectedPublishing() { return this._getDisconnectedPublishing(); },
            set disconnectedPublishing(newDisconnectedPublishing) { this._setDisconnectedPublishing(newDisconnectedPublishing); },
            get disconnectedBufferSize() { return this._getDisconnectedBufferSize(); },
            set disconnectedBufferSize(newDisconnectedBufferSize) { this._setDisconnectedBufferSize(newDisconnectedBufferSize); },
            get onConnectionLost() { return this._getOnConnectionLost(); },
            set onConnectionLost(newOnConnectionLost) { this._setOnConnectionLost(newOnConnectionLost); },
            get onMessageDelivered() { return this._getOnMessageDelivered(); },
            set onMessageDelivered(newOnMessageDelivered) { this._setOnMessageDelivered(newOnMessageDelivered); },
            get onMessageArrived() { return this._getOnMessageArrived(); },
            set onMessageArrived(newOnMessageArrived) { this._setOnMessageArrived(newOnMessageArrived); },
            get trace() { return this._getTrace(); },
            set trace(newTraceFunction) { this._setTrace(newTraceFunction); }
        };
        /**
         * An application message, sent or received.
         * <p>
         * All attributes may be null, which implies the default values.
         *
         * @name Paho.MQTT.Message
         * @constructor
         * @param {String|ArrayBuffer} payload The message data to be sent.
         * <p>
         * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
         * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
         * <p>
         * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
         *                    (for messages about to be sent) or the name of the destination from which the message has been received.
         *                    (for messages received by the onMessage function).
         * <p>
         * @property {number} qos The Quality of Service used to deliver the message.
         * <dl>
         *     <dt>0 Best effort (default).
         *     <dt>1 At least once.
         *     <dt>2 Exactly once.
         * </dl>
         * <p>
         * @property {Boolean} retained If true, the message is to be retained by the server and delivered
         *                     to both current and future subscriptions.
         *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
         *                     A received message has the retained boolean set to true if the message was published
         *                     with the retained boolean set to true
         *                     and the subscrption was made after the message has been published.
         * <p>
         * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
         *                     This is only set on messages received from the server.
         *
         */
        var Message = function (newPayload) {
            var payload;
            if (typeof newPayload === "string" ||
                newPayload instanceof ArrayBuffer ||
                newPayload instanceof Int8Array ||
                newPayload instanceof Uint8Array ||
                newPayload instanceof Int16Array ||
                newPayload instanceof Uint16Array ||
                newPayload instanceof Int32Array ||
                newPayload instanceof Uint32Array ||
                newPayload instanceof Float32Array ||
                newPayload instanceof Float64Array) {
                payload = newPayload;
            }
            else {
                throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
            }
            this._getPayloadString = function () {
                if (typeof payload === "string")
                    return payload;
                else
                    return parseUTF8(payload, 0, payload.length);
            };
            this._getPayloadBytes = function () {
                if (typeof payload === "string") {
                    var buffer = new ArrayBuffer(UTF8Length(payload));
                    var byteStream = new Uint8Array(buffer);
                    stringToUTF8(payload, byteStream, 0);
                    return byteStream;
                }
                else {
                    return payload;
                }
            };
            var destinationName;
            this._getDestinationName = function () { return destinationName; };
            this._setDestinationName = function (newDestinationName) {
                if (typeof newDestinationName === "string")
                    destinationName = newDestinationName;
                else
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
            };
            var qos = 0;
            this._getQos = function () { return qos; };
            this._setQos = function (newQos) {
                if (newQos === 0 || newQos === 1 || newQos === 2)
                    qos = newQos;
                else
                    throw new Error("Invalid argument:" + newQos);
            };
            var retained = false;
            this._getRetained = function () { return retained; };
            this._setRetained = function (newRetained) {
                if (typeof newRetained === "boolean")
                    retained = newRetained;
                else
                    throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
            };
            var duplicate = false;
            this._getDuplicate = function () { return duplicate; };
            this._setDuplicate = function (newDuplicate) { duplicate = newDuplicate; };
            return this;
        };
        Message.prototype = {
            get payloadString() { return this._getPayloadString(); },
            get payloadBytes() { return this._getPayloadBytes(); },
            get destinationName() { return this._getDestinationName(); },
            set destinationName(newDestinationName) { this._setDestinationName(newDestinationName); },
            get topic() { return this._getDestinationName(); },
            set topic(newTopic) { this._setDestinationName(newTopic); },
            get qos() { return this._getQos(); },
            set qos(newQos) { this._setQos(newQos); },
            get retained() { return this._getRetained(); },
            set retained(newRetained) { this._setRetained(newRetained); },
            get duplicate() { return this._getDuplicate(); },
            set duplicate(newDuplicate) { this._setDuplicate(newDuplicate); }
        };
        // Module contents.
        return {
            Client: Client,
            Message: Message
        };
    })(window);
    Paho.MQTT = PahoMQTT;
    window.Paho = Paho;
})(Paho || (Paho = {}));
