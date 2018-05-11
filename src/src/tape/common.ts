module Tape {

    /**
     * 初始化
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    export const init = (width: number, height: number, ...options) => {
        if (isMiniGame()) {
            MiniHandler.init(width, height, ...options);
        } else {
            ConchHandler.init(width, height, ...options);
        }
    }

    /**
     * 退出
     * @param success 成功回调
     * @param fail 失败回调
     * @param complete 完成回调，失败成功都会回调
     */
    export const exit = () => {
        if (isMiniGame()) {
            MiniHandler.exit();
        } else if (isConchApp()) {
            ConchHandler.exit();
        }
    }

}