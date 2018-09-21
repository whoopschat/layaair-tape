export interface IInitialize {
    start(callback: () => void): void;
    exit(): void;
    onLoaded(): void;
    setLoadingProgress(percentage: number): void;
}

export interface IApp {
    shareAsync(options: object): Promise<any>;
    onShare(callback: () => object): void;
    onPause(callback: () => void): void;
    onLaunch(callback: (options: object) => void);
}

export interface IRank {
    createRankView(x?: number, y?: number, width?: number, height?: number): Laya.Sprite;
    setRankKey(key: string, count?: number, offset?: number): void;
    setRankScore(key: string, score: number, extraData?: string): void;
    showRank(ui: object | object[]): void;
    hideRank(): void;
}

export interface IAd {

}