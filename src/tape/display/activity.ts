module Tape {

    /** Activity */
    export class Activity extends Laya.Component {

        static ROUTE(options: Object = {}): Object {
            return (<any>Object).assign({}, options, {
                activity: this
            });
        };

        public readonly props: Object = {};
        public readonly routeName: string = "";
        public readonly routeKey: string = "";
        public readonly params: Object = {};
        protected inEaseDuration: number = 300;
        protected inEase: Function = null;
        protected inEaseFromProps: Object = null;
        protected inEaseToProps: Object = null;
        protected outEaseDuration: number = 300;
        protected outEase: Function = null;
        protected outEaseFromProps: Object = null;
        protected outEaseToProps: Object = null;

        constructor(props: Object = {}) {
            super();
            this.props = (<any>Object).assign({}, props);
            this.params = (<any>Object).assign({}, props['params']);
            this.routeName = props['routeName'] || "";
            this.routeKey = props['routeKey'] || "";
        }

        //////////////////////////
        /// life cycle function
        //////////////////////////

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

        //////////////////////////
        /// navigator function
        //////////////////////////

        protected redirectTo(name, params: Object = {}): boolean {
            return this.navigate(name, params, () => {
                this.back();
            });
        }

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

        protected back() {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(this.routeName, this.routeKey);
            }
        }

        protected finish(name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(name);
            }
        }

        protected pop(number?: Number) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(number);
            }
        }

        protected popToTop() {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popToTop();
            }
        }

    }

}