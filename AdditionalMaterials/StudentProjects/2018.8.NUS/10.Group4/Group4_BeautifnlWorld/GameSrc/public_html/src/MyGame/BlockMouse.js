/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var color0,color1,color2,color3,color4,color5,color6,color7,color8,color9,color10,color11,color12,color13,color14,color15,color16,color17,color18,color19,color20,color21,color22,color23,color24;

Level7.prototype.BlockMouse = function (){
    color0=this.mAllBlocks.getObjectAt(0).getRenderable().getColor();
        color1=this.mAllBlocks.getObjectAt(1).getRenderable().getColor();
        color2=this.mAllBlocks.getObjectAt(2).getRenderable().getColor();
        color3=this.mAllBlocks.getObjectAt(3).getRenderable().getColor();
        color4=this.mAllBlocks.getObjectAt(4).getRenderable().getColor();
        color5=this.mAllBlocks.getObjectAt(5).getRenderable().getColor();
        color6=this.mAllBlocks.getObjectAt(6).getRenderable().getColor();
        color7=this.mAllBlocks.getObjectAt(7).getRenderable().getColor();
        color8=this.mAllBlocks.getObjectAt(8).getRenderable().getColor();
        color9=this.mAllBlocks.getObjectAt(9).getRenderable().getColor();
        color10=this.mAllBlocks.getObjectAt(10).getRenderable().getColor();
        color11=this.mAllBlocks.getObjectAt(11).getRenderable().getColor();
        color12=this.mAllBlocks.getObjectAt(12).getRenderable().getColor();
        color13=this.mAllBlocks.getObjectAt(13).getRenderable().getColor();
        color14=this.mAllBlocks.getObjectAt(14).getRenderable().getColor();
        color15=this.mAllBlocks.getObjectAt(15).getRenderable().getColor();
        color16=this.mAllBlocks.getObjectAt(16).getRenderable().getColor();
        color17=this.mAllBlocks.getObjectAt(17).getRenderable().getColor();
        color18=this.mAllBlocks.getObjectAt(18).getRenderable().getColor();
        color19=this.mAllBlocks.getObjectAt(19).getRenderable().getColor();
        color20=this.mAllBlocks.getObjectAt(20).getRenderable().getColor();
        color21=this.mAllBlocks.getObjectAt(21).getRenderable().getColor();
        color22=this.mAllBlocks.getObjectAt(22).getRenderable().getColor();
        color23=this.mAllBlocks.getObjectAt(23).getRenderable().getColor();
        color24=this.mAllBlocks.getObjectAt(24).getRenderable().getColor();
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) { 
        //row1
        var white=[1, 1, 1, 1];
        var light=[1, 1, 0, 1];

        //row1
        if((pX>220)&&(pY>400)&&(pX<278)&&(pY<458)){        
            if (color0.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(0).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(0).getRenderable().setColor(white);}
            if (color1.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(1).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(1).getRenderable().setColor(white);}
            if (color5.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(5).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(5).getRenderable().setColor(white);}                   
        }
        
        if((pX>278)&&(pY>400)&&(pX<336)&&(pY<458)){        
            if (color0.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(0).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(0).getRenderable().setColor(white);}
            if (color1.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(1).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(1).getRenderable().setColor(white);}
            if (color2.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(2).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(2).getRenderable().setColor(white);}     
            if (color6.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(6).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(6).getRenderable().setColor(white);}     
        }
        
        if((pX>336)&&(pY>400)&&(pX<394)&&(pY<458)){        
            if (color7.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(7).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(7).getRenderable().setColor(white);}
            if (color1.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(1).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(1).getRenderable().setColor(white);}
            if (color2.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(2).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(2).getRenderable().setColor(white);}     
            if (color3.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(3).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(3).getRenderable().setColor(white);}     
        }
        
        if((pX>394)&&(pY>400)&&(pX<452)&&(pY<458)){        
            if (color4.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(4).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(4).getRenderable().setColor(white);}
            if (color8.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(8).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(8).getRenderable().setColor(white);}
            if (color2.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(2).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(2).getRenderable().setColor(white);}     
            if (color3.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(3).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(3).getRenderable().setColor(white);}     
        }
        
        if((pX>452)&&(pY>400)&&(pX<510)&&(pY<458)){        
            if (color4.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(4).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(4).getRenderable().setColor(white);}
            if (color9.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(9).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(9).getRenderable().setColor(white);} 
            if (color3.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(3).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(3).getRenderable().setColor(white);}     
        }
        
        //row2
        if((pX>220)&&(pY>458)&&(pX<278)&&(pY<516)){        
            if (color0.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(0).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(0).getRenderable().setColor(white);}
            if (color10.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(10).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(10).getRenderable().setColor(white);}
            if (color5.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(5).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(5).getRenderable().setColor(white);}      
            if (color6.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(6).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(6).getRenderable().setColor(white);}     
        }
        
        if((pX>278)&&(pY>458)&&(pX<336)&&(pY<516)){        
            if (color5.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(5).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(5).getRenderable().setColor(white);}
            if (color1.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(1).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(1).getRenderable().setColor(white);}
            if (color7.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(7).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(7).getRenderable().setColor(white);}     
            if (color6.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(6).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(6).getRenderable().setColor(white);}     
            if (color11.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(11).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(11).getRenderable().setColor(white);}     
        }
        
        if((pX>336)&&(pY>458)&&(pX<394)&&(pY<516)){        
            if (color7.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(7).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(7).getRenderable().setColor(white);}
            if (color6.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(6).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(6).getRenderable().setColor(white);}
            if (color2.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(2).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(2).getRenderable().setColor(white);}     
            if (color8.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(8).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(8).getRenderable().setColor(white);}   
            if (color12.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(12).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(12).getRenderable().setColor(white);}     
        }
        
        if((pX>394)&&(pY>458)&&(pX<452)&&(pY<516)){        
            if (color7.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(7).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(7).getRenderable().setColor(white);}
            if (color8.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(8).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(8).getRenderable().setColor(white);}
            if (color9.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(9).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(9).getRenderable().setColor(white);}     
            if (color3.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(3).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(3).getRenderable().setColor(white);}     
            if (color13.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(13).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(13).getRenderable().setColor(white);}     
        }
        
        if((pX>452)&&(pY>458)&&(pX<510)&&(pY<516)){        
            if (color4.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(4).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(4).getRenderable().setColor(white);}
            if (color9.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(9).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(9).getRenderable().setColor(white);} 
            if (color8.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(8).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(8).getRenderable().setColor(white);}     
            if (color14.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(14).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(14).getRenderable().setColor(white);}     
        }
        
        //row3
        if((pX>220)&&(pY>516)&&(pX<278)&&(pY<574)){        
            if (color11.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(11).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(11).getRenderable().setColor(white);}
            if (color10.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(10).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(10).getRenderable().setColor(white);}
            if (color5.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(5).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(5).getRenderable().setColor(white);}      
            if (color15.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(15).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(15).getRenderable().setColor(white);}     
        }
        
        if((pX>278)&&(pY>516)&&(pX<336)&&(pY<574)){        
            if (color12.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(12).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(12).getRenderable().setColor(white);}
            if (color10.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(10).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(10).getRenderable().setColor(white);}
            if (color16.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(16).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(16).getRenderable().setColor(white);}     
            if (color6.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(6).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(6).getRenderable().setColor(white);}     
            if (color11.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(11).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(11).getRenderable().setColor(white);}     
        }
        
        if((pX>336)&&(pY>516)&&(pX<394)&&(pY<574)){        
            if (color7.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(7).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(7).getRenderable().setColor(white);}
            if (color11.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(11).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(11).getRenderable().setColor(white);}
            if (color13.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(13).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(13).getRenderable().setColor(white);}     
            if (color17.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(17).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(17).getRenderable().setColor(white);}   
            if (color12.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(12).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(12).getRenderable().setColor(white);}     
        }
        
        if((pX>394)&&(pY>516)&&(pX<452)&&(pY<574)){        
            if (color12.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(12).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(12).getRenderable().setColor(white);}
            if (color8.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(8).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(8).getRenderable().setColor(white);}
            if (color14.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(14).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(14).getRenderable().setColor(white);}     
            if (color18.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(18).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(18).getRenderable().setColor(white);}     
            if (color13.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(13).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(13).getRenderable().setColor(white);}     
        }
        
        if((pX>452)&&(pY>516)&&(pX<510)&&(pY<574)){        
            if (color13.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(13).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(13).getRenderable().setColor(white);}
            if (color9.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(9).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(9).getRenderable().setColor(white);} 
            if (color19.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(19).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(19).getRenderable().setColor(white);}     
            if (color14.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(14).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(14).getRenderable().setColor(white);}     
        }
        
        //row4
        if((pX>220)&&(pY>574)&&(pX<278)&&(pY<632)){        
            if (color20.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(20).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(20).getRenderable().setColor(white);}
            if (color10.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(10).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(10).getRenderable().setColor(white);}
            if (color15.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(15).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(15).getRenderable().setColor(white);}      
            if (color16.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(16).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(16).getRenderable().setColor(white);}     
        }
        
        if((pX>278)&&(pY>574)&&(pX<336)&&(pY<632)){        
            if (color15.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(15).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(15).getRenderable().setColor(white);}
            if (color21.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(21).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(21).getRenderable().setColor(white);}
            if (color17.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(17).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(17).getRenderable().setColor(white);}     
            if (color16.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(16).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(16).getRenderable().setColor(white);}     
            if (color11.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(11).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(11).getRenderable().setColor(white);}     
        }
        
        if((pX>336)&&(pY>574)&&(pX<394)&&(pY<632)){        
            if (color17.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(17).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(17).getRenderable().setColor(white);}
            if (color16.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(16).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(16).getRenderable().setColor(white);}
            if (color22.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(22).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(22).getRenderable().setColor(white);}     
            if (color18.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(18).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(18).getRenderable().setColor(white);}   
            if (color12.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(12).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(12).getRenderable().setColor(white);}     
        }
        
        if((pX>394)&&(pY>574)&&(pX<452)&&(pY<632)){        
            if (color17.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(17).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(17).getRenderable().setColor(white);}
            if (color18.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(18).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(18).getRenderable().setColor(white);}
            if (color19.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(19).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(19).getRenderable().setColor(white);}     
            if (color23.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(23).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(23).getRenderable().setColor(white);}     
            if (color13.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(13).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(13).getRenderable().setColor(white);}     
        }
        
        if((pX>452)&&(pY>574)&&(pX<510)&&(pY<632)){        
            if (color24.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(24).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(24).getRenderable().setColor(white);}
            if (color19.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(19).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(19).getRenderable().setColor(white);} 
            if (color18.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(18).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(18).getRenderable().setColor(white);}     
            if (color14.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(14).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(14).getRenderable().setColor(white);}     
        }
        
        //row5
            if((pX>220)&&(pY>632)&&(pX<278)&&(pY<690)){        
            if (color20.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(20).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(20).getRenderable().setColor(white);}
            if (color21.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(21).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(21).getRenderable().setColor(white);}
            if (color15.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(15).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(15).getRenderable().setColor(white);}                   
        }
        
        if((pX>278)&&(pY>632)&&(pX<336)&&(pY<690)){        
            if (color20.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(20).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(20).getRenderable().setColor(white);}
            if (color21.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(21).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(21).getRenderable().setColor(white);}
            if (color22.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(22).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(22).getRenderable().setColor(white);}     
            if (color16.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(16).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(16).getRenderable().setColor(white);}     
        }
        
        if((pX>336)&&(pY>632)&&(pX<394)&&(pY<690)){        
            if (color17.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(17).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(17).getRenderable().setColor(white);}
            if (color21.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(21).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(21).getRenderable().setColor(white);}
            if (color22.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(22).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(22).getRenderable().setColor(white);}     
            if (color23.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(23).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(23).getRenderable().setColor(white);}     
        }
        
        if((pX>394)&&(pY>632)&&(pX<452)&&(pY<690)){        
            if (color24.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(24).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(24).getRenderable().setColor(white);}
            if (color18.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(18).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(18).getRenderable().setColor(white);}
            if (color22.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(22).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(22).getRenderable().setColor(white);}     
            if (color23.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(23).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(23).getRenderable().setColor(white);}     
        }
        
        if((pX>452)&&(pY>632)&&(pX<510)&&(pY<690)){        
            if (color24.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(24).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(24).getRenderable().setColor(white);}
            if (color19.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(19).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(19).getRenderable().setColor(white);} 
            if (color23.toString()=== "1,1,1,1"){this.mAllBlocks.getObjectAt(23).getRenderable().setColor(light);}
            else{this.mAllBlocks.getObjectAt(23).getRenderable().setColor(white);}     
        }
    }
    
