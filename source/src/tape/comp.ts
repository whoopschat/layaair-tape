// =========================== //
// tape comp.js
// =========================== //
module Tape {

    /////////////////////////////////////////////////////
    //////// Component
    /////////////////////////////////////////////////////

    export class PropsComponent extends Tape.Box.Component {
        public readonly props: Object = {};
        constructor(props: Object = {}) {
            super();
            this.props = (<any>Object).assign({}, props);
        }
    }

    export class Activity extends PropsComponent {

        static ROUTE(options: Object = {}): Object {
            return (<any>Object).assign({}, options, {
                activity: this
            });
        };

        public readonly routeName: String = "";
        public readonly params: Object = {};

        private __sound_play_list = [];

        constructor(props: Object = {}) {
            super(props);
            this.params = (<any>Object).assign({}, props['params']);
            this.routeName = props['routeName'] || "";
        }

        protected onCreate() {
        }

        protected onResume() {
        }

        protected onPause() {
        }

        protected onDestroy() {
        }

        ///////////////////////
        /// Sound
        ///////////////////////

        protected playSound(url: string, loops?: number, complete?: Function, soundClass?: any, startTime?: number) {
            var soundChancel = Tape.Box.SoundManager.playSound(url, loops, complete ? Tape.Box.Handler.create(this, complete) : null, soundClass, startTime);
            return this.__sound_play_list.push(soundChancel);
        }

        protected stopSound(id: number = 0) {
            if (id == 0) {
                this.__sound_play_list.forEach(chancel => {
                    if (chancel && chancel.hasOwnProperty('stop')) {
                        chancel.stop();
                    }
                });
            } else {
                if (id - 1 >= 0 && id - 1 < this.__sound_play_list.length) {
                    let chancel = this.__sound_play_list[id - 1];
                    if (chancel && chancel.hasOwnProperty('stop')) {
                        chancel.stop();
                    }
                }
            }
        }

        ///////////////////////
        /// Navigator
        ///////////////////////

        protected navigate(name, params = {}) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].navigate(name, params);
            }
        }

        protected link(url) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].link(url);
            }
        }

        protected finish(n = 0) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(n);
            }
        }

        protected finishByName(name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finishByName(name);
            }
        }

        protected pop(n = 0) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(n);
            }
        }

        protected popByName(name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popByName(name);
            }
        }

        protected popToTop() {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popToTop();
            }
        }

        ///////////////////////
        /// Logger
        ///////////////////////

        protected log(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.log(message, ...optionalParams);
        }

        protected error(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.error(message, ...optionalParams);
        }

        protected info(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.info(message, ...optionalParams);
        }

        protected warn(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.warn(message, ...optionalParams);
        }

        protected debug(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.debug(message, ...optionalParams);
        }

    }

}