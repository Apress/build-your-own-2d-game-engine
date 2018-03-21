/* 
 * Created by 周玮皓 on 2016/8/1.
 * DefaultOptions用来保存全局参数
 */
var gManager = gManager || {};

gManager.DefaultOptions = (function(){
    var eObjectType = {
        Hero : "Hero",
        BG : "BG",
        Obstacle : "Obstacle",
        Land : "Land"
    };
    
    var isFirst = true;
    
    var getIsFirst = function(){
        return isFirst;
    };
    var setIsFirst = function(first){
        return isFirst = first;
    };
    
    var mPublic = {
        getIsFirst : getIsFirst,
        setIsFirst : setIsFirst,
        
        
        mBoxSpeed : -15.0,
        
        //BackGround
        mSpeed:0.3,
        mBgColor:[1, 1, 1, 0.0],
        
        //Hero
        mGravity:9.8,
        mJumpHeight:5,
        
        //Obstacle
        mFrequency:1.0,
        SCREEN_WIDTH:1200,
        SCREEN_HEIGHT:600,
        FULL_SCREEN_WCWIDTH:40,
        
        //Land way 
        mWaySpeed: 0.2,       
        eObjectType : eObjectType,
        
        //Level
        mLevel:1,
        
        //Score
        score:0,
        maxScore:0
        
        
    };
    return mPublic;
}());

