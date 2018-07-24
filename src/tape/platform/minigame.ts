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
            Screen.init(width, height, options);
            __init_rank__();
        }

        export const exit = () => {
            __exec_wx__('exitMiniProgram');
        }

    }

    /** MiniAd */
    export module MiniAd {

        let __bannerStack__ = {};
        let __rewardedVideoAd__ = null;
        let __rewardedVideoCallback__ = null;

        export const showBannerAd = (adUnitId: string, x: number, y: number, w: number, h: number, onError: Function = null) => {
            hideBannerAd(adUnitId);
            let systemInfo = __exec_wx__('getSystemInfoSync');
            if (systemInfo) {
                let windowWidth = systemInfo.windowWidth;
                let windowHeight = systemInfo.windowHeight;
                let stageWidth = Laya.stage.width;
                let stageHeight = Laya.stage.height;

                let left = (x + Screen.getOffestX()) * windowWidth / stageWidth;
                let top = (y + Screen.getOffestY()) * windowHeight / stageHeight;
                let width = w * windowWidth / stageWidth;
                let height = h * windowHeight / stageHeight;

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
                    bannerAd.onResize(res => {
                        bannerAd.style.top = bannerAd.style.top + height - res.height
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
            } else {
                onError && onError({
                    errMsg: 'showBannerAd:fail',
                    err_code: -1
                });
            }
        }

        export const hideBannerAd = (adUnitId: string) => {
            if (__bannerStack__.hasOwnProperty(adUnitId)) {
                let bannerAd = __bannerStack__[adUnitId];
                bannerAd.destroy();
                delete __bannerStack__[adUnitId];
            }
        }

        export const showRewardedVideoAd = (adUnitId: string, onRewarded: Function, onCancal: Function, onError: Function = null) => {
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

        export const showRank = (uiView: Object | Object[], options: Object = {}, onlyRefreshData: boolean = false) => {
            __post_message_to_sub_context__({
                action: onlyRefreshData ? "refreshData" : "showUI",
                data: onlyRefreshData ? options : (<any>Object).assign({
                    ui: JSON.stringify(uiView || {}),
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