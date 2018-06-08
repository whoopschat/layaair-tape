// =========================== //
// Tape mini.js
// =========================== //
module Tape {

    const mockHandler = (func: string, ...options) => {
        if (options['fail'] && typeof options['fail'] === 'function') {
            options['fail']();
        }
        return "";
    }

    /**
     * __WX__
     */
    export const __WX__ = (func: string, ...options) => {
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
                    Tape.Logger.debug("__WX__:success", res);
                }
                options['fail'] = (res) => {
                    fail && fail(res);
                    Tape.Logger.debug("__WX__:fail", res);
                }
                return window['wx'][func](...options);
            } else {
                return mockHandler(func, ...options);
            }
        } else {
            return mockHandler(func, ...options);
        }
    }

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
            Laya.timer.once(500, null, () => {
                if (window.hasOwnProperty('sharedCanvas')) {
                    var sharedCanvas = window['sharedCanvas'];
                    sharedCanvas.width = Laya.stage.width;
                    sharedCanvas.height = Laya.stage.height;
                }
            });
        }

        public static exit() {
            __WX__('exitMiniProgram');
        }

    }

    //-------------------------------------------------------
    //-- MiniUI
    //-------------------------------------------------------

    export class MiniUI {
        public static onHideGameClubButton = null;
        public static onHideUserInfoButton = null;

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
            __WX__('getSystemInfo', {
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
                    var userInfoButton = __WX__('createUserInfoButton', options);
                    if (userInfoButton) {
                        MiniUI.onHideUserInfoButton = () => {
                            try {
                                userInfoButton.hide();
                                userInfoButton.destroy();
                            } catch (error) {
                            }
                        }
                        userInfoButton.onTap((res) => {
                            __WX__('getSetting', {
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
                        MiniUI.onHideUserInfoButton = () => {
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
                            __WX__('getUserInfo', {
                                success: getUserInfoSuccess,
                                fail: getUserInfoFail
                            });
                        }
                        var tap = () => {
                            __WX__('getSetting', {
                                success: (res) => {
                                    var authSetting = res.authSetting;
                                    if (authSetting['scope.userInfo'] === false) {
                                        var settingGuideTitle = '登录提示';
                                        var settingGuideText = '获取用户信息失败，请到设置页面开启相关权限。';
                                        var settingGuideCancel = '取消';
                                        var settingGuideOpen = '去设置';
                                        __WX__('showModal', {
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
                                                    __WX__('openSetting', {
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
            MiniUI.onHideUserInfoButton && MiniUI.onHideUserInfoButton();
            MiniUI.onHideUserInfoButton = null;
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
            __WX__('getSystemInfo', {
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
                    var gameClubButton = __WX__('createGameClubButton', options);
                    if (gameClubButton) {
                        MiniUI.onHideGameClubButton = () => {
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
            MiniUI.onHideGameClubButton && MiniUI.onHideGameClubButton();
            MiniUI.onHideGameClubButton = null;
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
            const updateManager = __WX__('getUpdateManager');
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
            let openDataContext = __WX__('getOpenDataContext');
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

}