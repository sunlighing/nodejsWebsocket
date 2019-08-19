/**
 * 游戏服务的管理，收数据包后数据分析
 * 
 */
var userDataManger = require('./userDataManager')
var gameloginSer = require('./gameLoginServer')

function gameServer(){  

    var userData = new userDataManger()
    var gameLoginServer = new gameloginSer(userData);
    // var gameloginSer = new gameloginSer();

    

    this.dataGamedeal=function(data,dataQue){
        
        //数据清洗，储存成功 则调用游戏服务器中处理游戏逻辑 
        //不成功则返回
        if (userData.upUserData(data)) {
            console.log(data); 
            
            let tempdata = gameLoginServer.dealwithdata(data);

            console.log("数据清洗成功 gameServerUse",tempdata);
            if (tempdata !=null){
                for (let k in tempdata){
                    dataQue.enqueue(tempdata[k]);
                }
            }
            
            return true; 

        } else {

            console.log("数据清洗失败 gameServerUse");
            return false;
        }
    }

    this.delectUserWithKeys = function(keys){
        userData.setUserTapeOut(keys)
    }
    
}
module.exports = gameServer;