module Tape {

    export module Env {

        /**
         * get env
         * @return env mode : development or production
         */
        export const getEnv = (): string => {
            let env = '${env}';
            if (env.indexOf('${') === 0) {
                return 'development';
            }
            return env;
        }

        /**
         * isDebug
         */
        export const isDev = (): boolean => {
            return getEnv() !== 'production';
        }

        /**
         * isProd
         */
        export const isProd = (): boolean => {
            return getEnv() === 'production';
        }

    }
}