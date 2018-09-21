import toast from "./toastmanager";

export default class ToastView extends Laya.Sprite {

    static show(params, onHide) {
        toast.showToast(this, params, onHide);
    }

    public toast;
    public params;
    public duration = 500;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public onShow?(): void;
    public onHide?(): void;

    public set ui(view) {
        this.removeChildren();
        view.name = '_contentView';
        this.addChild(view);
    }

    public get ui() {
        return this.getChildByName('_contentView');
    }

    constructor() {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }

}