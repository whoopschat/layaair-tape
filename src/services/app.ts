import platform from "../utils/platform";
import { fbApp } from "./platform/facebook/app";
import { wxApp } from "./platform/wechat/app";
import { conchApp } from "./platform/conch/app";
import { h5App } from "./platform/h5/app";

function _get() {
    if (platform.isFacebookApp()) {
        return fbApp;
    } else if (platform.isWechatApp()) {
        return wxApp;
    } else if (platform.isConchApp()) {
        return conchApp;
    } else {
        return h5App;
    }
}

export default _get();
