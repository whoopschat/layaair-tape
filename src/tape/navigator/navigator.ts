module Tape {

    export module Navigator {

        let __options__: NavigatorOptions = null;
        let __loading__ = false;
        let __inited__ = false;

        export function init(options: NavigatorOptions) {
            if (!options || __inited__) {
                return;
            }
            __options__ = options;
            __enableResourceVersion__();
            __inited__ = true;
        }

        function __enableResourceVersion__() {
            if (__options__ && __options__.fileVersion) {
                Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
                Laya.ResourceVersion.enable(__options__.fileVersion, Laya.Handler.create(null, () => {
                    __beginLoadStaticRes__();
                }))
            } else {
                __beginLoadStaticRes__();
            }
        }

        function __beginLoadStaticRes__() {
            let res = __options__.commonRes || [];
            if (res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(null, () => {
                    __onStaticResLoaded__();
                }));
            } else {
                __onStaticResLoaded__();
            }
        }

        function __onStaticResLoaded__() {
            NavigatorStack.navigate(__options__.mainPage);
        }

    }

}