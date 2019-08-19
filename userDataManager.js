/**
 * 用户管理类，数据清洗，管理用户信息，与keys 分开，keys是ws随时key换的
 * 定义各种用户数据包
 * data{   //后面若是压力测试大，就把这些数据储存进数据库
 *      keys =  ws keys 
 *      name = 用户的key 储存
 *      status = 0 or 1  0不在线， 1 在线
 *      msg{
 *            action 
 *      }
 * }
 */
var Dic = require("./lib/Dictionary");

function userDataManger(){
    var userInstance = new Dic();

    var onlineUserMannager = new Dic()

    //data,进来必须包括两个字段，ws 的key ,和用户名字name
    this.upUserData = function(data){

        if (!data.name || data.name == "" ) {
          //这个字段不存在
          return false;

        } else {
            if (userInstance.get(data.name) === undefined){
                console.log("不存在此用户 userDataManager")
                //不存在此用户
                userInstance.set(data.name,this.baseData(data));
            }else{
                console.log("存在此用户 userDataManager",data.keys);
                //此用户已存在
                userInstance.get(data.name).keys = data.keys; //更新keys 
                //userInstance.get(data.name).status = 1;     //更新在线状态
            }
          return true;
        }
    }
    this.baseData = function(data){
        return {
            keys: data.keys,
            name: data.name,
            status: 0,
            errors: 1,
            act: 0x00,
            chatMsg: "hello",
            msg:{}
        };
    }
    //errors = 1 
    this.baseUseData =function(name){
        let tempdata = {
          keys: userInstance.get(name).keys,
          name: name,
          status: 0,
          errors: 1,
          act: 0x00,
          chatMsg: "hello",
          msg: {}
        };
        return tempdata
    }

    this.HRpackage =function(name){ //心跳包

        if (userInstance.get(name) ===undefined){  //没有这个数据返回空
            console.log("userInstance.get", name, userInstance.get(name));
            return null 
        }
        console.log(userInstance.get(name).keys);
        let data = {
            keys: userInstance.get(name).keys,
            name: name,
            status: 0,
            act : 0x11
        }
        return data;
    }

    this.checkOnline=function(name){
        console.log("userDataManager  checkOnline => ",name)
        console.log("userDataManager  checkOnline => ",userInstance.get(name).status);
        if (userInstance.get(name).status == 0) {
          return true;
        } else {
          return false;
        };
    }

    this.setUserOnline = function(data){
        console.log("userDataManager ==> setUserOnline",data.name,data.keys,);
        console.log("userDataManager ==> setUserOnline", userInstance.get(data.name));
        userInstance.get(data.name).status = 1;
        onlineUserMannager.set(data.keys,data.name);
    }
    
    this.setUserTapeOut = function(keys){
        let name = onlineUserMannager.get(keys);
        if (name != undefined){
            userInstance.get(name).status = 0;
            onlineUserMannager.delete(keys);
        }
    }

    this.getUserData = function(name){
        if (userInstance.get(name) != undefined){
            return userInstance.get(name);
        }else {
            return null
        }
         
    }

}

module.exports = userDataManger