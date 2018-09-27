import platform from "../../../utils/platform";
import { IAd } from "../interfaces";

class FBAd implements IAd {

    private _adId = '';

    public supportRewardedVideoAd() {
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

}

export const fbAd = new FBAd;