import platform from "../../../utils/platform";

export function fixWidth(width) {
    let systemInfo = platform.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowWidth = systemInfo.windowWidth;
        let stageWidth = Laya.stage.width;
        return width * windowWidth / stageWidth;
    }
    return width;
}

export function fixHeight(height) {
    let systemInfo = platform.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowHeight = systemInfo.windowHeight;
        let stageHeight = Laya.stage.height;
        return height * windowHeight / stageHeight;
    }
    return height;
}