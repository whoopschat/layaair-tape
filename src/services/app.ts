import env from "../utils/env";
import { fbApp } from "./platform/fb/app";
import { qqApp } from "./platform/qq/app";
import { wxApp } from "./platform/wx/app";
import bdApp from "./platform/bd/app";
import { brApp } from "./platform/br/app";

function _get() {
    if (env.isFacebookApp()) {
        return fbApp;
    } else if (env.isQQApp()) {
        return qqApp;
    } else if (env.isWechatApp()) {
        return wxApp;
    } else if (env.isBaiduApp()) {
        return bdApp;
    } else {
        return brApp;
    }
}

export default _get();
