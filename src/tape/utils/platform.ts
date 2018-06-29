module Tape {

    export module Platform {

        export const isWechatApp = () => {
            return window.hasOwnProperty("wx");
        }

        export const isLongPhone = () => {
            var scale: number = (Laya.Browser.clientHeight / laya.utils.Browser.clientWidth);
            return scale > 2.1;
        }

    }

}