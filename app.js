var msgServer = require("./msgServer")
var msgSer = new msgServer();

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8080 });


msgSer.init(); //消息队列初始化



wss.on('connection', function (ws) {
    // 将该连接加入连接池
    msgSer.putws(ws);  //第一次链接的是时候会分配key
    
    ws.on('message', function (message) {
        msgSer.checkWebsocket(message) === false ? ws.close() : msgSer.putmsg(message);
        //发现消息包不对就关闭这个websocket连接
    });

    ws.on('close', function (message) {
        // 连接关闭时，将其移出连接池
        msgSer.closeWs(ws);
        console.log("close close");
    });

});