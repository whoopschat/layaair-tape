import platform from "../utils/platform";
import { wxRank } from "./platform/wechat/rank";
import { fbRank } from "./platform/facebook/rank";
import { conchRank } from "./platform/conch/rank";
import { h5Rank } from "./platform/h5/rank";

function _get() {
    if (platform.isFacebookApp()) {
        return fbRank;
    } else if (platform.isWechatApp()) {
        return wxRank;
    } else if (platform.isConchApp()) {
        return conchRank;
    } else {
        return h5Rank;
    }
}

export default _get();
