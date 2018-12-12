import screen from "./screen";

let _bgSprite: Laya.Sprite = null;

export function initBg() {
    _bgSprite = Laya.stage.getChildByName('_tape_bg_layer') as Laya.Sprite;
    if (!_bgSprite) {
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        Laya.stage.addChild(_bgSprite);
    }
    _bgSprite.width = screen.getWidth();
    _bgSprite.height = screen.getHeight();
}

function setBgColor(color) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, color);
}

function setBgTexture(url) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    Laya.loader.load(url, Laya.Handler.create(this, (texture) => {
        try {
            _bgSprite.graphics.fillTexture(texture, 0, 0, _bgSprite.width, _bgSprite.height, 'repeat');
        } catch (error) {
        }
    }));
}

function getBgSprite() {
    return _bgSprite;
}

export default {
    setBgColor,
    setBgTexture,
    getBgSprite,
}