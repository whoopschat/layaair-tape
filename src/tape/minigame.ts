// =========================== //
// tape mini.js
// =========================== //
module Tape {

    /**
     * Mini状态类
     */
    class MiniState {
        public static sharedCanvasView = null;
        public static onHideGameClubButton = null;
        public static onHideUserInfoButton = null;
    }

    //////////////////////////////////////////////////////////////
    ////// Export
    //////////////////////////////////////////////////////////////

    /**
     * isMiniGame
     */
    export const isMiniGame = () => {
        return window.hasOwnProperty("wx");
    }

    /**
     * MiniHandler
     */
    export class MiniHandler {

        public static init(width: number, height: number, ...options) {
            Laya.MiniAdpter.init(true);
            Laya.init(width, height, ...options);
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
            Laya.timer.once(400, null, () => {
                if (MiniState.sharedCanvasView) {
                    return;
                }
                MiniState.sharedCanvasView = MiniUI.createSharedCanvasView();
            });
        }

        public static exit() {
            MiniFunc.exitMiniProgram();
        }

    }

    //-------------------------------------------------------
    //-- MiniUI
    //-------------------------------------------------------

    export class MiniUI {

        public static createSharedCanvasView() {
            var sharedCanvasView = new Laya.Sprite();
            if (window.hasOwnProperty('sharedCanvas')) {
                var sharedCanvas = window['sharedCanvas'];
                sharedCanvas.width = Laya.stage.width;
                sharedCanvas.height = Laya.stage.height;
                if (!sharedCanvas.hasOwnProperty('_addReference')) {
                    sharedCanvas['_addReference'] = () => {
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
        }

        public static showSharedCanvas() {
            if (MiniState.sharedCanvasView) {
                MiniOpenContext.postMessageToOpenDataContext({
                    data: {
                        action: "show"
                    }
                });
                Laya.stage.addChild(MiniState.sharedCanvasView);
            }
        }

        public static hideSharedCanvas() {
            if (MiniState.sharedCanvasView) {
                MiniOpenContext.postMessageToOpenDataContext({
                    data: {
                        action: "hide"
                    }
                });
                MiniState.sharedCanvasView.removeSelf();
            }
        }

        public static showUserInfoButton(options: Object) {
            if (!options) {
                options = {};
            }
            var showCustom = options['showCustom'];
            var hideCustom = options['hideCustom'];
            var onSuccess = (res) => {
                options['success'] && options['success'](res);
                options['complete'] && options['complete'](res);
            };
            var onFailed = (res) => {
                options['fail'] && options['fail'](res);
                options['complete'] && options['complete'](res);
            };
            MiniUI.hideUserInfoButton();
            MiniFunc.getSystemInfo({
                success: (systemInfo) => {
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
                        MiniState.onHideUserInfoButton = () => {
                            try {
                                userInfoButton.hide();
                                userInfoButton.destroy();
                            } catch (error) {
                            }
                        }
                        userInfoButton.onTap((res) => {
                            MiniFunc.getSetting({
                                success: (authRes) => {
                                    var authSetting = authRes.authSetting;
                                    if (authSetting['scope.userInfo'] === true) {
                                        onSuccess && onSuccess(res);
                                    } else {
                                        onFailed && onFailed({
                                            errMsg: "getUserInfo:fail auth deny"
                                        });
                                    }
                                }
                            });
                        });
                        userInfoButton.show();
                    } else {
                        MiniState.onHideUserInfoButton = () => {
                            hideCustom && hideCustom();
                        }
                        var getUserInfoFail = () => {
                            onFailed && onFailed({
                                errMsg: "getUserInfo:fail auth deny"
                            });
                        }
                        var getUserInfoSuccess = (res) => {
                            onSuccess && onSuccess(res);
                        }
                        var getUserInfo = () => {
                            MiniFunc.getUserInfo({
                                success: getUserInfoSuccess,
                                fail: getUserInfoFail
                            });
                        }
                        var tap = () => {
                            MiniFunc.getSetting({
                                success: (res) => {
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
                                            success: (res) => {
                                                var cancel = () => {
                                                    getUserInfoFail();
                                                }
                                                var open = () => {
                                                    MiniFunc.openSetting({
                                                        success: (res) => {
                                                            var authSetting = res.authSetting;
                                                            if (authSetting['scope.userInfo'] === true) {
                                                                getUserInfo();
                                                            } else {
                                                                getUserInfoFail();
                                                            }
                                                        }
                                                    });
                                                }
                                                if (res.confirm) {
                                                    open();
                                                } else {
                                                    cancel();
                                                }
                                            }
                                        });
                                    } else {
                                        getUserInfo();
                                    }
                                }
                            });
                        };
                        showCustom && showCustom(tap);
                    }
                }
            });
        }

