/**
 * 游戏服务的管理，收数据包后数据分析
 * 
 */
var userDataManger = require('./userDataManager')
var gameloginSer = require('./gameLoginServer')

function gameServer(){  

    var userData = new userDataManger()
    var gameloginSer = new gameloginSer();

    gameloginSer.init(userDataManger);

    this.dataGamedeal=function(data,dataQue){
        
        //数据清洗，储存成功 则调用游戏服务器中处理游戏逻辑 
        //不成功则返回
        if (userData.upUserData(data)) {
            gameloginSer.dealwithdata(data.name);
            
        } else {

        }

        return tempData;
    }
}
module.exports = gameServer;