/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine: false, Renderable: false ,GameObject*/
"use strict";
function Item(xPos,yPos,Degree,Width,Height,TexturePath){
    this.xPos=xPos;
    this.yPos=yPos;
    this.degree=Degree;
    this.width=Width;
    this.height=Height;
    this.kTexture=TexturePath;
    this.setBoundRadius(Width/2);
	this.dir=0;//0 for right
    
    this.object=null;
    
    if(this.kTexture===null){
        this.object=new Renderable(gEngine.DefaultResources.getConstColorShader());
        this.object.setColor([0,0,0,1]);
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
    
}
gEngine.Core.inheritPrototype(Item,GameObject);


