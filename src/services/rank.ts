import platform from "../utils/platform";
import { wxRank } from "./platform/wechat/rank";
import { fbRank } from "./platform/facebook/rank";
import { browserRank } from "./platform/browser/rank";

function _get() {
    if (platform.isFacebookApp()) {
        return fbRank;
    } else if (platform.isWechatApp()) {
        return wxRank;
    } else {
        return browserRank;
    }
}

export default _get();
