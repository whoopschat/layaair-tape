package com.ezgame.runtime;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.view.KeyEvent;
import android.view.View;

import layaair.game.Market.EZBridgeManager;
import layaair.game.Market.EZGameEngine;
import layaair.game.Market.EZGamePlayer;
import layaair.game.Market.IEZGameMarket;
import layaair.game.Market.OnEngineListener;
import layaair.game.Market.OnMarketCallback;

public abstract class EZGameActivity extends Activity implements IEZGameMarket, OnEngineListener {

    private String mGameUrl = null;
    private EZGamePlayer mGamePlayer = null;
    private Handler mHandler = new Handler();

    @Override
    public void onGameExit() {
        finish();
    }

    @Override
    public void onGameMessage(String jsonParam, OnMarketCallback callback) {
        EZBridgeManager.handleOnMessage(this, jsonParam, callback);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ez_game_activity);
        EZGameEngine.registerMarket(this);
        mGamePlayer = findViewById(R.id.ez_game_player_view);
        mGamePlayer.setEngineListener(this);
        if (mGameUrl != null) mGamePlayer.setGameUrl(mGameUrl);
        mHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                mGamePlayer.setVisibility(View.VISIBLE);
            }
        }, 2000);
    }

    protected void setGameUrl(String url) {
        if (url == null) return;
        mGameUrl = url;
        if (mGamePlayer != null) mGamePlayer.setGameUrl(mGameUrl);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return keyCode == KeyEvent.KEYCODE_BACK || super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onResume() {
        super.onResume();
        this.mGamePlayer.resume();
        EZBridgeManager.handleOnResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        this.mGamePlayer.pause();
        EZBridgeManager.handleOnPause(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        this.mGamePlayer.destroy();
        EZGameEngine.unregisterMarket(this);
    }

}
