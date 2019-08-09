/**
 * 游戏逻辑 ,数据已经清洗好了,分发逻辑，责任链模式，
 */
function gameLoginServer(userdata){
  //这里可以用责任链模式

  this.userdt = userdata;

  this.dealwithdata = function(data) {
    let data = userdata.HRpackage(data.name); //
    if (data != null) {
      return data;
    }
  };


}

module.exports = gameLoginServer;