
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class main_actiUI extends View {
		public btn:runtime.btn;
		public img:runtime.btn_img;
		public btnBack:Laya.Button;
		public num:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":600,"runtime":"Tape.Activity","height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,5,6,4","height":400}},{"type":"Button","props":{"y":289,"x":419,"width":243,"var":"btn","skin":"comp/button.png","runtime":"runtime.btn","label":"Page2","height":44,"anchorY":0.5,"anchorX":0.5}},{"type":"CheckBox","props":{"y":243,"x":298,"width":145,"skin":"comp/checkbox.png","label":" label","height":18}},{"type":"Image","props":{"y":82,"x":57,"var":"img","skin":"comp/image.png","runtime":"runtime.btn_img","mouseover":"MOV","mouseout":"MOU"}},{"type":"Button","props":{"y":317,"x":299,"width":243,"var":"btnBack","skin":"comp/button.png","label":"Back","height":44}},{"type":"VSlider","props":{"y":92,"x":308,"skin":"comp/vslider.png"}},{"type":"ProgressBar","props":{"y":37,"x":376,"width":205,"skin":"comp/progress.png","height":14}},{"type":"HSlider","props":{"y":74,"x":378,"skin":"comp/hslider.png"}},{"type":"Image","props":{"y":114,"x":381,"skin":"comp/linkbutton.png"}},{"type":"Radio","props":{"y":171,"x":384,"skin":"comp/radio.png","label":"label"}},{"type":"RadioGroup","props":{"y":149,"x":451,"space":10,"skin":"comp/radiogroup.png","labels":"label1,label2,label3","direction":"vertical"}},{"type":"Button","props":{"y":3,"x":565,"skin":"comp/btn_close.png"}},{"type":"Clip","props":{"y":42,"x":50,"var":"num","skin":"comp/clip_num.png","index":8,"clipX":10}},{"type":"Clip","props":{"y":339,"x":170,"skin":"comp/clip_selectBox.png","index":0,"clipY":2}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Tape.Activity",Tape.Activity);
			View.regComponent("runtime.btn",runtime.btn);
			View.regComponent("runtime.btn_img",runtime.btn_img);

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
		public popToTop:Laya.Button;
		public toast:Laya.Button;
		public finish:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Button","props":{"y":309,"x":210,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":255,"x":211,"width":179,"var":"btn","skin":"comp/button.png","label":"Main","height":42}},{"type":"Button","props":{"y":202,"x":211,"width":179,"var":"pop","skin":"comp/button.png","label":"POP","height":42}},{"type":"Button","props":{"y":148,"x":210,"width":179,"var":"popToTop","skin":"comp/button.png","label":"popToTop","height":42}},{"type":"Button","props":{"y":91,"x":210,"width":179,"var":"toast","skin":"comp/button.png","label":"toast","height":42}},{"type":"Button","props":{"y":41,"x":210,"width":179,"var":"finish","skin":"comp/button.png","label":"finish","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page_actiUI.uiView);

        }

    }
}

module ui {
    export class test_popUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Label","props":{"y":172,"x":186,"text":"POP示例","fontSize":55,"color":"#ffffff"}},{"type":"Sprite","props":{"y":253,"x":71,"width":109,"height":107},"child":[{"type":"Poly","props":{"points":"37,7,148,-5,103,58,2,80","lineWidth":1,"lineColor":"#ff0000","fillColor":"#00ffff"}}]}]};
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
