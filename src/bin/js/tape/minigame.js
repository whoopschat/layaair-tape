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
        MiniState.sharedCanvasView = null;
        MiniState.onHideGameClubButton = null;
        MiniState.onHideUserInfoButton = null;
        return MiniState;
    }());
    //////////////////////////////////////////////////////////////
    ////// Export
    //////////////////////////////////////////////////////////////
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
            Laya.timer.once(400, null, function () {
                if (MiniState.sharedCanvasView) {
                    return;
                }
                MiniState.sharedCanvasView = MiniUI.createSharedCanvasView();
            });
        };
        MiniHandler.exit = function () {
            MiniFunc.exitMiniProgram();
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
                var rankSprite = new Laya.Sprite();
                rankSprite.width = Laya.stage.width;
                rankSprite.height = Laya.stage.height;
                rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
                sharedCanvasView.addChild(rankSprite);
            }
            return sharedCanvasView;
        };
        MiniUI.showSharedCanvas = function () {
            if (MiniState.sharedCanvasView) {
                MiniOpenContext.postMessageToOpenDataContext({
                    data: {
                        action: "show"
                    }
                });
                Laya.stage.addChild(MiniState.sharedCanvasView);
            }
        };
        MiniUI.hideSharedCanvas = function () {
            if (MiniState.sharedCanvasView) {
                MiniOpenContext.postMessageToOpenDataContext({
                    data: {
                        action: "hide"
                    }
                });
                MiniState.sharedCanvasView.removeSelf();
            }
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
            MiniFunc.getSystemInfo({
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
                    var userInfoButton = MiniFunc.createUserInfoButton(options);
                    if (userInfoButton) {
                        MiniState.onHideUserInfoButton = function () {
                            try {
                                userInfoButton.hide();
                                userInfoButton.destroy();
                            }
                            catch (error) {
                            }
                        };
                        userInfoButton.onTap(function (res) {
                            MiniFunc.getSetting({
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
                        MiniState.onHideUserInfoButton = function () {
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
                            MiniFunc.getUserInfo({
                                success: getUserInfoSuccess,
                                fail: getUserInfoFail
                            });
                        };
                        var tap = function () {
                            MiniFunc.getSetting({
                                success: function (res) {
                                    var authSetting = res.authSetting;
                                    if (authSetting['scope.userInfo'] === false) {
                                        var settingGuideTitle = '登录提示';
                                        var settingGuideText = '获取用户信息失败，请到设置页面开启相关权限。';
                                        var settingGuideCancel = '取消';
                                        var settingGuideOpen = '去设置';
                                        MiniFunc.showModal({
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
                                                    MiniFunc.openSetting({
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
            MiniState.onHideUserInfoButton && MiniState.onHideUserInfoButton();
            MiniState.onHideUserInfoButton = null;
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
            MiniFunc.getSystemInfo({
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
                    var gameClubButton = MiniFunc.createGameClubButton(options);
                    if (gameClubButton) {
                        MiniState.onHideGameClubButton = function () {
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
            MiniState.onHideGameClubButton && MiniState.onHideGameClubButton();
            MiniState.onHideGameClubButton = null;
        };
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
            var updateManager = __wx__('getUpdateManager');
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
        MiniOpenContext.postMessageToOpenDataContext = function (options) {
            if (!options) {
                options = {};
            }
            var openDataContext = __wx__('getOpenDataContext');
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
    //-------------------------------------------------------
    //-- MiniFunc
    //-------------------------------------------------------
    var wxHandler = function (func) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        if (options['fail'] && typeof options['fail'] === 'function') {
            options['fail']();
        }
        return "";
    };
    var logHandler = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        if (Tape.Build.isDebug()) {
            console.log.apply(console, [message].concat(options));
        }
    };
    var __wx__ = function (func) {
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
                    logHandler(res);
                };
                options['fail'] = function (res) {
                    fail && fail(res);
                    logHandler(res);
                };
                return (_a = window['wx'])[func].apply(_a, options);
            }
        }
        else {
            return wxHandler.apply(void 0, [func].concat(options));
        }
        var _a;
    };
    var MiniFunc = /** @class */ (function () {
        function MiniFunc() {
        }
        MiniFunc.showShareMenu = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('showShareMenu', options);
        };
        MiniFunc.hideShareMenu = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('hideShareMenu', options);
        };
        MiniFunc.updateShareMenu = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('updateShareMenu', options);
        };
        MiniFunc.shareAppMessage = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('shareAppMessage', options);
        };
        MiniFunc.getShareInfo = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getShareInfo', options);
        };
        MiniFunc.openCustomerServiceConversation = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('openCustomerServiceConversation', options);
        };
        MiniFunc.checkIsUserAdvisedToRest = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('checkIsUserAdvisedToRest', options);
        };
        MiniFunc.vibrateShort = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('vibrateShort', options);
        };
        MiniFunc.vibrateLong = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('vibrateLong', options);
        };
        MiniFunc.showToast = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('showToast', options);
        };
        MiniFunc.hideToast = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('hideToast', options);
        };
        MiniFunc.showLoading = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('showLoading', options);
        };
        MiniFunc.hideLoading = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('hideLoading', options);
        };
        MiniFunc.showModal = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('showModal', options);
        };
        MiniFunc.getBatteryInfo = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getBatteryInfo', options);
        };
        MiniFunc.setClipboardData = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('setClipboardData', options);
        };
        MiniFunc.getClipboardData = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getClipboardData', options);
        };
        MiniFunc.exitMiniProgram = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('exitMiniProgram', options);
        };
        MiniFunc.login = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('login', options);
        };
        MiniFunc.authorize = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('authorize', options);
        };
        MiniFunc.createGameClubButton = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('createGameClubButton', options);
        };
        MiniFunc.createUserInfoButton = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('createUserInfoButton', options);
        };
        MiniFunc.getSystemInfo = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getSystemInfo', options);
        };
        MiniFunc.openSetting = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('openSetting', options);
        };
        MiniFunc.getSetting = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getSetting', options);
        };
        MiniFunc.getUserInfo = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getUserInfo', options);
        };
        MiniFunc.onShareAppMessage = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('onShareAppMessage', options);
        };
        MiniFunc.offShareAppMessage = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('offShareAppMessage', options);
        };
        MiniFunc.showActionSheet = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('showActionSheet', options);
        };
        MiniFunc.getScreenBrightness = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('getScreenBrightness', options);
        };
        MiniFunc.setKeepScreenOn = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('setKeepScreenOn', options);
        };
        MiniFunc.setScreenBrightness = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('setScreenBrightness', options);
        };
        MiniFunc.triggerGC = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('triggerGC', options);
        };
        MiniFunc.setEnableDebug = function (options) {
            if (options === void 0) { options = {}; }
            return __wx__('setEnableDebug', options);
        };
        return MiniFunc;
    }());
    Tape.MiniFunc = MiniFunc;
})(Tape || (Tape = {}));
