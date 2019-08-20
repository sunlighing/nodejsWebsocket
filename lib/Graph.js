/**
 * 图的类 ，没有权重
 */

var initializeColor = function () {
    var color = [];
    for (var i = 0; i < vertices.length; i++) {
        color[vertices[i]] = 'white'; //{1}
    }
    return color;
};

var dic = require("./Dictionary")
function Gragh() {
    var vertices = [];
    var adjList = new dic();

    this.addVertices = function*(v){
        vertices.push(v);
        adjList.set(v,[]);
    }

    this.addEdge =function (v,w){ //
        adjList.get(v).push(w)
        adjList.get(v).push(v)
    }

    this.toString = function () {
        var s = '';
        for (var i = 0; i < vertices.length; i++) { //{10}
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]); //{11}
            for (var j = 0; j < neighbors.length; j++) { //{12}
                s += neighbors[j] + ' ';
            }
            s += '\n'; //{13}
        }
        return s;
    };



    /**
     * 图的遍历
     */

}

module.exports = Gragh;