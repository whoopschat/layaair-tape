class LoadingActivity extends Tape.Activity {

    static res = [
        { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
    ]

    constructor(opts) {
        super(opts);
    }

    onCreate() {
        this.redirectTo(SimpleActivity);
    }

}
