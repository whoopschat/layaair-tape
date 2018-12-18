package layaair.game.Market;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class TapeGamePlayer extends FrameLayout {

    private String mUrl = null;
    private TapeGameEngine gameEngine = null;
    private OnEngineCallback listener = null;
    private int mDownloadThreadNum = 3;

    public TapeGamePlayer(Context context) {
        super(context);
    }

    public TapeGamePlayer(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public TapeGamePlayer(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setEngineListener(OnEngineCallback listener) {
        this.listener = listener;
    }

    public void setDownloadThreadNum(int mDownloadThreadNum) {
        this.mDownloadThreadNum = mDownloadThreadNum;
    }

    public TapeGameEngine getGameEngine() {
        return gameEngine;
    }

    public void setGameUrl(String url) {
        if (url == null || url.equals(mUrl)) {
            return;
        }
        removeAllViews();
        destroy();
        this.mUrl = url;
        gameEngine = new TapeGameEngine(getContext());
        gameEngine.setGameUrl(mUrl);
        gameEngine.setLocalize(mUrl.contains("stand.alone.version"));
        gameEngine.setDownloadThreadNum(mDownloadThreadNum);
        gameEngine.setEngineCallback(new OnEngineCallback() {

            @Override
            public void onGameExit() {
                if (listener != null) {
                    listener.onGameExit();
                }
            }

        });
        gameEngine.beginEngine();
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
