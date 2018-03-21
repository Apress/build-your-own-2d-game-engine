/*-----------------------------------------------------------------------------
//	GUI Tab Content
//	Superclass for all tab content extensions. Handles returning the overall
//	html content from all the widgets
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function GuiTabContent (tabContentID, style, title) {
    if (tabContentID === undefined || typeof tabContentID !==  'string') {
        throw "tabContentID must be a string";
    }
    
    this.tabContentID = tabContentID; 
    this.widgetList = [];
	this.title = title;
	
	//If the user specified, define the overall style for this content
	if (style !== undefined) {
		this.style = 'style="' + style + '"';
	} else {
		this.style = "";
	}
	
	this.initialize();
}

GuiTabContent.prototype.initialize = function () {
	//Do any initialization here
};

GuiTabContent.prototype.initializeEventHandling = function() {
	//Do any event handling here, like adding an onclick to a button
};

GuiTabContent.prototype.getHTMLContent = function () {
	var htmlString = '<div id="' + this.tabContentID + '" ' + this.style + '>';
	for (var i = 0; i < this.widgetList.length; i++) {
		htmlString += this.widgetList[i].getWidgetHTML();
	}
	
	htmlString += '</div>';
	return htmlString;
};

GuiTabContent.prototype.getWidgetHTMLContent = function() {
	var htmlString = '';
	for (var i = 0; i < this.widgetList.length; i++) {
		htmlString += this.widgetList[i].getWidgetHTML();
	}
	return htmlString;
};

GuiTabContent.prototype.findWidgetByID = function(id) {
	for (var i = 0; i < this.widgetList.length; i++) {
		if (id == this.widgetList[i].getID())
			return this.widgetList[i];
	}
	return null;
};

// returns the tab id
GuiTabContent.prototype.getID = function () {
    return '#' + this.tabContentID;
};

GuiTabContent.NO_STYLE = "";