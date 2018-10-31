import platform from "../utils/platform";
import { fbRank } from "./platform/fb/rank";
import { qqRank } from "./platform/qq/rank";
import { wxRank } from "./platform/wx/rank";
import { brRank } from "./platform/br/rank";

function _get() {
    if (platform.isFacebookApp()) {
        return fbRank;
    } else if (platform.isWechatApp()) {
        return wxRank;
    } else if (platform.isQQApp()) {
        return qqRank;
    } else {
        return brRank;
    }
}

export default _get();
