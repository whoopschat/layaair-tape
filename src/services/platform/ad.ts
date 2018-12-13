import env from "../../utils/env";
import ad_fb from "./ad/ad_fb";
import ad_qq from "./ad/ad_qq";
import ad_wx from "./ad/ad_wx";
import ad_bd from "./ad/ad_bd";
import ad_br from "./ad/ad_br";

function _get() {
    if (env.isFacebookApp()) {
        return ad_fb;
    } else if (env.isQQApp()) {
        return ad_qq;
    } else if (env.isWechatApp()) {
        return ad_wx;
    } else if (env.isBaiduApp()) {
        return ad_bd;
    } else {
        return ad_br;
    }
}

export default _get();