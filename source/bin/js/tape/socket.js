// socket
var Tape;
(function (Tape) {
    var printLog = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
        var _a;
    };
    /**
     * Socket TAG
     */
    var SocketTAG = /** @class */ (function () {
        function SocketTAG() {
        }
        // connecting
        SocketTAG.EVENT_SOCKET_CONNECTE_ING = "event_socket_connect_ing";
        // connected
        SocketTAG.EVENT_SOCKET_CONNECTED = "event_socket_connected";
        // connect closed
        SocketTAG.EVENT_SOCKET_CONNECT_CLOSDE = "event_socket_connect_closed";
        // connect error
        SocketTAG.EVENT_SOCKET_CONNECT_ERROR = "event_socket_connect_error";
        // connect reveived
        SocketTAG.EVENT_SOCKET_MESSAGE_REVEIVED = "event_socket_message_reveived";
        // connect delivered
        SocketTAG.EVENT_SOCKET_MESSAGE_DELIVERED = "event_socket_message_delivered";
        // connect publish
        SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH = "event_socket_message_publish";
        return SocketTAG;
    }());
    /**
     * WEB Socket
     */
    var WebSocket = /** @class */ (function () {
        function WebSocket() {
            this.__web_socket__ = null;
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReveived = null;
        }
        WebSocket.prototype.connect = function (socketUrl) {
            var _this = this;
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
            this.__web_socket__.on(Tape.Box.Event.OPEN, this, function () {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECTED);
                if (_this.onConnected) {
                    _this.onConnected();
                }
            });
            this.__web_socket__.on(Tape.Box.Event.CLOSE, this, function (error) {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECT_CLOSDE, error);
                _this.__is_connect__ = false;
                _this.__is_connect_ing__ = false;
                if (_this.onClosed) {
                    _this.onClosed(error);
                }
            });
            this.__web_socket__.on(Tape.Box.Event.ERROR, this, function (error) {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                _this.__is_connect__ = false;
                _this.__is_connect_ing__ = false;
                if (_this.onError) {
                    _this.onError(error);
                }
            });
            this.__web_socket__.on(Tape.Box.Event.MESSAGE, this, function (message) {
                printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_REVEIVED, message);
                if (_this.onMessageReveived) {
                    _this.onMessageReveived(message);
                }
            });
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
            printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        };
        return WebSocket;
    }());
    Tape.WebSocket = WebSocket;
    /**
     *  MQTT Socket
     */
    var MQTTSocket = /** @class */ (function () {
        function MQTTSocket() {
            this.__mqtt_socket__ = null;
            this.__default_options__ = {
                timeout: 3,
                keepAliveInterval: 30,
                cleanSession: true,
                useSSL: false,
                reconnect: false
            };
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReveived = null;
            this.onMessageDelivered = null;
        }
        MQTTSocket.prototype.connect = function (host, port, clientId, username, password, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
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
                this.__mqtt_socket__.onConnectionLost = function (error) {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_CLOSDE, error);
                    _this.__is_connect__ = false;
                    _this.__is_connect_ing__ = false;
                    if (_this.onClosed) {
                        _this.onClosed(error);
                    }
                };
                this.__mqtt_socket__.onMessageArrived = function (msg) {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_REVEIVED, _this.formatMessage(msg));
                    if (_this.onMessageReveived) {
                        _this.onMessageReveived(msg);
                    }
                };
                this.__mqtt_socket__.onMessageDelivered = function (msg) {
                    printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_DELIVERED, _this.formatMessage(msg));
                    if (_this.onMessageDelivered) {
                        _this.onMessageDelivered(msg);
                    }
                };
                ;
                this.__mqtt_socket__.connect(Object.assign({}, this.__default_options__, {
                    userName: username,
                    password: password,
                    onSuccess: function () {
                        printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECTED);
                        if (_this.onConnected) {
                            _this.onConnected();
                        }
                    },
                    onFailure: function (error) {
                        printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                        _this.__is_connect__ = false;
                        _this.__is_connect_ing__ = false;
                        if (_this.onError) {
                            _this.onError(error);
                        }
                    }
                }, options));
            }
            else {
                var error = "Cannot find mqtt client support.";
                printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_CONNECT_ERROR, error);
                if (this.onError) {
                    this.onError(error);
                }
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
                printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, this.formatMessage(mqttMessage));
                this.__mqtt_socket__.send(mqttMessage);
            }
        };
        MQTTSocket.prototype.formatMessage = function (message) {
            return message.topic + " " + message.payloadString;
        };
        return MQTTSocket;
    }());
    Tape.MQTTSocket = MQTTSocket;
})(Tape || (Tape = {}));
