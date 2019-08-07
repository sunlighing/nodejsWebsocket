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
var msgQue = new msgQueue();

function msgServer(){

    let wsPool =new Set()
    this.init= function(){
        msgQue.init(this)
    }
    this.putws=function(ws){
        wsPool.add(ws);
    }

    this.putmsg = function(msg){ //解包
        console.log("解包");
        let data = JSON.parse(msg);
        msgQue.enqueue(data);
    }

    this.publicData = function(msg){ //广播
        console.log("广播消息")
        wsPool.forEach(function(ws,index){
            data = JSON.stringify(msg)
            ws.send(data);
        })
    };

    this.closeWs= function(ws){
        wsPool.delete(ws);
    }



}

module.exports = msgServer;