import NavStack from "../navigator/stack";

export default class Activity extends Laya.Component {

    static open(params, action) {
        NavStack.navigate(this, params, action);
    }

    static finish() {
        NavStack.finish(this);
    }

    static res = [];

    public page = null;
    public params = {};
    public duration = 0;
    public easeIn = null;
    public easeOut = null;
    public fromProps = null;
    public toProps = null;

    public onFocus?(focus): void;
    public onCreate?(): void;
    public onResume?(): void;
    public onPause?(): void;
    public onDestroy?(): void;
    public onNextProgress?(progress): void;

    constructor(options) {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.params = Object.assign({}, options.params || {});
        this.page = options.page;
    }

    public set ui(view) {
        view.name = '_contentView';
        this.removeChildren();
        this.addChild(view);
    }

    public get ui() {
        return this.getChildByName('_contentView');
    }

    //////////////////////////
    /// navigator function
    //////////////////////////

    redirectTo(page, params = {}) {
        this.navigate(page, params, () => {
            this.back();
        });
    }

    navigate(page, params = {}, action = null) {
        NavStack.navigate(page, params, action);
    }

    back() {
        NavStack.finish(this.page, this);
    }

    finish(page, instance = null) {
        NavStack.finish(page, instance);
    }

    pop(number = 1) {
        NavStack.pop(number);
    }

    popToTop() {
        NavStack.popToTop();
    }

}