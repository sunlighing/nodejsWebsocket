/**
 * 游戏服务的管理，收数据包后数据分析
 * 
 */

function gameServer(){  

    this.dataset=function(data){ //

        let tempData = {
            uid:data.uid,
            name:"jack",
            action:0x11
        }

        return tempData;
    }
}
module.exports = gameServer;