// socket
module Tape {

    const printLog = function (message?: any, ...optionalParams: any[]) {
        Tape.Logger.log(message, ...optionalParams);
    }

    /**
     * Socket TAG
     */
    class SocketTAG {
        // connecting
        public static EVENT_SOCKET_CONNECTE_ING = "event_socket_connect_ing";
        // connected
        public static EVENT_SOCKET_CONNECTED = "event_socket_connected";
        // connect closed
        public static EVENT_SOCKET_CONNECT_CLOSDE = "event_socket_connect_closed";
        // connect error
        public static EVENT_SOCKET_CONNECT_ERROR = "event_socket_connect_error";
        // connect reveived
        public static EVENT_SOCKET_MESSAGE_REVEIVED = "event_socket_message_reveived";
        // connect delivered
        public static EVENT_SOCKET_MESSAGE_DELIVERED = "event_socket_message_delivered";
        // connect publish
        public static EVENT_SOCKET_MESSAGE_PUBLISH = "event_socket_message_publish";
    }

    /**
     * WEB Socket
     */
    export class WebSocket {

        private __web_socket__ = null;
        private __is_connect__: Boolean;
        private __is_connect_ing__: Boolean;

        public onConnecting: Function = null;
        public onConnected: Function = null;
        public onClosed: Function = null;
        public onError: Function = null;
        public onMessageReveived: Function = null;

        constructor() {
        }

        public connect(socketUrl) {
            if (this.isConnecting()) {
                return;
            }
            printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECTE_ING);
            if (this.onConnecting) {
                this.onConnecting();
            }
            this.__is_connect_ing__ = true;
            this.__web_socket__ = new Tape.Box.Socket();
            this.__web_socket__.connectByUrl(socketUrl);
            this.__web_socket__.on(Tape.Box.Event.OPEN, this, () => {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECTED);
                if (this.onConnected) {
                    this.onConnected();
                }
            });
            this.__web_socket__.on(Tape.Box.Event.CLOSE, this, (error) => {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECT_CLOSDE, error);
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                if (this.onClosed) {
                    this.onClosed(error);
                }
            });
            this.__web_socket__.on(Tape.Box.Event.ERROR, this, (error) => {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                if (this.onError) {
                    this.onError(error);
                }
            });
            this.__web_socket__.on(Tape.Box.Event.MESSAGE, this, (message) => {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_REVEIVED, message);
                if (this.onMessageReveived) {
                    this.onMessageReveived(message);
                }
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
            printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        }

    }


    /**
     *  MQTT Socket
     */
    export class MQTTSocket {

        private __mqtt_socket__ = null;
        private __is_connect__: Boolean;
        private __is_connect_ing__: Boolean;
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
        public onMessageReveived: Function = null;
        public onMessageDelivered: Function = null;

        constructor() {
        }

        connect(host, port, clientId, username, password, options: Object = {}) {
            if (this.isConnecting()) {
                return;
            }
            printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECTE_ING);
            if (this.onConnecting) {
                this.onConnecting();
            }
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mqtt_socket__ = new window['Paho'].MQTT.Client(host, Number(port), clientId);
                this.__mqtt_socket__.onConnectionLost = (error) => {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_CLOSDE, error);
                    this.__is_connect__ = false;
                    this.__is_connect_ing__ = false;
                    if (this.onClosed) {
                        this.onClosed(error);
                    }
                };
                this.__mqtt_socket__.onMessageArrived = (msg) => {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_REVEIVED, this.formatMessage(msg));
                    if (this.onMessageReveived) {
                        this.onMessageReveived(msg);
                    }
                };
                this.__mqtt_socket__.onMessageDelivered = (msg) => {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_DELIVERED, this.formatMessage(msg));
                    if (this.onMessageDelivered) {
                        this.onMessageDelivered(msg);
                    }
                };;
                this.__mqtt_socket__.connect((<any>Object).assign({}, this.__default_options__, {
                    userName: username,
                    password: password,
                    onSuccess: () => {
                        printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECTED);
                        if (this.onConnected) {
                            this.onConnected();
                        }
                    },
                    onFailure: (error) => {
                        printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                        this.__is_connect__ = false;
                        this.__is_connect_ing__ = false;
                        if (this.onError) {
                            this.onError(error);
                        }
                    }
                }, options));
            } else {
                let error = "Cannot find mqtt client support.";
                printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                if (this.onError) {
                    this.onError(error);
                }
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
                printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, this.formatMessage(mqttMessage));
                this.__mqtt_socket__.send(mqttMessage);
            }
        }

        private formatMessage(message) {
            return message.topic + " " + message.payloadString;
        }

    }

}