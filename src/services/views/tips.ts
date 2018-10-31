import screen from "../manager/screen";
import { BgView } from "./bg";
import { IconView } from "./icon";

export class TipsView extends Laya.Sprite {

    private _maxWidth = 0;
    private _minWidth = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _radius = 0;
    private _bgView = null;
    private _iconView: IconView = null;
    private _iconSize = 0;
    private _titleView = null;

    constructor() {
        super();
        let size = Math.min(screen.getDesignWidth(), screen.getDesignHeight());
        this._maxWidth = size * 0.6;
        this._minWidth = size * 0.4;
        this._iconSize = size * 0.15;
        this._padding = size * 0.08;
        this._fontSize = size * 0.06;
        this._radius = 0;
        this._initBg();
        this._initIcon();
        this._initTitle();
    }

    private _initBg() {
        this._bgView = new BgView();
        this._bgView.name = '_bg';
        this._bgView.alpha = 0.6;
        this._bgView.color = '#333333';
        this._bgView.radius = this._radius;
        this.addChild(this._bgView);
    }

    private _initIcon() {
        this._iconView = new IconView;
        this._iconView.setSize(this._iconSize);
        this._iconView.name = '_icon';
        this.addChild(this._iconView);
    }

    private _initTitle() {
        this._titleView = new Laya.Label()
        this._titleView.align = Laya.Stage.ALIGN_CENTER;
        this._titleView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._titleView.wordWrap = true;
        this._titleView.name = '_title';
        this._titleView.fontSize = this._fontSize;
        this._titleView.color = '#ffffff';
        this._titleView.x = this._padding;
        this._titleView.y = this._padding;
        this.addChild(this._titleView);
    }

    public setContent(title, icon) {
        let titleY = 0;
        let bgH = 0;

        if (icon && icon != 'none') {
            this._iconView.y = this._padding + this._iconView.height / 2;
            this._iconView.visible = true;
            this._iconView.setSize(this._iconSize);
            this._iconView.setIcon(icon);
            titleY = this._iconView.y + this._iconView.height / 2 + this._padding / 4;
            bgH = this._iconView.height + 2 * this._padding;
        } else {
            this._iconView.visible = false;
            titleY = this._padding;
        }

        if (title) {
            this._titleView.width = undefined;
            this._titleView.visible = true;
            this._titleView.text = title;
            if (this._titleView.width > this._maxWidth) {
                this._titleView.width = this._maxWidth;
            } else if (this._titleView.width < this._minWidth) {
                this._titleView.width = this._minWidth;
            }
            this._titleView.y = titleY;
            bgH = this._titleView.height + this._titleView.y + this._padding;
        } else {
            this._titleView.visible = false;
        }

        this._bgView.height = bgH;
        this._bgView.width = Math.max(this._titleView.width, this._iconView.width) + 2 * this._padding;
        this._bgView.callDraw();

        this._iconView.x = this._bgView.width / 2;

        this.x = (screen.getDesignWidth() - this._bgView.width) / 2;
        this.y = (screen.getDesignHeight() - this._bgView.height) / 2;

        // if (title) {
        //     this._iconView.y = this._padding / 2 + this._iconView.height / 2;
        //     this._titleView.width = undefined;
        //     this._titleView.visible = true;
        //     this._titleView.text = title;
        //     if (this._titleView.width > this._maxWidth) {
        //         this._titleView.width = this._maxWidth;
        //     } else if (this._titleView.width < this._minWidth) {
        //         this._titleView.width = this._minWidth;
        //     }
        //     this._titleView.y = this._iconView.y + this._iconView.height / 2 + this._padding / 4;

        //     this._bgView.height = this._titleView.height + this._titleView.y + this._padding / 2;
        //     this._bgView.width = this._titleView.width + 2 * this._padding;
        // } else {
        //     this._iconView.y = this._padding + this._iconView.height / 2;
        //     this._titleView.visible = false;
        //     this._bgView.height = this._iconView.height + 2 * this._padding;
        //     this._bgView.width = this._iconView.width + 2 * this._padding;
        // }
        // this._iconView.setIcon(icon);

    }

}


