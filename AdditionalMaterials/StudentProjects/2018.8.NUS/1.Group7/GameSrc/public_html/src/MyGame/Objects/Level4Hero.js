/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint node: true, vars: true */
/*global WASDObj, gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

function Level4Hero(spriteTexture, atX, atY, w, h,top) {
   
    
    this.mHero=new TextureRenderable(spriteTexture);
    this.mHero.getXform().setPosition(atX, atY);
    this.mHero.getXform().setSize(w, h);
    this.setBoundRadius(w/2);
    
   /* this.mHero = new SpriteAnimateRenderable(spriteTexture);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(atX, atY);
    this.mHero.getXform().setSize(w, h);
    this.mHero.setSpriteSequence(top,0,150,150,2,0);
    this.mHero.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mHero.setAnimationSpeed(10);
    this.setBoundRadius(w/2);
    this.mWidth=w;
    this.mHeight=h;
    

    var r;
    r = new RigidRectangle(this.getXform(), w, h);
    r.setInertia(0);
    r.setRestitution(0);
    this.setRigidBody(r);    
   */
    GameObject.call(this, this.mHero);
    
    

}

gEngine.Core.inheritPrototype(Level4Hero, GameObject);