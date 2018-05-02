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
        protected onCreate(): void;

        /**
         * onResume
         */
        protected onResume(): void;

        /**
         * onPause
         */
        protected onPause(): void;

        /**
         * onDestroy
         */
        protected onDestroy(): void;

        /**
         * onNextProgress
         * @param progress progress
         */
        protected onNextProgress(progress: number): void;

        ///////////////////////
        /// Navigator
        ///////////////////////

        /**
         * navigate
         */
        protected navigate(name, params?, action?: Function): boolean;

        /**
         * deeplink
         */
        protected deeplink(url, action?: Function): boolean;

        /**
         * finish self
         */
        protected back(): void;

        /**
         * finish activity
         */
        protected finish(name): void;

        /**
         * pop count , n default 1
         */
        protected pop(n?: number): void;

        /**
         * pop to top
         */
        protected popToTop(): void;

        ///////////////////////
        /// Logger
        ///////////////////////

        protected printLog(message?: any, ...optionalParams: any[]): void;

        protected printError(message?: any, ...optionalParams: any[]): void;

        protected printInfo(message?: any, ...optionalParams: any[]): void;

        protected printWarn(message?: any, ...optionalParams: any[]): void;

        protected printDebug(message?: any, ...optionalParams: any[]): void;

    }

    /**
     * Dialog
     */
    class Dialog {

        /**
         * showDialog
         * @param dialog dialog ui
         * @param onOpened onOpened callback
         * @param onClosed onClosed callback
         */
        static showDialog(dialog, onOpened?: Function, onClosed?: Function): void;

        /**
         * closeDialog
         */
        static closeDialog(): void;

        /**
         * showLockView
         * @param lockView lockView
         */
        static showLockView(lockView): void;

        /**
         * closeLockView
         */
        static closeLockView(): void;
    }

    /**
     * Toast
     */
    class Toast {

        /**
         * showToast 
         * @param view show toast view
         * @param duration duration default 500 ms
         * @param previousHnadler previous hnadler callback
         */
        static showToast(view, duration?: number, previousHnadler?: Function): void;

    }

    ///////////////////////////////////////////////
    ////// Market
    ///////////////////////////////////////////////

    /**
     * MarketHandler
     */
    class MarketHandler {

        static onAuthorize: Function;
        static onSendMessage: Function;
        static onEnterShare: Function;
        static onGetMarketName: Function;
        static onGetUserInfo: Function;
        static onGetFriends: Function;
        static onLogin: Function;
        static onLogout: Function;
        static onRecharge: Function;

        static isConchApp(): boolean;

        static conchShowAlertOnJsException(show: boolean): void;

        static conchSetOnBackPressedFunction(onBackPressed: Function): void;

        static conchExit(): void;
    }

    /**
     * Market
     */
    class Market {

        static getMarketName(): string;

        static authorize(jsonParam: string, callback: Function): void;

        static login(jsonParam: string, callback: Function): void;

        static logout(jsonParam: string, callback: Function): void;

        static recharge(jsonParam: string, callback: Function): void;

        static sendMessage(jsonParam: string, callback: Function): void;

        static enterShare(jsonParam: string, callback: Function): void;

        static getUserInfo(jsonParam: string, callback: Function): void;

        static getFriendList(jsonParam: string, callback: Function): void;

    }

    ///////////////////////////////////////////////
    ////// Utils
    ///////////////////////////////////////////////

    /**
     * Build
     */
    class Build {

        /**
         * configEnv
         * @param env development or production
         */
        static configEnv(env: string);

        /**
         * get build env
         * @return env mode : development or production
         */
        static getEnv(): string;

        /**
         * isDebug
         */
        static isDebug(): boolean;

    }

    /**
     * FrameInterval
     */
    class FrameInterval {

        /**
         * start
         * @param delay frame
         * @param callback callback:time
         * @param offset time offset
         */
        public start(delay: number, callback: Function, offset?: number): void;

        /**
         * stop
         */
        public stop(): void;

    }

    /**
     * TimerInterval
     */
    class TimerInterval {

        /**
         * start
         * @param delay millis
         * @param callback callback:time
         * @param offset time offset
         */
        public start(delay: number, callback: Function, offset?: number): void;

        /**
         * stop
         */
        public stop(): void;

    }

    /**
     * EventBus
     */
    class EventBus {

        /**
         * post
         * @param event event
         * @param data data
         */
        static post(event: string, data: any): void;

        /**
         * register
         * @param event event
         * @param callback callback
         */
        static register(event: string, callback: Function): void;

        /**
         * unregister
         * @param event event
         * @param callback callback
         */
        static unregister(event: string, callback: Function): void;
    }

    /**
     * NumUtil
     */
    class NumUtil {

        /**
         * rangedValue
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        static rangedValue(val: number, min: number, max: number): number;

        /**
         * rand
         * @param min min number
         * @param max max number
         */
        static rand(min: number, max: number): number;

    }

    /**
     * LinkUtil
     */
    class LinkUtil {

        /**
         * openURL
         * @param url url
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
         * new Task()
         * @param func args[resolve,reject]
         */
        constructor(func: Function);

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
         * @param url url
         * @param loops loops count,default 1
         * @param complete complete callback
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
         * @param dir sound dir for web
         * @param ext sound ext for web
         * @param conchDir sound dir for conch
         */
        public static config(dir: string, ext: string, conchDir: string, conchExt: string);

        /**
         * play audio
         * @param url url
         * @param loops loops count,default 1
         * @param complete complete callback
         */
        public static play(url: String, loops?: number, complete?: Function): Audio;

        /**
         * constructor
         * @param url sound url
         */
        constructor(url: String);

        /**
         * play audio
         * @param loops loops count,default 1
         * @param complete complete callback
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
        isConnected(): boolean;

        /**
         * @return is connecting
         */
        isConnecting(): boolean;

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
        isConnected(): boolean;

        /**
         * @return is connecting
         */
        isConnecting(): boolean;

        /**
         * @param topic	 mqtt topic
         * @param message	 mqtt message
         * @param qos	 mqtt qos
         * @param retained	 mqtt retained
         */
        publishMessage(topic: string, message: any, qos?: number, retained?: boolean): void;
    }

}