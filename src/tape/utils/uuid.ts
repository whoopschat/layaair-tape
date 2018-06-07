// =========================== //
// Tape uuid.js
// =========================== //
module Tape {

    export class UUID {

        private static _s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        public static randomUUID() {
            return (this._s4() + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + "-" + this._s4() + this._s4() + this._s4());
        }

    }

}
