package layaair.game.Market;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class EZGamePlayer extends FrameLayout {

    private String mUrl = null;
    private EZGameEngine gameEngine = null;
    private OnEngineListener listener = null;
    private int mDownloadThreadNum = 3;

    public EZGamePlayer(Context context) {
        super(context);
    }

    public EZGamePlayer(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public EZGamePlayer(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setEngineListener(OnEngineListener listener) {
        this.listener = listener;
    }

    public void setDownloadThreadNum(int mDownloadThreadNum) {
        this.mDownloadThreadNum = mDownloadThreadNum;
    }

    public EZGameEngine getGameEngine() {
        return gameEngine;
    }

    public void setGameUrl(String url) {
        if (url == null || url.equals(mUrl)) {
            return;
        }
        removeAllViews();
        destroy();
        this.mUrl = url;
        gameEngine = new EZGameEngine(getContext());
        gameEngine.setGameUrl(mUrl);
        gameEngine.setLocalize(mUrl.contains("stand.alone.version"));
        gameEngine.setDownloadThreadNum(mDownloadThreadNum);
        gameEngine.setEngineListener(new OnEngineListener() {

            @Override
            public void onGameExit() {
                if (listener != null) {
                    listener.onGameExit();
                }
            }

        });
        gameEngine.initEngine();
        addView(gameEngine.getView());
        gameEngine.onResume();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        destroy();
    }

    public void pause() {
        if (gameEngine != null) {
            gameEngine.onPause();
        }
    }

    public void resume() {
        if (gameEngine != null) {
            gameEngine.onResume();
        }
    }

    public void destroy() {
        if (gameEngine != null) {
            gameEngine.onPause();
            gameEngine.onStop();
            gameEngine.onDestroy();
            gameEngine = null;
            mUrl = null;
        }
    }

}
