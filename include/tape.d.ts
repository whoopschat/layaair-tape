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

    /** StartPayload */
    interface StartPayload {
        mainPage?: any;
        commonRes?: { url: string, type: string }[];
        fileVersion?: string;
        onLoadProgress?: (progress: number) => void;
        onLoaded?: () => void;
    }

    /** UserinfoPayload */
    interface UserinfoPayload {
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

    /** ModalPayload */
    interface ModalPayload {
        title?: string,
        content?: string,
        showCancel?: boolean,
        cancelText?: string,
        cancelColor?: string,
        confirmText?: string,
        confirmColor?: string,
        success?: (result: { cancel: boolean, confirm: boolean }) => void,
        fail?: any;
        complete?: any;
    }

    /** ToastPayload */
    interface ToastPayload {
        title: string,
        image?: string,
        icon?: 'success' | 'loading' | 'none',
        duration?: number,
        mask?: boolean,
        success?: any,
        fail?: any;
        complete?: any;
    }

    /** LoadingPayload */
    interface LoadingPayload {
        title: string,
        mask?: boolean,
        success?: any,
        fail?: any;
        complete?: any;
    }

    /** AudioController */
    interface AudioController {
        readonly url: string;
        readonly position: number;
        readonly duration: number;
        onPlay(callback: () => void): void;
        onStop(callback: () => void): void;
        onPause(callback: () => void): void;
        onProgress(callback: (progress: { position: number, duration: number }) => void): void;
        onComplete(callback: () => void): void;
        isPaused(): void;
        isPlaying(): void;
        play(loops?: number): void
        pause(): void;
        resume(): void;
        stop(): void;
        destroy(): void;
    }

    /** init for 2D */
    function init(width: number, height: number, ...options): void;
    /** init for 3D */
    function init3D(width: number, height: number, ...options): void;
    /** start */
    function start(options: StartPayload | null, onLoaded?: () => void): void;
    /** exit */
    function exit(): void;

    /** showToast */
    function showToast(params: ToastPayload): void;
    /** hideToast */
    function hideToast(): void;
    /** showModal */
    function showModal(params: ModalPayload): void;
    /** showToast */
    function showLoading(params?: LoadingPayload): void;
    /** hideLoading */
    function hideLoading(): void;
    /** vibrateShort */
    function vibrateShort(): void;
    /** vibrateLong */
    function vibrateLong(): void;

    /** bg */
    module bg {
        /** setBgColor */
        function setBgColor(color: string): void;
        /** getBgColor */
        function getBgColor(): string;
        /** setBgSkin */
        function setBgSkin(skin: string): void;
        /** getBgSkin */
        function getBgSkin(): string;
        /** setBgSizeGrid */
        function setBgSizeGrid(sizeGrid: string): void;
        /** getBgSizeGrid */
        function getBgSizeGrid(): string;
    }

    /** screen */
    module screen {
        /** getWidth */
        function getWidth(): number;
        /** getHeight */
        function getHeight(): number;
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
        /** isLayaApp */
        function isLayaApp(): boolean;
        /** isBrowserApp */
        function isBrowserApp(): boolean;
        /** isQQApp */
        function isQQApp(): boolean;
        /** execQQ */
        function execQQ(func, ...options): any;
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
        /** printError */
        function printError(message: any, ...options): void;
        /** getEnv */
        function getEnv(): string;
        /** setEnv */
        function setEnv(env): void;
        /** isDev */
        function isDev(): boolean;
        /** isProd */
        function isProd(): boolean;
        /** getPlatform */
        function getPlatform(): string;
    }

    /** audio */
    module audio {
        /** playMusic */
        function playMusic(url: string, loops?: number): AudioController;
        /** playSound */
        function playSound(url: string, loops?: number): AudioController;
        /** stopMusic */
        function stopMusic(): void;
        /** stopAll */
        function stopAll(): void;
        /** stopAllSound */
        function stopAllSound(): void;
    }

    /** ad */
    module ad {
        /** isSupportedRewardedVideo */
        function isSupportedRewardedVideo(): boolean;
        /** setRewardedVideoAd */
        function configRewardedVideoAd(platform: string, adId: string): void;
        /** watchRewardedVideoAd */
        function watchRewardedVideoAd(onRewarded?: () => void, onCancal?: () => void, onError?: (error: any) => void): void;
        /** isSupportedBannerAd */
        function isSupportedBannerAd(): boolean;
        /** configBannerAd */
        function configBannerAd(platform: string, adId: string): void;
        /** showBannerAd */
        function showBannerAd(x: number, y: number, width: number, height: number, onError?: (error: any) => void): void;
        /** hideBannerAd */
        function hideBannerAd(): void;
    }

    /** app */
    module app {
        /** onLaunch */
        function onLaunch(callback: (options: { scene: string, query: obj, platform: string }) => void);
        /** onPause */
        function onPause(callback: () => void): void;
        /** getUserInfo, use img for wechat: res/unpack/get_user_info.png */
        function getUserInfo(callback: (userinfo: UserinfoPayload) => void, imageUrl?: string): void;
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

    /** other */
    module other {
        /** isSupportKefuConversation */
        function isSupportKefuConversation(): boolean;
        /** openKefuConversation */
        function openKefuConversation(options?: obj): void;
        /** isSupportClubButton */
        function isSupportClubButton(): boolean;
        /** showClubButton */
        function showClubButton(icon: string, x: number, y: number, w: number, h: number): void;
        /** hideClubButton */
        function hideClubButton(): void;
    }

    /** utils */
    module utils {
        /** randomUUID */
        function randomUUID(): string;
        /** randomNumber */
        function randomNumber(minNum: number, maxNum: number): number;
        /** randomNumber */
        function randomInteger(minNum: number, maxNum: number): number;
        /** randomArray */
        function randomArray(source: any[], length?: number): any[];
        /** randomArrayItem */
        function randomArrayItem(source: any[]): any;
        /** tryToObject */
        function tryToObject(source): any;
        /** anyToArray */
        function anyToArray(source: any): any[];
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
        /** hideToast */
        function hideToast(toast, view?: any): void;
    }

    /** Activity */
    class Activity extends Laya.Component {

        /** open */
        static open(params?: any, action?: () => void): void;
        /** finish */
        static finish(): void;
        /** res */
        static res: { url: string, type: string }[];
        /** num */
        static num: number;

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
        /** bgAlpha */
        protected bgAlpha: number;
        /** bgColor */
        protected bgColor: string;
        /** isTranslucent */
        protected isTranslucent: boolean;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean;
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
        /** redirectTo */
        protected redirectTo(page, params?: any): void;
        /** navigate */
        protected navigate(page, params?: any, action?: () => void): void;
        /** finish self */
        protected back(): void;
        /** finish activity */
        protected finish(page?, instance?: any): void;
        /** pop */
        protected pop(num?: number): void;
        /** pop to top */
        protected popToTop(): void;
        /** constructor */
        constructor(options: obj);

    }

    /** PopupView */
    class PopupView extends Laya.Sprite {
        /** show */
        static show(params?: any, onHide?: (pop, result?: any) => void): void;
        /** hide */
        static hide(result?: any): void;
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
        /** hide pop */
        protected hide(result?: any): void;
        /** constructor */
        constructor();
    }

    /** ToastView */
    class ToastView extends Laya.Sprite {

        /** show */
        static show(params?: any, onHide?: (toast) => void): void;
        /** hide */
        static hide(): void;
        /** toast */
        protected toast: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** displayDuration */
        protected displayDuration: number;
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
        /** toast on show */
        protected onShow?(): void;
        /** toast on hide */
        protected onHide?(): void;
        /** hide toast */
        protected hide(): void;
        /** constructor */
        constructor();

    }

}