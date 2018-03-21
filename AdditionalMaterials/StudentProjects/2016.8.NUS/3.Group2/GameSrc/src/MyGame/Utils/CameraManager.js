/*
 * 
 * 
 * 
 * 
 * 
 * 
 * By 龚楚涵 (Dino) in Singapore
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


var gManager = gManager || {};

/*
相机渲染列表单例类
 */
gManager.CameraManager = (function(){

    /*
    相机渲染队列，为一个数组，下标表示渲染层级，层级高的在上层。
     */
    var mCameraRenderArray = [];

    /*
    当前渲染的相机序号 (0,kMaxCameraNumber)
     */
    var mCurrentCameraIndex = 0;

    /*
    最多能拥有的相机树木
     */
    var kMaxCameraNumber = 50;

    /*
    初始化(重置)相机管理器，这个函数需要在每个场景的开始运用
    如果不调用这个函数，可以用来在切换场景的时候保存相机
     */
    var initManager = function(){
        for(var i = 0; i < kMaxCameraNumber ; i++){
            mCameraRenderArray[i] = null;
        }
        mCurrentCameraIndex = 0;
    };
    var registerCamera = function(camera,indexNumber){

        // 如果注册的渲染层级不合法则输出并退出
        if(indexNumber > kMaxCameraNumber || indexNumber < 0) {
            //alert(camera + " 渲染层级" + indexNumber + " 不合法");
            return;
        }

        // 如果指定渲染层级被占用，则输出并退出
        if(mCameraRenderArray[indexNumber]){
            //alert(camera + " 渲染层级" + indexNumber + " 已被占用");
            return;
        }

        // 如果相机对象为空则输出并对出
        if(!camera){
            //alert("指定序号相机" + indexNumber + "对象为空");
            return;
        }

        // 注册相机
        mCameraRenderArray[indexNumber] = camera;
    };

    /*
    如果当前渲染序列已经渲染完毕，则返回null
    若没有渲染完毕返回当前应该渲染的相机对象
     */
    var nextCamera = function(){

        // 如果当前指数大于最大相机数，返回空
        if( mCurrentCameraIndex >= kMaxCameraNumber) {
            return null;
        }

        // 在队列里寻找下一个相机的编号
        // 跳过队列里空的编号
        while(!mCameraRenderArray[mCurrentCameraIndex]){
            mCurrentCameraIndex++;

            // 如果已到达最大的相机编号但是依旧编号为空则说明队列可渲染相机已全部渲染
            if( mCurrentCameraIndex >= kMaxCameraNumber) return null;
        }

        // 找到了启动这个相机
        var camera = mCameraRenderArray[mCurrentCameraIndex];
        camera.setupViewProjection(true);

        // 移动到下个位置
        mCurrentCameraIndex++;

        // 返回相机
        return camera;
    };
    
    var update = function(){
        for(var i = 0; i < kMaxCameraNumber;i++){
            if(mCameraRenderArray[i])
                mCameraRenderArray[i].update();
        }
    };
    
    /*
    将当前相机编号移回渲染序列开头
     */
    var moveIndexToHead = function(){
        mCurrentCameraIndex = 0;
    };

    var getMaxCameraNumber = function(){
        return kMaxCameraNumber;
    };
    var getCurrentCameraIndex = function(){
        return mCurrentCameraIndex;
    };
    var getCamera = function(indexNumber){

        // 如果注册的渲染层级不合法则输出并退出
        if(indexNumber > kMaxCameraNumber || indexNumber < 0) {
            return null;
        }

        // 如果有指定编号有相机，则返回
        // 没有则返回null
        if(mCameraRenderArray[indexNumber]) return mCameraRenderArray[indexNumber];
        else return null;
    };

    var mPublic = {
        initManager : initManager,
        registerCamera : registerCamera,
        nextCamera : nextCamera,
        moveIndexToHead : moveIndexToHead,
        getMaxCameraNumber : getMaxCameraNumber,
        getCurrentCameraIndex : getCurrentCameraIndex,
        getCamera : getCamera,
        update:update
    };

    return mPublic;
}());
