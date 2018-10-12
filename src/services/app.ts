import platform from "../utils/platform";
import { fbApp } from "./platform/facebook/app";
import { wxApp } from "./platform/wechat/app";
import { browserApp } from "./platform/browser/app";

function _get() {
    if (platform.isFacebookApp()) {
        return fbApp;
    } else if (platform.isWechatApp()) {
        return wxApp;
    } else {
        return browserApp;
    }
}

export default _get();