        public static hideUserInfoButton() {
            MiniState.onHideUserInfoButton && MiniState.onHideUserInfoButton();
            MiniState.onHideUserInfoButton = null;
        }

        public static showGameClubButton(options: Object) {
            if (!options) {
                options = {};
            }
            MiniUI.hideGameClubButton();
            var onSuccess = (res) => {
                options['success'] && options['success'](res);
                options['complete'] && options['complete'](res);
            };
            var onFailed = (res) => {
                options['fail'] && options['fail'](res);
                options['complete'] && options['complete'](res);
            };
            MiniFunc.getSystemInfo({
                success: (systemInfo) => {
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
                        MiniState.onHideGameClubButton = () => {
                            try {
                                gameClubButton.hide();
                                gameClubButton.destroy();
                            } catch (error) {
                            }
                        }
                        gameClubButton.onTap((res) => {
                            onSuccess && onSuccess(res);
                        });
                        gameClubButton.show();
                    } else {
                        onFailed && onFailed({
                            errMsg: "showGameClubButton:fail"
                        });
                    }
                }
            });
        }

        public static hideGameClubButton() {
            MiniState.onHideGameClubButton && MiniState.onHideGameClubButton();
            MiniState.onHideGameClubButton = null;
        }
    }

    //-------------------------------------------------------
    //-- MiniVersion
    //-------------------------------------------------------

    export class MiniVersion {

        public static forceUpdate(options: Object) {
            if (!options) {
                options = {};
            }
            const updateManager = __wx__('getUpdateManager');
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
        }

    }

    //-------------------------------------------------------
    //-- MiniOpenContext
    //-------------------------------------------------------

    export class MiniOpenContext {

        public static postMessageToOpenDataContext = (options: Object) => {
            if (!options) {
                options = {};
            }
            let openDataContext = __wx__('getOpenDataContext');
            if (openDataContext) {
                openDataContext && openDataContext.postMessage(options['data'] || {});
                options['success'] && options['success']({
                    errMsg: 'postMessageToOpenDataContext:ok'
                });
            } else {
                options['fail'] && options['fail']({
                    errMsg: 'postMessageToOpenDataContext:fail getOpenDataContext is undefined'
                });
            }
        }

    }

    //-------------------------------------------------------
    //-- MiniFunc
    //-------------------------------------------------------

    const wxHandler = (func: string, ...options) => {
        if (options['fail'] && typeof options['fail'] === 'function') {
            options['fail']();
        }
        return "";
    }

    const logHandler = (message: any, ...options) => {
        if (Build.isDebug()) {
            console.log(message, ...options);
        }
    }

    const __wx__ = (func: string, ...options) => {
        if (window.hasOwnProperty("wx")) {
            if (window['wx'].hasOwnProperty(func)) {
                if (options['success'] && typeof options['success'] === 'function') {
                    var success = options['success'];
                }
                if (options['fail'] && typeof options['fail'] === 'function') {
                    var fail = options['fail'];
                }
                options['success'] = (res) => {
                    success && success(res);
                    logHandler(res);
                }
                options['fail'] = (res) => {
                    fail && fail(res);
                    logHandler(res);
                }
                return window['wx'][func](...options);
            }
        } else {
            return wxHandler(func, ...options);
        }
    }

    export class MiniFunc {

        public static exitMiniProgram = (options: Object = {}) => {
            return __wx__('exitMiniProgram', options);
        }

        public static login = (options: Object = {}) => {
            return __wx__('login', options);
        }

        public static authorize = (options: Object = {}) => {
            return __wx__('authorize', options);
        }

        public static createGameClubButton = (options: Object = {}) => {
            return __wx__('createGameClubButton', options);
        }

        public static createUserInfoButton = (options: Object = {}) => {
            return __wx__('createUserInfoButton', options);
        }

        public static getSystemInfo = (options: Object = {}) => {
            return __wx__('getSystemInfo', options);
        }

        public static openSetting = (options: Object = {}) => {
            return __wx__('openSetting', options);
        }

        public static getSetting = (options: Object = {}) => {
            return __wx__('getSetting', options);
        }

        public static getUserInfo = (options: Object = {}) => {
            return __wx__('getUserInfo', options);
        }

        public static onShareAppMessage = (options: Object = {}) => {
            return __wx__('onShareAppMessage', options);
        }

        public static offShareAppMessage = (options: Object = {}) => {
            return __wx__('offShareAppMessage', options);
        }

        public static showShareMenu(options: Object = {}) {
            return __wx__('showShareMenu', options);
        }

        public static hideShareMenu(options: Object = {}) {
            return __wx__('hideShareMenu', options);
        }

        public static updateShareMenu(options: Object = {}) {
            return __wx__('updateShareMenu', options);
        }

        public static shareAppMessage(options: Object = {}) {
            return __wx__('shareAppMessage', options);
        }

        public static getShareInfo(options: Object = {}) {
            return __wx__('getShareInfo', options);
        }

        public static openCustomerServiceConversation(options: Object = {}) {
            return __wx__('openCustomerServiceConversation', options);
        }

        public static checkIsUserAdvisedToRest(options: Object = {}) {
            return __wx__('checkIsUserAdvisedToRest', options);
        }

        public static vibrateShort(options: Object = {}) {
            return __wx__('vibrateShort', options);
        }

        public static vibrateLong(options: Object = {}) {
            return __wx__('vibrateLong', options);
        }

        public static showToast(options: Object = {}) {
            return __wx__('showToast', options);
        }

        public static hideToast(options: Object = {}) {
            return __wx__('hideToast', options);
        }

        public static showLoading(options: Object = {}) {
            return __wx__('showLoading', options);
        }

        public static hideLoading(options: Object = {}) {
            return __wx__('hideLoading', options);
        }

        public static showModal(options: Object = {}) {
            return __wx__('showModal', options);
        }

        public static showActionSheet = (options: Object = {}) => {
            return __wx__('showActionSheet', options);
        }

        public static getBatteryInfo(options: Object = {}) {
            return __wx__('getBatteryInfo', options);
        }

        public static setClipboardData(options: Object = {}) {
            return __wx__('setClipboardData', options);
        }

        public static getClipboardData(options: Object = {}) {
            return __wx__('getClipboardData', options);
        }

        public static getScreenBrightness = (options: Object = {}) => {
            return __wx__('getScreenBrightness', options);
        }

        public static setKeepScreenOn = (options: Object = {}) => {
            return __wx__('setKeepScreenOn', options);
        }

        public static setScreenBrightness = (options: Object = {}) => {
            return __wx__('setScreenBrightness', options);
        }

        public static triggerGC = (options: Object = {}) => {
            return __wx__('triggerGC', options);
        }

        public static setEnableDebug = (options: Object = {}) => {
            return __wx__('setEnableDebug', options);
        }

    }


}