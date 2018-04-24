// =========================== //
// tape socket.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * Socket TAG
     */
    var SocketTAG = /** @class */ (function () {
        function SocketTAG() {
        }
        // connecting
        SocketTAG.SOCKET_CONNECTE_ING = "connect_ing";
        // connected
        SocketTAG.SOCKET_CONNECTED = "connected";
        // connect closed
        SocketTAG.SOCKET_CONNECT_CLOSDE = "connect_closed";
        // connect error
        SocketTAG.SOCKET_CONNECT_ERROR = "connect_error";
        // connect reveived
        SocketTAG.SOCKET_MESSAGE_RECEIVED = "message_received";
        // connect delivered
        SocketTAG.SOCKET_MESSAGE_DELIVERED = "message_delivered";
        // connect publish
        SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH = "message_publish";
        return SocketTAG;
    }());
    /**
     * WEB Socket
     */
    var WebSocket = /** @class */ (function () {
        function WebSocket(debug) {
            if (debug === void 0) { debug = false; }
            this.__web_socket__ = null;
            this.__debug__ = true;
            this.onConnecting = null;
            this.onConnected = null;
            this.onClosed = null;
            this.onError = null;
            this.onMessageReceived = null;
            this.__debug__ = debug;
        }
        WebSocket.prototype.connect = function (socketUrl) {
            var _this = this;
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            this.__web_socket__ = new Laya.Socket();
            this.__web_socket__.connectByUrl(socketUrl);
            this.__web_socket__.on(Laya.Event.OPEN, this, function () {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECTED);
                _this.__is_connect__ = true;
                _this.onConnected && _this.onConnected();
            });
            this.__web_socket__.on(Laya.Event.CLOSE, this, function (error) {
                if (_this.isConnecting() || _this.isConnected()) {
                    _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    _this.__is_connect__ = false;
                    _this.__is_connect_ing__ = false;
                    _this.onClosed && _this.onClosed(error);
                }
            });
            this.__web_socket__.on(Laya.Event.ERROR, this, function (error) {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                _this.__is_connect__ = false;
                _this.__is_connect_ing__ = false;
                _this.onError && _this.onError(error);
            });
            this.__web_socket__.on(Laya.Event.MESSAGE, this, function (msg) {
                _this.printLog(" -----WS---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, msg);
                _this.onMessageReceived && _this.onMessageReceived(msg);
            });
        };
        WebSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.printLog(" -----WS---" + SocketTAG.SOCKET_CONNECT_CLOSDE);
                this.__web_socket__.close();
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed();
            }
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
            this.printLog(" -----WS---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, messagePayload);
            this.__web_socket__.send(messagePayload);
        };
        WebSocket.prototype.printLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (this.__debug__) {
                (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            }
            var _a;
        };
        return WebSocket;
    }());
    Tape.WebSocket = WebSocket;
    /**
     *  MQTT Socket
     */
    var MQTTSocket = /** @class */ (function () {
        function MQTTSocket(debug) {
            if (debug === void 0) { debug = false; }
            this.__mqtt_socket__ = null;
            this.__debug__ = true;
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
            this.onMessageReceived = null;
            this.onMessageDelivered = null;
            this.__debug__ = debug;
        }
        MQTTSocket.prototype.connect = function (host, port, clientId, username, password, options) {
            var _this = this;
            if (username === void 0) { username = ''; }
            if (password === void 0) { password = ''; }
            if (options === void 0) { options = {}; }
            if (this.isConnecting()) {
                return;
            }
            this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECTE_ING);
            this.onConnecting && this.onConnecting();
            this.__is_connect_ing__ = true;
            if (window.hasOwnProperty("Paho")) {
                this.__mqtt_socket__ = new window['Paho'].MQTT.Client(host, port, clientId);
                this.__mqtt_socket__.onConnectionLost = function (error) {
                    _this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_CLOSDE, error);
                    if (_this.isConnecting() || _this.isConnected()) {
                        _this.__is_connect__ = false;
                        _this.__is_connect_ing__ = false;
                        _this.onClosed && _this.onClosed(error);
                    }
                };
                this.__mqtt_socket__.onMessageArrived = function (msg) {
                    _this.printLog(" -----MQTT---" + SocketTAG.SOCKET_MESSAGE_RECEIVED, _this.formatMessage(msg));
                    _this.onMessageReceived && _this.onMessageReceived(msg);
                };
                this.__mqtt_socket__.onMessageDelivered = function (msg) {
                    _this.printLog(" -----MQTT---" + SocketTAG.SOCKET_MESSAGE_DELIVERED, _this.formatMessage(msg));
                    _this.onMessageDelivered && _this.onMessageDelivered(msg);
                };
                ;
                this.__mqtt_socket__.connect(Object.assign({}, this.__default_options__, {
                    userName: username,
                    password: password,
                    onSuccess: function () {
                        _this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECTED);
                        _this.__is_connect__ = true;
                        _this.onConnected && _this.onConnected();
                    },
                    onFailure: function (error) {
                        _this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                        _this.__is_connect__ = false;
                        _this.__is_connect_ing__ = false;
                        _this.onError && _this.onError(error);
                    }
                }, options));
            }
            else {
                var error = "Cannot find mqtt client support.";
                this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_ERROR, error);
                this.onError && this.onError(error);
            }
        };
        MQTTSocket.prototype.disconnect = function () {
            if (this.isConnecting() || this.isConnected()) {
                this.printLog(" -----MQTT---" + SocketTAG.SOCKET_CONNECT_CLOSDE);
                this.__mqtt_socket__.disconnect();
                this.__is_connect__ = false;
                this.__is_connect_ing__ = false;
                this.onClosed && this.onClosed();
            }
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
                this.printLog(" -----MQTT---" + SocketTAG.EVENT_SOCKET_MESSAGE_PUBLISH, this.formatMessage(mqttMessage));
                this.__mqtt_socket__.send(mqttMessage);
            }
        };
        MQTTSocket.prototype.formatMessage = function (message) {
            return message.topic + " " + message.payloadString;
        };
        MQTTSocket.prototype.printLog = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (this.__debug__) {
                (_a = Tape.Logger).log.apply(_a, [message].concat(optionalParams));
            }
            var _a;
        };
        return MQTTSocket;
    }());
    Tape.MQTTSocket = MQTTSocket;
})(Tape || (Tape = {}));
