/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//x and y start position of jump section
//w and h the total height and width of 1/3 of the jump section
//startang = min starting angle
//maxang = max angle of the steepest part of the jump
//pieces = how many wall sections to use per 1/3 of jump
MyGame.prototype.createJump= function(x,y,w,h, startang, maxang, pieces, b= false){
  var i=0;
  var prevwall=null;
  var px=x;
  var py=y;
  var wxf=null;
  var x1 = x;
  var y1=y;
  var theta=null;
  
  var piecewidth= w/pieces
  var pieceh = 2;
  
  for(i=0;i<pieces;i++){
    
    if(prevwall != null){
        
            wxf = prevwall.getXform();
        
            px = wxf.getXPos();
        
            py = wxf.getYPos();
        
            theta=wxf.getRotationInRad();
        
        x1 = px + piecewidth/2 * Math.cos(theta) - pieceh/2* Math.sin(theta);
        y1 = py + piecewidth/2 * Math.sin(theta) + pieceh/2* Math.cos(theta);
        
        
    }    
        
    var wall = new Wall(this.kWallTexture, piecewidth, pieceh, x1, y1, b);  
    
        wall.getXform().setRotationInDegree(startang+maxang*(i/pieces));
        theta = wall.getXform().getRotationInRad();
        
        var x2 = x1 + piecewidth/2 * Math.cos(theta) + pieceh/2* Math.sin(theta);
        var y2 = y1 + piecewidth/2 * Math.sin(theta) - pieceh/2* Math.cos(theta);
                
        wall.getXform().setPosition(x2,y2);
    
        this.mObjects.addToSet(wall);
    
        prevwall=wall;
  }
  
  
  //PART II
    for(i=0;i<pieces;i++){
    
    if(prevwall != null){
        
            wxf = prevwall.getXform();
        
            px = wxf.getXPos();
        
            py = wxf.getYPos();
        
            theta=wxf.getRotationInRad();
        
        x1 = px + piecewidth/2 * Math.cos(theta) - pieceh/2* Math.sin(theta);
        y1 = py + piecewidth/2 * Math.sin(theta) + pieceh/2* Math.cos(theta);
        
        
        
    }    
        
    var wall = new Wall(this.kWallTexture, piecewidth, pieceh, x1, y1, b);  
    
        wall.getXform().setRotationInDegree(startang+maxang - maxang*(i/pieces));
        theta = wall.getXform().getRotationInRad();

        var x2 = x1 + piecewidth/2 * Math.cos(theta) + pieceh/2* Math.sin(theta);
        var y2 = y1 + piecewidth/2 * Math.sin(theta) - pieceh/2* Math.cos(theta);
        
        wall.getXform().setPosition(x2,y2);
    
        this.mObjects.addToSet(wall);
    
        prevwall=wall;
  }
  
  
  //PART III
  
      for(i=0;i<pieces;i++){
    
    if(prevwall != null){
        
            wxf = prevwall.getXform();
        
            px = wxf.getXPos();
        
            py = wxf.getYPos();
        
            theta=wxf.getRotationInRad();
        
        x1 = px + piecewidth/2 * Math.cos(theta) - pieceh/2* Math.sin(theta);
        y1 = py + piecewidth/2 * Math.sin(theta) + pieceh/2* Math.cos(theta);
        
        
    }    
        
    var wall = new Wall(this.kWallTexture, piecewidth, pieceh, x1, y1, b);  
    
        wall.getXform().setRotationInDegree(startang - maxang*(i/pieces));
        theta = wall.getXform().getRotationInRad();

        var x2 = x1 + piecewidth/2 * Math.cos(theta) + pieceh/2* Math.sin(theta);
        var y2 = y1 + piecewidth/2 * Math.sin(theta) - pieceh/2* Math.cos(theta);
                
        wall.getXform().setPosition(x2,y2);
    
        this.mObjects.addToSet(wall);
    
        prevwall=wall;
  }
  
  //returns the position of the last wall in the set
  return [x2 ,y2];
  
  
  
}