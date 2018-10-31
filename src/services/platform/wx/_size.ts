import platform from "../../../utils/platform";
import screen from "../../manager/screen";

export function fixWidth(width) {
    let systemInfo = platform.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowWidth = systemInfo.windowWidth;
        let stageWidth = screen.getWidth();
        return width * windowWidth / stageWidth;
    }
    return width;
}

export function fixHeight(height) {
    let systemInfo = platform.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowHeight = systemInfo.windowHeight;
        let stageHeight = screen.getHeight();
        return height * windowHeight / stageHeight;
    }
    return height;
}