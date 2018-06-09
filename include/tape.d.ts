declare module Tape {

    /**
     * isMiniGame
     */
    function isMiniGame(): boolean;

    /**
     * isConchApp
     */
    function isConchApp(): boolean;

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

    ///////////////////////////////////////////////
    ////// Component
    ///////////////////////////////////////////////

    /**
     * Activity
     */
    class Activity {

        static ROUTE(options?: Object): Object;

        public readonly props: Object;
        public readonly params: Object;
        public readonly routeName: string;
        public readonly routeKey: string;
        /**
         * in anim
         */
        protected inEase: Function;
        protected inEaseDuration: number;
        protected inEaseFromProps: Object;
        protected inEaseToProps: Object;
        /**
         * out anim
         */
        protected outEaseDuration: number;
        protected outEase: Function;
        protected outEaseFromProps: Object;
        protected outEaseToProps: Object;

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

        protected addChild(child: any);

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
         * redirectTo
         */
        protected redirectTo(name, params?): boolean;

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

    export class Effect {

        public static clickEffect(btnView: any, click: Function): void;

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
     * NumUtil
     */
    class NumUtil {

        /**
         * rangedNum
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        static rangedNum(val: number, min: number, max: number): number;

        /**
         * randomFloat
         * @param min min number default 0
         * @param max max number default 1
         */
        static randomFloat(min?: number, max?: number): number;

        /**
         * randomInteger
         * @param min min number
         * @param max max number
         */
        static randomInteger(min: number, max: number): number;

    }

    /**
     * UUID
     */
    class UUID {

        /**
         * randUUID
         */
        static randomUUID(): string;

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
     * EventBus
     */
    class EventBus {

        static post(event: string, data: any): void;

        static on(event: string, callback: Function): void;
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

        onConnecting: Function;
        onConnected: Function;
        onClosed: Function;
        onError: Function;
        onMessageReceived: Function;

        /**
         * @param socketUrl     socket url
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

        onConnecting: Function;
        onConnected: Function;
        onClosed: Function;
        onError: Function;
        onMessageReceived: Function;
        onMessageDelivered: Function;

        /**
         * @param host     mqtt host
         * @param port     mqtt port
         * @param clientId     mqtt clientId
         * @param username     mqtt username
         * @param password     mqtt password
         * @param options     mqtt options
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
         * @param topic     mqtt topic
         * @param message     mqtt message
         * @param qos     mqtt qos
         * @param retained     mqtt retained
         */
        publishMessage(topic: string, message: any, qos?: number, retained?: boolean): void;

    }

    ///////////////////////////////////////////////
    ////// Mini
    ///////////////////////////////////////////////

    /**
     * __WX__
     */
    function __WX__(func: string, ...options): any;

    /**
     * MiniUI
     */
    class MiniUI {

        public static createSharedCanvasView(): void;

        public static showUserInfoButton(options: Object): void;

        public static hideUserInfoButton(): void;

        public static showGameClubButton(options: Object): void;

        public static hideGameClubButton(): void;

    }

    /**
     * MiniVersion
     */
    class MiniVersion {

        public static forceUpdate(options: Object): void;

    }

    /**
     * MiniOpenData
     */
    class MiniOpenContext {

        public static showByUI(uiView: Object, keyList?: Array<String>, customData?: Object): void;

        public static setUserCloudStorage(KVDataList: Array<Object>): void;

        public static postMessageToOpenDataContext(options: Object): void;

    }

}