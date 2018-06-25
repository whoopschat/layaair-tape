declare module Tape {

    /**
     * init
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    function init(width: number, height: number, ...options): void;

    /**
     * exit
     */
    function exit(): void;

    /**
     * createNavigator
     * @param routes routes
     * @param initName initName
     * @param options options
     */
    function createNavigator(routes, initName, options?: Object);

    /** Platform */
    module Platform {

        /** isLongPhone */
        function isLongPhone(): boolean;

        /** isWechatApp */
        function isWechatApp(): boolean;

    }

    /** Activity */
    class Activity extends Laya.Component {

        static ROUTE(options?: Object): Object;

        /** props */

        public readonly props: Object;
        public readonly params: Object;
        public readonly routeName: string;
        public readonly routeKey: string;

        constructor(props?: Object);

        /** anim */
        protected inEase: Function;
        protected inEaseDuration: number;
        protected inEaseFromProps: Object;
        protected inEaseToProps: Object;
        protected outEaseDuration: number;
        protected outEase: Function;
        protected outEaseFromProps: Object;
        protected outEaseToProps: Object;

        ///////////////////////
        /// life cycle
        ///////////////////////

        /** onCreate */
        protected onCreate: () => void;
        /** onResume */
        protected onResume: () => void;
        /** onPause */
        protected onPause: () => void;
        /** onDestroy */
        protected onDestroy: () => void;
        /** onNextProgress */
        protected onNextProgress: (progress: number) => void;

        ///////////////////////
        /// navigation
        ///////////////////////

        /** redirectTo */
        protected redirectTo: (name, params?) => boolean;

        /** navigate */
        protected navigate: (name, params?, action?: Function) => boolean;

        /** deeplink */
        protected deeplink: (url, action?: Function) => boolean;

        /** finish self */
        protected back: () => void;

        /** finish activity */
        protected finish: (name) => void;

        /** pop count , n default 1 */
        protected pop: (n?: number) => void;

        /** pop to top */
        protected popToTop: () => void;

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
        function randomArr(source: any[], length: number = -1): any[];

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