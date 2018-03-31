var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var MessageToastUI = /** @class */ (function (_super) {
        __extends(MessageToastUI, _super);
        function MessageToastUI() {
            return _super.call(this) || this;
        }
        MessageToastUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MessageToastUI.uiView);
        };
        MessageToastUI.uiView = { "type": "View", "props": { "width": 200, "height": 30 }, "child": [{ "type": "Label", "props": { "y": 16, "x": 101, "var": "text", "text": "Content", "pivotY": 0.5, "pivotX": 0.5, "fontSize": 20, "color": "#ff1410", "centerY": 0.5, "centerX": 0.5 } }] };
        return MessageToastUI;
    }(View));
    ui.MessageToastUI = MessageToastUI;
})(ui || (ui = {}));
(function (ui) {
    var Page1UI = /** @class */ (function (_super) {
        __extends(Page1UI, _super);
        function Page1UI() {
            return _super.call(this) || this;
        }
        Page1UI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.Page1UI.uiView);
        };
        Page1UI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "28,5,6,4", "height": 400 } }, { "type": "Button", "props": { "y": 267, "x": 299, "width": 243, "var": "btn", "skin": "comp/button.png", "label": "Page2", "height": 44 } }, { "type": "CheckBox", "props": { "y": 243, "x": 298, "width": 145, "skin": "comp/checkbox.png", "label": " label", "height": 18 } }, { "type": "Image", "props": { "y": 82, "x": 57, "skin": "comp/image.png" } }, { "type": "Button", "props": { "y": 317, "x": 299, "width": 243, "var": "btnBack", "skin": "comp/button.png", "label": "Back", "height": 44 } }] };
        return Page1UI;
    }(View));
    ui.Page1UI = Page1UI;
})(ui || (ui = {}));
(function (ui) {
    var Page2UI = /** @class */ (function (_super) {
        __extends(Page2UI, _super);
        function Page2UI() {
            return _super.call(this) || this;
        }
        Page2UI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.Page2UI.uiView);
        };
        Page2UI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 600, "skin": "comp/bg.png", "sizeGrid": "28,7,7,6", "height": 400 } }, { "type": "Button", "props": { "y": 309, "x": 210, "width": 179, "var": "btnBack", "skin": "comp/button.png", "label": "Back", "height": 42 } }, { "type": "Button", "props": { "y": 255, "x": 211, "width": 179, "var": "btn", "skin": "comp/button.png", "label": "Main", "height": 42 } }] };
        return Page2UI;
    }(View));
    ui.Page2UI = Page2UI;
})(ui || (ui = {}));
