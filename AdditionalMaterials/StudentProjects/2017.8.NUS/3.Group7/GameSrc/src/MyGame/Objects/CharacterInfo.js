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

function CharacterInfo(){
    this.mName = null
    this.mColor = null
    this.mWeight = null
    this.mSkill = null
    this.mSkillDetail = null
    this.mFeature = null
}

CharacterInfo.prototype.draw = function(camera){
    if(this.mName !== null)
        this.mName.draw(camera)
    if(this.mColor !== null)
        this.mColor.draw(camera)
    if(this.mWeight !== null)
        this.mWeight.draw(camera)
    if(this.mSkill !== null)
        this.mSkill.draw(camera)
    if(this.mFeature !== null)
        this.mFeature.draw(camera)
    if(this.mSkillDetail !== null)
        this.mSkillDetail.draw(camera)
}

CharacterInfo.prototype.setName = function(name, size, pos){
    let str = 'Type: '
    str += name
    this.mName = new FontRenderable(str)
    this.mName.getXform().setPosition(pos[0], pos[1])
    this.mName.setTextHeight(size)
}

CharacterInfo.prototype.setNameSize = function(size){
    this.mName.setTextHeight(size)
}

CharacterInfo.prototype.setSkill = function(skill, size, pos){
    let str = 'Skill: '
    str += skill
    this.mSkill = new FontRenderable(str)
    this.mSkill.getXform().setPosition(pos[0], pos[1])
    this.mSkill.setTextHeight(size)
}

CharacterInfo.prototype.setSkillDetail = function(skillDetail, size, pos){
    let str = ''
    str += skillDetail
    this.mSkillDetail = new FontRenderable(str)
    this.mSkillDetail.getXform().setPosition(pos[0], pos[1])
    this.mSkillDetail.setTextHeight(size)
}

CharacterInfo.prototype.setWeight = function(weight, size, pos){
    let str = 'Weight: '
    str += weight
    this.mWeight = new FontRenderable(str)
    this.mWeight.getXform().setPosition(pos[0], pos[1])
    this.mWeight.setTextHeight(size)
}

CharacterInfo.prototype.setFeature = function(feature, size, pos){
    let str = 'Feature: '
    str += feature
    this.mFeature = new FontRenderable(str)
    this.mFeature.getXform().setPosition(pos[0], pos[1])
    this.mFeature.setTextHeight(size)
}

CharacterInfo.prototype.setColor = function(path,size,pos){
    this.mColor = new SpriteRenderable(path)
    //this.mColor.setColor(color)
    let xf = this.mColor.getXform()
    xf.setPosition(pos[0],pos[1])
    xf.setSize(size[0],size[1])
}

