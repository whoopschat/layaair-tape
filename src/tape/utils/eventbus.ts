// =========================== //
// Tape eventbus.js
// =========================== //
module Tape {

    export class EventBus {

        private static __event_group__: Object = {};

        public static post(event: string, data: any) {
            if (!event) {
                return;
            }
            if (this.__event_group__.hasOwnProperty(event)) {
                const list: Array<Function> = this.__event_group__[event];
                if (list.length > 0) {
                    list.forEach(value => {
                        value && value(data);
                    })
                }
            }
        }

        public static on(event: string, callback: Function) {
            if (!event || !callback) {
                return;
            }
            if (!this.__event_group__.hasOwnProperty(event)) {
                this.__event_group__[event] = new Array();
            }
            const list = this.__event_group__[event];
            list.push(callback);
        }

    }

}