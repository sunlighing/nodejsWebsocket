/**
 * author:Dragon Chuan
 * function manager ws 
 * websoket 管理类 
 */
var msgQueue = require("./msgQueue")
var Dic = require('./lib/Dictionary')
var queue = require('./lib/queue')


function msgServer(){
    var msgQue = new msgQueue();

    let wsPool = new Dic();

    let que = new queue();

    this.init = function() {
        msgQue.init(this);
        que.create();
    };

    this.putws = function(ws) {
        let key = que.front()  //取第一个
        que.dequeue();        //移除第一个
        //这样有个问题就是当队列位空时， 就连接上了
        if (wsPool.get(key) === undefined) {
            wsPool.set(key, ws);
            let data = {
                uid: key
            };
            this.Privatedata(key, data);
        } else {
            console.log("unknown reason,close the websocket");
            this.close()
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
        if (wsPool.get(data.uid) === undefined) {
            return false;
        } else {
            return true;
        }
    };

    this.publicData = function(msg) {
    //广播
    console.log("data all public send");
    wsPool.values().forEach(function(ws, index) {
        let data = JSON.stringify(msg);
            ws.send(data);
        });
    };

    this.Privatedata = function(key,data) {
        console.log("msg data send",key);
        
        let ws = wsPool.get(key);
        ws.send(JSON.stringify(data));
    };
    /**
     * 1.当套接字状态正常时，delectWs递归调用两次 deleteValue只调用一次
     * 2.当套接字正常断开 deleteValue 也只调用一次 
     */
    this.delectWs = function(ws) {
        console.log("close the ws")
        
        if (ws.readyState != 3){
            ws.close()
        }else{
            let key = wsPool.deleteValue(ws);
            que.enqueue(key);
        }
    };
    /**
     * 删除ws，根据key去删除
     */
    this.delectWsWithKey = function(key){
        wsPool.get(key) == undefined
          ? console.log("can't close the ws")
          : this.delectWs(wsPool.get(key));
        
    }

    this.getMsgQue = function (){  //利用闭包
        return msgQue;
    }
}

module.exports = msgServer;