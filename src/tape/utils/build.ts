// =========================== //
// Tape build.js
// =========================== //
module Tape {
    
    export class Build {

        private static __default_env__: string = '${env}';

        /**
         * configEnv
         * @param env development or production
         */
        public static configEnv(env: string) {
            this.__default_env__ = env;
        }

        /**
         * get build env
         * @return env mode : development or production
         */
        public static getEnv(): string {
            if (this.__default_env__.indexOf('${') >= 0) {
                return 'development';
            }
            return this.__default_env__;
        }

        /**
         * isDebug
         */
        public static isDebug(): boolean {
            return this.getEnv() !== 'production';
        }

    }
}