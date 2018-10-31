import { IAd } from "../interfaces";

class BrAd implements IAd {

    public isSupportedRewardedVideoAd() {
        return false;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        onError && onError('not support rewardedVideo ad')
    }

    public isSupportedBannerAd() {
        return false;
    }

    public configBannerAd(platform: string, adId: string) {
        // do nothing
    }

    public showBannerAd(x: number, y: number, w: number, h: number, onError?: (error: any) => void) {
        onError && onError('not support banner ad')
    }

    public hideBannerAd() {
        // do nothing
    }

}

export const brAd = new BrAd;