import env from "../utils/env";
import { fbApp } from "./platform/fb/app";
import { qqApp } from "./platform/qq/app";
import { wxApp } from "./platform/wx/app";
import { brApp } from "./platform/br/app";

function _get() {
    if (env.isFacebookApp()) {
        return fbApp;
    } else if (env.isWechatApp()) {
        return wxApp;
    } else if (env.isQQApp()) {
        return qqApp;
    } else {
        return brApp;
    }
}

export default _get();
