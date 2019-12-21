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

    /** env */
    module env {
        /** isLayaApp */
        function isLayaApp(): boolean;
        /** isConchApp */
        function isConchApp(): boolean;
        /** getVersion */
        function getAppVersion(): string;
        /** getVersion */
        function getVersion(): string;
        /** setDebug */
        function setDebug(debug: boolean): void;
        /** printDebug */
        function printDebug(message: any, ...options): void;
        /** printError */
        function printError(message: any, ...options): void;
        /** setEnv */
        function setEnv(env): void;
        /** getEnv */
        function getEnv(): string;
        /** isDev */
        function isDev(): boolean;
        /** isProd */
        function isProd(): boolean;
    }

    /** bg */
    module bg {
        /** setBgColor */
        function setBgColor(color: string): void;
        /** setBgSkin */
        function setBgSkin(url: string, sizeGrid?: string): void;
        /** setBgTexture */
        function setBgTexture(url: string): void;
        /** getBgSprite */
        function getBgSprite(): Laya.Sprite;
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
        /** setDeviation */
        function setDeviation(deviation): void;
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
        /** toAny */
        function toAny(source: any, def: any): any;
    }

    /** runtime */
    module runtime {
        /** clickSound */
        let clickSound: string;
        /** scaleTime */
        let scaleTime: number;
        /** scaleSmalValue */
        let scaleSmalValue: number;
        /** scaleBigValue */
        let scaleBigValue: number;
        /** bindClick */
        function bindClick(view): void;
        /** btn */
        class btn extends Laya.Button {
            public sound: string;
        }
        /** btn_img */
        class btn_img extends Laya.Image {
            public sound: string;
        }
        /** btn_label */
        class btn_label extends Laya.Label {
            public sound: string;
        }
        /** btn_sprite */
        class btn_sprite extends Laya.Sprite {
            public sound: string;
        }
        /** btn_box */
        class btn_box extends Laya.Box {
            public sound: string;
        }
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
        /** single */
        static single: boolean;

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
        protected redirectTo(page, params?: any, action?: () => void, single?: boolean): void;
        /** navigate */
        protected navigate(page, params?: any, action?: () => void, single?: boolean): void;
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