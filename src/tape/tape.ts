module Tape {

    function _init(is3D: boolean, width: number, height: number, ...options) {
        if (Platform.isWechatApp()) {
            MiniHandler.init(width, height, ...options);
        }
        Screen.init(is3D, width, height, ...options);
    }

    /**
     * 初始化APP
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    export const init = (width: number, height: number, ...options) => {
        _init(false, width, height, ...options);
    }

    /**
     * 初始化APP for 3D
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    export const init3D = (width: number, height: number, ...options) => {
        _init(true, width, height, ...options);
    }

    /**
     * 退出APP
     */
    export const exit = () => {
        if (Platform.isWechatApp()) {
            MiniHandler.exit();
        }
    }

}