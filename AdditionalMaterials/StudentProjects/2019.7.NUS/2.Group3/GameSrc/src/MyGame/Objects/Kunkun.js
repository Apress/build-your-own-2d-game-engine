function Kunkun(spriteTexture) {
    this.mKunkun = new SpriteRenderable(spriteTexture);
    this.mKunkun.setColor([0, 0.4, 0, 0.1]);
    this.mKunkun.getXform().setPosition(0,0);
    this.mKunkun.getXform().setSize(15,9);
    this.xl=21;
    this.yl=16;
    this.height=101;
    this.width=180;
    this.play=false;
    this.timecount=1;
    this.maxcount=347;
    this.isEnd = false;
    GameObject.call(this, this.mKunkun);
}
gEngine.Core.inheritPrototype(Kunkun, GameObject);
Kunkun.prototype.update=function(){
    this.timecount++;
    var arr=this.getPositionArray(Math.floor(this.timecount/5));
    this.mKunkun.setElementPixelPositions(arr[0],arr[1],arr[2],arr[3]);
    if(this.timecount>this.maxcount*4.5){
        this.play=false;
        this.timecount=0;
    }
}
Kunkun.prototype.draw=function(camera){
    if(this.play){
        this.mKunkun.draw(camera)
    }
}
Kunkun.prototype.getPositionArray=function(index){
    var yii=Math.floor(index/this.xl);
    var xi=index-yii*this.xl;
    var yi=this.yl-yii;
    return [this.width*(xi-1),this.width*xi,this.height*(yi-1),this.height*yi];
}