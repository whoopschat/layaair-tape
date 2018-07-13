class LoadingActivity extends Tape.Activity {

    static res = [
        { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
        { url: 'res/config.json', type: Laya.Loader.JSON }
    ];

    onCreate() {
        this.redirectTo(MainActivity);
    }

}