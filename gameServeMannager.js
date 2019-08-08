/**
 * 单例类：游戏管理唯一类
 */
class gameServerMannage{
    
    getInstace(){
        instance = null;
        return function(){
            if (instance == null ){
                instance = new gameServerMannage();
            }
            return instance
        }
    }



}

module.exports = gameServerMannage