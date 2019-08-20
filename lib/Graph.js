var dic = require("./Dictionary")
function Gragh() {
    var vertices = [];
    var adjList = new dic();

    this.addVertices = function*(v){
        vertices.push(v);
        adjList.set(v,[]);
    }

    this.addEdge =function (v,w){
        adjList.get(v).push(w)
        adjList.get(v).push(v)
    }


}

module.exports = Gragh;