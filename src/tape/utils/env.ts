// =========================== //
// Tape build.js
// =========================== //
module Tape {

    export module Env {

        /**
         * get build env
         * @return env mode : development or production
         */
        export const getEnv = (): string => {
            return '${env}';
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