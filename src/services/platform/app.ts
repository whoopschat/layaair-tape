import env from "../../utils/env";
import app_fb from "./app/app_fb";
import app_qq from "./app/app_qq";
import app_wx from "./app/app_wx";
import app_bd from "./app/app_bd";
import app_br from "./app/app_br";

function _get() {
    if (env.isFacebookApp()) {
        return app_fb;
    } else if (env.isQQApp()) {
        return app_qq;
    } else if (env.isWechatApp()) {
        return app_wx;
    } else if (env.isBaiduApp()) {
        return app_bd;
    } else {
        return app_br;
    }
}

export default _get();
