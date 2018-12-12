import env from "../utils/env";
import { fbAd } from "./platform/fb/ad";
import { qqAd } from "./platform/qq/ad";
import { wxAd } from "./platform/wx/ad";
import bdAd from "./platform/bd/ad";
import { brAd } from "./platform/br/ad";

function _get() {
    if (env.isFacebookApp()) {
        return fbAd;
    } else if (env.isQQApp()) {
        return qqAd;
    } else if (env.isWechatApp()) {
        return wxAd;
    } else if (env.isBaiduApp()) {
        return bdAd;
    } else {
        return brAd;
    }
}

export default _get();