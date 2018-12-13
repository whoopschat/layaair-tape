import env from "../../../utils/env";
import { IAd } from "../_inters";

class Ad implements IAd {

    private _rewardedAdId = '';
    private _rewardedVideoAd = null;
    private _preloadRewardedVideo = false;

    public isSupportedRewardedVideoAd() {
        return true;
    }

    public isPreloadRewardedVideoAd() {
        return this._preloadRewardedVideo;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == env.getPlatform()) {
            this._rewardedAdId = adId;
        }
    }

    public watchRewardedVideoAd(onWatch?: () => void, _onCancal?: () => void, onError?: (error: any) => void) {
        env.execFB('getRewardedVideoAsync', this._rewardedAdId).then((ad) => {
            this._rewardedVideoAd = ad;
            return this._rewardedVideoAd.loadAsync();
        }).catch((err) => {
            onError && onError(err.message || 'load rewarded video fail');
            throw err;
        }).then(() => {
            return this._rewardedVideoAd.showAsync().then(() => {
                onWatch && onWatch();
            }).catch((err) => {
                onError && onError(err.message || 'show rewarded video fail');
            });
        });
    }

    public isSupportedBannerAd() {
        return false;
    }

    public configBannerAd(platform: string, adId: string) {
        // do nothing
    }

    public showBannerAd(x: number, y: number, width: number, height: number, onError?: (error: any) => void) {
        // do nothing
        onError && onError('not support banner ad')
    }

    public hideBannerAd() {
        // do nothing
    }

}

export default new Ad;