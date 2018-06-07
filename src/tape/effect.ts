// =========================== //
// Tape effect.js
// =========================== //
module Tape {

    export class Effect {

        public static clickEffect(btnView: any, click: Function) {
            if (btnView && btnView['on']) {
                btnView.on("mouseover", this, () => {
                    btnView.y += 5;
                });
                btnView.on("mouseout", this, () => {
                    btnView.y -= 5;
                });
                btnView.on("click", this, () => {
                    click && click();
                });
            }
        }

    }
}