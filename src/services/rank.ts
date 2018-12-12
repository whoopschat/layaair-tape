import env from "../utils/env";
import { fbRank } from "./platform/fb/rank";
import { qqRank } from "./platform/qq/rank";
import { wxRank } from "./platform/wx/rank";
import { brRank } from "./platform/br/rank";
import bdRank from "./platform/bd/rank";

function _get() {
    if (env.isFacebookApp()) {
        return fbRank;
    } else if (env.isQQApp()) {
        return qqRank;
    } else if (env.isWechatApp()) {
        return wxRank;
    } else if (env.isBaiduApp()) {
        return bdRank;
    } else {
        return brRank;
    }
}

export default _get();
