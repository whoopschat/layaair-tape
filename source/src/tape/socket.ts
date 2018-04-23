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
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed(error);
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
                this.__web_socket__.close();
            }
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
        }

        public isConnected(): Boolean {
            return this.__is_connect__;
        }

        public isConnecting(): Boolean {
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


    /**
     *  MQTT Socket
     */
    export class MQTTSocket {

        private __mqtt_socket__ = null;
        private __is_connect__: boolean;
        private __is_connect_ing__: boolean;
        private __debug__: boolean = true;

        private __default_options__ = {
            timeout: 3,
            keepAliveInterval: 30,
            cleanSession: true,
            useSSL: false,
            reconnect: false
        };

        public onConnecting: Function = null;
        public onConnected: Function = null;
        public onClosed: Function = null;
        public onError: Function = null;
        public onMessageReceived: Function = null;
        public onMessageDelivered: Function = null;

        constructor(debug: boolean = false) {
            this.__debug__ = debug;
        }

        connect(host: string, port: number, clientId: string, username: string = '', password: string = '', options: Object = {}) {
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mqtt_socket__ = new window['Paho'].MQTT.Client(host, port, clientId);
                this.__mqtt_socket__.onConnectionLost = (error) => {
                    this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    this.__is_connect__ = false;
                    this.__is_connect_ing__ = false;
                    this.onClosed && this.onClosed(error);
                };
                this.__mqtt_socket__.onMessageArrived = (msg) => {
                    this.printLog(" -----MQTT---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, this.formatMessage(msg));
                    this.onMessageReceived && this.onMessageReceived(msg);
                };
                this.__mqtt_socket__.onMessageDelivered = (msg) => {
                    this.printLog(" -----MQTT---" + SocketTAG.SOCKET_MESSAGE_DELIVERED, this.formatMessage(msg));
                    this.onMessageDelivered && this.onMessageDelivered(msg);
                };;
                this.__mqtt_socket__.connect((<any>Object).assign({}, this.__default_options__, {
                    userName: username,
                    password: password,
                    onSuccess: () => {
                        this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECTED);
                        this.__is_connect__ = true;
                        this.onConnected && this.onConnected();
                    },
                    onFailure: (error) => {
                        this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                        this.__is_connect__ = false;
                        this.__is_connect_ing__ = false;
                        this.onError && this.onError(error);
                    }
                }, options));
            } else {
                let error = "Cannot find mqtt client support.";
                this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                this.onError && this.onError(error);
            }
        }

        public disconnect() {
            if (this.isConnecting() || this.isConnected()) {
                this.__mqtt_socket__.disconnect();
            }
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
        }

        public isConnected(): Boolean {
            return this.__is_connect__;
        }

        public isConnecting(): Boolean {
            return this.__is_connect_ing__;
        }

        public publishMessage(topic: string, message: any, qos: number = 1, retained: boolean = false): void {
            if (!this.isConnected()) {
                return;
            }
            if (window.hasOwnProperty('Paho')) {
                let messagePayload = "";
                if (typeof message === 'object') {
                    messagePayload = JSON.stringify(message);
                } else if (typeof message === 'string') {
                    messagePayload = message;
                }
                let mqttMessage = new window['Paho'].MQTT.Message(messagePayload);
                mqttMessage.destinationName = topic;
                mqttMessage.qos = qos;
                mqttMessage.retained = retained
                this.printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, this.formatMessage(mqttMessage));
                this.__mqtt_socket__.send(mqttMessage);
            }
        }

        private formatMessage(message) {
            return message.topic + " " + message.payloadString;
        }

        private printLog(message?: any, ...optionalParams: any[]) {
            if (this.__debug__) {
                Tape.Logger.log(message, ...optionalParams);
            }
        }

    }

}