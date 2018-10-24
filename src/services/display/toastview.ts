import toast from "./toastmanager";
import ui from "./ui";
import screen from "../manager/screen";

export default class ToastView extends ui {

    static show(params, onHide) {
        toast.showToast(this, params, onHide);
    }

    static hide() {
        toast.hideToast(this);
    }

    public toast;
    public params;
    public duration = 200;
    public displayDuration = 1000;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;
    public onShow?(): void;
    public onHide?(): void;

    constructor() {
        super(() => { this.hide() });
        this.width = screen.getWidth();
        this.height = screen.getHeight();
    }

    public hide() {
        toast.hideToast(this.toast, this);
    }

}