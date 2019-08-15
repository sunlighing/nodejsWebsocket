function roomGame(){
    this.player1 = null;
    this.player2 = null;
    this.roomToken = null;

    this.init = function(p1,p2,roomname){
        this.player1 = p1;
        this.player2 = p2;
        this.roomToken = roomname;
    }


}

module.exports= roomGame