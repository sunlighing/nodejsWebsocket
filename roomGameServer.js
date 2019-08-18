var cardManager = require("./cardManager");
function roomGame(){
    
    this.player2 = {
        act:0x00,
        name:null,
        card:[],
        score:0,
        msg:null,
    };

    this.player1={
        act: 0x00,
        name:null,
        card:[],
        score:0,
        msg:null,
    };

    var cardMan = new cardManager();

    this.roomToken = null;

    this.init = function(p1,p2,roomname){
        this.player1.name = p1;
        this.player2.name = p2;
        this.roomToken = roomname;
    }

    this.getCard=function(name){
        if (this.player1.name == name){
            this.player1.card.push(cardMan.randomCard());
            this.player1.act=0x01
            return this.player1
        } else if (this.player2.name == name){
            this.player2.card.push(cardMan.randomCard());
            this.player2.act = 0x01
            return this.player2
        }
    }

    this.compareCard = function(){
        let playerone = 0 
        for (let k in this.player1.card){
            playerone = playerone + this.player1.card[k];
        }

        let playertwo = 0 
        for(let k in this.player2.card){
            playertwo = playertwo + this.player2.card[k];
        }

        if (playerone >= playertwo ){
            return 
        }else{
            return  
        }
    }
    


}

module.exports= roomGame