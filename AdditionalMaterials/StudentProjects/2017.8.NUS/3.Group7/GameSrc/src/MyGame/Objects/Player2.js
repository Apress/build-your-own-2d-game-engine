//    Copyright 2017 XieJinChi ChenYiXiu
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

function Player2(spriteTexture,character){
    this.mPlayer = new SpriteRenderable(spriteTexture)
    //this.mPlayer = new Renderable()
    this.mPlayer.setColor([1, 0, 1, 0])
    this.mPlayer.getXform().setPosition(30, 15)
    // this.mPlayer.getXform().setSize(8, 8)
    GameObject.call(this, this.mPlayer)
    this.mMoveFric = null
    this.mRotFric = null 
    this.mAcc = null

    this.mSkillFrozenTime = 0
    this.mSkillLastTime = 0
    this.mIsSkilling = false
    this.mInverse = false
    // var r = new RigidRectangle(this.getXform(), 8, 8)
    var r = null
    if(character === GameCharacter.BigMan){
        this.mPlayer.getXform().setSize(10, 10)
        r =  new RigidRectangle(this.getXform(), 10, 10)
        r.setMass(3)
        this.mAcc = 18 
        this.mMoveFric = 0.993
        this.mRotFric = 0.97
        //  this.mPlayer.setColor([0, 0, 1, 1])
    }else if(character === GameCharacter.FlexMan){
        this.mPlayer.getXform().setSize(5, 5)
        r =  new RigidRectangle(this.getXform(), 5, 5)
        r.setMass(0.5)
        this.mAcc = 50
        this.mMoveFric = 0.982
        this.mRotFric = 0.98
        // this.mPlayer.setColor([0, 1, 0, 1])
    }else{
        this.mPlayer.getXform().setSize(8, 8)
        r =  new RigidRectangle(this.getXform(), 8, 8)
        r.autoSetMass()
        r.setMass(1)
        this.mAcc = 35 
        this.mMoveFric = 0.991
        this.mRotFric = 0.991
        // r.setMass(1)
        //  this.mPlayer.setColor([0, 1, 1, 1])
       
    }
    this.setRigidBody(r)
    //this.toggleDrawRenderable()
    this.mGameCharacter = character
}

//gEngine.Core.inheritPrototype(Player2,WASDObj)
gEngine.Core.inheritPrototype(Player2,DirectionKeyObj)

Player2.prototype.getStateString = function(){
    let str = 'Player2:'
    let num = 0
    if(this.mGameCharacter === GameCharacter.BigMan){
        str += 'Backoff'
        num = this.mSkillFrozenTime/Skill.getBigManFrozenTime() * 100
    
    }else if(this.mGameCharacter === GameCharacter.FlexMan){
        str += 'Even Faster'
        num = this.mSkillFrozenTime/Skill.getFlexManFrozenTime() * 100
    }else{
        str += 'Puzzle'
        num = this.mSkillFrozenTime/Skill.getNormalManFrozenTime() * 100
    }
    if(num>100) num =100
    num = Math.floor(num)
    str += num.toString()
    str += '%'
    return str
}

Player2.prototype.update = function () {
    /*  GameObject.prototype.update.call(this)
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)){
        if(this.mGameCharacter === GameCharacter.BigMan){
            alert('big man skill')
        }else if(this.mGameCharacter === GameCharacter.FlexMan){
            alert('speed man skill')
        }else{
            alert('balance man skill')
        }
    }*/

    if(this.mIsSkilling === false){
        GameObject.prototype.update.call(this)
        this.mSkillFrozenTime += 1
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.U)){
            if(this.mGameCharacter === GameCharacter.BigMan){
            //alert('big man skill')
                if(Skill.bigManSkill(this.mSkillFrozenTime,this.getRigidBody())){
                    this.mSkillFrozenTime = 0
                    this.mIsSkilling = true
                    this.mRotFric = 1
                    this.mAcc /= 5
                }
            }else if(this.mGameCharacter === GameCharacter.FlexMan){
            //alert('speed man skill')
                if(Skill.flexManSkill(this.mSkillFrozenTime,this.getRigidBody())){
                    this.mSkillFrozenTime = 0
                    this.mIsSkilling = true
                    this.mAcc += 70
                }
            }else{
            //alert('balance man skill')
                if(Skill.normalManSkill(this.mSkillFrozenTime,this.getRigidBody())){
                    this.mSkillFrozenTime = 0
                    this.mIsSkilling = true
                    this.mInverse = true
                }
            }
        }
    }else{
        this.mSkillLastTime += 1
        GameObject.prototype.update.call(this)
        if(this.mGameCharacter === GameCharacter.BigMan){
            //alert('big man skill')
              
            if(Skill.relieveBigManSkill(this.mSkillLastTime,this.getRigidBody())){
                // GameObject.prototype.update.call(this)
                this.mSkillLastTime = 0
                this.mIsSkilling = false
                this.mRotFric = 0.97
                this.mAcc *= 5
                
            }
        }else if(this.mGameCharacter === GameCharacter.FlexMan){
            //alert('speed man skill')
            //GameObject.prototype.update.call(this)
            if(Skill.relieveFlexManSkill(this.mSkillLastTime,this.getRigidBody())){
                this.mSkillLastTime = 0
                this.mIsSkilling = false
                this.mAcc -= 70
            }
        }else{
            //alert('balance man skill')
            // GameObject.prototype.update.call(this)
            if(Skill.relieveNormalManSkill(this.mSkillLastTime,this)){
                this.mSkillLastTime = 0
                this.mIsSkilling = false
                this.mInverse = false
            }
        }

    }

}

Player2.prototype.getInverse = function(){
    return this.mInverse
}