// =========================== //
// tape utils.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Build
     */
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
    /**
     * FrameInterval
     */
    var FrameInterval = /** @class */ (function () {
        function FrameInterval() {
            this.__callback__ = null;
            this.__start_date__ = null;
            this.__offset__ = 0;
        }
        /**
         * start
         * @param delay frame
         * @param callback callback:time
         * @param offset time offset
         */
        FrameInterval.prototype.start = function (delay, callback, offset) {
            if (offset === void 0) { offset = 0; }
            this.__callback__ = callback;
            this.__start_date__ = new Date();
            this.__offset__ = offset;
            Laya.timer.loop(delay, this, this.loop);
        };
        FrameInterval.prototype.loop = function () {
            var now = new Date();
            this.__callback__ && this.__callback__(now.getTime() - this.__start_date__.getTime() + this.__offset__);
        };
        /**
         * stop
         */
        FrameInterval.prototype.stop = function () {
            Laya.timer.clear(this, this.loop);
        };
        return FrameInterval;
    }());
    Tape.FrameInterval = FrameInterval;
    /**
     * TimerInterval
     */
    var TimerInterval = /** @class */ (function () {
        function TimerInterval() {
            this.__interval__ = 0;
            this.__start_date__ = null;
            this.__offset__ = 0;
        }
        /**
         * start
         * @param delay millis
         * @param callback callback:time
         * @param offset time offset
         */
        TimerInterval.prototype.start = function (delay, callback, offset) {
            var _this = this;
            if (offset === void 0) { offset = 0; }
            this.__start_date__ = new Date();
            this.__offset__ = offset;
            this.__interval__ = setInterval(function () {
                var now = new Date();
                callback && callback(now.getTime() - _this.__start_date__.getTime() + _this.__offset__);
            }, delay);
        };
        /**
         * stop
         */
        TimerInterval.prototype.stop = function () {
            clearInterval(this.__interval__);
        };
        return TimerInterval;
    }());
    Tape.TimerInterval = TimerInterval;
    /**
     * EventBus
     */
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
        EventBus.register = function (event, callback) {
            if (!event || !callback) {
                return;
            }
            if (!this.__event_group__.hasOwnProperty(event)) {
                this.__event_group__[event] = new Array();
            }
            var list = this.__event_group__[event];
            list.push(callback);
        };
        EventBus.unregister = function (event, callback) {
            if (!event || !callback) {
                return;
            }
            if (this.__event_group__.hasOwnProperty(event)) {
                var list = this.__event_group__[event];
                list.splice(list.indexOf(callback), 1);
            }
        };
        EventBus.__event_group__ = {};
        return EventBus;
    }());
    Tape.EventBus = EventBus;
    /**
     * NumUtil
     */
    var NumUtil = /** @class */ (function () {
        function NumUtil() {
        }
        /**
         * rangedValue
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        NumUtil.rangedValue = function (val, min, max) {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        };
        /**
         * rand
         * @param min min number
         * @param max max number
         */
        NumUtil.rand = function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        };
        return NumUtil;
    }());
    Tape.NumUtil = NumUtil;
    /**
     * LinkUtil
     */
    var LinkUtil = /** @class */ (function () {
        function LinkUtil() {
        }
        /**
         * openURL
         * @param url url
         */
        LinkUtil.openURL = function (url) {
            window.location.href = url;
        };
        return LinkUtil;
    }());
    Tape.LinkUtil = LinkUtil;
    /**
     * UUID
     */
    var UUID = /** @class */ (function () {
        function UUID() {
        }
        UUID._s4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        UUID.randUUID = function () {
            return (this._s4() + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + this._s4() + this._s4());
        };
        return UUID;
    }());
    Tape.UUID = UUID;
    /**
     * Logger
     */
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
        Logger.__is_debug__ = Build.isDebug();
        return Logger;
    }());
    Tape.Logger = Logger;
    /**
     * Task
     */
    var Task = /** @class */ (function () {
        /**
         * new Task()
         * @param func args[resolve,reject]
         */
        function Task(func) {
            var _this = this;
            this.__state__ = 'pending';
            this.__value__ = null;
            this.__callbacks__ = [];
            var reject = function (reason) {
                _this.__state__ = 'rejected';
                _this.__value__ = reason;
                _this._execute();
            };
            var resolve = function (newValue) {
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                    var then = newValue.then;
                    if (typeof then === 'function') {
                        try {
                            then.call(newValue, resolve, reject);
                        }
                        catch (error) {
                            reject(error);
                        }
                        return;
                    }
                }
                _this.__state__ = 'fulfilled';
                _this.__value__ = newValue;
                _this._execute();
            };
            try {
                func(resolve, reject);
            }
            catch (error) {
                reject(error);
            }
        }
        /**
         * then
         * @param onFulfilled onFulfilled
         * @param onRejected onRejected
         */
        Task.prototype.then = function (onFulfilled, onRejected) {
            var _this = this;
            if (onRejected === void 0) { onRejected = null; }
            return new Task(function (resolve, reject) {
                _this._handle({
                    onFulfilled: onFulfilled || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };
        /**
         * catch
         * @param onRejected onRejected
         */
        Task.prototype.catch = function (onRejected) {
            var _this = this;
            return new Task(function (resolve, reject) {
                _this._handle({
                    onFulfilled: null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };
        Task.prototype._handle = function (callback) {
            if (this.__state__ === 'pending') {
                this.__callbacks__.push(callback);
                return;
            }
            var cb = this.__state__ === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
            if (cb === null) {
                cb = this.__state__ === 'fulfilled' ? callback.resolve : callback.reject;
                cb(this.__value__);
                return;
            }
            try {
                var ret = cb(this.__value__);
                callback.resolve(ret);
            }
            catch (error) {
                callback.reject(error);
            }
        };
        Task.prototype._execute = function () {
            var _this = this;
            setTimeout(function () {
                _this.__callbacks__.forEach(function (callback) {
                    _this._handle(callback);
                });
            }, 0);
        };
        return Task;
    }());
    Tape.Task = Task;
})(Tape || (Tape = {}));

// =========================== //
// tape mini.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Mini状态类
     */
    var MiniState = /** @class */ (function () {
        function MiniState() {
        }
        MiniState.__wx_main_show_data__ = null;
        MiniState.__wx_main_user_login_data__ = null;
        MiniState.__wx_main_user_logging__ = false;
        MiniState.__wx_main_user_login_button__ = null;
        MiniState.__wx_main_user_login_bg_page__ = null;
        MiniState.__wx_main_open_data_view__ = null;
        MiniState.__wx_main_open_data_bg_page__ = null;
        MiniState.__wx_main_game_club_button__ = null;
        return MiniState;
    }());
    /**
     * Mini工具类
     */
    var MiniUtils = /** @class */ (function () {
        function MiniUtils() {
        }
        /**
         * 版本号比较
         */
        MiniUtils.compareVersion = function (v1, v2) {
            v1 = v1.split('.');
            v2 = v2.split('.');
            var len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push('0');
            }
            while (v2.length < len) {
                v2.push('0');
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1[i]);
                var num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        };
        /**
         * 打印日志
         */
        MiniUtils.debugLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.log.apply(console, [message].concat(optionalParams));
        };
        /**
         * 获取wx模块的方法
         */
        MiniUtils.getMiniFunction = function (func) {
            if (window.hasOwnProperty("wx")) {
                if (window['wx'].hasOwnProperty(func)) {
                    return window['wx'][func];
                }
                else {
                    return function () { };
                }
            }
            else {
                return function () { };
            }
        };
        /**
         * 执行wx模块的方法
         */
        MiniUtils.callMiniFunction = function (func, options, success, fail, complete) {
            if (options === void 0) { options = {}; }
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            if (window.hasOwnProperty("wx")) {
                if (window['wx'].hasOwnProperty(func)) {
                    var defOpts = {};
                    if (success) {
                        defOpts['success'] = success;
                    }
                    if (fail) {
                        defOpts['fail'] = fail;
                    }
                    if (complete) {
                        defOpts['complete'] = complete;
                    }
                    var opts = Object.assign({}, options || {}, defOpts);
                    return window['wx'][func](opts);
                }
            }
            else {
                fail && fail();
                complete && complete();
            }
            return null;
        };
        return MiniUtils;
    }());
    //////////////////////////////////////////////////////////////
    ////// Export
    //////////////////////////////////////////////////////////////
    /**
     * 是否为小程序/小游戏
     */
    Tape.isMiniGame = function () {
        return window.hasOwnProperty("wx");
    };
    /**
     * 初始化，使用该方法替代Laya.MiniAdapter.init 和 Laya.init
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    Tape.init = function (width, height) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        Laya.MiniAdpter.init(true);
        Laya.init.apply(Laya, [width, height].concat(options));
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        if (Tape.Build.isDebug()) {
            Laya.Stat.show(0, 0);
        }
        MiniUtils.getMiniFunction('onShow')(function (res) {
            MiniState.__wx_main_show_data__ = res;
        });
        initOpenDataPage();
    };
    /**
     * 退出小程序
     * @param success 成功回调
     * @param fail 失败回调
     * @param complete 完成回调，失败成功都会回调
     */
    Tape.exit = function (success, fail, complete) {
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        if (complete === void 0) { complete = null; }
        MiniUtils.callMiniFunction('exitMiniProgram', {}, success, fail, complete);
    };
    //-------------------------------------------------------
    //-- LoginPage
    //-------------------------------------------------------
    /**
     * 注册监听设置返回
     */
    var registerSettingCallback = function (options, settingCallback, successCallback, failCallback) {
        var cancel = function () {
            failCallback && failCallback();
        };
        var open = function () {
            MiniUtils.callMiniFunction('openSetting', {}, function (res) {
                var authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    MiniUtils.debugLog('-------MiniSDK-------用户已授权【获取用户信息】');
                    registerUserCallback(successCallback, failCallback);
                }
                else if (authSetting['scope.userInfo'] === false) {
                    failCallback && failCallback();
                }
                else {
                    registerUserLoginBotton(options, settingCallback, successCallback, failCallback);
                }
            }, failCallback);
        };
        settingCallback && settingCallback({ open: open, cancel: cancel });
    };
    /**
     * 注册监听登录按钮
     */
    var registerUserLoginBotton = function (options, settingCallback, successCallback, failCallback) {
        var width = options.width || 200;
        var height = options.height || 40;
        var left = options.left || (Laya.stage.width / 2 - width / 2);
        var top = options.top || (Laya.stage.height / 2 - height / 2);
        var type = options.type || 'text';
        var text = options.text || '微信登录';
        var image = options.image || '';
        var backgroundColor = options.backgroundColor || '#348912';
        var textColor = options.textColor || '#ffffff';
        var textAlign = options.textAlign || 'center';
        var fontSize = options.fontSize || 16;
        var borderRadius = options.borderRadius || 4;
        var bgPage = options.bgPage || null;
        if (bgPage) {
            bgPage.on(Laya.Event.MOUSE_DOWN, null, function () {
            });
            var cancelButton = bgPage.getChildByName('cancel');
            if (cancelButton) {
                cancelButton.on(Laya.Event.CLICK, null, function () {
                    MiniLogin.hideLoginPage();
                    failCallback && failCallback();
                });
            }
            var exitButton = bgPage.getChildByName('exit');
            if (exitButton) {
                exitButton.on(Laya.Event.CLICK, null, function () {
                    Tape.exit();
                });
            }
        }
        MiniLogin.hideLoginPage();
        MiniUtils.callMiniFunction('login', {}, function (loginData) {
            MiniState.__wx_main_user_login_data__ = loginData;
            MiniUtils.callMiniFunction('getSystemInfo', {}, function (systemInfo) {
                var version = systemInfo.SDKVersion || '0.0.0';
                var windowWidth = systemInfo.windowWidth || Laya.stage.width;
                var windowHeight = systemInfo.windowHeight || Laya.stage.height;
                if (MiniUtils.compareVersion(version, '2.0.1') >= 0) {
                    var userLoginButton = MiniUtils.callMiniFunction('createUserInfoButton', {
                        type: type,
                        text: text,
                        image: image,
                        style: {
                            left: left * windowWidth / Laya.stage.width,
                            top: top * windowHeight / Laya.stage.height,
                            width: width * windowWidth / Laya.stage.width,
                            height: height * windowHeight / Laya.stage.height,
                            lineHeight: height * windowHeight / Laya.stage.height,
                            backgroundColor: backgroundColor,
                            color: textColor,
                            textAlign: textAlign,
                            fontSize: fontSize,
                            borderRadius: borderRadius
                        }
                    });
                    if (userLoginButton) {
                        userLoginButton['removeSelf'] = function () {
                            try {
                                userLoginButton.hide();
                                userLoginButton.destroy();
                            }
                            catch (error) {
                            }
                        };
                    }
                    userLoginButton.onTap(function (res) {
                        MiniLogin.hideLoginPage();
                        successCallback && successCallback(res);
                    });
                    userLoginButton.show();
                    if (bgPage) {
                        Laya.stage.addChild(bgPage);
                    }
                    MiniState.__wx_main_user_login_button__ = userLoginButton;
                    MiniState.__wx_main_user_login_bg_page__ = bgPage;
                }
                else {
                    MiniUtils.debugLog('-------MiniSDK-------对微信基础库小于【2.0.1】的版本兼容');
                    var userLoginButton = new Laya.Sprite();
                    userLoginButton.x = left;
                    userLoginButton.y = top;
                    userLoginButton.width = width;
                    userLoginButton.height = height;
                    if (type === 'image') {
                        var img = new Laya.Image();
                        img.width = width;
                        img.height = height;
                        img.skin = image;
                        userLoginButton.addChild(img);
                    }
                    else {
                        userLoginButton.graphics.drawRect(0, 0, width, height, backgroundColor);
                        var tx = new Laya.Text();
                        tx.color = textColor;
                        tx.text = text;
                        tx.fontSize = fontSize;
                        tx.align = textAlign;
                        tx.pos(userLoginButton.width / 2, userLoginButton.height / 2);
                        tx.pivot(tx.width / 2, tx.height / 2);
                        userLoginButton.addChild(tx);
                    }
                    userLoginButton.on(Laya.Event.CLICK, null, function () {
                        registerUserCallback(function (res) {
                            MiniLogin.hideLoginPage();
                            successCallback && successCallback(res);
                        }, function () {
                            registerSettingCallback(options, settingCallback, function (res) {
                                MiniLogin.hideLoginPage();
                                successCallback && successCallback(res);
                            }, failCallback);
                        });
                    });
                    userLoginButton.on(Laya.Event.MOUSE_MOVE, null, function () {
                        userLoginButton.alpha = 0.8;
                    });
                    userLoginButton.on(Laya.Event.MOUSE_UP, null, function () {
                        userLoginButton.alpha = 1;
                    });
                    userLoginButton.zOrder = 99999;
                    if (bgPage) {
                        Laya.stage.addChild(bgPage);
                    }
                    Laya.stage.addChild(userLoginButton);
                    MiniState.__wx_main_user_login_button__ = userLoginButton;
                    MiniState.__wx_main_user_login_bg_page__ = bgPage;
                }
            }, failCallback);
        }, failCallback);
    };
    /**
     * 注册监听获取用户信息返回
     */
    var registerUserCallback = function (userCallback, failCallback) {
        MiniUtils.callMiniFunction('getUserInfo', {}, function (res) {
            userCallback && userCallback(res);
        }, function () {
            failCallback && failCallback();
        });
    };
    var MiniLogin = /** @class */ (function () {
        function MiniLogin() {
        }
        /**
         * 显示登录界面
         * @param options 按钮位置信息bgPage,type,text,image,x,y,width,height
         * @param successCallback 获取用户信息成功回调
         * @param failCallback 失败回调
         * @param completeCallback 完成回调，失败成功都会回调
         */
        MiniLogin.showLoginPage = function (options, successCallback, failCallback, completeCallback) {
            if (failCallback === void 0) { failCallback = null; }
            if (completeCallback === void 0) { completeCallback = null; }
            if (MiniState.__wx_main_user_logging__) {
                MiniUtils.debugLog('-------MiniSDK-------正在操作中，请勿多次调用');
                return;
            }
            if (!options) {
                options = {};
            }
            var _success_callback_ = function (res) {
                MiniState.__wx_main_user_logging__ = false;
                res['loginData'] = MiniState.__wx_main_user_login_data__;
                res['showData'] = MiniState.__wx_main_show_data__;
                successCallback && successCallback(res);
                completeCallback && completeCallback();
            };
            var _fail_callback_ = function () {
                MiniState.__wx_main_user_logging__ = false;
                failCallback && failCallback();
                completeCallback && completeCallback();
            };
            var _setting_callback_ = function (setting) {
                MiniDisplay.showModal({
                    title: '登录提示',
                    content: '无法获取用户信息，需要到设置页面开启授权',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '去设置'
                }, function (res) {
                    if (res.confirm) {
                        setting.open();
                    }
                    else {
                        setting.cancel();
                    }
                });
            };
            MiniState.__wx_main_user_logging__ = true;
            MiniUtils.callMiniFunction('getSetting', {}, function (res) {
                var authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    MiniUtils.debugLog('-------MiniSDK-------用户已授权【获取用户信息】');
                    registerUserCallback(_success_callback_, _fail_callback_);
                }
                else if (authSetting['scope.userInfo'] === false) {
                    MiniUtils.debugLog('-------MiniSDK-------用户已拒绝授权【获取用户信息】');
                    registerSettingCallback(options, _setting_callback_, _success_callback_, _fail_callback_);
                }
                else {
                    MiniUtils.debugLog('-------MiniSDK-------用户未曾授权，显示授权按钮');
                    registerUserLoginBotton(options, _setting_callback_, _success_callback_, _fail_callback_);
                }
            }, _fail_callback_);
        };
        /**
         * 隐藏登录界面
         */
        MiniLogin.hideLoginPage = function () {
            MiniState.__wx_main_user_logging__ = false;
            if (MiniState.__wx_main_user_login_button__) {
                MiniState.__wx_main_user_login_button__.removeSelf();
                MiniState.__wx_main_user_login_button__ = null;
            }
            if (MiniState.__wx_main_user_login_bg_page__) {
                MiniState.__wx_main_user_login_bg_page__.removeSelf();
                MiniState.__wx_main_user_login_bg_page__ = null;
            }
        };
        return MiniLogin;
    }());
    Tape.MiniLogin = MiniLogin;
    //-------------------------------------------------------
    //-- GameClubButton
    //-------------------------------------------------------
    var MiniGameClub = /** @class */ (function () {
        function MiniGameClub() {
        }
        /**
         * 显示游戏圈按钮
         * @param options 按钮位置信息icon,top,left,width,height
         * @param onTap 点击回调
         */
        MiniGameClub.showGameClubButton = function (options, onTap) {
            if (onTap === void 0) { onTap = null; }
            if (!options) {
                options = {};
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, function (res) {
                var version = res.SDKVersion || '0.0.0';
                var windowWidth = res.windowWidth || Laya.stage.width;
                var windowHeight = res.windowHeight || Laya.stage.height;
                if (MiniUtils.compareVersion(version, '2.0.3') >= 0) {
                    MiniGameClub.hideGameClubButton();
                    MiniState.__wx_main_game_club_button__ = MiniUtils.callMiniFunction('createGameClubButton', {
                        icon: options['icon'] || 'green',
                        style: {
                            left: (options['left'] || 0) * windowWidth / Laya.stage.width,
                            top: (options['top'] || 0) * windowHeight / Laya.stage.height,
                            width: (options['width'] || 40) * windowWidth / Laya.stage.width,
                            height: (options['height'] || 40) * windowHeight / Laya.stage.height,
                        }
                    });
                    if (MiniState.__wx_main_game_club_button__) {
                        MiniState.__wx_main_game_club_button__['removeSelf'] = function () {
                            try {
                                MiniState.__wx_main_game_club_button__.hide();
                                MiniState.__wx_main_game_club_button__.destroy();
                            }
                            catch (error) {
                            }
                        };
                        MiniState.__wx_main_game_club_button__.onTap(function (res) {
                            onTap && onTap(res);
                        });
                        MiniState.__wx_main_game_club_button__.show();
                    }
                }
            });
        };
        /**
         * 隐藏游戏圈按钮
         */
        MiniGameClub.hideGameClubButton = function () {
            if (MiniState.__wx_main_game_club_button__) {
                MiniState.__wx_main_game_club_button__.removeSelf();
                MiniState.__wx_main_game_club_button__ = null;
            }
        };
        return MiniGameClub;
    }());
    Tape.MiniGameClub = MiniGameClub;
    //-------------------------------------------------------
    //-- OpenData
    //-------------------------------------------------------
    /**
     * 获取或创建开放数据域View
     */
    var getOrCreateOpenDataPage = function (bgPage) {
        if (bgPage === void 0) { bgPage = null; }
        if (MiniState.__wx_main_open_data_view__) {
            if (MiniState.__wx_main_open_data_bg_page__) {
                try {
                    MiniState.__wx_main_open_data_bg_page__.removeSelf();
                }
                catch (error) {
                }
            }
            MiniState.__wx_main_open_data_bg_page__ = bgPage;
            var view = MiniState.__wx_main_open_data_view__.getChildByName('__open_data_intercept_view__');
            if (view) {
                if (MiniState.__wx_main_open_data_bg_page__) {
                    var cancelButton = bgPage.getChildByName('cancel');
                    if (cancelButton) {
                        cancelButton.on(Laya.Event.CLICK, null, function () {
                            MiniOpenData.hideSharedCanvasView();
                        });
                    }
                    var exitButton = bgPage.getChildByName('exit');
                    if (exitButton) {
                        exitButton.on(Laya.Event.CLICK, null, function () {
                            Tape.exit();
                        });
                    }
                    view.addChild(MiniState.__wx_main_open_data_bg_page__);
                    view.visible = true;
                }
                else {
                    view.visible = false;
                }
            }
            return MiniState.__wx_main_open_data_view__;
        }
        MiniState.__wx_main_open_data_view__ = new Laya.Sprite();
        var interceptView = new Laya.Sprite();
        interceptView.x = 0;
        interceptView.y = 0;
        interceptView.pos(0, 0);
        interceptView.pivot(0, 0);
        interceptView.width = Laya.stage.width;
        interceptView.height = Laya.stage.height;
        interceptView.on(Laya.Event.MOUSE_DOWN, null, function () { });
        interceptView.name = '__open_data_intercept_view__';
        MiniState.__wx_main_open_data_view__.addChild(interceptView);
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            sharedCanvas.innerHTML = '';
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = function () { };
            }
            var image = new Laya.Image();
            image.x = 0;
            image.y = 0;
            image.pos(0, 0);
            image.pivot(0, 0);
            image.width = Laya.stage.width;
            image.height = Laya.stage.height;
            var texture = new Laya.Texture(sharedCanvas);
            image.source = texture;
            MiniState.__wx_main_open_data_view__.addChild(image);
        }
        return MiniState.__wx_main_open_data_view__;
    };
    /**
     * 发送消息到开放数据域
     */
    var postMessageToOpenDataContext = function (action, data) {
        if (data === void 0) { data = {}; }
        var openDataContext = MiniUtils.callMiniFunction('getOpenDataContext');
        openDataContext && openDataContext.postMessage({
            action: action, data: data
        });
    };
    /**
     * 初始化开放数据域
     */
    var initOpenDataPage = function () {
        postMessageToOpenDataContext('initOpenDataPage', {
            width: Laya.stage.width,
            height: Laya.stage.height,
            matrix: Laya.stage._canvasTransform
        });
        Laya.timer.once(400, null, function () {
            getOrCreateOpenDataPage();
        });
    };
    var MiniOpenData = /** @class */ (function () {
        function MiniOpenData() {
        }
        /**
         * 是否支持开放数据域Canvas
         */
        MiniOpenData.isSupportSharedCanvasView = function () {
            return window.hasOwnProperty('sharedCanvas');
        };
        /**
         * 显示开放数据域Canvas
         * @param bgPage 背景页面
         * @param data 传递给开放数据域的数据
         */
        MiniOpenData.showSharedCanvasView = function (bgPage, data) {
            if (data === void 0) { data = {}; }
            if (MiniOpenData.isSupportSharedCanvasView()) {
                postMessageToOpenDataContext('showOpenDataPage', data);
                var sharedStage = getOrCreateOpenDataPage(bgPage);
                Laya.stage.addChild(sharedStage);
            }
        };
        /**
         * 隐藏开放数据域Canvas
         */
        MiniOpenData.hideSharedCanvasView = function () {
            if (MiniOpenData.isSupportSharedCanvasView()) {
                postMessageToOpenDataContext('hideOpenDataPage', {});
                var sharedStage = getOrCreateOpenDataPage(null);
                sharedStage.removeSelf();
            }
        };
        /**
         * 将用户游戏数据托管到微信服务器
         */
        MiniOpenData.setUserCloudStorage = function (dataList) {
            postMessageToOpenDataContext('setUserCloudStorage', dataList);
        };
        /**
         * 删除用户托管数据当中对应 key 的数据。
         */
        MiniOpenData.removeUserCloudStorage = function (keyList) {
            postMessageToOpenDataContext('removeUserCloudStorage', keyList);
        };
        return MiniOpenData;
    }());
    Tape.MiniOpenData = MiniOpenData;
    //-------------------------------------------------------
    //-- modules
    //-------------------------------------------------------
    var MiniNavigator = /** @class */ (function () {
        function MiniNavigator() {
        }
        /**
         * 打开同一公众号下关联的另一个小程序。（注：必须是同一公众号下，而非同个 open 账号下）
         * @param appId 要打开的小程序 appId
         * @param path 打开的页面路径，如果为空则打开首页
         * @param extraData 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
         * @param envVersion 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniNavigator.navigateToMiniProgram = function (appId, path, extraData, envVersion, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('navigateToMiniProgram', { appId: appId, path: path, extraData: extraData, envVersion: envVersion }, success, fail, complete);
        };
        /**
         * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
         * @param extraData 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniNavigator.navigateBackMiniProgram = function (extraData, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('navigateBackMiniProgram', { extraData: extraData }, success, fail, complete);
        };
        return MiniNavigator;
    }());
    Tape.MiniNavigator = MiniNavigator;
    /**
     * Share 模块
     */
    var MiniShare = /** @class */ (function () {
        function MiniShare() {
        }
        /**
         * 显示转发菜单按钮
         * @param withShareTicket 是否使用带 shareTicket 的转发详情
         * @param onShareMessage 转发回调
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.showShareMenu = function (withShareTicket, onShareMessage, success, fail, complete) {
            if (onShareMessage === void 0) { onShareMessage = null; }
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.getMiniFunction('onShareAppMessage')(onShareMessage);
            MiniUtils.callMiniFunction('showShareMenu', { withShareTicket: withShareTicket }, success, fail, complete);
        };
        /**
         * 隐藏转发菜单按钮
         * @param withShareTicket 是否使用带 shareTicket 的转发详情
         * @param onShareMessage 转发回调
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.hideShareMenu = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('hideShareMenu', {}, success, fail, complete);
        };
        /**
         * 更新转发菜单按钮
         * @param withShareTicket 是否使用带 shareTicket 的转发详情
         * @param onShareMessage 转发回调
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.updateShareMenu = function (withShareTicket, onShareMessage, success, fail, complete) {
            if (withShareTicket === void 0) { withShareTicket = true; }
            if (onShareMessage === void 0) { onShareMessage = null; }
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.getMiniFunction('onShareAppMessage')(onShareMessage);
            MiniUtils.callMiniFunction('updateShareMenu', { withShareTicket: withShareTicket }, success, fail, complete);
        };
        /**
         * 主动转发
         * @param title 是否使用带 shareTicket 的转发详情
         * @param imageUrl 是否使用带 shareTicket 的转发详情
         * @param query 是否使用带 shareTicket 的转发详情
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.shareAppMessage = function (title, imageUrl, query, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('shareAppMessage', { title: title, imageUrl: imageUrl, query: query }, success, fail, complete);
        };
        /**
         * 获取转发详细信息
         * @param shareTicket shareTicket
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.getShareInfo = function (shareTicket, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('getShareInfo', { shareTicket: shareTicket }, success, fail, complete);
        };
        return MiniShare;
    }());
    Tape.MiniShare = MiniShare;
    /**
     * Ad 模块
     */
    var MiniAd = /** @class */ (function () {
        function MiniAd() {
        }
        /**
         * 显示激励型视频广告
         * @param adUnitId 广告单元ID
         * @param onRewarded 完成回调，发放奖励
         * @param onError 错误回调
         */
        MiniAd.showRewardedVideoAd = function (adUnitId, onRewarded, onError) {
            var _this = this;
            if (onRewarded === void 0) { onRewarded = null; }
            if (onError === void 0) { onError = null; }
            var videoAd = this.__show_ads__[adUnitId];
            if (videoAd) {
                videoAd.hide();
                videoAd.destroy();
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, function (res) {
                var version = res.SDKVersion || '0.0.0';
                if (MiniUtils.compareVersion(version, '2.0.4') >= 0) {
                    var videoAd_1 = MiniUtils.callMiniFunction('createRewardedVideoAd', { adUnitId: adUnitId });
                    _this.__show_ads__[adUnitId] = videoAd_1;
                    videoAd_1.show();
                    videoAd_1.onError(function () {
                        onRewarded && onRewarded();
                        _this.__show_ads__[adUnitId] = null;
                    });
                    videoAd_1.onError(function (errMsg) {
                        onError && onError();
                        _this.__show_ads__[adUnitId] = null;
                    });
                    videoAd_1.load().then(function () {
                        videoAd_1.show();
                    }).catch(function (errMsg) {
                        onError && onError(errMsg);
                        _this.__show_ads__[adUnitId] = null;
                    });
                }
            });
        };
        /**
         * 显示Banner广告
         * @param adUnitId 广告单元ID
         * @param options Banner位置信息top,left,width,height
         **/
        MiniAd.showBannerAd = function (adUnitId, options) {
            var _this = this;
            var ad = this.__show_ads__[adUnitId];
            if (ad) {
                ad.hide();
                ad.destroy();
                this.__show_ads__[adUnitId] = null;
            }
            if (!options) {
                options = {};
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, function (systemInfo) {
                var version = systemInfo.SDKVersion || '0.0.0';
                var windowWidth = systemInfo.windowWidth || Laya.stage.width;
                var windowHeight = systemInfo.windowHeight || Laya.stage.height;
                if (MiniUtils.compareVersion(version, '2.0.4') >= 0) {
                    var ad_1 = MiniUtils.callMiniFunction('createBannerAd', {
                        adUnitId: adUnitId,
                        style: {
                            left: (options['left'] || 0) * windowWidth / Laya.stage.width,
                            top: (options['top'] || 0) * windowHeight / Laya.stage.height,
                            width: (options['width'] || 300) * windowWidth / Laya.stage.width,
                            height: (options['height'] || 100) * windowHeight / Laya.stage.height,
                        }
                    });
                    _this.__show_ads__[adUnitId] = ad_1;
                    ad_1.show();
                }
            });
        };
        MiniAd.__show_ads__ = {};
        return MiniAd;
    }());
    Tape.MiniAd = MiniAd;
    /**
     * Display 模块
     */
    var MiniDisplay = /** @class */ (function () {
        function MiniDisplay() {
        }
        /**
         * 根据用户当天游戏时间判断用户是否需要休息
         * @param todayPlayedTime 今天已经玩游戏的时间，单位：秒
         * @param success 成功回调 result
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniDisplay.checkIsUserAdvisedToRest = function (todayPlayedTime, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('checkIsUserAdvisedToRest', { todayPlayedTime: todayPlayedTime }, success, fail, complete);
        };
        /**
         * 根据用户当天游戏时间判断用户是否需要休息
         * @param type wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
         * @param success 成功回调 result
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniDisplay.getLocation = function (type, success, fail, complete) {
            if (type === void 0) { type = 'wgs84'; }
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('getLocation', { type: type }, success, fail, complete);
        };
        /**
            * 使手机发生较短时间的振动（15 ms）
            * @param success 成功回调
            * @param fail 失败回调
            */
        MiniDisplay.vibrateShort = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('vibrateShort', {}, success, fail, complete);
        };
        /**
         * 使手机发生较长时间的振动（400 ms)
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.vibrateLong = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('vibrateLong', {}, success, fail, complete);
        };
        /**
         * 显示Loading
         * @param title 提示的内容
         * @param mask 是否显示透明蒙层
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.showLoading = function (title, mask, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('showLoading', { title: title, mask: mask }, success, fail, complete);
        };
        /**
         * 隐藏Loading
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.hideLoading = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('hideLoading', success, fail, complete);
        };
        /**
         * 弹出对话框
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.showModal = function (options, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('showModal', options || {}, success, fail, complete);
        };
        /**
         * 获取设备电量
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.getBatteryInfo = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('getBatteryInfo', {}, success, fail, complete);
        };
        /**
         * 设置系统剪贴板的内容
         * @param data 剪贴板的内容
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.setClipboardData = function (data, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('setClipboardData', { data: data }, success, fail, complete);
        };
        /**
         * 获取系统剪贴板的内容
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        MiniDisplay.getClipboardData = function (success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('getClipboardData', {}, success, fail, complete);
        };
        return MiniDisplay;
    }());
    Tape.MiniDisplay = MiniDisplay;
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
// tape navigator.js
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
            _this.routeActivity = null;
            _this.routeName = routeName;
            _this.routeKey = routeKey;
            if (res != null && res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(_this, function () {
                    var act = new activity(props);
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
                var act = new activity(props);
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
            this.routeActivity.onCreate();
        };
        NavigationLoader.prototype.nextProgress = function (progress) {
            this.routeActivity.onNextProgress(progress);
        };
        NavigationLoader.prototype.exit = function () {
            this.removeSelf();
            this.routeActivity.onDestroy();
        };
        NavigationLoader.prototype.show = function () {
            this.visible = true;
            this.routeActivity.onResume();
        };
        NavigationLoader.prototype.hide = function () {
            this.visible = false;
            this.routeActivity.onPause();
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
        NavigationStack.prototype.init_page = function () {
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
                var key = Tape.UUID.randUUID();
                new NavigationLoader(activity, name, key, {
                    navigation: this,
                    routeName: name,
                    routeKey: key,
                    params: paramsObject
                }, resArray_1, function (loader) {
                    _this.__loading__ = false;
                    _this.__navigator__.addChild(loader);
                    _this.putStack(loader);
                    action && action(true);
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
        NavigationStack.prototype.putStack = function (stack) {
            this.hideStack();
            this.__stacks__.push(stack);
            this.showStack();
        };
        NavigationStack.prototype.popStack = function (count) {
            if (this.lenStack() > 1 && count > 0) {
                this.hideStack();
                for (var i = 0; i < count; i++) {
                    if (this.lenStack() > 1) {
                        this.__stacks__.pop().exit();
                    }
                }
                this.showStack();
            }
        };
        NavigationStack.prototype.finishStack = function (name, key) {
            if (key === void 0) { key = null; }
            var len = this.lenStack();
            if (len > 1) {
                var targetIndexs = [];
                for (var i = 0; i < len; i++) {
                    var stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        var flag = true;
                        if (key) {
                            flag = stack.routeKey === key;
                        }
                        if (flag && targetIndexs.length < len - 1) {
                            targetIndexs.push(i);
                        }
                    }
                }
                if (targetIndexs.length > 0) {
                    var first = targetIndexs.pop();
                    var flag_1 = first === len - 1;
                    if (flag_1) {
                        this.hideStack();
                    }
                    var slice = this.__stacks__.splice(first, 1);
                    slice.forEach(function (stack) {
                        stack.exit();
                    });
                    while (targetIndexs.length > 0) {
                        first = targetIndexs.pop();
                        var slice_1 = this.__stacks__.splice(first, 1);
                        slice_1.forEach(function (stack) {
                            stack.exit();
                        });
                    }
                    if (flag_1) {
                        this.showStack();
                    }
                }
            }
        };
        NavigationStack.prototype.hideStack = function () {
            var len = this.lenStack();
            if (len > 0) {
                this.__stacks__[len - 1].hide();
            }
        };
        NavigationStack.prototype.showStack = function () {
            var len = this.lenStack();
            if (len > 0) {
                this.__stacks__[len - 1].show();
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
            _this.__navigator__.init_page();
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
                fileVersion: options['fileVersion'],
                uriPrefix: options['uriPrefix'],
                onLoaded: options['onLoaded'],
                onLoadProgress: options['onLoadProgress']
            }
        });
    };
})(Tape || (Tape = {}));

// =========================== //
// tape media.js
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
                if (Tape.MarketHandler.isConchApp()) {
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
// tape socket.js
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
        function WebSocket(debug) {
            if (debug === void 0) { debug = false; }
            this.__web_socket__ = null;
            this.__debug__ = true;
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReceived = null;
            this.__debug__ = debug;
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
            if (this.__debug__) {
                (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            }
            var _a;
        };
        return WebSocket;
    }());
    Tape.WebSocket = WebSocket;
})(Tape || (Tape = {}));

// =========================== //
// tape market.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * MarketHandler
     */
    var MarketHandler = /** @class */ (function () {
        function MarketHandler() {
        }
        MarketHandler.isConchApp = function () {
            return window.hasOwnProperty('conch');
        };
        MarketHandler.conchShowAlertOnJsException = function (show) {
            if (this.isConchApp() && window.hasOwnProperty("showAlertOnJsException")) {
                window["showAlertOnJsException"](show);
            }
        };
        MarketHandler.conchSetOnBackPressedFunction = function (onBackPressed) {
            if (this.isConchApp() && window["conch"].hasOwnProperty("setOnBackPressedFunction")) {
                window["conch"].setOnBackPressedFunction(function () {
                    onBackPressed && onBackPressed();
                });
            }
        };
        MarketHandler.conchExit = function () {
            if (this.isConchApp() && window["conch"].hasOwnProperty("exit")) {
                window["conch"].exit();
            }
        };
        MarketHandler.conchDeviceInfo = function () {
            if (this.isConchApp()) {
                try {
                    return JSON.parse(window["conch"].config.getDeviceInfo());
                }
                catch (error) {
                }
            }
            return {};
        };
        MarketHandler.onAuthorize = null;
        MarketHandler.onSendMessage = null;
        MarketHandler.onEnterShare = null;
        MarketHandler.onGetMarketName = null;
        MarketHandler.onGetUserInfo = null;
        MarketHandler.onGetFriends = null;
        MarketHandler.onLogin = null;
        MarketHandler.onLogout = null;
        MarketHandler.onRecharge = null;
        return MarketHandler;
    }());
    Tape.MarketHandler = MarketHandler;
    /**
     * Market
     */
    var Market = /** @class */ (function () {
        function Market() {
        }
        Market.getMarketName = function () {
            if (MarketHandler.isConchApp()) {
                return Laya.conchMarket.getMarketName();
            }
            else {
                return MarketHandler.onGetMarketName && MarketHandler.onGetMarketName();
            }
        };
        Market.authorize = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.authorize(jsonParam, callback);
            }
            else {
                MarketHandler.onAuthorize && MarketHandler.onAuthorize(jsonParam, callback);
            }
        };
        Market.login = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.login(jsonParam, callback);
            }
            else {
                MarketHandler.onLogin && MarketHandler.onLogin(jsonParam, callback);
            }
        };
        Market.logout = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.logout(jsonParam, callback);
            }
            else {
                MarketHandler.onLogout && MarketHandler.onLogout(jsonParam, callback);
            }
        };
        Market.recharge = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.recharge(jsonParam, callback);
            }
            else {
                MarketHandler.onRecharge && MarketHandler.onRecharge(jsonParam, callback);
            }
        };
        Market.sendMessage = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.sendMessageToPlatform(jsonParam, callback);
            }
            else {
                MarketHandler.onSendMessage && MarketHandler.onSendMessage(jsonParam, callback);
            }
        };
        Market.enterShare = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.enterShareAndFeed(jsonParam, callback);
            }
            else {
                MarketHandler.onEnterShare && MarketHandler.onEnterShare(jsonParam, callback);
            }
        };
        Market.getUserInfo = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.getUserInfo(jsonParam, callback);
            }
            else {
                MarketHandler.onGetUserInfo && MarketHandler.onGetUserInfo(jsonParam, callback);
            }
        };
        Market.getFriendList = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.getGameFriends(jsonParam, callback);
            }
            else {
                MarketHandler.onGetFriends && MarketHandler.onGetFriends(jsonParam, callback);
            }
        };
        return Market;
    }());
    Tape.Market = Market;
})(Tape || (Tape = {}));
