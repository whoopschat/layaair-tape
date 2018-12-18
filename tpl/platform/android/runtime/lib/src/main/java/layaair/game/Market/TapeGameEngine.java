package layaair.game.Market;

import android.content.Context;
import android.os.Bundle;
import android.view.View;

import java.util.ArrayList;
import java.util.List;

import layaair.game.conch.ILayaEventListener;
import layaair.game.conch.ILayaGameEgine;
import layaair.game.conch.LayaConch5;

public class TapeGameEngine {

    static List<ITapeGameMarket> MARKETS = new ArrayList<>();

    public static void registerMarket(ITapeGameMarket market) {
        if (market != null && !MARKETS.contains(market)) {
            MARKETS.add(market);
        }
    }

    public static void unregisterMarket(ITapeGameMarket market) {
        if (market != null && MARKETS.contains(market)) {
            MARKETS.remove(market);
        }
    }

    private ILayaGameEgine mGameEngine = null;
    private Context mContext = null;
    private String mGameUrl = null;
    private int mDownloadThreadNum = 3;
    private boolean mLocalize = false;
    private String mExpansionMainPath = "";
    private String mExpansionPatchPath = "";
    private OnEngineCallback engineCallback = null;

    public TapeGameEngine(Context context) {
        this.mContext = context;
    }

    public void setGameUrl(String gameUrl) {
        this.mGameUrl = gameUrl;
    }

    public void setLocalize(boolean localize) {
        this.mLocalize = localize;
    }

    public void setDownloadThreadNum(int downloadThreadNum) {
        this.mDownloadThreadNum = downloadThreadNum;
    }

    public void setExpansionMainPath(String expansionMainPath) {
        this.mExpansionMainPath = expansionMainPath;
    }

    public void setExpansionPatchPath(String expansionPatchPath) {
        this.mExpansionPatchPath = expansionPatchPath;
    }

    public void setEngineCallback(OnEngineCallback engineCallback) {
        this.engineCallback = engineCallback;
    }

    public void beginEngine() {
        if (this.mGameUrl == null || this.mGameUrl.length() < 2) {
            return;
        }
        Bundle bundle = new Bundle();
        bundle.putString(LayaConch5.MARKET_MARKETNAME, TapeGameMarket.class.getSimpleName());
        bundle.putInt(LayaConch5.MARKET_WAITSCREENBKCOLOR, 0);
        bundle.putInt(LayaConch5.MARKET_ENTERPLATFORMTYPE, 0);
        bundle.putString(LayaConch5.MARKET_EXITSHOWWEBURL, "");
        bundle.putString(LayaConch5.MARKET_SERVERNAME, "");
        bundle.putInt(LayaConch5.MARKET_PAYTYPE, 0);
        bundle.putInt(LayaConch5.MARKET_LOGINTYPE, 1);
        bundle.putInt(LayaConch5.MARKET_CHARGETYPE, 0);
        LayaConch5.setMarketBundle(bundle);

        this.mGameEngine = new LayaConch5(this.mContext);
        mGameEngine.setLocalizable(mLocalize);
        mGameEngine.setIsPlugin(false);
        mGameEngine.setGameUrl(mGameUrl);
        mGameEngine.setDownloadThreadNum(this.mDownloadThreadNum);
        mGameEngine.setAppCacheDir(getCacheDir());
        mGameEngine.setExpansionZipDir(this.mExpansionMainPath, this.mExpansionPatchPath);
        mGameEngine.setAssetInfo(this.mContext.getAssets());
        mGameEngine.setLayaEventListener(new ILayaEventListener() {
            @Override
            public void ExitGame() {
                if (engineCallback != null) {
                    engineCallback.onGameExit();
                }
            }

            @Override
            public void destory() {
            }

            @Override
            public void showAssistantTouch(boolean b) {
            }

        });
        mGameEngine.setInterceptKey(false);
        mGameEngine.onCreate();
    }

    public View getView() {
        return this.mGameEngine.getAbsLayout();
    }

    public void onPause() {
        this.mGameEngine.onPause();
    }

    public void onResume() {
        this.mGameEngine.onResume();
    }

    public void onStop() {
        this.mGameEngine.onStop();
    }

    public void onDestroy() {
        this.mGameEngine.onDestroy();
    }

    private String getCacheDir() {
        String sCache = this.mContext.getCacheDir().toString();
        String[] vString = sCache.split("/");
        StringBuilder sNewCache = new StringBuilder();
        for (int i = 0; i < vString.length - 1; i++) {
            sNewCache.append(vString[i]);
            sNewCache.append("/");
        }
        return sNewCache.toString();
    }

}