//    if((color0.toString()=== "1,1,0,1")&&(color1.toString()=== "1,1,0,1")&&(color2.toString()=== "1,1,0,1")&&(color3.toString()=== "1,1,0,1")&&(color4.toString()=== "1,1,0,1")
//        &&(color5.toString()=== "1,1,0,1")&&(color6.toString()=== "1,1,0,1")&&(color7.toString()=== "1,1,0,1")&&(color8.toString()=== "1,1,0,1")&&(color9.toString()=== "1,1,0,1")
//        &&(color10.toString()=== "1,1,0,1")&&(color11.toString()=== "1,1,0,1")&&(color12.toString()=== "1,1,0,1")&&(color13.toString()=== "1,1,0,1")&&(color14.toString()=== "1,1,0,1")
//        &&(color15.toString()=== "1,1,0,1")&&(color16.toString()=== "1,1,0,1")&&(color17.toString()=== "1,1,0,1")&&(color18.toString()=== "1,1,0,1")&&(color19.toString()=== "1,1,0,1")
//        &&(color20.toString()=== "1,1,0,1")&&(color21.toString()=== "1,1,0,1")&&(color22.toString()=== "1,1,0,1")&&(color23.toString()=== "1,1,0,1")&&(color24.toString()=== "1,1,0,1"))
//        {
//            isWin=true;
//            gEngine.GameLoop.stop();
//        }
};



