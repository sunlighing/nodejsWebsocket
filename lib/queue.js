function Queue() {
    //这里是属性和方法
    //创建10000个keys 以免后面递归调用平凡
    let items = [];  //

    this.create = function(){
        for(let i =0; i <10000; i++){
            items.push(i);
        }
    }

    this.enqueue = function (element) {
        items.push(element);
    };

    this.dequeue = function () {
    //shift方法会从数组中移除存储在索引0

        return items.shift();
    };

    this.front = function () {
        return items[0];
    };

    this.isEmpty = function () {
       
        return items.length == 0;
    };
    
    this.size = function(){
        return items.length
    }

    this.print = function () {
        console.log(items.toString());
    };

}

module.exports = Queue