 function gameServer(){  //异步执行


    this.dataset=function(data){
        let tempData = {
            uid:data.uid,
            name:"jack",
            action:0x11
        }
        return tempData;
    }
}
module.exports = gameServer;