import Activity from "../display/activity";
import { initLogs, fetchLogs, clearLogs } from "./logger";
import screen from "../manager/screen";

class DebugRenderUI extends Laya.View {

    public static uiView: any = { "type": "View", "props": {}, "child": [{ "type": "Label", "props": { "text": "111111", "name": "logValue", "color": "#333333" } }] };

    constructor() {
        super()
        this.width = screen.getDesignWidth();
        this.height = screen.getDesignHeight() / 3;
    }

    createChildren(): void {
        super.createChildren();
        this.createView(DebugRenderUI.uiView);
    }

}

class DebugUI extends Laya.Sprite {

    private _bgColor = '#ffffff';
    private _menus = ['log', 'debug', 'warn', 'error'];
    private _lastMenu = null;
    private _list: Laya.List = null;

    private selectMenu(menuLabel) {
        if (menuLabel == this._lastMenu) {
            return;
        }
        if (this._lastMenu) {
            this._lastMenu.color = '#666666';
        }
        this._lastMenu = menuLabel;
        this._lastMenu.color = '#ff0000';

        this.refresh();
    }

    constructor() {
        super();
    }

    public init(width, height) {
        this.width = width;
        this.height = height;
        this.graphics.clear();
        this.graphics.drawRect(0, 0, this.width, this.height, this._bgColor);

        this.initTitle();
        this.initTabs();
        this.initList();
    }

    private initTitle() {

        let size = Math.min(this.width, this.height);
        let padding = size * 0.06;


        let btnClear = new Laya.Label;
        btnClear.name = 'btnClear';
        btnClear.align = Laya.Stage.ALIGN_RIGHT;
        btnClear.valign = Laya.Stage.ALIGN_MIDDLE;
        btnClear.height = size * 0.12;
        btnClear.fontSize = size * 0.06;
        btnClear.text = 'CLEAR';
        btnClear.color = '#333333';
        btnClear.padding = `0,${padding},0,${padding}`;
        this.addChild(btnClear);

        let btnBack = new Laya.Label;
        btnBack.name = 'btnBack';
        btnBack.align = Laya.Stage.ALIGN_RIGHT;
        btnBack.valign = Laya.Stage.ALIGN_MIDDLE;
        btnBack.height = size * 0.12;
        btnBack.fontSize = size * 0.06;
        btnBack.text = 'BACK';
        btnBack.color = '#333333';
        btnBack.padding = `0,${padding},0,${padding}`;

        btnBack.x = this.width - btnBack.width;
        this.addChild(btnBack);

        let lineView = new Laya.Label;
        lineView.height = size * 0.005;
        lineView.width = this.width;
        lineView.bgColor = '#666666';
        lineView.alpha = 0.2;
        lineView.y = btnBack.y + btnBack.height;

        this.addChild(lineView);

    }

    private initTabs() {
        let size = Math.min(this.width, this.height);
        let padding = size * 0.06;

        let lastX = 0;
        this._menus.forEach((val, index) => {
            let menuLabel = new Laya.Label;
            menuLabel.y = size * 0.12;
            menuLabel.align = Laya.Stage.ALIGN_RIGHT;
            menuLabel.valign = Laya.Stage.ALIGN_MIDDLE;
            menuLabel.height = size * 0.12;
            menuLabel.fontSize = size * 0.06;
            menuLabel.text = val;
            menuLabel.color = '#666666';
            menuLabel.padding = `0,${padding},0,${padding}`;
            menuLabel.x = lastX;
            menuLabel.on(Laya.Event.CLICK, this, () => {
                this.selectMenu(menuLabel);
            })
            lastX += menuLabel.width;
            this.addChild(menuLabel);

            if (index == 0) {
                this.selectMenu(menuLabel);
            }

            let line2View = new Laya.Label;
            line2View.bgColor = '#666666';
            line2View.alpha = 0.2;
            line2View.height = size * 0.12;
            line2View.width = size * 0.005;
            line2View.y = size * 0.12;
            line2View.x = lastX;
            this.addChild(line2View);
        });

        let lineView = new Laya.Label;
        lineView.height = size * 0.005;
        lineView.width = this.width;
        lineView.bgColor = '#666666';
        lineView.alpha = 0.2;
        lineView.y = size * 0.24;
        this.addChild(lineView);
    }

    private initList() {

        let size = Math.min(this.width, this.height);
        let padding = size * 0.06;

        this._list = new Laya.List;
        this._list.y = size * 0.24;
        this._list.height = size * 0.76;
        this._list.width = this.width;
        this._list.itemRender = DebugRenderUI;
        this._list.vScrollBarSkin = null;
        this._list.renderHandler = Laya.Handler.create(this, (item: DebugRenderUI, index) => {
            let data = this._list.array[index];
            let label = item.getChildByName('logValue') as Laya.Label;
            label.valign = Laya.Stage.ALIGN_MIDDLE;
            label.wordWrap = true;
            label.width = item.width;
            label.fontSize = size * 0.06;
            label.text = JSON.stringify(data);
            label.color = '#666666';
            label.padding = `0,${padding},0,${padding}`;
        }, null, false);

        this.addChild(this._list);

        this.refresh();
    }

    public refresh() {
        if (this._lastMenu && this._list) {
            this._list.array = fetchLogs(this._lastMenu.text);
            this._list.scrollTo(this._list.array.length);
        }
    }

}

class DebugActivity extends Activity {

    ui = new DebugUI;

    onCreate() {
        this.ui.init(this.width, this.height);
        let btnBack = this.ui.getChildByName('btnBack');
        if (btnBack) {
            btnBack.on(Laya.Event.CLICK, this, this.back);
        }
        let btnClear = this.ui.getChildByName('btnClear');
        if (btnClear) {
            btnClear.on(Laya.Event.CLICK, this, () => {
                clearLogs();
                this.ui.refresh();
            });
        }
    }
}

export function initDebug() {
    initLogs();
}

export function openDebugActivity() {
    DebugActivity.open(null, null);
}

export function closeDebugActivity() {
    DebugActivity.finish();
}