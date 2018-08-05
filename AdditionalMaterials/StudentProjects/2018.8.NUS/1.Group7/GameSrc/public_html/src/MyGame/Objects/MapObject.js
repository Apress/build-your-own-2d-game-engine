/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, Renderable: false ,GameObject*/
"use strict";
function MapObject(xPos,yPos,Degree,Width,Height,TexturePath){
    this.xPos=xPos;
    this.yPos=yPos;
    this.degree=Degree;
    this.width=Width;
    this.height=Height;
    this.kTexture=TexturePath;
    
    this.object=null;
    
    if(this.kTexture===null){
        this.object=new Renderable(gEngine.DefaultResources.getConstColorShader());
        this.object.setColor([0.447,0.286,0.219,1]);
        this.object.getXform().setPosition(this.xPos,this.yPos);
        this.object.getXform().setRotationInDegree(this.degree);
        this.object.getXform().setSize(this.width,this.height);
        
    }
    else{
        this.object=new TextureRenderable(this.kTexture);
        this.object.setColor([1,0,0,0]);
        this.object.getXform().setPosition(this.xPos,this.yPos);
        this.object.getXform().setRotationInDegree(this.degree);
        this.object.getXform().setSize(this.width,this.height); 
    }
    GameObject.call(this,this.object);
    
    if(this.kTexture===null){
        var r = new RigidRectangle(this.getXform(), Width, Height);
        r.setMass(0);
        this.setRigidBody(r);
    //    this.toggleDrawRigidShape();
    }
    else{
        var r = new RigidCircle(this.getXform(), Width*0.5);
        r.setMass(0);
        this.setRigidBody(r);
   //     this.toggleDrawRigidShape();
    }

}
gEngine.Core.inheritPrototype(MapObject,GameObject);


MapObject.prototype.mySetcolor = function () {
    this.object.setColor([0,0,0,1]);
};
