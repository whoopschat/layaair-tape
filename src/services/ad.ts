import env from "../utils/env";
import { fbAd } from "./platform/fb/ad";
import { wxAd } from "./platform/wx/ad";
import { qqAd } from "./platform/qq/ad";
import { brAd } from "./platform/br/ad";

function _get() {
    if (env.isFacebookApp()) {
        return fbAd;
    } else if (env.isWechatApp()) {
        return wxAd;
    } else if (env.isQQApp()) {
        return qqAd;
    } else {
        return brAd;
    }
}

export default _get();