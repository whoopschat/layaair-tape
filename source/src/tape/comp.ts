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

        public readonly routeName: String = "";
        public readonly params: Object = {};

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