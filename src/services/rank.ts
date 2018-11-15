import env from "../utils/env";
import { fbRank } from "./platform/fb/rank";
import { qqRank } from "./platform/qq/rank";
import { wxRank } from "./platform/wx/rank";
import { brRank } from "./platform/br/rank";

function _get() {
    if (env.isFacebookApp()) {
        return fbRank;
    } else if (env.isWechatApp()) {
        return wxRank;
    } else if (env.isQQApp()) {
        return qqRank;
    } else {
        return brRank;
    }
}

export default _get();
