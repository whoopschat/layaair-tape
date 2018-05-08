// =========================== //
// tape socket.js
// =========================== //
module Tape {

    /**
     * Socket TAG
     */
    class SocketTAG {
        // connecting
        public static SOCKET_CONNECTE_ING = "connect_ing";
        // connected
        public static SOCKET_CONNECTED = "connected";
        // connect closed
        public static SOCKET_CONNECT_CLOSDE = "connect_closed";
        // connect error
        public static SOCKET_CONNECT_ERROR = "connect_error";
        // connect reveived
        public static SOCKET_MESSAGE_RECEIVED = "message_received";
        // connect delivered
        public static SOCKET_MESSAGE_DELIVERED = "message_delivered";
        // connect publish
        public static EVENT_SOCKET_MESSAGE_PUBLISH = "message_publish";
    }

    /**
     * WEB Socket
     */
    export class WebSocket {

        private __web_socket__ = null;
        private __is_connect__: boolean;
        private __is_connect_ing__: boolean;
        private __debug__: boolean = true;

        public onConnecting: Function = null;
        public onConnected: Function = null;
        public onClosed: Function = null;
        public onError: Function = null;
        public onMessageReceived: Function = null;

        constructor(debug: boolean = false) {
            this.__debug__ = debug;
        }

        public connect(socketUrl) {
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            this.__web_socket__ = new Laya.Socket();
            this.__web_socket__.connectByUrl(socketUrl);
            this.__web_socket__.on(Laya.Event.OPEN, this, () => {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTED);
                this.__is_connect__ = true;
                this.onConnected && this.onConnected();
            });
            this.__web_socket__.on(Laya.Event.CLOSE, this, (error) => {
                if (this.isConnecting() || this.isConnected()) {
                    this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    this.__is_connect__ = false;
                    this.__is_connect_ing__ = false;
                    this.onClosed && this.onClosed(error);
                }
            });
            this.__web_socket__.on(Laya.Event.ERROR, this, (error) => {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onError && this.onError(error);
            });
            this.__web_socket__.on(Laya.Event.MESSAGE, this, (msg) => {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, msg);
                this.onMessageReceived && this.onMessageReceived(msg);
            });
        }

        public disconnect() {
            if (this.isConnecting() || this.isConnected()) {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE);
                this.__web_socket__.close();
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed();
            }
        }

        public isConnected(): boolean {
            return this.__is_connect__;
        }

        public isConnecting(): boolean {
            return this.__is_connect_ing__;
        }

        public publishMessage(message: any): void {
            if (!this.isConnected()) {
                return;
            }
            let messagePayload = "";
            if (typeof message === 'object') {
                messagePayload = JSON.stringify(message);
            } else if (typeof message === 'string') {
                messagePayload = message;
            }
            this.printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        }

        private printLog(message?: any, ...optionalParams: any[]) {
            if (this.__debug__) {
                Tape.Logger.log(message, ...optionalParams);
            }
        }

    }

}