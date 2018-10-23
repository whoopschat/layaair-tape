function createToastView() {
    let view = new Laya.Sprite();
    let size = Math.min(Tape.screen.getWidth(), Tape.screen.getHeight());
    let width = size * 0.6;
    let minWidth = size * 0.4;
    let padding = size * 0.04;
    let fontSize = size * 0.04;

    let bg = new BgView();
    bg.alpha = 0.6;
    bg.color = '#333333';
    bg.radius = 0;
    view.addChild(bg);

    let text = new Laya.Label();
    text.align = Laya.Stage.ALIGN_CENTER;
    text.valign = Laya.Stage.ALIGN_MIDDLE;
    text.wordWrap = true;
    text.name = 'text';
    text.fontSize = fontSize;
    text.color = '#ffffff';
    text.text = '金币不足请充值';
    text.x = padding;
    text.y = padding;
    if (text.width > width) {
        text.width = width;
    } else if (text.width < minWidth) {
        text.width = minWidth;
    }
    view.addChild(text);

    bg.height = text.height + 2 * padding;
    bg.width = text.width + 2 * padding;
    bg.callDraw();

    view.x = (Tape.screen.getWidth() - bg.width) / 2 - Tape.screen.getOffestX();
    view.y = (Tape.screen.getHeight() - bg.height) / 2 - Tape.screen.getOffestY();
    return view;
}

class TestToast extends Tape.ToastView {

    ui = new ToastTextView;

    constructor() {
        super();
    }

    onShow() {
        this.canceledOnTouchOutside = true;
        let text = '请重新登录';
        this.ui.text = text;
        console.log('onShow', this);
    }

}
