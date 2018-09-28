declare module runtime {

    let clickSound: string;
    let scaleTime: number;
    let scaleSmalValue: number;
    let scaleBigValue: number;

    function bindClick(view): void;

    class btn extends Laya.Button {
        public sound: string;
    }

    class btn_img extends Laya.Image {
        public sound: string;
    }

    class btn_label extends Laya.Label {
        public sound: string;
    }

    class btn_sprite extends Laya.Sprite {
        public sound: string;
    }

    class btn_box extends Laya.Box {
        public sound: string;
    }

}

declare module Tape {

    /** obj */
    type obj = {
        [key: string]: any
    }

    /** startOptions */
    interface startPayload {
        mainPage: any;
        commonRes?: { url: string, type: string }[];
        fileVersion?: string;
        onLoadProgress?: (progress: number) => void;
        onLoaded?: () => void;
    }

    /** shareOptions */
    interface sharePayload {
        image: string,
        text: string,
        data?: obj
    }

    /** userinfoPayload */
    interface userinfoPayload {
        platform: string,
        playerId: string,
        nickname: string,
        avatarUrl: string,
        gender: number,
        country: string,
        city: string,
        province: string,
        raw: obj
    }

    /** init for 2D */
    function init(width: number, height: number, ...options): void;
    /** init for 3D */
    function init3D(width: number, height: number, ...options): void;
    /** start */
    function start(options: startPayload): void;
    /** exit */
    function exit(): void;

    /** bg */
    module bg {
        /** getBgSprite */
        function getBgSprite(): Laya.Sprite;
        /** setBgColor */
        function setBgColor(color: string): void;
        /** getBgColor */
        function getBgColor(): string;
    }

    /** screen */
    module screen {
        /** getOffestX */
        function getOffestX(): number;
        /** getOffestY */
        function getOffestY(): number;
        /** getDesignWidth */
        function getDesignWidth(): number;
        /** getDesignHeight */
        function getDesignHeight(): number;
    }

    /** platform */
    module platform {
        /** getVersion */
        function getAppVersion(): string;
        /** getVersion */
        function getVersion(): string;
        /** isConchApp */
        function isConchApp(): boolean;
        /** execConch */
        function execConch(func, ...options): any;
        /** isFacebookApp */
        function isFacebookApp(): boolean;
        /** execFB */
        function execFB(func, ...options): any;
        /** isWechatApp */
        function isWechatApp(): boolean;
        /** execWX */
        function execWX(func, ...options): any;
        /** setDebug */
        function setDebug(debug: boolean): void;
        /** printDebug */
        function printDebug(message: any, ...options): void;
        /** getEnv */
        function getEnv(): string;
        /** setEnv */
        function setEnv(env): void;
        /** isDev */
        function isDev(): boolean;
        /** isProd */
        function isProd(): boolean;
    }

    /** ad */
    module ad {
        /** isSupportedRewardedVideo */
        function isSupportedRewardedVideo(): boolean;
        /** setRewardedVideoAd */
        function configRewardedVideoAd(platform: 'h5' | 'conch' | 'wechat' | 'facebook', adId: string): void;
        /** watchRewardedVideoAd */
        function watchRewardedVideoAd(onRewarded?: () => void, onCancal?: () => void, onError?: (error: any) => void): void;
    }

    /** app */
    module app {
        /** shareAsync */
        function shareAsync(options: sharePayload): Promise<any>;
        /** onShare */
        function onShare(callback: () => obj): void;
        /** getUserInfo, use img for wx: res/unpack/get_user_info.png */
        function getUserInfo(callback: (userinfo: userinfoPayload) => void): void;
        /** onLaunch */
        function onLaunch(callback: (options: obj) => void);
        /** onPause */
        function onPause(callback: () => void): void;
    }

    /** rank */
    module rank {
        /** isSupportedRank */
        function isSupportedRank(): boolean;
        /** createRankView */
        function createRankView(x?: number, y?: number, width?: number, height?: number): Laya.Sprite;
        /** setRankKey */
        function setRankKey(key: string, count?: number, offset?: number): void;
        /** setRankScore */
        function setRankScore(key: string, score: number, extraData?: string): void;
        /** showRank */
        function showRank(ui: obj | obj[]): void;
        /** hideRank */
        function hideRank(): void;
    }

    /** navigator */
    module navigator {
        /** navigate */
        function navigate(page, params?: any, action?: Function): void;
        /** finish activity */
        function finish(page, instance?: any): void;
        /** pop */
        function pop(num?: number): void;
        /** pop to top */
        function popToTop(): void;
    }

    /** popup */
    module popup {
        /** showPop */
        function showPopup(pop, params?, onHide?: (pop, result?: any) => void): void;
        /** hidePop */
        function hidePopup(pop, view?: any, result?: any): void;
    }

    /** toast*/
    module toast {
        /** showToast */
        function showToast(toast, params?, onHide?: (toast) => void): void;
        /** hideAll */
        function hideAll(): void;
    }

    /** Activity */
    class Activity extends Laya.Component {

        /** open */
        static open(params?: any, action?: () => void): void;
        /** finish */
        static finish(): void;
        /** res */
        static res: { url: string, type: string }[];

        /** page */
        protected page: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** activity on focus change */
        protected onFocus?(focus: boolean): void;
        /** activity on create */
        protected onCreate?(): void;
        /** activity on resume */
        protected onResume?(): void;
        /** activity on pause */
        protected onPause?(): void;
        /** activity on destroy */
        protected onDestroy?(): void;
        /** activity on next page load progress */
        protected onNextProgress?(progress: number): void;
        /** constructor */
        constructor(options: obj);
        /** redirectTo */
        protected redirectTo(page, params?: any): void;
        /** navigate */
        protected navigate(page, params?: any, action?: () => void): void;
        /** finish self */
        protected back(): void;
        /** finish activity */
        protected finish(page, instance?: any): void;
        /** pop */
        protected pop(num?: number): void;
        /** pop to top */
        protected popToTop(): void;
    }

    /** PopupView */
    class PopupView extends Laya.Sprite {
        /** show */
        static show(params?: any, onHide?: (pop, result?: any) => void): void;
        /** hide */
        static hide(): void;
        /** pop */
        protected pop: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
        /** pop on show */
        protected onShow?(): void;
        /** pop on hide */
        protected onHide?(): void;
        /** finish pop */
        protected finish(result?: any): void;
        /** constructor */
        constructor();
    }

    /** ToastView */
    class ToastView extends Laya.Sprite {

        /** show */
        static show(params?: any, onHide?: (toast) => void): void;
        /** toast */
        protected toast: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** easeIn */
        protected easeIn: Function;
        /** easeOut */
        protected easeOut: Function;
        /** fromProps */
        protected fromProps: obj;
        /** toProps */
        protected toProps: obj;
        /** toast on show */
        protected onShow?(): void;
        /** toast on hide */
        protected onHide?(): void;
        /** constructor */
        constructor();

    }

}