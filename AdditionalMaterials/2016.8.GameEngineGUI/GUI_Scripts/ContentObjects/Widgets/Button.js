/*-----------------------------------------------------------------------------
//	Button widget extending GuiContentWidget
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function Button(buttonID, style, buttonName) {
	this.buttonName = buttonName;

	GuiContentWidget.call(this, buttonID, style);
}

gGuiBase.View.inheritPrototype(Button, GuiContentWidget);

Button.prototype.initializeWidget = function () {
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet += '<button id="' + this.widgetID + '" ' + this.style + '>' + this.buttonName + '</button>';
	} else {
		this.htmlSnippet += '<button id="' + this.widgetID + '">' + this.buttonName + '</button>';
	}

};

//Set jquery ui button click function
Button.prototype.setOnClick = function (onClickFunction) {

	$(this.getID()).button().click(function() {
		onClickFunction();
    });
};
