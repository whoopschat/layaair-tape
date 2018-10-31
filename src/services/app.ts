import platform from "../utils/platform";
import { fbApp } from "./platform/fb/app";
import { qqApp } from "./platform/qq/app";
import { wxApp } from "./platform/wx/app";
import { brApp } from "./platform/br/app";

function _get() {
    if (platform.isFacebookApp()) {
        return fbApp;
    } else if (platform.isWechatApp()) {
        return wxApp;
    } else if (platform.isQQApp()) {
        return qqApp;
    } else {
        return brApp;
    }
}

export default _get();
