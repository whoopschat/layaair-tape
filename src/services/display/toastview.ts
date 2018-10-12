import toast from "./toastmanager";
import ui from "./ui";

export default class ToastView extends ui {

    static show(params, onHide) {
        toast.showToast(this, params, onHide);
    }

    public toast;
    public params;
    public duration = 5000;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public onShow?(): void;
    public onHide?(): void;

    constructor() {
        super(() => { toast.hideToast(this.toast, this) });
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }

}