function Dictionary() { //字典类
    var items = {};

    this.has = function (key) {
        return key in items;
    };

    this.set = function (key, value) {
        items[key] = value; //{1}
    };

    this.delete = function (key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    
    this.deleteValue = function(value){ //实体值删除
        for (var k in items) { //{1}
            if (this.get(k) == value) {
                delete items[k];
              return k;
            }
        }
        return null
    }   

    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    };
    
    this.values = function () {  //返回值的实例
        var values = [];
        for (var k in items) { //{1}
            if (this.has(k)) {
                values.push(items[k]); //{2}
            }
        }
        return values;
    };


    this.getKeys = function(value){
        for (var k in items) { //{1}
            if (this.get(k) === value) {
              return k;
            }
        }
        return null
    }

    this.keys = function () {
        return Object.keys();
    };

    this.size = function(){
        return items.length;
    }

    this.getItems = function () {
        return items;
    }

   

}

module.exports = Dictionary;
