declare module SDK {

    interface InitOptions {
        serverUrl: string,
        appName: string,
        debug?: boolean,
    }

    interface KVData {
        key: string,
        value: string
    }

    interface ApiData {
        code: number,
        err: string,
        data: Object
    }

    interface PlatformData {
        appType: string,
        runtimeType: string,
        systemInfo: Object
    }

    interface ApiResponse {
        errMsg: string,
        data: ApiData,
        hander: Object
    }

    type ApiCallback = (res: ApiResponse) => void;

    /** init */
    function init(options: InitOptions): ES6Promise<any>;

    /** getUserId */
    function getUserId(): string;

    /** getPlatform */
    function getPlatform(): PlatformData;

    /** api */
    module api {

        /**
         * 获取应用信息
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getAppInfo(success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 获取服务器时间
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getServerTime(success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 获取应用设置
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getSettingList(success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 获取关卡信息
         * @param parent_id 父关卡ID
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getLevelList(parent_id: String, success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 上传用户信息
         * @param encryptedData 密文
         * @param iv 加密偏移向量
         * @param success 成功回调
         * @param fail 失败回调
         */
        function setUserInfo(encryptedData: String, iv: String, success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 获取用户信息
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getUserInfo(success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 解密数据
         * @param encryptedData 密文
         * @param iv 加密偏移向量
         * @param success 成功回调
         * @param fail 失败回调
         */
        function decryptData(encryptedData: String, iv: String, success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 设置服务器托管数据
         * @param kv_data_list [{key:'key1',value:'value1'}]
         * @param success 成功回调
         * @param fail 失败回调
         */
        function setKVData(kv_data_list: KVData[], success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 获取服务器托管数据
         * @param key_list ['key1']
         * @param success 成功回调
         * @param fail 失败回调
         */
        function getKVData(key_list: string[], success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

        /**
         * 移除服务器托管数据
         * @param key_list ['key1']
         * @param success 成功回调
         * @param fail 失败回调
         */
        function removeKVData(key_list: string[], success?: ApiCallback, fail?: ApiCallback): ES6Promise<ApiResponse>;

    }

    /** data */
    module data {

        function setData(key: string, value: string, success?: Function, fail?: Function): ES6Promise<any>;

        function getData(key: string, success?: Function, fail?: Function): ES6Promise<any>;

    }

    /** level */
    module level {

        function getLevels(parent_id: string, success?: Function, fail?: Function): ES6Promise<any>;

    }

    /** settings */
    module setting {

        function getSettings(success?: Function, fail?: Function): ES6Promise<any>;

    }

}
