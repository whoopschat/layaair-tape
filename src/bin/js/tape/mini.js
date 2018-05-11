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
        MiniState.__wx_main_share_info__ = null;
        MiniState.__wx_main_on_show_data__ = null;
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
    var MiniHandler = /** @class */ (function () {
        function MiniHandler() {
        }
        /**
         * 初始化
         * @param width 宽度
         * @param height 高度
         * @param options 其他拓展
         */
        MiniHandler.init = function (width, height) {
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
            MiniUtils.getMiniFunction('onShareAppMessage')(function () {
                return MiniState.__wx_main_share_info__;
            });
            MiniUtils.getMiniFunction('onShow')(function (res) {
                MiniState.__wx_main_on_show_data__ = res;
            });
            initOpenDataPage();
        };
        /**
         * 退出小游戏
         */
        MiniHandler.exit = function () {
            MiniUtils.callMiniFunction('exitMiniProgram');
        };
        return MiniHandler;
    }());
    Tape.MiniHandler = MiniHandler;
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
        var text = options.text || '授权并登录';
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
                    }, function (res) {
                        registerSettingCallback(options, settingCallback, function (res) {
                            MiniLogin.hideLoginPage();
                            successCallback && successCallback(res);
                        }, function (res) {
                            failCallback && failCallback(res);
                        });
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
    };
    /**
     * 注册监听获取用户信息返回
     */
    var registerUserCallback = function (userCallback, failCallback) {
        MiniDisplay.showLoading("", true);
        MiniUtils.callMiniFunction('getUserInfo', {}, function (res) {
            userCallback && userCallback(res);
            MiniDisplay.hideLoading();
        }, function (res) {
            failCallback && failCallback(res);
            MiniDisplay.hideLoading();
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
                res['showData'] = MiniState.__wx_main_on_show_data__;
                successCallback && successCallback(res);
                completeCallback && completeCallback();
            };
            var _fail_callback_ = function (res) {
                MiniState.__wx_main_user_logging__ = false;
                res['loginData'] = MiniState.__wx_main_user_login_data__;
                res['showData'] = MiniState.__wx_main_on_show_data__;
                failCallback && failCallback(res);
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
            MiniUtils.callMiniFunction('login', {}, function (loginData) {
                MiniState.__wx_main_user_login_data__ = loginData;
                MiniUtils.callMiniFunction('getSetting', {}, function (res) {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === true) {
                        MiniUtils.debugLog('-------MiniSDK-------用户已授权【获取用户信息】');
                        registerUserCallback(_success_callback_, _fail_callback_);
                    }
                    else {
                        if (authSetting['scope.userInfo'] === false) {
                            MiniUtils.debugLog('-------MiniSDK-------用户已拒绝授权【获取用户信息】');
                        }
                        else {
                            MiniUtils.debugLog('-------MiniSDK-------用户未曾授权，显示授权按钮');
                        }
                        registerUserLoginBotton(options, _setting_callback_, _success_callback_, _fail_callback_);
                    }
                }, _fail_callback_);
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
                postMessageToOpenDataContext('showOpenDataPage', Object.assign(data, MiniState.__wx_main_on_show_data__));
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
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.showShareMenu = function (options, onShareMessage, success, fail, complete) {
            if (onShareMessage === void 0) { onShareMessage = null; }
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniState.__wx_main_share_info__ = options;
            MiniUtils.callMiniFunction('showShareMenu', { withShareTicket: true }, success, fail, complete);
        };
        /**
         * 隐藏转发菜单按钮
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
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.updateShareMenu = function (options, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniState.__wx_main_share_info__ = options;
            MiniUtils.callMiniFunction('updateShareMenu', { withShareTicket: true }, success, fail, complete);
        };
        /**
         * 主动转发
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        MiniShare.shareAppMessage = function (options, success, fail, complete) {
            if (success === void 0) { success = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            MiniUtils.callMiniFunction('shareAppMessage', options, success, fail, complete);
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
     * MiniAnalytics
     */
    var MiniAnalytics = /** @class */ (function () {
        function MiniAnalytics() {
        }
        MiniAnalytics.reportAnalytics = function (eventName, data) {
            MiniUtils.getMiniFunction('reportAnalytics')(eventName, data);
        };
        return MiniAnalytics;
    }());
    Tape.MiniAnalytics = MiniAnalytics;
    /**
     * MiniDisplay
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
         * @param options 分享的信息，title，content，showCancel, cancelText, confirmText
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
