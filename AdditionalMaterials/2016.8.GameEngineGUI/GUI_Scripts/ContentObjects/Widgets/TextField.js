/*-----------------------------------------------------------------------------
//	Textfield widget extending GuiContentWidget
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function TextField(fieldID, style, defaultText, optionalFrontText) {
	this.defaultText = defaultText;
	this.optionalFrontText = optionalFrontText;
	
	if (this.defaultText == undefined) this.defaultText = "";
	if (this.optionalFrontText == undefined) this.optionalFrontText = "";
	
	GuiContentWidget.call(this, fieldID, style);
}

gGuiBase.View.inheritPrototype(TextField, GuiContentWidget);

TextField.prototype.initializeWidget = function () {
	this.setHTML();
};

TextField.prototype.setHTML = function() {
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet = this.optionalFrontText + '<input id="' + this.widgetID + '" type="text" value="' + this.defaultText + '" ' + this.style + '>';
	} else {
		this.htmlSnippet = this.optionalFrontText + '<input id="' + this.widgetID + '" type="text" value="' + this.defaultText + '">';
	}
};

TextField.prototype.setOnFocusOut = function (onFocusOutFunction) {
	$(this.getID()).focusout(function() {
		onFocusOutFunction($(this));
	})
};


TextField.prototype.setText = function( text ) {
	this.defaultText = text;
	this.setHTML();
};