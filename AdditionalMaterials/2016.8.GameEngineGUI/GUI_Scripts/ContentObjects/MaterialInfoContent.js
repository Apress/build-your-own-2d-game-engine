
function MaterialInfoContent(tabContentID, style, title) {
	this.matNameText = null;
	this.matName = null;
	this.ambientText = null;
	this.ambientField1 = null;
	this.ambientField2 = null;
	this.ambientField3 = null;
	this.ambientField4 = null;
	
	this.diffuseText = null;
	this.diffuseField1 = null;
	this.diffuseField2 = null;
	this.diffuseField3 = null;
	this.diffuseField4 = null;
	
	this.specularText = null;
	this.specularField1 = null;
	this.specularField2 = null;
	this.specularField3 = null;
	this.specularField4 = null;
	
	this.shininessText = null;
	this.shininessField = null;
	
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(MaterialInfoContent, GuiTabContent);

MaterialInfoContent.prototype.initialize = function () {
	
	var textStyle = 'margin-left: 10px; margin-top: 4px';
	var textFieldStyle = 'width: 90%; margin-left: 10px';

	this.matNameText = new Text("matNameText", textStyle, "Material name");
	this.matName = new TextField("matNameField", textFieldStyle, "Material0");
	
	this.ambientText = new Text("ambientText", textStyle, "Ambient");
	this.ambientField1 = new TextField("ambientField1", textFieldStyle, "0");
	this.ambientField2 = new TextField("ambientField2", textFieldStyle, "0");
	this.ambientField3 = new TextField("ambientField3", textFieldStyle, "0");
	this.ambientField4 = new TextField("ambientField4", textFieldStyle, "0");
	
	this.diffuseText = new Text("diffuseText", textStyle, "Diffuse");
	this.diffuseField1 = new TextField("diffuseField1", textFieldStyle, "1");
	this.diffuseField2 = new TextField("diffuseField2", textFieldStyle, "1");
	this.diffuseField3 = new TextField("diffuseField3", textFieldStyle, "1");
	this.diffuseField4 = new TextField("diffuseField4", textFieldStyle, "1");
	
	this.specularText = new Text("specularText", textStyle, "Specular");
	this.specularField1 = new TextField("specularField1", textFieldStyle, "0.2");
	this.specularField2 = new TextField("specularField2", textFieldStyle, "0.2");
	this.specularField3 = new TextField("specularField3", textFieldStyle, "0.2");
	this.specularField4 = new TextField("specularField4", textFieldStyle, "1");
	
	this.shininessText = new Text("shininessText", textStyle, "Shininess");
	this.shininessField = new TextField("shininessField", textFieldStyle, "20");
	
	this.widgetList.push(this.matNameText);
	this.widgetList.push(this.matName);
	this.widgetList.push(this.ambientText);
	this.widgetList.push(this.ambientField1);
	this.widgetList.push(this.ambientField2);
	this.widgetList.push(this.ambientField3);
	this.widgetList.push(this.ambientField4);
	
	this.widgetList.push(this.diffuseText);
	this.widgetList.push(this.diffuseField1);
	this.widgetList.push(this.diffuseField2);
	this.widgetList.push(this.diffuseField3);
	this.widgetList.push(this.diffuseField4);
	
	this.widgetList.push(this.specularText);
	this.widgetList.push(this.specularField1);
	this.widgetList.push(this.specularField2);
	this.widgetList.push(this.specularField3);
	this.widgetList.push(this.specularField4);
	
	this.widgetList.push(this.shininessText);
	this.widgetList.push(this.shininessField);
	
};

MaterialInfoContent.prototype.initializeEventHandling = function () {
	this.matName.setOnFocusOut(this.onTextFieldFocusOut);
	this.ambientField1.setOnFocusOut(this.onTextFieldFocusOut);
	this.ambientField2.setOnFocusOut(this.onTextFieldFocusOut);
	this.ambientField3.setOnFocusOut(this.onTextFieldFocusOut);
	this.ambientField4.setOnFocusOut(this.onTextFieldFocusOut);
	
	this.diffuseField1.setOnFocusOut(this.onTextFieldFocusOut);
	this.diffuseField2.setOnFocusOut(this.onTextFieldFocusOut);
	this.diffuseField3.setOnFocusOut(this.onTextFieldFocusOut);
	this.diffuseField4.setOnFocusOut(this.onTextFieldFocusOut);
	
	this.specularField1.setOnFocusOut(this.onTextFieldFocusOut);
	this.specularField2.setOnFocusOut(this.onTextFieldFocusOut);
	this.specularField3.setOnFocusOut(this.onTextFieldFocusOut);
	this.specularField4.setOnFocusOut(this.onTextFieldFocusOut);
	
	this.shininessField.setOnFocusOut(this.onTextFieldFocusOut);
};

MaterialInfoContent.prototype.onTextFieldFocusOut = function(textField) {

	var material = gGuiBase.Core.selectedMaterial;
	var value = textField.val();
	
	switch(textField.attr("id")) {
		case "matNameField":
			
			break;
		case "ambientField1":
			var ambient = material.getAmbient();
			material.setAmbient(vec4.fromValues(value, ambient[1], ambient[2], ambient[3]));

			break;
		case "ambientField2":
			var ambient = material.getAmbient();
			material.setAmbient(vec4.fromValues(ambient[0], value, ambient[2], ambient[3]));
			break;
		case "ambientField3":
			var ambient = material.getAmbient();
			material.setAmbient(vec4.fromValues(ambient[0], ambient[1], value, ambient[3]));
			break;
		case "ambientField4":
			var ambient = material.getAmbient();
			material.setAmbient(vec4.fromValues(ambient[0], ambient[1], ambient[2], value));
			break;
		
		case "diffuseField1":
			var diffuse = material.getDiffuse();
			material.setDiffuse(vec4.fromValues(value, diffuse[1], diffuse[2], diffuse[3]));
			break;
		case "diffuseField2":
			var diffuse = material.getDiffuse();
			material.setDiffuse(vec4.fromValues(diffuse[0], value, diffuse[2], diffuse[3]));
			break;
		case "diffuseField3":
			var diffuse = material.getDiffuse();
			material.setDiffuse(vec4.fromValues(diffuse[0], diffuse[1], value, diffuse[3]));
			break;
		case "diffuseField4":
			var diffuse = material.getDiffuse();
			material.setDiffuse(vec4.fromValues(diffuse[0], diffuse[1], diffuse[2], value));
			break;
			
		case "specularField1":
			var specular = material.getSpecular();
			material.setSpecular(vec4.fromValues(value, specular[1], specular[2], specular[3]));
			break;
		case "specularField2":
			var specular = material.getSpecular();
			material.setSpecular(vec4.fromValues(specular[0], value, specular[2], specular[3]));
			break;
		case "specularField3":
			var specular = material.getSpecular();
			material.setSpecular(vec4.fromValues(specular[0], specular[1], value, specular[3]));
			break;	
		case "specularField4":
			var specular = material.getSpecular();
			material.setSpecular(vec4.fromValues(specular[0], specular[1], specular[2], value));
			break;	
		
		case "shininessField":
			material.setShininess(value);
		default:
			break;
	}
	
	
};

MaterialInfoContent.prototype.updateFields = function( material ) {

	this.matName.setText( material.mID );
	
	this.shininessField.setText(material.getShininess());
	
	var ambient = material.getAmbient();
	var diffuse = material.getDiffuse();
	var specular = material.getSpecular();
	
	this.ambientField1.setText(ambient[0]);
	this.ambientField2.setText(ambient[1]);
	this.ambientField3.setText(ambient[2]);
	this.ambientField4.setText(ambient[3]);
	
	this.diffuseField1.setText(diffuse[0]);
	this.diffuseField2.setText(diffuse[1]);
	this.diffuseField3.setText(diffuse[2]);
	this.diffuseField4.setText(diffuse[3]);
	
	this.specularField1.setText(specular[0]);
	this.specularField2.setText(specular[1]);
	this.specularField3.setText(specular[2]);
	this.specularField4.setText(specular[3]);

};



