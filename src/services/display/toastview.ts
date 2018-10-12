import toast from "./toastmanager";
import ui from "./ui";

export default class ToastView extends ui {

    static show(params, onHide) {
        toast.showToast(this, params, onHide);
    }

    static hide() {
        toast.hideToast(this);
    }

    public toast;
    public params;
    public duration = 1000;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public onShow?(): void;
    public onHide?(): void;

    constructor() {
        super(() => { this.hide() });
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }

    public hide() {
        toast.hideToast(this.toast, this);
    }

}