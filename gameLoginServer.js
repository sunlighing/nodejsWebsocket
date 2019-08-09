/**
 * 游戏逻辑 ,数据已经清洗好了，
 */
function gameServerMannage(userdata) { //这里可以用责任链模式

    this.userdt = userdata;

    this.dealwithdata = function (data) {

        let data = userdata.upUserData(data.name); //
        if (data != null){
            return data;
        }
    }

}

module.exports = gameServerMannage