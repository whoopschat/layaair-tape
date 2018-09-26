import platform from "../utils/platform";
import { wxAd } from "./platform/wechat/ad";
import { fbAd } from "./platform/facebook/ad";
import { conchAd } from "./platform/conch/ad";
import { h5Ad } from "./platform/h5/ad";

function _get() {
    if (platform.isFacebookApp()) {
        return fbAd;
    } else if (platform.isWechatApp()) {
        return wxAd;
    } else if (platform.isConchApp()) {
        return conchAd;
    } else {
        return h5Ad;
    }
}

export default _get();