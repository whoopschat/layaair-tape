import platform from "../utils/platform";
import { wxAd } from "./platform/wechat/ad";
import { fbAd } from "./platform/facebook/ad";

function configRewardedVideoAd(platformStr: string, adId: string) {
    if (platform.isFacebookApp()) {
        return fbAd.configRewardedVideoAd(platformStr, adId);
    } else if (platform.isWechatApp()) {
        return wxAd.configRewardedVideoAd(platformStr, adId);
    }
}

function watchRewardedVideoAd(onRewarded, onCancal, onError) {
    if (platform.isFacebookApp()) {
        return fbAd.watchRewardedVideoAd(onRewarded, onCancal, onError);
    } else if (platform.isWechatApp()) {
        return wxAd.watchRewardedVideoAd(onRewarded, onCancal, onError);
    } else {
        onError && onError({
            errMsg: 'not support rewardedVideo ad',
            err_code: -1
        });
    }
}

export default {
    configRewardedVideoAd,
    watchRewardedVideoAd
}