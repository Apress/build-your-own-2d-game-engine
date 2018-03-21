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

'use strict'
function BoundLine(pos,size){
    this.mBound = new Renderable()
    this.mBound.setColor([1,1,1,0])
    this.mBound.getXform().setPosition(pos[0],pos[1])
    this.mBound.getXform().setSize(size[0],size[1])

    GameObject.call(this, this.mBound)
    let r =  new RigidRectangle(this.getXform(), size[0], size[1])
    r.setMass(0)
    r.setRestitution(0.5)
    this.setRigidBody(r)
}
gEngine.Core.inheritPrototype(BoundLine,GameObject)