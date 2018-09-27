export interface IInit {
    start(callback: () => void): void;
    exit(): void;
    onLoaded(): void;
    onLoadProgress(progress): void;
}

export interface IAd {
    isSupportedRewardedVideoAd(): boolean;
    configRewardedVideoAd(platform: string, adId: string): void;
    watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void): void;
}

export interface IApp {
    shareAsync(options: object): Promise<any>;
    onShare(callback: () => object): void;
    getUserInfo(callback: (userinfo: object) => void): void;
    onPause(callback: () => void): void;
    onLaunch(callback: (options: object) => void);
}

export interface IRank {
    isSupportedRank(): boolean;
    createRankView(x?: number, y?: number, width?: number, height?: number): Laya.Sprite;
    setRankKey(key: string, count?: number, offset?: number): void;
    setRankScore(key: string, score: number, extraData?: string): void;
    showRank(ui: object | object[]): void;
    hideRank(): void;
}