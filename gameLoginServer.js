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
 * 待开房列表没有人，这是后就会一直等着，直到有回应，另一个用户匹配成功，会给这两货发消息，匹配成功 //room 号隐藏
 * {
 *    name 
 *    keys 
 *    act :0x14 
 *    msg:{
 *           room:
 *        }
 * }
 * 0x15 游戏信息 
 * 
 * 功能：游戏信息最关键的三个标示，keys:ws name:名字，room：房间标示 
 * msg 数据包定义{
 *        计时 30秒 ，请求换牌  
 *       0x26: 请求换牌 发五张牌， 随机选3张 收到的信息就是  玩家手中的牌组返回 带keys ，mame,room  (发牌)
 *              //选牌后会返回，玩家手牌，如果
 *       返回 0x26 玩家手牌 只能三张 (收 )
 * 
 *       0x27:  30秒后进入比牌流程 ，无需玩家自己比牌  返回双方的牌
 *        
 *       0x28:   判定胜利 和失败 
 *      
 *       
 *           
 * }
 * 游戏服务的信息另外写
 * 
 * 0x16:   自动结束游戏，关闭游戏服务
 * 
 */


var gameS = require("./gameServeMannager")

function gameLoginServer(userdata){
  //这里可以用责任链模式

  var clientDataDine = {
    loginEvent: 0x11,
    chatEvent: 0x12,
    processOver: 0x13,
    matchingRoom: 0x14,
    gameIngData: 0x15,
    gameOver:  0x16,
  }

  this.userdt = userdata;

  var gameServece = new gameS();

  this.dealwithdata = function(data) {

    console.log("data gameLoginServer =>", data.name);
    // let tempdata = userdata.HRpackage(data.name); //
    // console.log("tempdata gameLoginServer =>", tempdata);
    
    let tempdata = this.loginData(data)

    if (tempdata != null) {
      return tempdata;
    }else{
      return null
    }

  };

  //返回数据带erros 
  this.loginData = function(data){  //登录信息处理
    console.log("gameLoginServe loginEvent",data.act === clientDataDine.loginEvent);

    if (data.act == clientDataDine.loginEvent) {
      if (this.userdt.checkOnline(data.name) == true) {
        
        let tempdata = this.userdt.getUserData(data.name);
        if (tempdata != null){

            tempdata.act = clientDataDine.loginEvent;
            tempdata.errors = 1;
            this.userdt.setUserOnline(data); 
            return { tempdata };
        
        }else{
            return this.noget()
        }

      } else {
        let tempdata = {keys:data.keys,errors : 0x02}
        return {
          tempdata
        }
    };
    
    } else {
      return this.chatData(data);
    }
  };

  this.chatData = function(data){  //聊天信息
    if (data.act == clientDataDine.chatEvent) {
    } else {
      return this.matchingRoom(data);
    }
  }

  this.matchingRoom = function(data){
    console.log("gameLoginServe matchingRoom", data.act === clientDataDine.matchingRoom)
    if (data.act === clientDataDine.matchingRoom) {
      let roomdata = gameServece.matchRoom(data.name);
      if (roomdata != null) {
        let data1 = this.userdt.baseUseData(roomdata.p1);
        data1.msg = { enomy: roomdata.p2, room: roomdata.room };

        let data2 = this.userdt.baseUseData(roomdata.p2);
        data2.msg = { enomy: roomdata.p1, room: roomdata.room };

        data1.act = clientDataDine.matchingRoom;
        data2.act = clientDataDine.matchingRoom;

        return {
          data1,
          data2
        };
      }else{
        return null;
      }
    } else {
      return this.gameGetCard(data)
    } 
  }

  this.gameGetCard =function(data){
    console.log("gameLoginServe gameIngData", data.act === clientDataDine.gameIngData);
    if (data.act = clientDataDine.gameIngData){
          if(data.msg.act == 0x01){ //得到一张牌
            let msg = gameServece.getCard(data.msg.room,data.name)
            let data1 = this.userdt.baseUseData(data.name);
            data1.act = clientDataDine.gameIngData;
            msg.act == 0x01;//得到一张牌
            console.log(msg)
           
            data1.msg = msg;
            
            console.log(data1);
            return {   //封装对像
              data1
            }
          }else if(data.msg.act == 0x02){ //比牌游戏结束
            
          }
    }else{
      return this.noget(data)
    }
  }


  this.noget= function(data){
    return null;
  }

}

module.exports = gameLoginServer;