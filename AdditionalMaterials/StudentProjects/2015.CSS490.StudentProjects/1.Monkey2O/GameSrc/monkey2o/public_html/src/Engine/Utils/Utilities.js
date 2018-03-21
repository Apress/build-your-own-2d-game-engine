/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Utilities() {
  
}

Utilities.calcChildWCTransform = function(parentXForm, childXForm) {
  var concatXform = mat4.create();
  var tempXform = new Transform();

  // Transform the child in regards to its parent.
  mat4.multiply(
    concatXform,
    parentXForm.getXform(),
    childXForm.getXform()
  );

  tempXform.setXform(concatXform);
  
  return tempXform;
};
