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
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
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

    /** MiniHandler */
    export module MiniHandler {

        export const init = (width: number, height: number, ...options) => {
            Laya.MiniAdpter.init(true);
            Laya.init(width, height, ...options);
            Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            if (window.hasOwnProperty('sharedCanvas')) {
                var sharedCanvas = window['sharedCanvas'];
                sharedCanvas.width = Laya.stage.width;
                sharedCanvas.height = Laya.stage.height;
            }
            __post_message_to_sub_context__({
                action: 'init',
                data: {
                    width: Laya.stage.width,
                    height: Laya.stage.height,
                    matrix: Laya.stage._canvasTransform
                }
            });
        }

        export const exit = () => {
            __exec_wx__('exitMiniProgram');
        }

    }


    /** MiniAd */
    export module MiniAd {

        const bannerStack = {};

        export const showBannerAd = (adUnitId: string, x: number, y: number, w: number, h: number) => {
            hideBannerAd(adUnitId);
            let systemInfo = __exec_wx__('getSystemInfoSync');
            if (systemInfo) {
                let windowWidth = systemInfo.windowWidth;
                let windowHeight = systemInfo.windowHeight;
                let stageWidth = Laya.stage.width;
                let stageHeight = Laya.stage.height;

                let left = x * windowWidth / stageWidth;
                let top = y * windowHeight / stageHeight;
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
                    bannerAd.show();
                    (<any>Object).assign(bannerStack, {
                        [adUnitId]: bannerAd
                    });
                }
            }
        }

        export const hideBannerAd = (adUnitId: string) => {
            if (bannerStack.hasOwnProperty(adUnitId)) {
                let bannerAd = bannerStack[adUnitId];
                bannerAd.destroy();
                delete bannerStack[adUnitId];
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
                data: (<any>Object).assign({
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

    }

}