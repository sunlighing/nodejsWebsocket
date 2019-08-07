

function msgQueue() {
    //这里是属性和方法
    let msgserver = null
    this.init=function(obj){
        msgserver = obj;
        //初始化成功
        console.log(msgserver);
    }

    let data={
        uid: "",
        name: "",
        act: "",
        public: {

        }
    }

    let user={
        name: "",
        act: 0,
        msg: "",
    } 

    let items = [];

    this.enqueue = function (data) {
        
        items.push(data);
        this.publicSend("dd");

    };

    this.publicSend = function(msg){

        msgserver.publicData(data);
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

    this.print = function () {
        console.log(items.toString());
    };
}

module.exports = msgQueue;