/*-----------------------------------------------------------------------------
//	GUI Content Widget
//	Superclass for all widgets. 
//
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function GuiContentWidget (widgetID, style) {
    if (widgetID === undefined || typeof widgetID !==  'string') {
        throw "widgetID must be a string";
    }
    
    this.widgetID = widgetID;
	this.htmlSnippet = "";
	
	if (style !== undefined) 
		this.style = 'style="' + style + '"';
	else this.style = "";
	
	this.initializeWidget();
}

GuiContentWidget.prototype.initializeWidget = function () {
	//Do any initialization here, build the widget
};

GuiContentWidget.prototype.getWidgetHTML = function () {
	return this.htmlSnippet;
};

// returns the tab id
GuiContentWidget.prototype.getID = function () {
    return '#' + this.widgetID;
};

GuiContentWidget.NO_STYLE = "";
