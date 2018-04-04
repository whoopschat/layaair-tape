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

        private __play_music_list__: Array<Tape.Audio> = [];

        public readonly routeName: String = "";
        public readonly params: Object = {};

        constructor(props: Object = {}) {
            super(props);
            this.params = (<any>Object).assign({}, props['params']);
            this.routeName = props['routeName'] || "";
        }

        ///////////////////////
        /// LifeCycle
        ///////////////////////

        protected onCreate() {
        }

        protected onResume() {
        }

        protected onPause() {
        }

        protected onDestroy() {
        }

        protected onNextProgress(progress) {
        }

        ///////////////////////
        /// Music
        ///////////////////////

        protected playMusic(url: string, loops?: number, complete?: Function) {
            var audio = new Tape.Audio(url);
            audio.play(loops);
            audio.onComplete = complete;
            return this.__play_music_list__.push(audio);
        }

        protected stopMusic(id: number = 0) {
            if (id == 0) {
                while (this.__play_music_list__.length > 0) {
                    this.__play_music_list__.pop().stop();
                }
            } else {
                if (id - 1 >= 0 && id - 1 < this.__play_music_list__.length) {
                    let splice = this.__play_music_list__.splice(id - 1, 1);
                    splice.forEach(chancel => {
                        chancel.stop();
                    });
                }
            }
        }

        ///////////////////////
        /// Navigator
        ///////////////////////

        protected navigate(name, params: Object = {}, action: Function = null): boolean {
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].navigate(name, params, action);
            }
            return false;
        }

        protected deeplink(url, action: Function = null): boolean {
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].deeplink(url, action);
            }
            return false;
        }

        protected finish(name = this.routeName) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(name);
            }
        }

        protected pop(number: Number) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(number);
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
            Tape.Logger.log(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected error(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.error(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected info(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.info(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected warn(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.warn(" ------ " + this.routeName + "  ------ :", message, ...optionalParams);
        }

        protected debug(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.debug(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

    }

}