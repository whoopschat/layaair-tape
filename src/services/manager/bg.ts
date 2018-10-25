import screen from "./screen";

let _bgSprite = null;
let _bgColor = '#000000';

export function initBg() {
    _bgSprite = Laya.stage.getChildByName('_tape_bg_layer');
    if (!_bgSprite) {
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        Laya.stage.addChild(_bgSprite);
    }
    _bgSprite.width = screen.getWidth();
    _bgSprite.height = screen.getHeight();
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, _bgColor);
}

function getBgSprite() {
    return _bgSprite;
}

function setBgColor(color) {
    _bgColor = color;
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, color);
}

function getBgColor() {
    return _bgColor;
}

export default {
    getBgSprite,
    setBgColor,
    getBgColor
}