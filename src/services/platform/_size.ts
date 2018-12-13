import env from "../../utils/env";
import screen from "../manager/screen";

export function fixWidthForWechat(width) {
    let systemInfo = env.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowWidth = systemInfo.windowWidth;
        let stageWidth = screen.getWidth();
        return width * windowWidth / stageWidth;
    }
    return width;
}

export function fixHeightForWechat(height) {
    let systemInfo = env.execWX('getSystemInfoSync');
    if (systemInfo) {
        let windowHeight = systemInfo.windowHeight;
        let stageHeight = screen.getHeight();
        return height * windowHeight / stageHeight;
    }
    return height;
}

export function fixWidthForBaidu(width) {
    let systemInfo = env.execBD('getSystemInfoSync');
    if (systemInfo) {
        let windowWidth = systemInfo.windowWidth;
        let stageWidth = screen.getWidth();
        return width * windowWidth / stageWidth;
    }
    return width;
}

export function fixHeightForBaidu(height) {
    let systemInfo = env.execBD('getSystemInfoSync');
    if (systemInfo) {
        let windowHeight = systemInfo.windowHeight;
        let stageHeight = screen.getHeight();
        return height * windowHeight / stageHeight;
    }
    return height;
}