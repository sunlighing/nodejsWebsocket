var card = require("./cardManager")
function roomGame(){
    
    this.player2 = {
        name=null,
        card=[],
        score=0,
    };

    this.player1={
        name=null,
        card=[],
        score=0,
    };

    var card = new card();

    this.roomToken = null;

    this.init = function(p1,p2,roomname){
        this.player1.name = p1;
        this.player2.name = p2;
        this.roomToken = roomname;
    }

    this.getCard=function(name){
        if (this.player1.name == name){
            this.player1.card.push(card.getCard())
            return this.player1
        } else if (this.player2.name == name){
            this.player2.card.push(card.getCard())
            return this.player2
        }
    }
    


}

module.exports= roomGame