/**
 * 1,定义数据库交互
 */
var mysql = require('mysql')

function mySql(){

    var db = mysql.createConnection({
        host:'',
        user:"root",
       
        database:'gameDB'
    })

}

module.exports = mySql;