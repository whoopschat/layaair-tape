declare module Tape {

    function createApp(routes, initName, options?: Object);

    ///////////////////////////////////////////////
    ////// Conch
    ///////////////////////////////////////////////

    /**
     * Conch
     */
    class Conch {

        static is_conch(): boolean;

    }

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
     * numUtil
     */
    class NumUtil {

        static rangedValue(val: number, min: number, max: number): number;

        static rand(min: number, max: number): number;

    }

    /**
     * linkUtil
     */
    class LinkUtil {
        static openURL(url: string): void;
    }

    /**
     * uuid
     */
    class UUID {
        static guid(): string;
    }

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
    ////// WeChat
    ///////////////////////////////////////////////

    class WeChat {

        /**
         * <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
         * 
         * @param appId	 wechat appid
         * @param success init success callback
         */
        public static init(appId: string, success: Function): void;

        /**
         * @param configMap	 configMap{appId, timestamp, nonceStr, signature}
         * @param shareOptions	 shareOptions{title, link, desc, imageUrl}
         * @param onShareSuccess	share success callback
         * @param onShareCancel	 share cancel callback
         * @param onError	config error callback
         */
        public static configTicket(configMap: Object, shareOptions: Object, onShareSuccess?: Function, onShareCancel?: Function, onError?: Function): void;

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