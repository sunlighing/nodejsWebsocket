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
 * 大厅聊天，和房间聊天一样的
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
 * 0x13 设置信息
 * 
 * {
 *    name 
 *    keys 
 *    act :0x13 
 *    msg:{
 *        }
 * }
 * 
 * 0x14 在线匹配房间
 * 功能：用户请求匹配房间，待开房列表正好有同样的人在等着，这时候会两个用户匹配成功，创建一个room服务两个会放进去开始游戏
 * 待开房列表没有人，这是后就会一直等着，直到有回应，另一个用户匹配成功，会给这两货发消息，匹配成功
 * {
 *    name 
 *    keys 
 *    act :0x14 
 *    msg:{
 *            
 *        }
 * }
 * 
 * 游戏服务的信息另外写
 * 
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
      this.chatData(data);
    }
  };

  this.chatData = function(data){  //聊天信息
    if (data.act == dataDine.chatEvent){

    }
  }




}

module.exports = gameLoginServer;