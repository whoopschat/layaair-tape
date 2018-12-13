import env from "../../utils/env";
import rank_fb from "./rank/rank_fb";
import rank_qq from "./rank/rank_qq";
import rank_wx from "./rank/rank_wx";
import rank_bd from "./rank/rank_bd";
import rank_br from "./rank/rank_br";

function _get() {
    if (env.isFacebookApp()) {
        return rank_fb;
    } else if (env.isQQApp()) {
        return rank_qq;
    } else if (env.isWechatApp()) {
        return rank_wx;
    } else if (env.isBaiduApp()) {
        return rank_bd;
    } else {
        return rank_br;
    }
}

export default _get();
