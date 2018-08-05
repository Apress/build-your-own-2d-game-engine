/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var pipe1 = new Array();
pipe1=[0,256,0,256]
var pipe2 = new Array();
pipe2=[256,512,0,256]
var pipe3 = new Array();
pipe3=[0,256,256,512]
var pipe4 = new Array();
pipe4=[256,512,256,512]
var pipe5 = new Array();
pipe5=[512,768,256,512]
var pipe6 = new Array();
pipe6=[768,1024,256,512]

Level1.prototype.PipeControl = function(){
    var compen = 10;
    var ob;
    var x1=15;
    var y1=10;
    ob = new Pipe(this.kAll,x1, y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1,512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kInput,x1+4*compen,y1, pipe1[1] ,pipe1[2], pipe1[3], pipe1[0]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+6*compen,y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    //5=1,8=1,9=1,10=2,14=1
    ob = new Pipe(this.kAll,x1,y1+1*compen, 256, 512, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1+1*compen, 0, 256, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1+1*compen, 0, 256, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1+1*compen, 256, 512, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+4*compen,y1+1*compen, 256, 512, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1+1*compen, 512, 768, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+6*compen,y1+1*compen, pipe6[0] ,pipe6[1], pipe6[2], pipe6[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1+1*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    
    ob = new Pipe(this.kAll,x1+0*compen,y1+2*compen, 768, 1024, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1+2*compen, 256, 512, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1+2*compen, 256, 512, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1+2*compen, 512, 768, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+4*compen,y1+2*compen, 256, 512, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1+2*compen, 768, 1024, 256, 512);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+6*compen,y1+2*compen, pipe5[0] ,pipe5[1], pipe5[2], pipe5[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1+2*compen, pipe4[0] ,pipe4[1], pipe4[2], pipe4[3]);
    this.mAllObjs.addToSet(ob);
    
    ob = new Pipe(this.kAll,x1+0*compen,y1+3*compen, pipe2[0] ,pipe2[1], pipe2[2], pipe2[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1+3*compen, pipe3[0] ,pipe3[1], pipe3[2], pipe3[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1+3*compen, pipe2[0] ,pipe2[1], pipe2[2], pipe2[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1+3*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+4*compen,y1+3*compen, pipe5[0] ,pipe5[1], pipe5[2], pipe5[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1+3*compen, pipe5[0] ,pipe5[1], pipe5[2], pipe5[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+6*compen,y1+3*compen, pipe5[0] ,pipe5[1], pipe5[2], pipe5[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1+3*compen, pipe6[0] ,pipe6[1], pipe6[2], pipe6[3]);
    this.mAllObjs.addToSet(ob);
    
    ob = new Pipe(this.kAll,x1+0*compen,y1+4*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1+4*compen, pipe5[0] ,pipe5[1], pipe5[2], pipe5[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1+4*compen, pipe6[0] ,pipe6[1], pipe6[2], pipe6[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1+4*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+4*compen,y1+4*compen, pipe4[0] ,pipe4[1], pipe4[2], pipe4[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1+4*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+6*compen,y1+4*compen, pipe3[0] ,pipe3[1], pipe3[2], pipe3[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1+4*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    //512,768,0,256
    ob = new Pipe(this.kAll,x1+0*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+1*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+2*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+3*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+4*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+5*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kInput,x1+6*compen,y1+5*compen, pipe1[0] ,pipe1[1], pipe1[2], pipe1[3]);
    this.mAllObjs.addToSet(ob);
    ob = new Pipe(this.kAll,x1+7*compen,y1+5*compen, 512 ,768, 0, 256);
    this.mAllObjs.addToSet(ob);
};

