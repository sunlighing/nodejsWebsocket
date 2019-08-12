/**
 * 游戏逻辑 ,数据已经清洗好了,分发逻辑，责任链模式，
 * 0x11 登录成功
 * {
 *    name 
 *    keys 
 *    act :0x11
 *    msg {
 *    }
 * }
 * 
 * 0x12 聊天信息
 * 
 * {
 *    name
 *    keys 
 *    act :0x12
 *    msg:{
 *      {
 *         name:
 *         data:string
 *      }
 *    }
 * }
 * 
 * 0x13 
 * 
 * {
 * 
 * }
 * 
 */
var dataDine = require("./lib/useractionDine")


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

  this.loginData = function(data){  //登录信息处理
    if (data.act == dataDine.loginEvent){

    }else{

    }
  };

  this.chatData = function(data){  //聊天信息
    if (data.act == dataDine.chatEvent){

    }
  }


}

module.exports = gameLoginServer;