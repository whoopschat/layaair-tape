import { IAd } from "../interfaces";

class ConchAd implements IAd {

    public configRewardedVideoAd(platform: string, adId: string) {
    }

    public watchRewardedVideoAd(onRewarded?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        onError && onError({
            errMsg: 'not support rewardedVideo ad',
            err_code: -1
        });
    }

}

export const conchAd = new ConchAd;