function cardManger(){
    var cardinfo=[
        0x01,
        0x02,
        0x03,
        0x04,
        0x05,
        0x06,
        0x07,
        0x08,
        0x09,
        0x0a,
    ]

    this.randomCard=function(){
        let num = parseInt(Math.random() * (cardinfo.length + 1), 10);
        return cardinfo[num]
    }
}

module.exports = cardManger;