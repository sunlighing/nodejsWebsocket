/**
 * function 1.定义数据包,
 * 2.决定数据包的发送次序，
 * 3.收到数据包时进行数据包分析,分发数据包给游戏服务
 *  * 数据包结构:
 *      收: data{
 *                uid: 用户名
 *                act: 用户行为
 *                
 *            }
 *      发: data{
 *                uid: 00000
 *                name:用户名
 *                act: 用户行为
 *                public: {
 *                          user:{
 *                                  name:
 *                                  act:
 *                                  msg:
 *                              }
 *                        }
 *            }
 */

function dataManager(){
    
}

module.exports = dataManager;
