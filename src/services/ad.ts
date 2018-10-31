import platform from "../utils/platform";
import { fbAd } from "./platform/fb/ad";
import { wxAd } from "./platform/wx/ad";
import { qqAd } from "./platform/qq/ad";
import { brAd } from "./platform/br/ad";

function _get() {
    if (platform.isFacebookApp()) {
        return fbAd;
    } else if (platform.isWechatApp()) {
        return wxAd;
    } else if (platform.isQQApp()) {
        return qqAd;
    } else {
        return brAd;
    }
}

export default _get();