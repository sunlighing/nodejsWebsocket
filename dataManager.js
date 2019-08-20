/**
 * function 1.定义数据包,
 * 3.收到数据包时进行数据包分析,分发数据包给游戏服务
 * 本质上是中介模式，耦合ws管理和游戏服务
 *  * 数据包结构:
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

var dataQueue = require("./lib/queue")

function dataManager(msgServer,gamserver){
    
    var dataQue = new dataQueue(); //收到游戏消息队列  

    this.msgSer = msgServer;
    this.gamser = gamserver;
    
    this.dealWithData = function(){  
        let data = this.msgSer.getMsgQue().front(); //从队列中取到数据包后，
        this.msgSer.getMsgQue().dequeue(); 
        
        if (this.gamser.dataGamedeal(data, dataQue) == true ) {
            this.sendDatainData();
        } else {
          //未知原因
          this.closeConnect(data.keys);
        };
         //经过加工后的数据包
    }

    this.sendDatainData =function(){
        console.log("dataManager", dataQue.isEmpty())
        if(dataQue.isEmpty()==false){
            this.msgSer.getMsgQue().privateSend(dataQue.front().keys, dataQue.front());
            dataQue.dequeue();
            this.sendDatainData();
        }
    };

    this.closeConnect = function(key){  //关闭的时候将用户改变
        console.log("the ws must close",key)
        console.log(" dataManager closeConnect =>", key)
        //key ? this.msgSer.delectWsWithKey(key) : console.log("eorrer");
        this.gamser.delectUserWithKeys(key);
    }
}

module.exports = dataManager;
