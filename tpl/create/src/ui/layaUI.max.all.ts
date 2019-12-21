
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.page {
    export class loadingUI extends View {

        public static  uiView:any ={"type":"View","props":{"y":0,"x":-2,"width":750,"height":1334},"child":[{"type":"Button","props":{"y":689,"x":212,"width":335,"skin":"comp/button.png","label":"label","height":163}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.loadingUI.uiView);

        }

    }
}

module ui.page {
    export class mainUI extends View {
		public btnPopup:Laya.Button;
		public btnToast:Tape.runtime.btn;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":-2,"width":750,"height":1334},"child":[{"type":"Button","props":{"y":864,"x":311,"width":129,"var":"btnPopup","skin":"comp/button.png","label":"popup","height":64}},{"type":"Button","props":{"y":941,"x":311,"width":129,"var":"btnToast","skin":"comp/button.png","runtime":"Tape.runtime.btn","label":"toast","height":64}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Tape.runtime.btn",Tape.runtime.btn);

            super.createChildren();
            this.createView(ui.page.mainUI.uiView);

        }

    }
}

module ui {
    export class test_popUI extends View {
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":172,"x":186,"text":"POP示例","fontSize":55,"color":"#ffffff"}},{"type":"Sprite","props":{"y":253,"x":71,"width":109,"height":107},"child":[{"type":"Poly","props":{"points":"37,7,148,-5,103,58,2,80","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]},{"type":"Button","props":{"y":38,"x":377,"width":179,"var":"btnClose","skin":"comp/button.png","label":"close","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test_popUI.uiView);

        }

    }
}

module ui {
    export class test_toastUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":185,"x":255,"text":"已通关","fontSize":30,"color":"#ff0000"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test_toastUI.uiView);

        }

    }
}
