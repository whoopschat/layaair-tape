// =========================== //
// tape mini.js
// =========================== //
module Tape {

    /**
     * Mini状态类
     */
    class MiniState {

        public static __wx_main_share_info__ = null;
        public static __wx_main_on_show_data__ = null;
        public static __wx_main_user_login_data__ = null;
        public static __wx_main_user_logging__ = false;
        public static __wx_main_user_login_button__ = null;
        public static __wx_main_user_login_bg_page__ = null;
        public static __wx_main_open_data_view__ = null;
        public static __wx_main_open_data_bg_page__ = null;
        public static __wx_main_game_club_button__ = null;

    }

    /**
     * Mini工具类
     */
    class MiniUtils {

        /**
         * 版本号比较
         */
        public static compareVersion(v1, v2) {
            v1 = v1.split('.')
            v2 = v2.split('.')
            var len = Math.max(v1.length, v2.length)
            while (v1.length < len) {
                v1.push('0')
            }
            while (v2.length < len) {
                v2.push('0')
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1[i])
                var num2 = parseInt(v2[i])
                if (num1 > num2) {
                    return 1
                } else if (num1 < num2) {
                    return -1
                }
            }
            return 0
        }

        /**
         * 获取wx模块的方法
         */
        public static getMiniFunction = (func: string) => {
            if (window.hasOwnProperty("wx")) {
                if (window['wx'].hasOwnProperty(func)) {
                    return window['wx'][func];
                } else {
                    return () => { }
                }
            } else {
                return () => { }
            }
        }

