function vibrateForH5(pattern) {
    let vs = ['vibrate', 'webkitVibrate', 'webkitVibrate', 'mozVibrate', 'msVibrate'];
    for (let index = 0; index < vs.length; index++) {
        const element = vs[index];
        if (window && window.navigator && window.navigator[element]) {
            try {
                return window.navigator[element](pattern);
            } catch (error) {
            }
        }
    }
}

function vibrateShort() {
    vibrateForH5([1000])
}

function vibrateLong() {
    vibrateForH5([3000])
}

export default {
    vibrateLong,
    vibrateShort,
}