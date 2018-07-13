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
        setBgColor();
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

    let bgColor = '#ffffff';

    export const setBgColor = (color = bgColor) => {
        bgColor = color;
        if (Laya.stage) {
            let bgView = Laya.stage.getChildByName('__tape_bg_view__') as Laya.Label;
            if (bgView) {
                bgView.bgColor = color;
            } else {
                bgView = new Laya.Label();
                bgView.name = '__tape_bg_view__';
                bgView.bgColor = color;
                bgView.x = 0;
                bgView.y = 0;
                bgView.width = Laya.stage.width;
                bgView.height = Laya.stage.height;
                Laya.stage.addChild(bgView);
            }
        }
    }

    export const getBgColor = () => {
        return bgColor;
    }

}