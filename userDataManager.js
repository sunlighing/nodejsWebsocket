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

    //data,进来必须包括两个字段，ws 的key ,和用户名字name
    this.upUserData=function(data){

        if(!data.name && data.name ==""){ //这个字段不存在
            return false
        }else{

            userInstance.set(data.name,data)
            return true 
        }
    }

    this.HRpackage =function(name){ //心跳包

        if (userInstance.get(name) ===undefined){  //没有这个数据返回空
            return null 
        }

        let data = {
            keys: userInstance.get(name).uid,
            name: name,
            HR : 0x11
        }
        return data;
    }

}

module.exports = userDataManger