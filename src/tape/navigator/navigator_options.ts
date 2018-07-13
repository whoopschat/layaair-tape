module Tape {

    /** ResourceOptions */
    export interface ResourceOptions {
        url: string,
        type: string
    }

    /** LoaderOptions */
    export interface LoaderOptions {
        page: any;
        params: Object;
        onShow?: Function;
        onLoaded?: Function;
        onLoadProgress?: Function;
    }

    /** NavigatorOptions */
    export interface NavigatorOptions {
        mainPage: any;
        commonRes?: ResourceOptions[];
        fileVersion?: string;
    }

}