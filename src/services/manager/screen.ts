import { initBg } from "./bg";

let __offset_x__ = 0;
let __offset_y__ = 0;
let __design_width__ = 0;
let __design_height__ = 0;

export function initScreen(is3D, width, height, ...options) {
    __design_width__ = width;
    __design_height__ = height;
    let screenRatio = Laya.Browser.clientHeight / laya.utils.Browser.clientWidth;
    let initRatio = height / width;
    let initWidth = width;
    let initHeight = height;
    __offset_x__ = 0;
    __offset_y__ = 0;
    if (Math.abs(screenRatio / initRatio - 1) > 0.1) {
        if (screenRatio > initRatio) {
            initHeight = width * screenRatio;
            __offset_y__ = (initHeight - height) / 2;
        } else {
            initWidth = height / screenRatio;
            __offset_x__ = (initWidth - width) / 2;
        }
    }
    if (is3D) {
        Laya3D.init.apply(this, [initWidth, initHeight, ...options]);
    } else {
        Laya.init.apply(this, [initWidth, initHeight, ...options]);
    }
    initBg();
    Laya.stage.x = __offset_x__;
    Laya.stage.y = __offset_y__;
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
}

function getOffestX() {
    return __offset_x__;
}

function getOffestY() {
    return __offset_y__;
}

function getDesignWidth() {
    return __design_width__;
}

function getDesignHeight() {
    return __design_height__;
}

export default {
    getOffestX,
    getOffestY,
    getDesignWidth,
    getDesignHeight,
}