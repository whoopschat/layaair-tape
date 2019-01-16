import { initBg } from "./bg";
import { initUI } from "./uimgr";

let _offset_x = 0;
let _offset_y = 0;
let _design_width = 0;
let _design_height = 0;
let _deviation = 0.1;

export function initScreen(is3D, width, height, ...options) {
    _design_width = width;
    _design_height = height;
    let screenRatio = Laya.Browser.clientHeight / laya.utils.Browser.clientWidth;
    let initRatio = height / width;
    let initWidth = width;
    let initHeight = height;
    _offset_x = 0;
    _offset_y = 0;
    if (Math.abs(screenRatio / initRatio - 1) > _deviation) {
        if (screenRatio > initRatio) {
            initHeight = width * screenRatio;
            _offset_y = (initHeight - height) / 2;
        } else {
            initWidth = height / screenRatio;
            _offset_x = (initWidth - width) / 2;
        }
    }
    if (is3D) {
        Laya3D.init.apply(this, [initWidth, initHeight, ...options]);
    } else {
        Laya.init.apply(this, [initWidth, initHeight, ...options]);
    }
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    initBg();
    initUI(_offset_x, _offset_y)
}

function setDeviation(deviation) {
    this._deviation = deviation;
}

function getWidth() {
    return Laya.stage.width;
}

function getHeight() {
    return Laya.stage.height;
}

function getOffestX() {
    return _offset_x;
}

function getOffestY() {
    return _offset_y;
}

function getDesignWidth() {
    return _design_width;
}

function getDesignHeight() {
    return _design_height;
}

export default {
    setDeviation,
    getWidth,
    getHeight,
    getOffestX,
    getOffestY,
    getDesignWidth,
    getDesignHeight,
}