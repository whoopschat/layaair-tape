import platform from "../../utils/platform";

function vibrateForH5(pattern) {
    let vs = ['vibrate', 'webkitVibrate', 'webkitVibrate', 'mozVibrate', 'msVibrate'];
    for (let index = 0; index < vs.length; index++) {
        const element = vs[index];
        if (window && window.navigator && window.navigator[element]) {
            try {
                window.navigator[element](pattern);
                return;
            } catch (error) {
            }
        }
    }
}

function vibrateShort() {
    if (platform.isWechatApp()) {
        platform.execWX('vibrateShort')
    } else {
        vibrateForH5([100])
    }
}

function vibrateLong() {
    if (platform.isWechatApp()) {
        platform.execWX('vibrateLong')
    } else {
        vibrateForH5([1500])
    }
}

export default {
    vibrateLong,
    vibrateShort,
}