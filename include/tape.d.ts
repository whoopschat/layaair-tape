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

    /** Background */
    module Background {
        /** getBgSprite */
        function getBgSprite(): Laya.Sprite;
        /** setBgColor */
        function setBgColor(color: string): void;
        /** getBgColor */
        function getBgColor(): string;
    }

    /** Screen */
    module Screen {
        /** getOffestX */
        function getOffestX(): number;
        /** getOffestY */
        function getOffestY(): number;
        /** getDesignWidth */
        function getDesignWidth(): number;
        /** getDesignHeight */
        function getDesignHeight(): number;
    }

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
    module NavigatorLink {
        /** config */
        function config(routes: Object): void;
        /** link */
        function link(path: string): void;
    }

    /** NavigatorStack */
    module NavigatorStack {
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

    /** PopManager */
    module PopManager {
        /** showPop */
        function showPop(pop, params?, onHide?: (pop, result?: any) => void): void;
        /** hidePop */
        function hidePop(pop, view?: any, result?: any): void;
        /** refreshPos */
        function refreshPos(): void;
    }

    /** ToastManager　*/
    module ToastManager {

        /** showToast */
        function showToast(toast, params?, onHide?: (toast) => void): void;
        /** clear */
        function clearAll(): void;

    }

    /** PopView */
    class PopView extends Laya.Sprite {
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
        /** params */
        protected params: any;
        /** duration */
        protected duration: number;
        /** fromProps */
        protected fromProps: Object;
        /** toProps */
        protected toProps: Object;
        /** ui */
        protected ui: any;
        /** toast on show */
        protected onShow?(): void;
        /** toast on hide */
        protected onHide?(): void;
        /** constructor */
        constructor();

    }

    /** Activity */
    class Activity extends Laya.Component {

        /** open */
        static open(params?: any, action?: Function): void;
        /** finish */
        static finish(): void;

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

    /** MiniButton */
    module MiniButton {

        /**
         * showFeedbackButton
         * @param image 
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         */
        function showFeedbackButton(image: string, x: number, y: number, w: number, h: number): void;
        /**
         * hideFeedbackButton
         */
        function hideFeedbackButton(): void;
        /**
         * showGameClubButton
         * @param icon 
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         */
        function showGameClubButton(icon: string, x: number, y: number, w: number, h: number): void;
        /**
         * hideGameClubButton
         */
        function hideGameClubButton(): void;
        /**
         * checkGetUserInfo
         * @param onSuccess 
         * @param onFail 
         */
        function checkGetUserInfo(onSuccess: Function, onFail?: Function): void;
        /**
         * showGetUserInfoButton
         * @param image 
         * @param x 
         * @param y 
         * @param w 
         * @param h 
         * @param onSuccess 
         * @param onFail 
         */
        function showGetUserInfoButton(image: string, x: number, y: number, w: number, h: number, onSuccess: Function, onFail?: Function): void;
        /**
         * hideGetUserInfoButton
         */
        function hideGetUserInfoButton(): void;

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
         * @param ui
         * @param options 
         * @param onlyRefreshData 
         */
        function showRank(ui: Object | Object[], options?: Object, onlyRefreshData?: boolean): void;
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