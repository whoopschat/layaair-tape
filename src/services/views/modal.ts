import screen from "../manager/screen";
import { BgView } from "./bg";

function _btnEffect(view: Laya.Label) {
    view.offAll();
    view.on(Laya.Event.MOUSE_DOWN, view, () => {
        view.bgColor = '#666666';
        view.alpha = 0.2;
    });
    view.on(Laya.Event.MOUSE_UP, view, () => {
        view.bgColor = '#eeeeee';
        view.alpha = 1;
    });
    view.on(Laya.Event.MOUSE_OUT, view, () => {
        view.bgColor = '#eeeeee';
        view.alpha = 1;
    });
}

export class ModalContentView extends Laya.Sprite {

    private _maxW = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _radius = 0;
    private _btnHeight = 0;
    private _titleView = null;
    private _contentView = null;
    private _bgView = null;
    private _btnsView = null;
    private _cancelBtn = null;
    private _confirmBtn = null;
    private _lineView = null;
    private _line2View = null;
    private _lineHeight = 0;
    private _callback = null;

    constructor() {
        super();
        let size = Math.min(screen.getDesignWidth(), screen.getDesignHeight());
        this._maxW = size * 0.9;
        this._padding = size * 0.08;
        this._fontSize = size * 0.06;
        this._btnHeight = size * 0.18;
        this._lineHeight = size * 0.005;
        this._radius = 0;
        this._initBg();
        this._initTitle();
        this._initContent();
        this._initButton();
    }

    private _initBg() {
        this._bgView = new BgView();
        this._bgView.name = 'bg';
        this._bgView.color = '#eeeeee';
        this._bgView.radius = this._radius;
        this.addChild(this._bgView);
    }

    private _initTitle() {
        this._titleView = new Laya.Label()
        this._titleView.align = Laya.Stage.ALIGN_CENTER;
        this._titleView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._titleView.bold = true;
        this._titleView.wordWrap = true;
        this._titleView.name = 'title';
        this._titleView.fontSize = this._fontSize * 1.2;
        this._titleView.color = '#333333';
        this._titleView.x = this._padding;
        this._titleView.y = this._padding;
        this.addChild(this._titleView);
    }

    private _initContent() {
        this._contentView = new Laya.Label()
        this._contentView.align = Laya.Stage.ALIGN_CENTER;
        this._contentView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._contentView.wordWrap = true;
        this._contentView.name = 'content';
        this._contentView.fontSize = this._fontSize;
        this._contentView.color = '#666666';
        this._contentView.x = this._padding;
        this._contentView.y = this._padding;
        this.addChild(this._contentView);
    }

    private _initButton() {
        this._btnsView = new Laya.Label;
        this._lineView = new Laya.Label;
        this._lineView.bgColor = '#666666';
        this._lineView.alpha = 0.2;
        this._lineView.height = this._lineHeight;

        this._line2View = new Laya.Label;
        this._line2View.bgColor = '#666666';
        this._line2View.alpha = 0.2;
        this._line2View.height = this._btnHeight - this._lineHeight;
        this._line2View.width = this._lineHeight;
        this._line2View.y = this._lineHeight;

        this._btnsView.height = this._btnHeight;

        this._cancelBtn = new Laya.Label;
        this._cancelBtn.align = Laya.Stage.ALIGN_CENTER;
        this._cancelBtn.valign = Laya.Stage.ALIGN_MIDDLE;
        this._cancelBtn.height = this._btnHeight;
        this._cancelBtn.fontSize = this._fontSize;

        this._confirmBtn = new Laya.Label;
        this._confirmBtn.align = Laya.Stage.ALIGN_CENTER;
        this._confirmBtn.valign = Laya.Stage.ALIGN_MIDDLE;
        this._confirmBtn.height = this._btnHeight;
        this._confirmBtn.fontSize = this._fontSize;

        _btnEffect(this._cancelBtn);
        _btnEffect(this._confirmBtn);

        this._btnsView.addChild(this._cancelBtn);
        this._btnsView.addChild(this._confirmBtn);
        this._btnsView.addChild(this._lineView);
        this._btnsView.addChild(this._line2View);

        this._confirmBtn.on(Laya.Event.CLICK, this, () => {
            this._callback && this._callback({
                confirm: true,
                cancel: false
            })
        })
        this._cancelBtn.on(Laya.Event.CLICK, this, () => {
            this._callback && this._callback({
                confirm: false,
                cancel: true
            })
        })
        this.addChild(this._btnsView);
    }

    public setContent(title, content, showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3cc51f', callback = null) {

        this._callback = callback;

        this._cancelBtn.fontSize = this._fontSize;
        this._cancelBtn.text = cancelText;
        this._cancelBtn.color = cancelColor;

        this._confirmBtn.fontSize = this._fontSize;
        this._confirmBtn.text = confirmText;
        this._confirmBtn.color = confirmColor;

        this._titleView.width = this._maxW;
        this._contentView.width = this._maxW;

        if (title) {
            this._titleView.height = undefined;
            this._titleView.text = title;
        } else {
            this._titleView.height = 0;
        }

        if (content) {
            this._contentView.height = undefined;
            this._contentView.text = content;
            this._contentView.y = this._titleView.y + this._titleView.height + this._padding / 2;
        } else {
            this._contentView.height = 0;
            this._contentView.y = this._titleView.y + this._titleView.height;
        }

        this._btnsView.y = this._contentView.height + this._contentView.y + this._padding;

        this._bgView.height = this._btnsView.height + this._btnsView.y;
        this._bgView.width = this._titleView.width + 2 * this._padding;

        this._lineView.width = this._bgView.width;
        this._btnsView.width = this._bgView.width;

        if (showCancel) {
            this._line2View.visible = true;
            this._cancelBtn.visible = true;
            this._line2View.x = this._btnsView.width / 2;
            this._cancelBtn.width = this._btnsView.width / 2;
            this._confirmBtn.x = this._btnsView.width / 2;
            this._confirmBtn.width = this._btnsView.width / 2;
        } else {
            this._line2View.visible = false;
            this._cancelBtn.visible = false;
            this._confirmBtn.x = 0;
            this._confirmBtn.width = this._btnsView.width;
        }

        this._bgView.callDraw();
        this.x = (screen.getDesignWidth() - this._bgView.width) / 2;
        this.y = (screen.getDesignHeight() - this._bgView.height) / 2;

    }

}