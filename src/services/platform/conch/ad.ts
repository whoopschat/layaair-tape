import { IAd } from "../interfaces";

class ConchAd implements IAd {

    public isSupportedRewardedVideoAd() {
        return false;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        onError && onError('not support rewardedVideo ad')
    }

}

export const conchAd = new ConchAd;