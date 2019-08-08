/**
 * 收发消息管理
 * 消息队列类
 */
function msgQueue() {
    //这里是属性和方法
    let msgserver = null
    this.init=function(obj){
        msgserver = obj;
        console.log("msgQueue server init");
        //初始化成功
    }

    let items = [];

    this.enqueue = function (data) {   //
        console.log("recive the msg is ok")
        items.push(data);
    };

    this.publicSend = function(msg){

        msgserver.publicData(msg);
        
    }

    this.privateSend = function(key,data){

        msgserver.Privatedata(key,data);

    }

    this.dequeue = function () {
        return items.shift();
    };

    this.front = function () {
        return items[0];
    };

    this.isEmpty = function () {
        return items.length == 0;
    };

    this.size = function () {
        return items.length;
    };

}

module.exports = msgQueue;