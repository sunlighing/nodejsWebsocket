
var Dic = require("./lib/Dictionary");
var queue = require("./lib/queue")
var roomGameServer = require("./roomGameServer")

function gameSeverManager(){
    var RoomData= new Dic();

    var matchRoomList = new queue();  //等待匹配的列表
    /**
     * 1,匹配房间。2,
     */
    this.matchRoom=function(name){

        console.log("gameServeMannger == > matchRoomList.length",matchRoomList.size());

        if (matchRoomList.size() > 0 && name != matchRoomList.front() ){
            //创建房间。初始化参数
            let player1 = matchRoomList.front();
            let roomName = this.rodomRoom();
            let roomGame = new roomGameServer();
            roomGame.init(player1, name, roomName);

            RoomData.set(roomName, roomGame);
            matchRoomList.dequeue();
            
            return {
                p1: player1,
                p2: name,
                room: roomName,
            }
        }else{
            matchRoomList.enqueue(name);
            return null;
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

    this.getCard = function(roomName,name){
        console.log("gameServerMannager,roomName,name", roomName, name)
        if (RoomData.get(roomName) != undefined){
            return RoomData.get(roomName).getCard(name);
        }
    }

}

module.exports = gameSeverManager;