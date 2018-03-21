/*-----------------------------------------------------------------------------
//	Basic text widget extending GuiContentWidget
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function Text(fieldID, style, defaultText) {
	this.defaultText = defaultText;

	GuiContentWidget.call(this, fieldID, style);
}

gGuiBase.View.inheritPrototype(Text, GuiContentWidget);

Text.prototype.initializeWidget = function () {
	this.setHTML();
};

Text.prototype.setHTML = function() {
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet = '<p ' + this.style + '>' + this.defaultText + '</p>';
	} else {
		this.htmlSnippet = '<p>' + this.defaultText + '</p>';
	}
};

