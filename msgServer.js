/**
 * author:Dragon Chuan
 * function manager ws 
 * websoket 管理类 
 */
var msgQueue = require("./msgQueue")
var Dic = require('./lib/Dictionary')



function msgServer(){
            var msgQue = new msgQueue();

            let wsPool = new Dic();

            this.init = function() {
            msgQue.init(this);
            };

            this.putws = function(ws) {
            let key =
                Math.round(
                Math.random() * (100000 - 0)
                ) + 0;
            if (wsPool.get(key) === undefined) {
                wsPool.set(key, ws);
                let data = {
                uid: key
                };
                this.Privatedata(key, data);
            } else {
                console.log("key已被占,重新储存");
                this.putws(ws);
            }
            };

            this.putmsg = function(msg) {
            //解包
            let data = JSON.parse(msg);
            msgQue.enqueue(data);
            };

            this.checkWebsocket = function(msg) {
            //有漏洞如果别人冒用的话会有问题
            let data = JSON.parse(msg);
            if (
                wsPool.get(data.uid) === undefined
            ) {
                return false;
            } else {
                return true;
            }
            };

            this.publicData = function(msg) {
            //广播
            console.log("data all public send");
            wsPool
                .values()
                .forEach(function(ws, index) {
                let data = JSON.stringify(msg);
                ws.send(data);
                });
            };

    this.Privatedata = function(key,data) {
        console.log("msg data send");
        let ws = wsPool.get(key);
        ws.send(JSON.stringify(data));
    };
    /**
     * 1.当套接字状态正常时，delectWs递归调用两次 deleteValue只调用一次
     * 2.当套接字正常断开 deleteValue 也只调用一次 
     */
    this.delectWs = function(ws) {
        ws.readyState != 3? ws.close() : wsPool.deleteValue(ws); // 实体值删除
    };
}

module.exports = msgServer;