
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.page {
    export class audioUI extends View {
		public output:Laya.Label;
		public btnBack:Laya.Button;
		public btnPlayMusic:Laya.Button;
		public btnPlaySound:Laya.Button;
		public btnSoundStop:Laya.Button;
		public btnMusicStop:Laya.Button;
		public btnMusicPause:Laya.Button;
		public btnMusicResume:Laya.Button;
		public btnSoundPause:Laya.Button;
		public btnSoundResume:Laya.Button;
		public btnStopAll:Laya.Button;
		public btnStopAllSound:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Label","props":{"y":300,"x":16,"wordWrap":true,"width":571,"var":"output","height":80,"fontSize":20,"color":"#666666","borderColor":"#333333"}},{"type":"Button","props":{"y":40,"x":20,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":40,"x":210,"width":179,"var":"btnPlayMusic","skin":"comp/button.png","label":"playMusic","height":42}},{"type":"Button","props":{"y":40,"x":400,"width":179,"var":"btnPlaySound","skin":"comp/button.png","label":"playSound","height":42}},{"type":"Button","props":{"y":90,"x":400,"width":179,"var":"btnSoundStop","skin":"comp/button.png","label":"stop","height":42}},{"type":"Button","props":{"y":90,"x":210,"width":179,"var":"btnMusicStop","skin":"comp/button.png","label":"stop","height":42}},{"type":"Button","props":{"y":140,"x":210,"width":179,"var":"btnMusicPause","skin":"comp/button.png","label":"pause","height":42}},{"type":"Button","props":{"y":190,"x":210,"width":179,"var":"btnMusicResume","skin":"comp/button.png","label":"resume","height":42}},{"type":"Button","props":{"y":140,"x":400,"width":179,"var":"btnSoundPause","skin":"comp/button.png","label":"pause","height":42}},{"type":"Button","props":{"y":190,"x":400,"width":179,"var":"btnSoundResume","skin":"comp/button.png","label":"resume","height":42}},{"type":"Button","props":{"y":90,"x":20,"width":179,"var":"btnStopAll","skin":"comp/button.png","label":"stopAll","height":42}},{"type":"Button","props":{"y":140,"x":20,"width":179,"var":"btnStopAllSound","skin":"comp/button.png","label":"stopAllSound","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.audioUI.uiView);

        }

    }
}

module ui.page {
    export class page1UI extends View {
		public btnBack:Laya.Button;
		public btnFinish:Laya.Button;
		public btnPopToTop:Laya.Button;
		public btnNavigate:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Label","props":{"y":43,"x":26,"text":"Page1","fontSize":60,"color":"#333333"}},{"type":"Label","props":{"y":110,"x":28,"wordWrap":true,"width":544,"text":"this is content,this is content,this is content","height":216,"fontSize":30,"color":"#666666"}},{"type":"Button","props":{"y":300,"x":30,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":200,"x":30,"width":179,"var":"btnFinish","skin":"comp/button.png","label":"Finish","height":42}},{"type":"Button","props":{"y":250,"x":30,"width":179,"var":"btnPopToTop","skin":"comp/button.png","label":"PopToTop","height":42}},{"type":"Button","props":{"y":250,"x":346,"width":179,"var":"btnNavigate","skin":"comp/button.png","label":"Open Page2","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.page1UI.uiView);

        }

    }
}

module ui.page {
    export class page2UI extends View {
		public btnBack:Laya.Button;
		public btnFinish:Laya.Button;
		public btnPopToTop:Laya.Button;
		public btnNavigate:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Label","props":{"y":43,"x":26,"text":"Page2","fontSize":60,"color":"#333333"}},{"type":"Label","props":{"y":110,"x":28,"wordWrap":true,"width":544,"text":"this is content,this is content,this is content","height":216,"fontSize":30,"color":"#666666"}},{"type":"Button","props":{"y":300,"x":30,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}},{"type":"Button","props":{"y":200,"x":30,"width":179,"var":"btnFinish","skin":"comp/button.png","label":"Finish","height":42}},{"type":"Button","props":{"y":250,"x":30,"width":179,"var":"btnPopToTop","skin":"comp/button.png","label":"PopToTop","height":42}},{"type":"Button","props":{"y":250,"x":346,"width":179,"var":"btnNavigate","skin":"comp/button.png","label":"Open Page1","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.page2UI.uiView);

        }

    }
}

