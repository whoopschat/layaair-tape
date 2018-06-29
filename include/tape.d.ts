declare module Tape {

    /** ActivityOptions */
    export interface ActivityOptions {
        page: any,
        params: any
    }

    /** ResourceOptions */
    export interface ResourceOptions {
        url: string,
        type: string
    }

    /** NavigatorOptions */
    export interface NavigatorOptions {
        mainPage: any;
        commonRes?: ResourceOptions[];
        fileVersion?: string;
    }

    /**
     * init
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    function init(width: number, height: number, ...options): void;

    /** exit */
    function exit(): void;

    /** Navigator */
    module Navigator {

        /** init */
        function init(options: NavigatorOptions): void;

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

    /** POPManager */
    module POPManager {

        /** showPop */
        function showPop(pop, data): void;

        /** hidePop */
        function hidePop(pop): void;

        /** refreshPos */
        function refreshPos(): void;

    }

    /** PopView */
    class PopView extends Laya.Sprite {

        /** pop */
        protected pop: any;
        /** data */
        protected data: any;
        /** isTranslucent */
        protected isTranslucent: boolean = false;
        /** canceledOnTouchOutside */
        protected canceledOnTouchOutside: boolean = false;
        /** pop on show */
        protected onShow?(): void;
        /** pop on hide */
        protected onHide?(): void;
        /** finish pop */
        protected finish(): void;

        constructor();

    }

    /** Activity */
    class Activity extends Laya.Component {

        /** page type */
        protected readonly page: any;
        /** params */
        protected readonly params: Object;
        /** res */
        protected res: ResourceOptions[];
        /** anim */
        protected inEase: Function;
        protected inEaseDuration: number;
        protected inEaseFromProps: Object;
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

        constructor(options: ActivityOptions);

        ///////////////////////
        /// navigation
        ///////////////////////

        /** redirectTo */
        protected redirectTo: (page, params?) => boolean;

        /** navigate */
        protected navigate: (page, params?, action?: Function) => boolean;

        /** finish self */
        protected back: () => void;

        /** finish activity */
        protected finish: (page) => void;

        /** pop */
        protected pop: (num?: number) => void;

        /** pop to top */
        protected popToTop: () => void;

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

        /**
         * get build env
         * @return env mode : development or production
         */
        function getEnv(): string;

        /**
         * isDev
         */
        function isDev(): boolean;

        /**
         * isProd
         */
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

        /** showBannerAd */
        function showBannerAd(adUnitId: string, x: number, y: number, w: number, h: number): void;

        /** hideBannerAd */
        function hideBannerAd(adUnitId: string): void;

    }

    /** MiniRank */
    module MiniRank {

        function createRankView(x?: number, y?: number, width?: number, height?: number): Laya.Sprite;

        function showRank(uiView: Object | Object[], options?: Object, onlyRefreshData?: boolean): void;

        function hideRank(): void;

        function setRankData(list: Object[]): void;

    }

}