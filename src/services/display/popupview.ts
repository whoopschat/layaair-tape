import popup from "./popupmanager";
import ui from "./ui";
import screen from "../manager/screen";

export default class PopupView extends ui {

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
    public isTranslucent = false;
    public canceledOnTouchOutside = false;

    public hide(result = null) {
        popup.hidePopup(this.popup, this, result);
    }

    constructor() {
        super(() => {
            this.hide();
        });
        this.nonPenetrating = true;
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight();
    }

}