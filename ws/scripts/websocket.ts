import  * as webSLib from 'ws';
// WebSocket, { WebSocketServer}


const wss = new webSLib.WebSocketServer({port: 6666});
console.log(`WS listening on port ${(wss.address() as webSLib.AddressInfo).port}`, wss.address());

let webSockets: webSLib.WebSocket[] = [];

wss.on('connection', ws => {
    console.log("User connected");

    webSockets[webSockets.length] = ws;
    // console.log(ws)
    
    ws.on('message', (data, isBinary) => {
        console.log(`WS:// - Recieved: ${data}`);
        // console.log(wss.clients)
        
        // for single response
        ws.send(JSON.stringify({transmission_data: JSON.parse(data.toString()), recieved: true}), {binary: false});


        // for broadcast
        // wss.clients.forEach((c : WebSocket) => {
        //     if(c.readyState == WebSocket.OPEN){
        //         c.send(JSON.stringify({transmission_data: JSON.parse(data.toString()), recieved: true}), {binary: false})
        //     }
        // });
    });


    ws.on('error', data => console.log(`Error: ${data}`));
    ws.on('close', (code, reason) => console.log(`Closing - code: ${code}\nreason:`, reason.toJSON()))
    ws.send('{"connected": true}');
}); 

wss.on('error', ws => {
    console.error('WEBSOCKET ERROR')
});

wss.on("close", () => {

});

export default wss;