
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class DemoUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":60,"height":60},"child":[{"type":"Pie","props":{"y":50,"x":10,"startAngle":90,"radius":10,"lineWidth":1,"fillColor":"#ff0000","endAngle":180}},{"type":"Pie","props":{"y":50,"x":50,"startAngle":0,"radius":10,"lineWidth":1,"fillColor":"#ff0000","endAngle":90}},{"type":"Pie","props":{"y":10,"x":50,"startAngle":-90,"radius":10,"lineWidth":1,"fillColor":"#ff0000","endAngle":0}},{"type":"Pie","props":{"y":10,"x":10,"startAngle":-180,"radius":10,"lineWidth":1,"fillColor":"#ff0000","endAngle":-90}},{"type":"Rect","props":{"x":10,"width":40,"lineWidth":1,"height":60,"fillColor":"#ff0000"}},{"type":"Rect","props":{"y":10,"width":20,"lineWidth":1,"height":40,"fillColor":"#ff0000"}},{"type":"Rect","props":{"y":10,"x":40,"width":20,"lineWidth":1,"height":40,"fillColor":"#ff0000"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.DemoUI.uiView);

        }

    }
}

module ui {
    export class DialogViewUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":710,"height":310},"child":[{"type":"Image","props":{"y":18,"x":118,"width":489,"skin":"comp/bg.png","sizeGrid":"29,12,8,10","height":278}},{"type":"Button","props":{"y":223,"x":292,"width":137,"skin":"comp/button.png","name":"ok","label":"label","height":48}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.DialogViewUI.uiView);

        }

    }
}

module ui {
    export class LoginPageUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"30,6,7,6","height":400}},{"type":"Button","props":{"y":44,"x":28,"skin":"comp/button.png","name":"cancel","label":"label"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoginPageUI.uiView);

        }

    }
}

module ui {
    export class MessageToastUI extends View {
		public text:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":400},"child":[{"type":"Label","props":{"y":16,"x":101,"var":"text","text":"Content","pivotY":0.5,"pivotX":0.5,"fontSize":20,"color":"#ff1410","centerY":0.5,"centerX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MessageToastUI.uiView);

        }

    }
}

module ui {
    export class Page1UI extends View {
		public btn:Laya.Button;
		public img:Laya.Image;
		public btnBack:Laya.Button;
		public num:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,5,6,4","height":400}},{"type":"Button","props":{"y":267,"x":299,"width":243,"var":"btn","skin":"comp/button.png","label":"Page2","height":44}},{"type":"CheckBox","props":{"y":243,"x":298,"width":145,"skin":"comp/checkbox.png","label":" label","height":18}},{"type":"Image","props":{"y":82,"x":57,"var":"img","skin":"comp/image.png","mouseover":"MOV","mouseout":"MOU"}},{"type":"Button","props":{"y":317,"x":299,"width":243,"var":"btnBack","skin":"comp/button.png","label":"Back","height":44}},{"type":"VSlider","props":{"y":92,"x":308,"skin":"comp/vslider.png"}},{"type":"ProgressBar","props":{"y":37,"x":376,"width":205,"skin":"comp/progress.png","height":14}},{"type":"HSlider","props":{"y":74,"x":378,"skin":"comp/hslider.png"}},{"type":"Image","props":{"y":114,"x":381,"skin":"comp/linkbutton.png"}},{"type":"Radio","props":{"y":171,"x":384,"skin":"comp/radio.png","label":"label"}},{"type":"RadioGroup","props":{"y":149,"x":451,"space":10,"skin":"comp/radiogroup.png","labels":"label1,label2,label3","direction":"vertical"}},{"type":"Button","props":{"y":3,"x":565,"skin":"comp/btn_close.png"}},{"type":"Clip","props":{"y":42,"x":50,"var":"num","skin":"comp/clip_num.png","index":8,"clipX":10}},{"type":"Clip","props":{"y":339,"x":170,"skin":"comp/clip_selectBox.png","index":0,"clipY":2}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Page1UI.uiView);

        }

    }
}

module ui {
    export class Page2UI extends View {
		public ani1:Laya.FrameAnimation;
		public btnBack:Laya.Button;
		public btn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Button","props":{"y":309,"x":210,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":255,"x":211,"width":179,"var":"btn","skin":"comp/button.png","label":"Main","height":42}},{"type":"Button","props":{"y":68,"x":68,"skin":"comp/button.png","label":"label"},"compId":5}],"animations":[{"nodes":[{"target":5,"keyframes":{"y":[{"value":68,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":0},{"value":179,"tweenMethod":"linearNone","tween":true,"target":5,"key":"y","index":25}],"x":[{"value":68,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":0},{"value":436,"tweenMethod":"linearNone","tween":true,"target":5,"key":"x","index":25}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Page2UI.uiView);

        }

    }
}
