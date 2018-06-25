module Tape {

    /**
     * 初始化APP
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    export const init = (width: number, height: number, ...options) => {
        if (Platform.isWechatApp()) {
            MiniHandler.init(width, height, ...options);
        } else {
            BrowserHandler.init(width, height, ...options);
        }
    }

    /**
     * 退出APP
     */
    export const exit = () => {
        if (Platform.isWechatApp()) {
            MiniHandler.exit();
        } else {
            BrowserHandler.exit();
        }
    }

}