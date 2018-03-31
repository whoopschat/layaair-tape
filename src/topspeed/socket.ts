// socket
module Topspeed {

    const printLog = function (message?: any, ...optionalParams: any[]) {
        Topspeed.Logger.log(message, ...optionalParams);
    }

    /**
     * Socket Event
     */
    export class SocketEvent {
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
    export class WebSocket extends Topspeed.Box.EventDispatcher() {

        private __web_socket__ = null;
        private __is_connect__: Boolean;
        private __is_connect_ing__: Boolean;

        constructor() {
            super();
        }

        public connect(socketUrl) {
            if (this.isConnecting()) {
                return;
            }
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.event(SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.__is_connect_ing__ = true;
            this.__web_socket__ = new (Topspeed.Box.Socket())();
            this.__web_socket__.connectByUrl(socketUrl);
            this.__web_socket__.on(Topspeed.Box.Event().OPEN, this, this.onSocketConnected);
            this.__web_socket__.on(Topspeed.Box.Event().CLOSE, this, this.onSocketConnectClosed);
            this.__web_socket__.on(Topspeed.Box.Event().MESSAGE, this, this.onSocketMessageReveived);
            this.__web_socket__.on(Topspeed.Box.Event().ERROR, this, this.onSocketConnectError);
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
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        }

        private onSocketConnected(): void {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECTED);
            this.__is_connect__ = true;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECTED);
        }

        private onSocketConnectError(e): void {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECT_ERROR, e);
            this.__web_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_ERROR);
        }

        private onSocketConnectClosed(e): void {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, e);
            this.__web_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE)
        }

        private onSocketMessageReveived(message): void {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message)
            this.__web_socket__.input.clear();
        }

    }


    /**
     *  MQTT Socket
     */
    export class MQTTSocket extends Topspeed.Box.EventDispatcher() {

        private __mqtt_socket__ = null;
        private __is_connect__: Boolean;
        private __is_connect_ing__: Boolean;
        private __options__ = {
            timeout: 3,
            keepAliveInterval: 30,
            cleanSession: true,
            useSSL: false,
            reconnect: false
        };

        constructor() {
            super();
        }

        connect(host, port, clientId, username, password, options = {}) {
            if (this.isConnecting()) {
                return;
            }
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.event(SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mqtt_socket__ = new window['Paho'].MQTT.Client(host, Number(port), clientId);
                this.__mqtt_socket__.onConnectionLost = (error) => {
                    this.onSocketConnectClosed(error);
                };
                this.__mqtt_socket__.onMessageArrived = (msg) => {
                    this.onSocketMessageReveived(msg);
                };
                this.__mqtt_socket__.onMessageDelivered = (msg) => {
                    this.onSocketMessageDelivered(msg);
                };;
                this.__mqtt_socket__.connect((<any>Object).assign(this.__options__, {
                    userName: username,
                    password: password,
                    onSuccess: () => {
                        this.onSocketConnected();
                    },
                    onFailure: (e) => {
                        this.onSocketConnectError(e);
                    }
                }, options));
            } else {
                this.onSocketConnectError("Cannot find name 'Paho'.");
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
                printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_PUBLISH, mqttMessage.topic + " " + mqttMessage.payloadString);
                this.__mqtt_socket__.send(mqttMessage);
            }
        }

        private onSocketConnected(): void {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECTED);
            this.__is_connect__ = true;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECTED);
        }

        private onSocketConnectError(error): void {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECT_ERROR, error);
            this.__mqtt_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_ERROR, error);
        }

        private onSocketConnectClosed(error): void {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, error);
            this.__mqtt_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, error)
        }

        private onSocketMessageDelivered(message): void {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_DELIVERED, message.topic + " " + message.payloadString);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_DELIVERED, message);
        }

        private onSocketMessageReveived(message): void {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message.topic + " " + message.payloadString);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message);
        }

    }

}