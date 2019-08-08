gameServer = async function(){  //异步执行
    this.dataset=function(data){
        let tempData = {
            uid:data.uid,
            name:"jack",
            action:0x11
        }
    }
}
module.exports = gameServer;