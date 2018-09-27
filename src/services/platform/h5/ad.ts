import { IAd } from "../interfaces";

class H5Ad implements IAd {

    public supportRewardedVideoAd() {
        return false;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        onError && onError('not support rewardedVideo ad')
    }

}

export const h5Ad = new H5Ad;