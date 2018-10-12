import platform from "../../../utils/platform";
import { IAd } from "../interfaces";

class FBAd implements IAd {

    private _adId = '';

    public isSupportedRewardedVideoAd() {
        return true;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == 'facebook') {
            this._adId = adId;
        }
    }

    public watchRewardedVideoAd(onWatch?: () => void, _onCancal?: () => void, onError?: (error: any) => void) {
        let rewardedVideoAd = null;
        platform.execFB('getRewardedVideoAsync', this._adId).then(function (rewardedVideo) {
            rewardedVideoAd = rewardedVideo;
            return rewardedVideoAd.loadAsync();
        }).catch(function (err) {
            onError && onError(err.message || 'load rewarded video fail');
            throw err;
        }).then(function () {
            return rewardedVideoAd.showAsync()
                .then(() => {
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
        onError && onError('not support banner ad')
    }

    public hideBannerAd() {
        // do nothing
    }

}

export const fbAd = new FBAd;