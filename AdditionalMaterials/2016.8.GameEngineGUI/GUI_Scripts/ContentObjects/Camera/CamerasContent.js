/*-----------------------------------------------------------------------------
//	Scene content
//	Extension of GuiTabContent
//
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function CamerasContent(tabContentID, style, title) {
	this.cameraAddButton = null;
	this.cameraSelectList = null;
	
	this.selectListID = "cameraSelectList";
	GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(CamerasContent, GuiTabContent);

// initialize the camera panel
CamerasContent.prototype.initialize = function () {
	// add-add button to camera panel
	this.cameraAddButton = new Button("cameraAddButton", GuiTabContent.NO_STYLE, "+Camera");
	this.widgetList.push(this.cameraAddButton);
	// add cameras to panel
	this.cameraSelectList = new SelectList(this.selectListID, 'list-style-type: none; margin: 0; padding: 0', [], 'display: inline; margin: 5px');
	this.widgetList.push(this.cameraSelectList);
};

// initializes camera events
CamerasContent.prototype.initializeEventHandling = function () {
	this.cameraAddButton.setOnClick(this.buttonOnClick);
	this.cameraSelectList.setOnSelect(this.onListSelect);
	this.cameraSelectList.addListClass("cameraListMenu");

	// setup right click menu
	$(this.cameraSelectList.getID()).contextmenu({
		delegate: ".cameraListMenu",
		menu: [
			{title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
			{title: "Edit code", cmd: "edit", uiIcon: "ui-icon-pencil"},
			{title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"}
		],
		select: function(event, ui) {
			var cameraName = ui.target.text();
			switch (ui.cmd) {
				case 'details':
					gGuiBase.Core.selectDetailsCamera( cameraName );
					break;
				case 'edit':
					gGuiBase.EditorSupport.createFloatingEditor( cameraName );
					break;
				case 'delete':
                    gGuiBase.CameraSupport.deleteCamera( cameraName );
					break;
			}
		}
	});
	
};

// creates a new camera when add camera button is clicked
CamerasContent.prototype.buttonOnClick = function() {
	gGuiBase.Core.addDefaultCamera();
};

// left clicking a camera list item will select it in the details panel
CamerasContent.prototype.onListSelect = function(ui) {
	var selectedCameraName = ui["selected"]["id"];
	gGuiBase.Core.selectDetailsCamera( selectedCameraName );
};


