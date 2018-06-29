
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class main_actiUI extends View {
		public btn:runtime.btn;
		public img:runtime.img_btn;
		public btnBack:Laya.Button;
		public num:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,5,6,4","height":400}},{"type":"Button","props":{"y":289,"x":419,"width":243,"var":"btn","skin":"comp/button.png","runtime":"runtime.btn","label":"Page2","height":44,"anchorY":0.5,"anchorX":0.5}},{"type":"CheckBox","props":{"y":243,"x":298,"width":145,"skin":"comp/checkbox.png","label":" label","height":18}},{"type":"Image","props":{"y":82,"x":57,"var":"img","skin":"comp/image.png","runtime":"runtime.img_btn","mouseover":"MOV","mouseout":"MOU"}},{"type":"Button","props":{"y":317,"x":299,"width":243,"var":"btnBack","skin":"comp/button.png","label":"Back","height":44}},{"type":"VSlider","props":{"y":92,"x":308,"skin":"comp/vslider.png"}},{"type":"ProgressBar","props":{"y":37,"x":376,"width":205,"skin":"comp/progress.png","height":14}},{"type":"HSlider","props":{"y":74,"x":378,"skin":"comp/hslider.png"}},{"type":"Image","props":{"y":114,"x":381,"skin":"comp/linkbutton.png"}},{"type":"Radio","props":{"y":171,"x":384,"skin":"comp/radio.png","label":"label"}},{"type":"RadioGroup","props":{"y":149,"x":451,"space":10,"skin":"comp/radiogroup.png","labels":"label1,label2,label3","direction":"vertical"}},{"type":"Button","props":{"y":3,"x":565,"skin":"comp/btn_close.png"}},{"type":"Clip","props":{"y":42,"x":50,"var":"num","skin":"comp/clip_num.png","index":8,"clipX":10}},{"type":"Clip","props":{"y":339,"x":170,"skin":"comp/clip_selectBox.png","index":0,"clipY":2}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("runtime.btn",runtime.btn);
			View.regComponent("runtime.img_btn",runtime.img_btn);

            super.createChildren();
            this.createView(ui.main_actiUI.uiView);

        }

    }
}

module ui {
    export class page_actiUI extends View {
		public btnBack:Laya.Button;
		public btn:Laya.Button;
		public pop:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Button","props":{"y":309,"x":210,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":255,"x":211,"width":179,"var":"btn","skin":"comp/button.png","label":"Main","height":42}},{"type":"Button","props":{"y":202,"x":211,"width":179,"var":"pop","skin":"comp/button.png","label":"POP","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page_actiUI.uiView);

        }

    }
}

module ui {
    export class test_popUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":172,"x":186,"text":"POP示例","fontSize":55,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test_popUI.uiView);

        }

    }
}
