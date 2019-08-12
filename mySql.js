/**
 * 1,定义数据库交互
 */
var mysql = require('mysql')

function mySql(){

    var db = mysql.createConnection({
        host:'94.34.122.32',
        user:"root",
        password:"ding1234",
        database:'gameDB'
    })

}

module.exports = mySql;