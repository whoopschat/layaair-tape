module Tape {

    export module Background {

        let bgSprite: Laya.Sprite = null;
        let bgColor: string = '#000000';

        export function init() {
            bgSprite = Laya.stage.getChildByName('tape_background_layer') as Laya.Sprite;
            if (!bgSprite) {
                bgSprite = new Laya.Sprite;
                bgSprite.name = 'tape_background_layer';
                Laya.stage.addChild(bgSprite);
            }
            bgSprite.x = -Screen.getOffestX();
            bgSprite.y = -Screen.getOffestY();
            bgSprite.width = Laya.stage.width;
            bgSprite.height = Laya.stage.height;
            bgSprite.graphics.clear();
            bgSprite.graphics.drawRect(0, 0, bgSprite.width, bgSprite.height, bgColor);
        }

        export function getBgSprite(): Laya.Sprite {
            return bgSprite;
        }

        export function setBgColor(color: string) {
            bgColor = color;
            if (!bgSprite) {
                return;
            }
            bgSprite.graphics.clear();
            bgSprite.graphics.drawRect(0, 0, bgSprite.width, bgSprite.height, color);
        }

        export function getBgColor() {
            return bgColor;
        }

    }

}