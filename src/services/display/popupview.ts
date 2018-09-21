import popup from "./popupmanager";
import screen from "../manager/screen";

export default class PopupView extends Laya.Sprite {

    static show(params, onHide) {
        popup.showPopup(this, params, onHide);
    }

    static hide(result) {
        popup.hidePopup(this, null, result);
    }

    public popup;
    public params;
    public duration = 500;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public onShow?(): void;
    public onHide?(): void;

    public bgAlpha = 0.5;
    public bgColor = '#000000';
    public isTranslucent = false;
    public canceledOnTouchOutside = false;

    public set ui(view) {
        this.removeChildren();
        view.name = '_contentView';
        this.addChild(view);
    }

    public get ui(): Laya.Sprite {
        return this.getChildByName('_contentView') as Laya.Sprite;
    }

    private initBackground() {
        if (this.isTranslucent) {
            return;
        }
        let bgSprite = new Laya.Sprite();
        bgSprite.alpha = this.bgAlpha;
        bgSprite.graphics.clear();
        bgSprite.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this.bgColor);
        bgSprite.x = -screen.getOffestX();
        bgSprite.y = -screen.getOffestY();
        bgSprite.width = Laya.stage.width;
        bgSprite.height = Laya.stage.height;
        bgSprite.on(Laya.Event.CLICK, this, (e) => {
            if (this.canceledOnTouchOutside) {
                this.finish();
            }
            e.stopPropagation();
        });
        if (this.canceledOnTouchOutside && this.ui) {
            this.ui.mouseThrough = true;
        }
        this.addChildAt(bgSprite, 0);
    }

    public finish(result = null) {
        popup.hidePopup(this.popup, this, result);
    }

    constructor() {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        setTimeout(() => this.initBackground(), 0);
    }

}