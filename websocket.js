"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webSLib = require("ws");
// WebSocket, { WebSocketServer}
var wss = new webSLib.WebSocketServer({ port: 6666 });
console.log("WS listening on port ".concat(wss.address().port), wss.address());
var webSockets = [];
wss.on('connection', function (ws) {
    console.log("User connected");
    webSockets[webSockets.length] = ws;
    // console.log(ws)
    ws.on('message', function (data, isBinary) {
        console.log("WS:// - Recieved: ".concat(data));
        // console.log(wss.clients)
        // for single response
        ws.send(JSON.stringify({ transmission_data: JSON.parse(data.toString()), recieved: true }), { binary: false });
        // for broadcast
        // wss.clients.forEach((c : WebSocket) => {
        //     if(c.readyState == WebSocket.OPEN){
        //         c.send(JSON.stringify({transmission_data: JSON.parse(data.toString()), recieved: true}), {binary: false})
        //     }
        // });
    });
    ws.on('error', function (data) { return console.log("Error: ".concat(data)); });
    ws.on('close', function (code, reason) { return console.log("Closing - code: ".concat(code, "\nreason:"), reason.toJSON()); });
    ws.send('{"connected": true}');
});
wss.on('error', function (ws) {
    console.error('WEBSOCKET ERROR');
});
wss.on("close", function () {
});
exports.default = wss;
