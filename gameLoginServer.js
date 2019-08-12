/**
 * 游戏逻辑 ,数据已经清洗好了,分发逻辑，责任链模式，
 */
function gameLoginServer(userdata){
  //这里可以用责任链模式

  this.userdt = userdata;

  this.dealwithdata = function(data) {

    console.log("data gameLoginServer =>", data.name);
    let tempdata = userdata.HRpackage(data.name); //
    console.log("tempdata gameLoginServer =>", tempdata);
    if (tempdata != null) {
      return tempdata;
    }else{
      return null
    }
  };


}

module.exports = gameLoginServer;