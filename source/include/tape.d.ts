declare module Tape {

    function initApp(routes, initName, options?: Object): void;

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
        //// extends Component Props
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

        protected onCreate();

        protected onResume();

        protected onPause();

        protected onDestroy();

        protected onNextProgress(progress: number);

        ///////////////////////
        /// Media
        ///////////////////////

        protected playBackgroundMusic(url: string, loops?: number): void;

        protected stopBackgroundMusic(): void;

        protected playAudio(url: string, loops?: number, complete?: Function): number;

        protected stopAudio(chancelId?: number);

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
    ////// Utils
    ///////////////////////////////////////////////

    /**
     * generate uid
     */
    function guid(): String;

    /**
     * logger
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
     * Toast
     */
    class Toast {
        static show(type: string, view, x: number, y: number, duration?: number, pivotX?: number, pivoxY?: number): void
    }

    /**
     * Task
     */
    class Task {

        /**
         * fn: args -> resolve,reject
         */
        constructor(fn: Function);

        public then(onFulfilled: Function, onRejected?: Function);

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
        public static play(url: String, loops?: number): void;

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

        constructor(url: String);

        /**
         * play audio
         */
        public play(loops?: number): void;

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
    ////// Net
    ///////////////////////////////////////////////


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

        connect(socketUrl: String): void;
        disconnect(): void;
        isConnected(): Boolean;
        isConnecting(): Boolean;
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

        connect(host: string, port: number, clientId: string, username: string, password: string, options?: Object): void;
        disconnect(): void;
        isConnected(): Boolean;
        isConnecting(): Boolean;
        publishMessage(topic: string, message: any, qos?: number, retained?: boolean): void;
    }

}