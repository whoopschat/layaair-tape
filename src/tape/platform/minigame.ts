module Tape {

    let __rank_texture__ = null;

    /** __exec_wx__ */
    const __exec_wx__ = (func, ...options) => {
        if (window.hasOwnProperty("wx")) {
            if (window['wx'].hasOwnProperty(func)) {
                return window['wx'][func](...options);
            }
        }
    }

    /** __post_message_to_sub_context__ */
    const __post_message_to_sub_context__ = (data) => {
        let openDataContext = __exec_wx__('getOpenDataContext');
        openDataContext && openDataContext.postMessage(data || {});
    }

    /** __create_rank_texture__ */
    const __create_rank_texture__ = () => {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = 1500;
            sharedCanvas.height = 3000;
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = () => {
                };
            }
            if (!__rank_texture__) {
                __rank_texture__ = new Laya.Texture(sharedCanvas, null);
                __rank_texture__.bitmap.alwaysChange = true;
            }
        }
        return __rank_texture__;
    }

    const __init_rank__ = () => {
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
                debug: Env.isDev()
            }
        });
    }

    /** MiniHandler */
    export module MiniHandler {

        export const init = (width: number, height: number, ...options) => {
            Laya.MiniAdpter.init(true);
            Screen.init(width, height, ...options);
            __init_rank__();
        }

        export const exit = () => {
            __exec_wx__('exitMiniProgram');
        }

    }

    function fixWidth(width) {
        let systemInfo = __exec_wx__('getSystemInfoSync');
        if (systemInfo) {
            let windowWidth = systemInfo.windowWidth;
            let stageWidth = Laya.stage.width;
            return width * windowWidth / stageWidth;
        }
        return width;
    }

    function fixHeight(height) {
        let systemInfo = __exec_wx__('getSystemInfoSync');
        if (systemInfo) {
            let windowHeight = systemInfo.windowHeight;
            let stageHeight = Laya.stage.height;
            return height * windowHeight / stageHeight;
        }
        return height;
    }

    /** MiniAd */
    export module MiniAd {

        let __bannerStack__ = {};
        let __rewardedVideoAd__ = null;
        let __rewardedVideoCallback__ = null;

        export function showBannerAd(adUnitId: string, x: number, y: number, w: number, h: number, onError: Function = null) {
            hideBannerAd(adUnitId);
            let left = fixWidth(x + Screen.getOffestX());
            let top = fixHeight(y + Screen.getOffestY());
            let width = fixWidth(w);
            let height = fixHeight(h);
            let bannerAd = __exec_wx__('createBannerAd', {
                adUnitId,
                style: {
                    left,
                    top,
                    width,
                    height
                }
            });
            if (bannerAd) {
                (<any>Object).assign(__bannerStack__, {
                    [adUnitId]: bannerAd
                });
                bannerAd.style.left = left;
                bannerAd.style.top = top;
                bannerAd.style.width = width;
                bannerAd.style.height = height;
                bannerAd.onResize(res => {
                    let oSc = width / height;
                    let nSc = res.width / res.height;
                    let newL = left;
                    let newT = top;
                    let newW = width;
                    let newH = height;
                    if (oSc < nSc) {
                        newH = width / nSc;
                        newT = (height - newH) / 2;
                    } else {
                        newW = height * nSc;
                        newL = (width - newW) / 2;
                    }
                    bannerAd.style.left = newL;
                    bannerAd.style.top = newT;
                    bannerAd.style.width = newW;
                    bannerAd.style.height = newH;
                });
                bannerAd.onError(err => {
                    onError && onError(err);
                });
                bannerAd.show();
            } else {
                onError && onError({
                    errMsg: 'showBannerAd:fail',
                    err_code: -1
                });
            }
        }

        export function hideBannerAd(adUnitId: string) {
            if (__bannerStack__.hasOwnProperty(adUnitId)) {
                let bannerAd = __bannerStack__[adUnitId];
                bannerAd.destroy();
                delete __bannerStack__[adUnitId];
            }
        }

        export function showRewardedVideoAd(adUnitId: string, onRewarded: Function, onCancal: Function, onError: Function = null) {
            __rewardedVideoAd__ = __exec_wx__('createRewardedVideoAd', {
                adUnitId
            });
            if (__rewardedVideoAd__) {
                __rewardedVideoCallback__ && __rewardedVideoAd__.offClose(__rewardedVideoCallback__);
                __rewardedVideoCallback__ = (res) => {
                    if (res && res.isEnded || res === undefined) {
                        onRewarded && onRewarded();
                    } else {
                        onCancal && onCancal();
                    }
                };
                __rewardedVideoAd__.onClose(__rewardedVideoCallback__);
                __rewardedVideoAd__.show().catch(err => {
                    __rewardedVideoAd__.load().then(() => __rewardedVideoAd__.show()).catch(err => {
                        onError && onError(err);
                    });
                });
            } else {
                onError && onError({
                    errMsg: 'showRewardedVideoAd:fail',
                    err_code: -1
                });
            }
        }

    }

    /** MiniButton */
    export module MiniButton {

        let clubButton = null;
        let userButton = null;
        let feedbackButton = null;

        export function showFeedbackButton(image: string, x: number, y: number, w: number, h: number) {
            let left = fixWidth(x + Screen.getOffestX());
            let top = fixHeight(y + Screen.getOffestY());
            let width = fixWidth(w);
            let height = fixHeight(h);
            hideFeedbackButton();
            if (!feedbackButton) {
                feedbackButton = __exec_wx__('createFeedbackButton', {
                    type: 'image',
                    image,
                    style: {
                        left,
                        top,
                        width,
                        height
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
        }

        export function hideFeedbackButton() {
            if (feedbackButton) {
                try {
                    feedbackButton.style.left = -feedbackButton.style.width;
                    feedbackButton.style.top = -feedbackButton.style.height;
                    feedbackButton.hide();
                    feedbackButton.destroy();
                    feedbackButton = null;
                } catch (error) {
                }
            }
        }

        export function showGameClubButton(icon: string, x: number, y: number, w: number, h: number) {
            let left = fixWidth(x + Screen.getOffestX());
            let top = fixHeight(y + Screen.getOffestY());
            let width = fixWidth(w);
            let height = fixHeight(h);
            let icons = ['green', 'white', 'dark', 'light'];
            hideGameClubButton();
            if (!clubButton) {
                clubButton = __exec_wx__('createGameClubButton', {
                    icon: icons.indexOf(icon) < 0 ? icons[0] : icon,
                    style: {
                        left,
                        top,
                        width,
                        height
                    }
                });
                if (clubButton && icons.indexOf(icon) < 0) {
                    clubButton.image = icon;
                }
            }
            if (clubButton) {
                clubButton.style.left = left;
                clubButton.style.top = top;
                clubButton.style.width = width;
                clubButton.style.height = height;
                clubButton.show();
            }
        }

        export function hideGameClubButton() {
            if (clubButton) {
                try {
                    clubButton.style.left = -clubButton.style.width;
                    clubButton.style.top = -clubButton.style.height;
                    clubButton.hide();
                    clubButton.destroy();
                    clubButton = null;
                } catch (error) {
                }
            }
        }

        export function checkGetUserInfo(onSuccess, onFail) {
            __exec_wx__('getUserInfo', {
                withCredentials: true,
                success: onSuccess,
                fail: onFail
            });
        }

        export function showGetUserInfoButton(image: string, x: number, y: number, w: number, h: number, onSuccess: Function, onFail: Function) {
            let left = fixWidth(x + Screen.getOffestX());
            let top = fixHeight(y + Screen.getOffestY());
            let width = fixWidth(w);
            let height = fixHeight(h);
            hideGetUserInfoButton();
            if (!userButton) {
                userButton = __exec_wx__('createUserInfoButton', {
                    withCredentials: true,
                    type: 'image',
                    image,
                    style: {
                        left,
                        top,
                        width,
                        height
                    }
                });
            }
            if (userButton) {
                userButton.style.left = left;
                userButton.style.top = top;
                userButton.style.width = width;
                userButton.style.height = height;
                userButton.onTap((res) => {
                    if (res.errMsg.indexOf(':ok') >= 0) {
                        onSuccess && onSuccess(res);
                    } else {
                        onFail && onFail(res);
                    }
                });
                userButton.show();
            }
        }

        export function hideGetUserInfoButton() {
            if (userButton) {
                try {
                    userButton.style.left = -userButton.style.width;
                    userButton.style.top = -userButton.style.height;
                    userButton.hide();
                    userButton.destroy();
                    userButton = null;
                } catch (error) {
                }
            }
        }

    }

    /** MiniRank */
    export module MiniRank {

        export const createRankView = (x = 0, y = 0, width = Laya.stage.width, height = Laya.stage.height) => {
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
        }

        export const showRank = (ui: Object | Object[], options: Object = {}, onlyRefreshData: boolean = false) => {
            __post_message_to_sub_context__({
                action: onlyRefreshData ? "refreshData" : "showUI",
                data: onlyRefreshData ? options : (<any>Object).assign({
                    ui: JSON.stringify(ui || {}),
                }, options)
            });
        }

        export const hideRank = () => {
            __post_message_to_sub_context__({ action: 'hideUI' });
        }

        export const setRankData = (list: Object[]) => {
            __post_message_to_sub_context__({ action: 'setUserCloudStorage', data: { KVDataList: list } });
        }

        export const setDebug = (debug: boolean) => {
            __post_message_to_sub_context__({
                action: 'setDebug',
                data: { debug }
            });
        }

    }

}