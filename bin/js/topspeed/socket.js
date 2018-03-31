var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// socket
var Topspeed;
(function (Topspeed) {
    var printLog = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        (_a = Topspeed.Logger).log.apply(_a, [message].concat(optionalParams));
        var _a;
    };
    /**
     * Socket Event
     */
    var SocketEvent = /** @class */ (function () {
        function SocketEvent() {
        }
        // connecting
        SocketEvent.EVENT_SOCKET_CONNECTE_ING = "event_socket_connect_ing";
        // connected
        SocketEvent.EVENT_SOCKET_CONNECTED = "event_socket_connected";
        // connect closed
        SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE = "event_socket_connect_closed";
        // connect error
        SocketEvent.EVENT_SOCKET_CONNECT_ERROR = "event_socket_connect_error";
        // connect reveived
        SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED = "event_socket_message_reveived";
        // connect delivered
        SocketEvent.EVENT_SOCKET_MESSAGE_DELIVERED = "event_socket_message_delivered";
        // connect publish
        SocketEvent.EVENT_SOCKET_MESSAGE_PUBLISH = "event_socket_message_publish";
        return SocketEvent;
    }());
    Topspeed.SocketEvent = SocketEvent;
    /**
     * WEB Socket
     */
    var WebSocket = /** @class */ (function (_super) {
        __extends(WebSocket, _super);
        function WebSocket() {
            var _this = _super.call(this) || this;
            _this.__web_socket__ = null;
            return _this;
        }
        WebSocket.prototype.connect = function (socketUrl) {
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
        };
        WebSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.__web_socket__.close();
            }
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
        };
        WebSocket.prototype.isConnected = function () {
            return this.__is_connect__;
        };
        WebSocket.prototype.isConnecting = function () {
            return this.__is_connect_ing__;
        };
        WebSocket.prototype.publishMessage = function (message) {
            if (!this.isConnected()) {
                return;
            }
            var messagePayload = "";
            if (typeof message === 'object') {
                messagePayload = JSON.stringify(message);
            }
            else if (typeof message === 'string') {
                messagePayload = message;
            }
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        };
        WebSocket.prototype.onSocketConnected = function () {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECTED);
            this.__is_connect__ = true;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECTED);
        };
        WebSocket.prototype.onSocketConnectError = function (e) {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECT_ERROR, e);
            this.__web_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_ERROR);
        };
        WebSocket.prototype.onSocketConnectClosed = function (e) {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, e);
            this.__web_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE);
        };
        WebSocket.prototype.onSocketMessageReveived = function (message) {
            printLog(" -----WS---" + SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message);
            this.__web_socket__.input.clear();
        };
        return WebSocket;
    }(Topspeed.Box.EventDispatcher()));
    Topspeed.WebSocket = WebSocket;
    /**
     *  MQTT Socket
     */
    var MQTTSocket = /** @class */ (function (_super) {
        __extends(MQTTSocket, _super);
        function MQTTSocket() {
            var _this = _super.call(this) || this;
            _this.__mqtt_socket__ = null;
            _this.__options__ = {
                timeout: 3,
                keepAliveInterval: 30,
                cleanSession: true,
                useSSL: false,
                reconnect: false
            };
            return _this;
        }
        MQTTSocket.prototype.connect = function (host, port, clientId, username, password, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (this.isConnecting()) {
                return;
            }
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.event(SocketEvent.EVENT_SOCKET_CONNECTE_ING);
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mqtt_socket__ = new window['Paho'].MQTT.Client(host, Number(port), clientId);
                this.__mqtt_socket__.onConnectionLost = function (error) {
                    _this.onSocketConnectClosed(error);
                };
                this.__mqtt_socket__.onMessageArrived = function (msg) {
                    _this.onSocketMessageReveived(msg);
                };
                this.__mqtt_socket__.onMessageDelivered = function (msg) {
                    _this.onSocketMessageDelivered(msg);
                };
                ;
                this.__mqtt_socket__.connect(Object.assign(this.__options__, {
                    userName: username,
                    password: password,
                    onSuccess: function () {
                        _this.onSocketConnected();
                    },
                    onFailure: function (e) {
                        _this.onSocketConnectError(e);
                    }
                }, options));
            }
            else {
                this.onSocketConnectError("Cannot find name 'Paho'.");
            }
        };
        MQTTSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.__mqtt_socket__.disconnect();
            }
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
        };
        MQTTSocket.prototype.isConnected = function () {
            return this.__is_connect__;
        };
        MQTTSocket.prototype.isConnecting = function () {
            return this.__is_connect_ing__;
        };
        MQTTSocket.prototype.publishMessage = function (topic, message, qos, retained) {
            if (qos === void 0) { qos = 1; }
            if (retained === void 0) { retained = false; }
            if (!this.isConnected()) {
                return;
            }
            if (window.hasOwnProperty('Paho')) {
                var messagePayload = "";
                if (typeof message === 'object') {
                    messagePayload = JSON.stringify(message);
                }
                else if (typeof message === 'string') {
                    messagePayload = message;
                }
                var mqttMessage = new window['Paho'].MQTT.Message(messagePayload);
                mqttMessage.destinationName = topic;
                mqttMessage.qos = qos;
                mqttMessage.retained = retained;
                printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_PUBLISH, mqttMessage.topic + " " + mqttMessage.payloadString);
                this.__mqtt_socket__.send(mqttMessage);
            }
        };
        MQTTSocket.prototype.onSocketConnected = function () {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECTED);
            this.__is_connect__ = true;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECTED);
        };
        MQTTSocket.prototype.onSocketConnectError = function (error) {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECT_ERROR, error);
            this.__mqtt_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_ERROR, error);
        };
        MQTTSocket.prototype.onSocketConnectClosed = function (error) {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, error);
            this.__mqtt_socket__ = null;
            this.__is_connect__ = false;
            this.__is_connect_ing__ = false;
            this.event(SocketEvent.EVENT_SOCKET_CONNECT_CLOSDE, error);
        };
        MQTTSocket.prototype.onSocketMessageDelivered = function (message) {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_DELIVERED, message.topic + " " + message.payloadString);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_DELIVERED, message);
        };
        MQTTSocket.prototype.onSocketMessageReveived = function (message) {
            printLog(" -----MQTT---" + SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message.topic + " " + message.payloadString);
            this.event(SocketEvent.EVENT_SOCKET_MESSAGE_REVEIVED, message);
        };
        return MQTTSocket;
    }(Topspeed.Box.EventDispatcher()));
    Topspeed.MQTTSocket = MQTTSocket;
})(Topspeed || (Topspeed = {}));
