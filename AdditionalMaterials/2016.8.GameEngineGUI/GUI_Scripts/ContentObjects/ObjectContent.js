// constructor
function ObjectContent(tabContentID, style, title) {
	this.objectAddButton = null;
	this.objectSelectList = null;
	this.widgetList = null;

	this.selectListID = "objectSelectList1";
	GuiTabContent.call(this, tabContentID, style, title);
}gGuiBase.View.inheritPrototype(ObjectContent, GuiTabContent);

// add-add button and current objects to content panel
ObjectContent.prototype.initialize = function () {
	this.objectAddButton = new Button("objectAddButton", GuiTabContent.NO_STYLE, "+Object");
	this.widgetList.push(this.objectAddButton);
	this.objectSelectList = new SelectList(this.selectListID, 'list-style-type: none; margin: 0; padding: 0', []);
	this.widgetList.push(this.objectSelectList);
	this.initializeEventHandling();
};

// connects the eventHandlers to their specific methods
ObjectContent.prototype.initializeEventHandling = function () {
	this.objectAddButton.setOnClick(this.buttonOnClick);
	this.objectSelectList.setOnSelect(this.selectObject);
	this.objectSelectList.addListClass("objectListMenu");
	
	// add right click menu to objects in the object panel
	$(this.objectSelectList.getID()).contextmenu({
		delegate: ".objectListMenu",
		menu: [
			{title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
			{title: "Edit code", cmd: "edit", uiIcon: "ui-icon-pencil"},
			{title: "Instantiate to scene", cmd: "instantiate", uiIcon: "ui-icon-arrowthick-1-e"},
			{title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"},
			],
		select: function(event, ui) {
			var gameObjectName = ui.target.text();
			switch (ui.cmd) {
				// update details panel with selected object
				case 'details':
					gGuiBase.Core.selectDetailsObject(gameObjectName);
					break;
				// open code editor for selected object
				case 'edit':
					gGuiBase.EditorSupport.createFloatingEditor(gameObjectName);
					break;
				// create an instance of the object into the current scene
				case 'instantiate':
					gGuiBase.Core.addInstanceWithName(gameObjectName);
					break;
				// delete the object and all its instances from all scenes
				case 'delete':
					if (confirm("Warning: This will delete all instances of " + gameObjectName + ".\n\Delete anyways?")) { // Evalutes to true and perform an action if OK is pressed, otherwise do nothing
                        gGuiBase.ObjectSupport.deleteObject(gameObjectName);
					}
					break;
			}
		}
	});
};

// adds a new object when addObject button is left-clicked
ObjectContent.prototype.buttonOnClick = function() {
	gGuiBase.Core.addDefaultObject();
};

// this function handles the left click event on an object in the object tab
// populates the details tab with the object information
ObjectContent.prototype.selectObject = function( ui ) {
	// get objectName/objectID
	var selectedObjectName = ui["selected"]["id"];
	gGuiBase.Core.selectDetailsObject( selectedObjectName );
};
