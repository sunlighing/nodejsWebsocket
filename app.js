var msgServer = require("./msgServer")
var msgSer = new msgServer();

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8080 });



var gameManage = require('./gameServerUse')
var gameMan = new gameManage();


msgSer.init(); //消息队列先初始化

var dataManage = require("./dataManager");
var dataMana = new dataManage(msgSer, gameMan);





wss.on('connection', function (ws) {
    msgSer.putws(ws);  //第一次链接的是时候会分配key
    
    ws.on('message', function (message) {

        if (msgSer.checkWebsocket(message) === false){
            msgSer.delectWs(ws)
        }else{
            msgSer.putmsg(message)
            dataMana.dealWithData();
        }
        //发现消息包不对就关闭这个websocket连接
    });

    ws.on('close', function (message) {
        // 连接关闭时，将其移出连接池
        msgSer.delectWs(ws);
        console.log("close the ws",message);
    });

});