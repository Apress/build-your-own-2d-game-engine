function selfAdapt(){
    var ratio=10/9.5;
    var div=document.getElementById("LoadingIconParent");
    var canvas=document.getElementById("GLCanvas");
    var r=5/3;
    var length=(window.innerHeight*r<window.innerWidth?window.innerHeight:window.innerWidth/r)/ratio;
    div.style.height=length+"px";
    div.style.width=length*r+"px";
    canvas.style.height=length+"px";
    canvas.style.width=length*r+"px";
    //document.getElementById("rule").style.width=(window.innerWidth-length*r)+"px";
    div.style.left=((window.innerWidth-length*r)/2)+"px";
}
fullscreenSelect=function(){
    var element=document.documentElement;
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
};

getMousePosInWC=function(){
    var mousePos = vec2.fromValues(gEngine.Input.getMousePosX(),gEngine.Input.getMousePosY());
    mousePos[0]=(mousePos[0]-750)/(1500/140)-15.5;
    mousePos[1]=(mousePos[1]-450)/(900/84)-10;
    return mousePos;
}