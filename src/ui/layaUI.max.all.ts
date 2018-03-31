
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class MessageToastUI extends View {
		public text:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":30},"child":[{"type":"Label","props":{"y":16,"x":101,"var":"text","text":"Content","pivotY":0.5,"pivotX":0.5,"fontSize":20,"color":"#ff1410","centerY":0.5,"centerX":0.5}}]};
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
		public btnBack:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,5,6,4","height":400}},{"type":"Button","props":{"y":267,"x":299,"width":243,"var":"btn","skin":"comp/button.png","label":"Page2","height":44}},{"type":"CheckBox","props":{"y":243,"x":298,"width":145,"skin":"comp/checkbox.png","label":" label","height":18}},{"type":"Image","props":{"y":82,"x":57,"skin":"comp/image.png"}},{"type":"Button","props":{"y":317,"x":299,"width":243,"var":"btnBack","skin":"comp/button.png","label":"Back","height":44}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Page1UI.uiView);

        }

    }
}

module ui {
    export class Page2UI extends View {
		public btnBack:Laya.Button;
		public btn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Button","props":{"y":309,"x":210,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":255,"x":211,"width":179,"var":"btn","skin":"comp/button.png","label":"Main","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Page2UI.uiView);

        }

    }
}