module ui.page {
    export class rankUI extends View {
		public rankBox:Laya.Box;
		public btnBack:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Box","props":{"y":37,"x":13,"width":570,"var":"rankBox","height":350}},{"type":"Button","props":{"y":333,"x":376,"width":179,"var":"btnBack","skin":"comp/button.png","label":"Back","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.rankUI.uiView);

        }

    }
}

module ui.page {
    export class simpleUI extends View {
		public output:Laya.Label;
		public btnNavigate:Laya.Button;
		public btnToast:Laya.Button;
		public btnPopup:Laya.Button;
		public btnQuit:Laya.Button;
		public btnRank:Laya.Button;
		public btnNavigate2:Laya.Button;
		public btnRewardedVideo:Laya.Button;
		public btnBanner:Laya.Button;
		public btnModal:Laya.Button;
		public btnLoading:Laya.Button;
		public btnVibrate:Laya.Button;
		public btnAudio:Laya.Button;
		public btnKefu:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"comp/bg.png","sizeGrid":"28,7,7,6","height":400}},{"type":"Label","props":{"y":300,"x":16,"wordWrap":true,"width":571,"var":"output","height":80,"fontSize":20,"color":"#666666","borderColor":"#333333"}},{"type":"Button","props":{"y":40,"x":210,"width":179,"var":"btnNavigate","skin":"comp/button.png","label":"Page1","height":42}},{"type":"Button","props":{"y":40,"x":400,"width":179,"var":"btnToast","skin":"comp/button.png","label":"Toast","height":42}},{"type":"Button","props":{"y":90,"x":400,"width":179,"var":"btnPopup","skin":"comp/button.png","label":"Popup","height":42}},{"type":"Button","props":{"y":40,"x":20,"width":179,"var":"btnQuit","skin":"comp/button.png","label":"Exit","height":42}},{"type":"Button","props":{"y":90,"x":20,"width":179,"var":"btnRank","skin":"comp/button.png","label":"Rank","height":42}},{"type":"Button","props":{"y":90,"x":210,"width":179,"var":"btnNavigate2","skin":"comp/button.png","label":"Page2","height":42}},{"type":"Button","props":{"y":140,"x":20,"width":179,"var":"btnRewardedVideo","skin":"comp/button.png","label":"RewardedVideo AD","height":42}},{"type":"Button","props":{"y":190,"x":20,"width":179,"var":"btnBanner","skin":"comp/button.png","label":"Banner AD","height":42}},{"type":"Button","props":{"y":140,"x":400,"width":179,"var":"btnModal","skin":"comp/button.png","label":"Modal","height":42}},{"type":"Button","props":{"y":190,"x":400,"width":179,"var":"btnLoading","skin":"comp/button.png","label":"Loading","height":42}},{"type":"Button","props":{"y":240,"x":400,"width":179,"var":"btnVibrate","skin":"comp/button.png","label":"Vibrate","height":42}},{"type":"Button","props":{"y":140,"x":210,"width":179,"var":"btnAudio","skin":"comp/button.png","label":"Audio","height":42}},{"type":"Button","props":{"y":240,"x":20,"width":179,"var":"btnKefu","skin":"comp/button.png","label":"Kefu Msg","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.page.simpleUI.uiView);

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
    export class test_rankUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":57,"x":63,"skin":"comp/image.png"}},{"type":"List","props":{"y":62,"x":236,"width":248,"name":"rankList","height":238},"child":[{"type":"Box","props":{"width":300,"name":"render","height":60},"child":[{"type":"Label","props":{"y":24,"x":135,"text":"0","name":"score|append|分"}},{"type":"Label","props":{"y":24,"x":60,"text":"nickname","name":"nickname|sub|4"}},{"type":"Image","props":{"y":5,"width":50,"name":"avatarUrl","height":50}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test_rankUI.uiView);

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
