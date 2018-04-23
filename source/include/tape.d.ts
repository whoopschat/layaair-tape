declare module Tape {

    /**
     * createNavigator
     * @param routes routes
     * @param initName initName
     * @param options options
     */
    function createNavigator(routes, initName, options?: Object);

    ///////////////////////////////////////////////
    ////// Component
    ///////////////////////////////////////////////

    class Activity {

        static ROUTE(options?: Object): Object;

        public readonly props: Object;
        public readonly params: Object;
        public readonly routeName: string;
        public readonly routeKey: string;

        ///////////////////////
        //// Extends component props
        ///////////////////////

        gray: boolean;
        disabled: boolean;
        tag: any;
        top: number;
        bottom: number;
        left: number;
        right: number;
        centerX: number;
        centerY: number;
        anchorX: number;
        anchorY: number;
        scaleX: number;
        scaleY: number;
        height: number;
        readonly displayHeight: number;
        width: number;
        readonly displayWidth: number;
        layoutEnabled: boolean;
        protected addChild(clild: any);

        ///////////////////////
        /// Constructor
        ///////////////////////

        constructor(props?: Object);

        ///////////////////////
        /// LifeCycle
        ///////////////////////

        /**
         * onCreate
         */
        protected onCreate();

        /**
         * onResume
         */
        protected onResume();

        /**
         * onPause
         */
        protected onPause();

        /**
         * onDestroy
         */
        protected onDestroy();

        /**
         * onNextProgress
         * @param progress progress
         */
        protected onNextProgress(progress: number);

        ///////////////////////
        /// Navigator
        ///////////////////////

        /**
         * navigate
         */
        protected navigate(name, params?, action?: Function): Boolean;

        /**
         * deeplink
         */
        protected deeplink(url, action?: Function): Boolean;

        /**
         * finish self
         */
        protected back();

        /**
         * finish activity
         */
        protected finish(name);

        /**
         * pop count , n default 1
         */
        protected pop(n?: number);

        /**
         * pop to top
         */
        protected popToTop();

        ///////////////////////
        /// Logger
        ///////////////////////

        protected printLog(message?: any, ...optionalParams: any[]): void;

        protected printError(message?: any, ...optionalParams: any[]): void;

        protected printInfo(message?: any, ...optionalParams: any[]): void;

        protected printWarn(message?: any, ...optionalParams: any[]): void;

        protected printDebug(message?: any, ...optionalParams: any[]): void;

    }

    ///////////////////////////////////////////////
    ////// Toast
    ///////////////////////////////////////////////

    /**
     * Toast
     */
    class Toast {
        static show(type: string, view, x: number, y: number, duration?: number, pivotX?: number, pivoxY?: number): void
    }

    ///////////////////////////////////////////////
    ////// Market
    ///////////////////////////////////////////////

    /**
     * MarketHnadler
     */
    class MarketHnadler {

        public static onAuthorize: Function;
        public static onSendMessage: Function;
        public static onEnterShare: Function;
        public static onGetMarketName: Function;
        public static onGetUserInfo: Function;
        public static onGetFriends: Function;
        public static onLogin: Function;
        public static onLogout: Function;
        public static onRecharge: Function;

        public static isConchApp(): boolean;

        public static conchShowAlertOnJsException(show: boolean): void;

        public static conchSetOnBackPressedFunction(onBackPressed: Function): void;

        public static conchExit(): void;
    }

    /**
     * Market
     */
    class Market {

        public static getMarketName(): string;

        public static authorize(jsonParam: string, callback: Function): void;

        public static login(jsonParam: string, callback: Function): void;

        public static logout(jsonParam: string, callback: Function): void;

        public static recharge(jsonParam: string, callback: Function): void;

        public static sendMessage(jsonParam: string, callback: Function): void;

        public static enterShare(jsonParam: string, callback: Function): void;

        public static getUserInfo(jsonParam: string, callback: Function): void;

        public static getFriendList(jsonParam: string, callback: Function): void;

    }

    ///////////////////////////////////////////////
    ////// Utils
    ///////////////////////////////////////////////

    /**
     * Timer
     */
    export class Timer {

        public static sleep(numberMillis): void;

        constructor();

        public loop(callback: Function, delay: number): void;

        public stop(): void;

    }

    /**
     * NumUtil
     */
    class NumUtil {

        /**
         * rangedValue
         */
        static rangedValue(val: number, min: number, max: number): number;

        /**
         * rand
         */
        static rand(min: number, max: number): number;

    }

    /**
     * LinkUtil
     */
    class LinkUtil {

        /**
         * openURL
         */
        static openURL(url: string): void;

    }

    /**
     * UUID
     */
    class UUID {

        /**
         * randUUID
         */
        static randUUID(): string;

    }

    /**
     * Logger
     */
    class Logger {

        /**
         * print console log
         */
        static log(message?: any, ...optionalParams: any[]): void;

        /**
         * print console error log
         */
        static error(message?: any, ...optionalParams: any[]): void;

        /**
         * print console info log
         */
        static info(message?: any, ...optionalParams: any[]): void;

        /**
         * print console warn log
         */
        static warn(message?: any, ...optionalParams: any[]): void;

        /**
         * print console debug log
         */
        static debug(message?: any, ...optionalParams: any[]): void;

    }

    /**
     * Task
     */
    class Task {

        /**
         * fn: args -> resolve,reject
         */
        constructor(fn: Function);

        /**
         * then
         */
        public then(onFulfilled: Function, onRejected?: Function);

        /**
         * catch
         */
        public catch(onRejected: Function);

    }

    ///////////////////////////////////////////////
    ////// Media
    ///////////////////////////////////////////////

    /**
     * BackgroundMusic
     */
    class BackgroundMusic {

        /**
         * play background music
         */
        public static play(url: String, loops?: number, complete?: Function): void;

        /**
         * stop background music
         */
        public static stop(): void;

        /**
         * pause audio
         */
        public static pause(): void;
    }

    /**
     * Audio
     */
    class Audio {

        /**
         * config audio
         */
        public static config(soundDir: string, soundFormat: string, soundConchDir: string, soundConchFormat: string, showErrorAlert?: boolean);

        /**
         * play audio
         */
        public static play(url: String, loops?: number, complete?: Function): Audio;

        /**
         * constructor
         * @param url sound url
         */
        constructor(url: String);

        /**
         * play audio
         */
        public play(loops?: number, complete?: Function): void;

        /**
         * stop audio
         */
        public stop(): void;

        /**
         * pause audio
         */
        public pause(): void;

    }

    ///////////////////////////////////////////////
    ////// Socket
    ///////////////////////////////////////////////

    /**
     * WebSocket
     */
    class WebSocket {

        constructor(debug?: boolean);

        onConnecting: Function;
        onConnected: Function;
        onClosed: Function;
        onError: Function;
        onMessageReceived: Function;

        /**
         * @param socketUrl	 socket url
         */
        connect(socketUrl: String): void;

        /**
         * disconnect
         */
        disconnect(): void;

        /**
         * @return is connected
         */
        isConnected(): Boolean;

        /**
         * @return is connecting
         */
        isConnecting(): Boolean;

        /**
         * @param message socket message
         */
        publishMessage(message: any): void;
    }

    /**
     * MQTTSocket
     */
    class MQTTSocket {

        constructor(debug?: boolean);

        onConnecting: Function;
        onConnected: Function;
        onClosed: Function;
        onError: Function;
        onMessageReceived: Function;
        onMessageDelivered: Function;

        /**
         * @param host	 mqtt host
         * @param port	 mqtt port
         * @param clientId	 mqtt clientId
         * @param username	 mqtt username
         * @param password	 mqtt password
         * @param options	 mqtt options
         */
        connect(host: string, port: number, clientId: string, username?: string, password?: string, options?: Object): void;

        /**
         * disconnect
         */
        disconnect(): void;

        /**
         * @return is connected
         */
        isConnected(): Boolean;

        /**
         * @return is connecting
         */
        isConnecting(): Boolean;

        /**
         * @param topic	 mqtt topic
         * @param message	 mqtt message
         * @param qos	 mqtt qos
         * @param retained	 mqtt retained
         */
        publishMessage(topic: string, message: any, qos?: number, retained?: boolean): void;
    }

}