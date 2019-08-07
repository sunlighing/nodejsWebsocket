/**
 * 数据包结构:
 *      收: data{
 *                uid: 用户名
 *                act: 用户行为
 *                
 *            }
 *      发: data{
 *                uid: 00000
 *                name:用户名
 *                act: 用户行为
 *                public: {
 *                          user:{  
 *                                  name:
 *                                  act:
 *                                  msg:
 *                              } 
 *                        }
 *            }
 */
var msgQueue = require("./msgQueue")
var Dic = require('./lib/Dictionary')

var msgQue = new msgQueue();

function msgServer(){

    let wsPool = new Dic()

    this.init= function(){
        msgQue.init(this)
    }

    this.putws=function(ws){
        let key = Math.round(Math.random() * (100000 - 0)) + 0;
        if (wsPool.get(key) === undefined){
            wsPool.set(key, ws);
            let data = {
                uid:key
            }
            this.Privatedata(key,data);
        }else{
            console.log("key已被占,重新储存");
            this.putws(ws);
        }
    }

    this.putmsg = function(msg){ //解包
        let data = JSON.parse(msg);
        msgQue.enqueue(data);
    }

    this.publicData = function(msg){ //广播
        console.log("广播消息,连接池总数==>", )
        
        wsPool.values().forEach(function(ws, index) {
          data = JSON.stringify(msg);
          ws.send(data);
        });
    };

    this.Privatedata = function(key,data){
        let ws = wsPool.get(key);
        console.log("ws");
        console.log(ws)
        ws.send(JSON.stringify(data));
    }

    this.closeWs= function(ws){
        wsPool.delete(ws);
    }



}

module.exports = msgServer;