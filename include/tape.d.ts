declare module runtime {

    let clickSound: string;

    class btn extends Laya.Button { }

    class btn_img extends Laya.Image { }

    class btn_label extends Laya.Label { }

}

declare module Tape {

    /** ActivityOptions */
    interface ActivityOptions {
        page: any,
        params: any
    }

    /** ResourceOptions */
    interface ResourceOptions {
        url: string,
        type: string
    }

    /**
     * init
     * @param width
     * @param height
     * @param options
     */
    function init(width: number, height: number, ...options): void;

    /** exit */
    function exit(): void;

    /** getBgColor */
    function getBgColor(): string;

    /** setBgColor  @param color */
    function setBgColor(color: string): void;

    /** NavigatorOptions */
    interface NavigatorOptions {
        mainPage: any;
        commonRes?: ResourceOptions[];
        fileVersion?: string;
    }

    /** Navigator */
    module Navigator {
        /** init */
        function init(options: NavigatorOptions): void;
    }

    /** NavigatorRouter */
    module NavigatorRouter {
        /** configRoutes */
        function configRoutes(routes: Object): void;
    }

    /** NavigatorStack */
    module NavigatorStack {
        /** link */
        function link(path: string): void;
        /** redirectTo */
        function redirectTo(page, params?: any): void;
        /** navigate */
        function navigate(page, params?: any, action?: Function): void;
        /** finish activity */
        function finish(page, instance?: any): void;
        /** pop */
        function pop(num?: number): void;
        /** pop to top */
        function popToTop(): void;
    }

    /** UIManager */
    module UIManager {
        /** addMainUI */
        function addMainUI(view): void;
        /** addPopUI */
        function addPopUI(view): void;
        /** addTopUI */
        function addTopUI(view): void;
        /** clearMainUI */
        function clearMainUI(): void;
        /** clearPopUI */
        function clearPopUI(): void;
        /** clearTopUI */
        function clearTopUI(): void;
    }

    /** PopManager */
    module PopManager {
        /** showPop */
        function showPop(pop, data?, onHide?: (pop) => void): void;
        /** hidePop */
        function hidePop(pop): void;
        /** refreshPos */
        function refreshPos(): void;
    }

    /** ToastManager　*/
    module ToastManager {

        /** showToast */
        function showToast(view: Laya.Sprite, duration?: number, fromProps?: Object, toProps?: Object): void;

        /** hideAll */
        function hideAll(): void;

    }

    /** PopView */
    class PopView extends Laya.Sprite {
        /** pop */
        protected pop: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
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
        protected finish(): void;
        /** constructor */
        constructor();
    }

    /** Activity */
    class Activity extends Laya.Component {
        /** page type */
        protected page: any;
        /** ui */
        protected ui: any;
        /** params */
        protected params: any;
        /** res */
        protected res: ResourceOptions[];
        /** inEase */
        protected inEase: Function;
        /** inEaseDuration */
        protected inEaseDuration: number;
        /** inEaseFromProps */
        protected inEaseFromProps: Object;
        /** inEaseToProps */
        protected inEaseToProps: Object;
        /** activity on create */
        protected onCreate?(): void;
        /** activity on resume */
        protected onResume?(): void;
        /** activity on pause */
        protected onPause?(): void;
        /** activity on destroy */
        protected onDestroy?(): void;
        /** activity on next page load progress */
        protected onNextProgress?(progress): void;
        /** constructor */
        constructor(options: ActivityOptions);
        /** link */
        protected link(path: string): void;
        /** redirectTo */
        protected redirectTo(page, params?: any): void;
        /** navigate */
        protected navigate(page, params?: any, action?: Function): void;
        /** finish self */
        protected back(): void;
        /** finish activity */
        protected finish(page, instance?: any): void;
        /** pop */
        protected pop(num?: number): void;
        /** pop to top */
        protected popToTop(): void;
    }

    /** Platform */
    module Platform {
        /** isLongPhone */
        function isLongPhone(): boolean;
        /** isWechatApp */
        function isWechatApp(): boolean;
    }

    /** Env */
    module Env {
        /** get build env @return env mode : development or production */
        function getEnv(): string;
        /** isDev */
        function isDev(): boolean;
        /** isProd */
        function isProd(): boolean;
    }

    /** ArrayUtil */
    module ArrayUtil {
        /** random */
        function random(source: any[]): any;
        /** randomArr */
        function randomArr(source: any[], length?: number): any[];
    }

    /** UUID */
    module UUID {
        /** randomUUID */
        function randomUUID(): string;
    }

    /** MiniAd */
    module MiniAd {
        /**
         * showBannerAd
         * @param adUnitId 
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         */
        function showBannerAd(adUnitId: string, x: number, y: number, width: number, height: number, onError?: Function): void;
        /**
         * hideBannerAd
         * @param adUnitId 
         */
        function hideBannerAd(adUnitId: string): void;
        /**
         * showRewardedVideoAd
         * @param adUnitId 
         * @param onRewarded 
         * @param onCancal 
         */
        function showRewardedVideoAd(adUnitId: string, onRewarded: Function, onCancal: Function, onError?: Function): void;
    }

    /** MiniRank */
    module MiniRank {
        /**
         * createRankView
         * @param x 
         * @param y 
         * @param width 
         * @param height 
         */
        function createRankView(x?: number, y?: number, width?: number, height?: number): Laya.Sprite;
        /**
         * showRank
         * @param uiView
         * @param options 
         * @param onlyRefreshData 
         */
        function showRank(uiView: Object | Object[], options?: Object, onlyRefreshData?: boolean): void;
        /**
         * hideRank
         */
        function hideRank(): void;
        /**
         * setRankData
         * @param kv_data_list 
         */
        function setRankData(kv_data_list: Object[]): void;
        /**
         * setDebug
         * @param debug 
         */
        function setDebug(debug: boolean): void;
    }

}