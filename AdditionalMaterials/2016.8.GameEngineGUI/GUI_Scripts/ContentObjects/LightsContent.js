/*-----------------------------------------------------------------------------
//	
//	Extension of GuiTabContent
//
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function LightsContent(tabContentID, style, title) {
	this.lightAddButton = null;
	this.lightSelectList = null;
	
	this.selectListID = "lightSelectList";
	GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(LightsContent, GuiTabContent);

// initialize the light panel
LightsContent.prototype.initialize = function () {
	
	this.lightAddButton = new Button("lightAddButton", GuiTabContent.NO_STYLE, "+Light");
	this.widgetList.push(this.lightAddButton);
	// add lights to panel
	this.lightSelectList = new SelectList(this.selectListID, 'list-style-type: none; margin: 0; padding: 0', [], 'display: inline; margin: 5px');
	this.widgetList.push(this.lightSelectList);
};

// initializes light events
LightsContent.prototype.initializeEventHandling = function () {
	this.lightAddButton.setOnClick(this.buttonOnClick);
	this.lightSelectList.setOnSelect(this.onListSelect);
	this.lightSelectList.addListClass("lightListMenu");

	// setup right click menu
	$(this.lightSelectList.getID()).contextmenu({
		delegate: ".lightListMenu",
		menu: [
			{title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
			{title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"}
		],
		select: function(event, ui) {
			var lightName = ui.target.text();
			switch (ui.cmd) {
				case 'details':
					gGuiBase.Core.selectDetailsLight( lightName );
					break;
				case 'delete':
                    gGuiBase.LightSupport.removeLight( lightName );
					break;
			}
		}
	});
	
};

// creates a new light when add light button is clicked
LightsContent.prototype.buttonOnClick = function() {
	gGuiBase.Core.addDefaultLight();
};

// left clicking a light list item will select it in the details panel
LightsContent.prototype.onListSelect = function(ui) {
	console.log(ui["selected"]["id"]);
	var selectedLightName = ui["selected"]["id"];
	gGuiBase.Core.selectDetailsLight( selectedLightName );
};


