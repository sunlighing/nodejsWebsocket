/**
 * 因为javascript没有enum枚举类型,采用弱类型
 * 0x11 登录事件
 * 0x12 聊天信息
 * 0x13 设置信息
 * 0x14 在线匹配房间
 * 0x15 游戏中信息
 * 0x16 自动结束游戏，关闭游戏服务
 * 
 */
const clientDefineGame1 =[
    loginEvent = 0x11,
    chatEvent = 0x12,
    processOver = 0x13,
    matchingRoom = 0x14,
    gameIngData = 0x15,
    gameOver = 0x16,
]
    


module.exports = clientDefineGame1