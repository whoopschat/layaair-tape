module Tape {

    /** ActivityOptions */
    export interface ActivityOptions {
        page: any,
        params: any
    }

    /** ResourceOptions */
    export interface ResourceOptions {
        url: string,
        type: string
    }

    /** LoaderOptions */
    export interface LoaderOptions {
        page: any;
        params: Object;
        onLoaded: Function;
        onLoadProgress: Function;
    }

    /** NavigatorOptions */
    export interface NavigatorOptions {
        mainPage: any;
        commonRes?: ResourceOptions[];
        fileVersion?: string;
    }

}