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

function dataManager(msgServer,gamserver){
    this.msgSer = msgServer;
    this.gamser = gamserver;
    
    this.dealWithData = function(){  
        let data = msgServer.getMsgQue().front(); //从队列中取到数据包后，
        msgServer.getMsgQue().dequeue(); 

        let tempdata = gamserver.dataset(data);
        msgServer.getMsgQue().privateSend(data.uid,tempdata); //经过加工后的数据包

    }

    this.closeConnect = function(){  //关闭的时候将用户改变

    }
}

module.exports = dataManager;