        /**
         * 执行wx模块的方法
         */
        public static callMiniFunction = (func: string, options = {}, success: Function = null, fail: Function = null, complete: Function = null) => {
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
                    var opts = (<any>Object).assign({}, options || {}, defOpts);
                    return window['wx'][func](opts);
                }
            } else {
                fail && fail();
                complete && complete();
            }
            return null;
        }

        /**
         * 打印日志
         */
        public static debugLog(message?: any, ...optionalParams: any[]): void {
            console.log(message, ...optionalParams);
        }

    }

    //////////////////////////////////////////////////////////////
    ////// Export
    //////////////////////////////////////////////////////////////

    /**
     * 是否为小程序/小游戏
     */
    export const isMiniGame = () => {
        return window.hasOwnProperty("wx");
    }

    export class MiniHandler {

        /**
         * 初始化
         * @param width 宽度
         * @param height 高度
         * @param options 其他拓展
         */
        public static init = (width: number, height: number, ...options) => {
            Laya.MiniAdpter.init(true);
            Laya.init(width, height, ...options);
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            if (Tape.Build.isDebug()) {
                Laya.Stat.show(0, 0);
            }
            MiniUtils.getMiniFunction('onShareAppMessage')(() => {
                return MiniState.__wx_main_share_info__;
            });
            MiniUtils.getMiniFunction('onShow')((res) => {
                MiniState.__wx_main_on_show_data__ = res;
            });
            initOpenDataPage();
        }

        /**
         * 退出小游戏
         */
        public static exit = () => {
            MiniUtils.callMiniFunction('exitMiniProgram');
        }

    }

    //-------------------------------------------------------
    //-- LoginPage
    //-------------------------------------------------------

    /**
     * 注册监听设置返回
     */
    const registerSettingCallback = (options, settingCallback: Function, successCallback: Function, failCallback: Function) => {
        var cancel = () => {
            failCallback && failCallback();
        }
        var open = () => {
            MiniUtils.callMiniFunction('openSetting', {}, (res) => {
                var authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    MiniUtils.debugLog('-------MiniSDK-------用户已授权【获取用户信息】');
                    registerUserCallback(successCallback, failCallback);
                } else if (authSetting['scope.userInfo'] === false) {
                    failCallback && failCallback();
                } else {
                    registerUserLoginBotton(options, settingCallback, successCallback, failCallback);
                }
            }, failCallback)
        }
        settingCallback && settingCallback({ open, cancel });
    }

    /**
     * 注册监听登录按钮
     */
    const registerUserLoginBotton = (options, settingCallback: Function, successCallback: Function, failCallback: Function) => {
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
            bgPage.on(Laya.Event.MOUSE_DOWN, null, () => {
            });
            var cancelButton = bgPage.getChildByName('cancel');
            if (cancelButton) {
                cancelButton.on(Laya.Event.CLICK, null, () => {
                    MiniLogin.hideLoginPage();
                    failCallback && failCallback();
                });
            }
            var exitButton = bgPage.getChildByName('exit');
            if (exitButton) {
                exitButton.on(Laya.Event.CLICK, null, () => {
                    exit();
                });
            }
        }
        MiniLogin.hideLoginPage();
        MiniUtils.callMiniFunction('getSystemInfo', {}, (systemInfo) => {
            var version = systemInfo.SDKVersion || '0.0.0';
            var windowWidth = systemInfo.windowWidth || Laya.stage.width;
            var windowHeight = systemInfo.windowHeight || Laya.stage.height;
            if (MiniUtils.compareVersion(version, '2.0.1') >= 0) {
                var userLoginButton: any = MiniUtils.callMiniFunction('createUserInfoButton', {
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
                    userLoginButton['removeSelf'] = () => {
                        try {
                            userLoginButton.hide();
                            userLoginButton.destroy();
                        } catch (error) {
                        }
                    }
                }
                userLoginButton.onTap((res) => {
                    MiniLogin.hideLoginPage();
                    successCallback && successCallback(res);
                });
                userLoginButton.show();
                if (bgPage) {
                    Laya.stage.addChild(bgPage);
                }
                MiniState.__wx_main_user_login_button__ = userLoginButton;
                MiniState.__wx_main_user_login_bg_page__ = bgPage;
            } else {
                MiniUtils.debugLog('-------MiniSDK-------对微信基础库小于【2.0.1】的版本兼容');
                var userLoginButton: any = new Laya.Sprite();
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
                } else {
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
                userLoginButton.on(Laya.Event.CLICK, null, () => {
                    registerUserCallback((res) => {
                        MiniLogin.hideLoginPage();
                        successCallback && successCallback(res);
                    }, (res) => {
                        registerSettingCallback(options, settingCallback, (res) => {
                            MiniLogin.hideLoginPage();
                            successCallback && successCallback(res);
                        }, (res) => {
                            failCallback && failCallback(res);
                        });
                    });
                });
                userLoginButton.on(Laya.Event.MOUSE_MOVE, null, () => {
                    userLoginButton.alpha = 0.8;
                });
                userLoginButton.on(Laya.Event.MOUSE_UP, null, () => {
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
    }

    /**
     * 注册监听获取用户信息返回
     */
    const registerUserCallback = (userCallback: Function, failCallback: Function) => {
        MiniDisplay.showLoading("", true);
        MiniUtils.callMiniFunction('getUserInfo', {}, (res) => {
            userCallback && userCallback(res);
            MiniDisplay.hideLoading();
        }, (res) => {
            failCallback && failCallback(res);
            MiniDisplay.hideLoading();
        });
    }

    export class MiniLogin {

        /**
         * 显示登录界面
         * @param options 按钮位置信息bgPage,type,text,image,x,y,width,height
         * @param successCallback 获取用户信息成功回调
         * @param failCallback 失败回调
         * @param completeCallback 完成回调，失败成功都会回调
         */
        public static showLoginPage = (options, successCallback: Function, failCallback: Function = null, completeCallback: Function = null) => {
            if (MiniState.__wx_main_user_logging__) {
                MiniUtils.debugLog('-------MiniSDK-------正在操作中，请勿多次调用');
                return;
            }
            if (!options) {
                options = {};
            }
            var _success_callback_ = (res) => {
                MiniState.__wx_main_user_logging__ = false;
                res['loginData'] = MiniState.__wx_main_user_login_data__;
                res['showData'] = MiniState.__wx_main_on_show_data__;
                successCallback && successCallback(res);
                completeCallback && completeCallback();
            }
            var _fail_callback_ = (res) => {
                MiniState.__wx_main_user_logging__ = false;
                res['loginData'] = MiniState.__wx_main_user_login_data__;
                res['showData'] = MiniState.__wx_main_on_show_data__;
                failCallback && failCallback(res);
                completeCallback && completeCallback();
            }
            var _setting_callback_ = (setting) => {
                MiniDisplay.showModal({
                    title: '登录提示',
                    content: '无法获取用户信息，需要到设置页面开启授权',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '去设置'
                }, (res) => {
                    if (res.confirm) {
                        setting.open();
                    } else {
                        setting.cancel();
                    }
                });
            }
            MiniState.__wx_main_user_logging__ = true;
            MiniUtils.callMiniFunction('login', {}, (loginData) => {
                MiniState.__wx_main_user_login_data__ = loginData;
                MiniUtils.callMiniFunction('getSetting', {}, (res) => {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === true) {
                        MiniUtils.debugLog('-------MiniSDK-------用户已授权【获取用户信息】');
                        registerUserCallback(_success_callback_, _fail_callback_);
                    } else {
                        if (authSetting['scope.userInfo'] === false) {
                            MiniUtils.debugLog('-------MiniSDK-------用户已拒绝授权【获取用户信息】');
                        } else {
                            MiniUtils.debugLog('-------MiniSDK-------用户未曾授权，显示授权按钮');
                        }
                        registerUserLoginBotton(options, _setting_callback_, _success_callback_, _fail_callback_);
                    }
                }, _fail_callback_);
            }, _fail_callback_);
        }

        /**
         * 隐藏登录界面
         */
        public static hideLoginPage = () => {
            MiniState.__wx_main_user_logging__ = false;
            if (MiniState.__wx_main_user_login_button__) {
                MiniState.__wx_main_user_login_button__.removeSelf();
                MiniState.__wx_main_user_login_button__ = null;
            }
            if (MiniState.__wx_main_user_login_bg_page__) {
                MiniState.__wx_main_user_login_bg_page__.removeSelf();
                MiniState.__wx_main_user_login_bg_page__ = null;
            }
        }

    }

    //-------------------------------------------------------
    //-- GameClubButton
    //-------------------------------------------------------

    export class MiniGameClub {

        /**
         * 显示游戏圈按钮
         * @param options 按钮位置信息icon,top,left,width,height
         * @param onTap 点击回调
         */
        public static showGameClubButton = (options, onTap: Function = null) => {
            if (!options) {
                options = {};
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, (res) => {
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
                        MiniState.__wx_main_game_club_button__['removeSelf'] = () => {
                            try {
                                MiniState.__wx_main_game_club_button__.hide();
                                MiniState.__wx_main_game_club_button__.destroy();
                            } catch (error) {
                            }
                        }
                        MiniState.__wx_main_game_club_button__.onTap((res) => {
                            onTap && onTap(res);
                        });
                        MiniState.__wx_main_game_club_button__.show();
                    }
                }
            });
        }

        /**
         * 隐藏游戏圈按钮
         */
        public static hideGameClubButton = () => {
            if (MiniState.__wx_main_game_club_button__) {
                MiniState.__wx_main_game_club_button__.removeSelf();
                MiniState.__wx_main_game_club_button__ = null;
            }
        }

    }

    //-------------------------------------------------------
    //-- OpenData
    //-------------------------------------------------------

    /**
     * 获取或创建开放数据域View
     */
    const getOrCreateOpenDataPage = (bgPage = null) => {
        if (MiniState.__wx_main_open_data_view__) {
            if (MiniState.__wx_main_open_data_bg_page__) {
                try {
                    MiniState.__wx_main_open_data_bg_page__.removeSelf();
                } catch (error) {
                }
            }
            MiniState.__wx_main_open_data_bg_page__ = bgPage;
            var view = MiniState.__wx_main_open_data_view__.getChildByName('__open_data_intercept_view__');
            if (view) {
                if (MiniState.__wx_main_open_data_bg_page__) {
                    var cancelButton = bgPage.getChildByName('cancel');
                    if (cancelButton) {
                        cancelButton.on(Laya.Event.CLICK, null, () => {
                            MiniOpenData.hideSharedCanvasView();
                        });
                    }
                    var exitButton = bgPage.getChildByName('exit');
                    if (exitButton) {
                        exitButton.on(Laya.Event.CLICK, null, () => {
                            exit();
                        });
                    }
                    view.addChild(MiniState.__wx_main_open_data_bg_page__);
                    view.visible = true;
                } else {
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
        interceptView.on(Laya.Event.MOUSE_DOWN, null, () => { });
        interceptView.name = '__open_data_intercept_view__';
        MiniState.__wx_main_open_data_view__.addChild(interceptView);
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            sharedCanvas.innerHTML = '';
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = () => { };
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
    }

    /**
     * 发送消息到开放数据域
     */
    const postMessageToOpenDataContext = (action, data = {}) => {
        let openDataContext = MiniUtils.callMiniFunction('getOpenDataContext');
        openDataContext && openDataContext.postMessage({
            action, data
        });
    }

    /**
     * 初始化开放数据域
     */
    const initOpenDataPage = () => {
        postMessageToOpenDataContext('initOpenDataPage', {
            width: Laya.stage.width,
            height: Laya.stage.height,
            matrix: Laya.stage._canvasTransform
        });
        Laya.timer.once(400, null, () => {
            getOrCreateOpenDataPage();
        });
    }

    export class MiniOpenData {

        /**
         * 是否支持开放数据域Canvas
         */
        public static isSupportSharedCanvasView = () => {
            return window.hasOwnProperty('sharedCanvas');
        }

        /**
         * 显示开放数据域Canvas
         * @param bgPage 背景页面
         * @param data 传递给开放数据域的数据
         */
        public static showSharedCanvasView = (bgPage, data = {}) => {
            if (MiniOpenData.isSupportSharedCanvasView()) {
                postMessageToOpenDataContext('showOpenDataPage', (<any>Object).assign(data, MiniState.__wx_main_on_show_data__));
                var sharedStage = getOrCreateOpenDataPage(bgPage);
                Laya.stage.addChild(sharedStage);
            }
        }

        /**
         * 隐藏开放数据域Canvas
         */
        public static hideSharedCanvasView = () => {
            if (MiniOpenData.isSupportSharedCanvasView()) {
                postMessageToOpenDataContext('hideOpenDataPage', {});
                var sharedStage = getOrCreateOpenDataPage(null);
                sharedStage.removeSelf();
            }
        }

        /**
         * 将用户游戏数据托管到微信服务器
         */
        public static setUserCloudStorage = (dataList) => {
            postMessageToOpenDataContext('setUserCloudStorage', dataList);
        }

        /**
         * 删除用户托管数据当中对应 key 的数据。
         */
        public static removeUserCloudStorage = (keyList) => {
            postMessageToOpenDataContext('removeUserCloudStorage', keyList);
        }

    }

    //-------------------------------------------------------
    //-- modules
    //-------------------------------------------------------

    export class MiniNavigator {

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
        public static navigateToMiniProgram = (appId: string, path: string, extraData: Object, envVersion: string, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('navigateToMiniProgram', { appId, path, extraData, envVersion }, success, fail, complete);
        }

        /**
         * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
         * @param extraData 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static navigateBackMiniProgram = (extraData: Object, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('navigateBackMiniProgram', { extraData }, success, fail, complete);
        }

    }

    /**
     * Share 模块
     */
    export class MiniShare {

        /**
         * 显示转发菜单按钮
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static showShareMenu = (options: Object, onShareMessage: Function = null, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniState.__wx_main_share_info__ = options;
            MiniUtils.callMiniFunction('showShareMenu', { withShareTicket: true }, success, fail, complete);
        }

        /**
         * 隐藏转发菜单按钮
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static hideShareMenu = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('hideShareMenu', {}, success, fail, complete);
        }

        /**
         * 更新转发菜单按钮
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static updateShareMenu = (options: Object, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniState.__wx_main_share_info__ = options;
            MiniUtils.callMiniFunction('updateShareMenu', { withShareTicket: true }, success, fail, complete);
        }

        /**
         * 主动转发
         * @param options 分享的信息，title，imageUrl，query
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static shareAppMessage = (options: Object, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('shareAppMessage', options, success, fail, complete);
        }

        /**
         * 获取转发详细信息
         * @param shareTicket shareTicket
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static getShareInfo = (shareTicket: string, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('getShareInfo', { shareTicket }, success, fail, complete);
        }

    }

    /**
     * Ad 模块
     */
    export class MiniAd {

        private static __show_ads__ = {};

        /**
         * 显示激励型视频广告
         * @param adUnitId 广告单元ID
         * @param onRewarded 完成回调，发放奖励
         * @param onError 错误回调
         */
        public static showRewardedVideoAd(adUnitId: string, onRewarded: Function = null, onError: Function = null) {
            var videoAd = this.__show_ads__[adUnitId];
            if (videoAd) {
                videoAd.hide();
                videoAd.destroy();
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, (res) => {
                var version = res.SDKVersion || '0.0.0';
                if (MiniUtils.compareVersion(version, '2.0.4') >= 0) {
                    let videoAd = MiniUtils.callMiniFunction('createRewardedVideoAd', { adUnitId });
                    this.__show_ads__[adUnitId] = videoAd;
                    videoAd.show();
                    videoAd.onError(() => {
                        onRewarded && onRewarded();
                        this.__show_ads__[adUnitId] = null;
                    });
                    videoAd.onError((errMsg) => {
                        onError && onError();
                        this.__show_ads__[adUnitId] = null;
                    });
                    videoAd.load().then(() => {
                        videoAd.show();
                    }).catch(errMsg => {
                        onError && onError(errMsg);
                        this.__show_ads__[adUnitId] = null;
                    });
                }
            });
        }

        /**
         * 显示Banner广告
         * @param adUnitId 广告单元ID
         * @param options Banner位置信息top,left,width,height
         **/
        public static showBannerAd(adUnitId: string, options: Object) {
            var ad = this.__show_ads__[adUnitId];
            if (ad) {
                ad.hide();
                ad.destroy();
                this.__show_ads__[adUnitId] = null;
            }
            if (!options) {
                options = {};
            }
            MiniUtils.callMiniFunction('getSystemInfo', {}, (systemInfo) => {
                var version = systemInfo.SDKVersion || '0.0.0';
                var windowWidth = systemInfo.windowWidth || Laya.stage.width;
                var windowHeight = systemInfo.windowHeight || Laya.stage.height;
                if (MiniUtils.compareVersion(version, '2.0.4') >= 0) {
                    let ad = MiniUtils.callMiniFunction('createBannerAd', {
                        adUnitId,
                        style: {
                            left: (options['left'] || 0) * windowWidth / Laya.stage.width,
                            top: (options['top'] || 0) * windowHeight / Laya.stage.height,
                            width: (options['width'] || 300) * windowWidth / Laya.stage.width,
                            height: (options['height'] || 100) * windowHeight / Laya.stage.height,
                        }
                    });
                    this.__show_ads__[adUnitId] = ad;
                    ad.show();
                }
            });
        }
    }

    /**
     * MiniAnalytics
     */
    export class MiniAnalytics {

        public static reportAnalytics = (eventName: string, data: Object) => {
            MiniUtils.getMiniFunction('reportAnalytics')(eventName, data);
        }

    }

    /**
     * MiniDisplay
     */
    export class MiniDisplay {

        /**
         * 根据用户当天游戏时间判断用户是否需要休息
         * @param todayPlayedTime 今天已经玩游戏的时间，单位：秒
         * @param success 成功回调 result
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static checkIsUserAdvisedToRest = (todayPlayedTime, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('checkIsUserAdvisedToRest', { todayPlayedTime }, success, fail, complete);
        }

        /**
         * 根据用户当天游戏时间判断用户是否需要休息
         * @param type wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标	
         * @param success 成功回调 result
         * @param fail 失败回调
         * @param complete 完成回调，失败成功都会回调
         */
        public static getLocation = (type = 'wgs84', success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('getLocation', { type }, success, fail, complete);
        }

        /**
            * 使手机发生较短时间的振动（15 ms）
            * @param success 成功回调
            * @param fail 失败回调
            */
        public static vibrateShort = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('vibrateShort', {}, success, fail, complete);
        }

        /**
         * 使手机发生较长时间的振动（400 ms)
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static vibrateLong = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('vibrateLong', {}, success, fail, complete);
        }

        /**
         * 显示Loading
         * @param title 提示的内容
         * @param mask 是否显示透明蒙层
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static showLoading = (title: string, mask: boolean, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('showLoading', { title, mask }, success, fail, complete);
        }

        /**
         * 隐藏Loading
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static hideLoading = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('hideLoading', success, fail, complete);
        }

        /**
         * 弹出对话框
         * @param options 分享的信息，title，content，showCancel, cancelText, confirmText
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static showModal = (options, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('showModal', options || {}, success, fail, complete);
        }

        /**
         * 获取设备电量
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static getBatteryInfo = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('getBatteryInfo', {}, success, fail, complete);
        }

        /**
         * 设置系统剪贴板的内容
         * @param data 剪贴板的内容
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static setClipboardData = (data: string, success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('setClipboardData', { data }, success, fail, complete);
        }

        /**
         * 获取系统剪贴板的内容
         * @param success 成功回调
         * @param fail 失败回调
         * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        public static getClipboardData = (success: Function = null, fail: Function = null, complete: Function = null) => {
            MiniUtils.callMiniFunction('getClipboardData', {}, success, fail, complete);
        }
    }


}