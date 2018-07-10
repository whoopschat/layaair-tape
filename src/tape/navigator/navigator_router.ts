module Tape {

    export module NavigatorRouter {

        let __routes__ = {
        };

        function findRoute(path) {
            let keys = Object.keys(__routes__);
            for (var index = 0; index < keys.length; index++) {
                let p = keys[index];
                let ps = p.split('\/');
                let paths = path.split('\/');
                let flag = true;
                let len = Math.max(ps.length, paths.length);
                let params = {};
                for (var i = 0; i < len; i++) {
                    let l = ps.length > i ? ps[i] : '';
                    let t = paths.length > i ? paths[i] : '';
                    if (l.indexOf(':') === 0) {
                        params[l.substr(1)] = t;
                    } else {
                        flag = flag && l === t;
                    }
                }
                if (flag) {
                    return {
                        page: __routes__[p],
                        params
                    }
                }
            }
            return {
                page: null,
                params: {}
            }
        }

        export function configRoutes(routes) {
            __routes__ = routes;
        }

        export function getRoute(path: string) {
            if (!path) {
                return {
                    page: null,
                    params: {}
                };
            }
            let qs = path.split('?');
            let {page, params} = findRoute(qs[0]);
            if (qs.length > 1) {
                let strs = qs[1].split("&");
                for (var i = 0; i < strs.length; i++) {
                    let ps = strs[i].split("=")[0];
                    if (ps.length > 1) {
                        params[ps[0]] = ps[1];
                    }
                }
            }
            return {
                page,
                params
            }
        }

    }

}