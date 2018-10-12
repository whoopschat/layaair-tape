import platform from "../utils/platform";
import { wxAd } from "./platform/wechat/ad";
import { fbAd } from "./platform/facebook/ad";
import { browserAd } from "./platform/browser/ad";

function _get() {
    if (platform.isFacebookApp()) {
        return fbAd;
    } else if (platform.isWechatApp()) {
        return wxAd;
    } else {
        return browserAd;
    }
}

export default _get();