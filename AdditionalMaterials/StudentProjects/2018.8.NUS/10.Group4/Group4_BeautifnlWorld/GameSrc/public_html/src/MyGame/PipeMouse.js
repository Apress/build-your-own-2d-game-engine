/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

Level1.prototype.PipeMouse = function (){
    var pX = gEngine.Input.getMousePosX();
    var pY = gEngine.Input.getMousePosY();
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left && Pipepos ===120)) {
        gEngine.AudioClips.playACue(this.kpipemusic);
        //row0
        /*if((pX>167)&&(pY>277)&&(pX<216)&&(pY<323)){        
            id = 0;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>216)&&(pY>277)&&(pX<264)&&(pY<323)){        
            id = 1;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>264)&&(pY>277)&&(pX<310)&&(pY<323)){        
            id = 2;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>310)&&(pY>277)&&(pX<360)&&(pY<323)){        
            id = 3;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>360)&&(pY>277)&&(pX<408)&&(pY<323)){        
            id = 4;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>408)&&(pY>277)&&(pX<454)&&(pY<323)){        
            id = 5;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>454)&&(pY>277)&&(pX<504)&&(pY<323)){        
            id = 6;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }
        if((pX>504)&&(pY>277)&&(pX<552)&&(pY<323)){        
            id = 7;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset[id]+=1;
        }*/
        
        //row1
        if((pX>167)&&(pY>323)&&(pX<216)&&(pY<373)){        
            id = 8;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>216)&&(pY>323)&&(pX<263)&&(pY<373)){        
            id = 9;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>263)&&(pY>323)&&(pX<312)&&(pY<373)){        
            id = 10;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>312)&&(pY>323)&&(pX<357)&&(pY<373)){        
            id = 11;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>357)&&(pY>323)&&(pX<407)&&(pY<373)){        
            id = 12;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>407)&&(pY>323)&&(pX<455)&&(pY<373)){        
            id = 13;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>455)&&(pY>323)&&(pX<503)&&(pY<373)){        
            id = 14;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        if((pX>503)&&(pY>323)&&(pX<551)&&(pY<373)){        
            id = 15;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset1[id%8]+=1;
        }
        
        //row2
        if((pX>167)&&(pY>372)&&(pX<216)&&(pY<419)){        
            id = 16;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>216)&&(pY>372)&&(pX<263)&&(pY<419)){        
            id = 17;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>263)&&(pY>372)&&(pX<312)&&(pY<419)){        
            id = 18;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>312)&&(pY>372)&&(pX<357)&&(pY<419)){        
            id = 19;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>357)&&(pY>372)&&(pX<407)&&(pY<419)){        
            id = 20;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>407)&&(pY>372)&&(pX<455)&&(pY<419)){        
            id = 21;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>455)&&(pY>372)&&(pX<503)&&(pY<419)){        
            id = 22;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        if((pX>503)&&(pY>372)&&(pX<551)&&(pY<419)){        
            id = 23;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset2[id%16]+=1;
        }
        
        //row3
        if((pX>167)&&(pY>419)&&(pX<216)&&(pY<466)){        
            id = 24;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>216)&&(pY>419)&&(pX<263)&&(pY<466)){        
            id = 25;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>263)&&(pY>419)&&(pX<312)&&(pY<466)){        
            id = 26;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>312)&&(pY>419)&&(pX<357)&&(pY<466)){        
            id = 27;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>357)&&(pY>419)&&(pX<407)&&(pY<466)){        
            id = 28;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>407)&&(pY>419)&&(pX<455)&&(pY<466)){        
            id = 29;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>455)&&(pY>419)&&(pX<503)&&(pY<466)){        
            id = 30;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        if((pX>503)&&(pY>419)&&(pX<551)&&(pY<466)){        
            id = 31;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset3[id%24]+=1;
        }
        
        //row4
        if((pX>167)&&(pY>466)&&(pX<216)&&(pY<516)){        
            id = 32;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>216)&&(pY>466)&&(pX<263)&&(pY<516)){        
            id = 33;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>263)&&(pY>466)&&(pX<312)&&(pY<516)){        
            id = 34;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>312)&&(pY>466)&&(pX<357)&&(pY<516)){        
            id = 35;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>357)&&(pY>466)&&(pX<407)&&(pY<516)){        
            id = 36;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>407)&&(pY>466)&&(pX<455)&&(pY<516)){        
            id = 37;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>455)&&(pY>466)&&(pX<503)&&(pY<516)){        
            id = 38;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        if((pX>503)&&(pY>466)&&(pX<551)&&(pY<516)){        
            id = 39;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset4[id%32]+=1;
        }
        //row5
        /*if((pX>167)&&(pY>516)&&(pX<216)&&(pY<563)){        
            id = 40;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>216)&&(pY>516)&&(pX<263)&&(pY<563)){        
            id = 41;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>263)&&(pY>516)&&(pX<312)&&(pY<563)){        
            id = 42;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>312)&&(pY>516)&&(pX<357)&&(pY<563)){        
            id = 43;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>357)&&(pY>516)&&(pX<407)&&(pY<563)){        
            id = 44;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>407)&&(pY>516)&&(pX<455)&&(pY<563)){        
            id = 45;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>455)&&(pY>516)&&(pX<503)&&(pY<563)){        
            id = 46;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }
        if((pX>503)&&(pY>516)&&(pX<551)&&(pY<563)){        
            id = 47;
            this.mAllObjs.getObjectAt(id).getXform().incRotationByDegree(90);
            offset5[id%40]+=1;
        }*/
    }
};

Level1.prototype.ClearLevel = function(){
    
}


