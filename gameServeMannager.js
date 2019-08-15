
var Dic = require("./lib/Dictionary");
var queue = require("./lib/queue")
var roomGameServer = require("./roomGameServer")

function gameSeverManager(){
    var RoomData= new Dic();

    var matchRoomList = new queue();  //等待匹配的列表
    /**
     * 
     */
    this.matchRoom=function(name){
        if( matchRoomList.length > 0 ){
            //创建房间。初始化参数
            let player1 = matchRoomList.front();
            let roomName = this.rodomRoom();
            let roomGame = new roomGameServer();
            roomGameServer.init(player1, name, roomName);
            RoomData.set(roomName, roomGame);
            matchRoomList.dequeue();
            return {
                enoemy: player1,
                room: roomName,
            }
        }else{
            matchRoomList.enqueue(name);
            return {
                
            }
        }
    }

    this.rodomRoom = function(){
        let rooName = Math.random().toString(36).slice(-8);

        if (RoomData.get(rooName) ===undefined){
            return rooName;
        }else{
            this.rodomRoom();
        }
    }

}

module.exports = gameSeverManager;