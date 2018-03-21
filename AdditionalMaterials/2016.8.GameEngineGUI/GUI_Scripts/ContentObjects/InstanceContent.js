// contains content file for instance tab
"use strict";
/*-----------------------------------------------------------------------------
 //	Scene content
 //	Extension of GuiTabContent
 //
 //	Author: Jason Herold/Thoof
 -----------------------------------------------------------------------------*/
function InstanceContent(tabContentID, style, title) {
    this.instanceAddButton = null;
    this.instanceSelectList = null;
    this.objInstanceSelecter = null;

    this.selectListID = "instanceSelectList";
    this.objDropdownSelectorID = "instanceDropdown";
    GuiTabContent.call(this, tabContentID, style, title);
}
gGuiBase.View.inheritPrototype(InstanceContent, GuiTabContent);

InstanceContent.prototype.initialize = function () {
    this.dropdownList = gGuiBase.Core.getObjectList();
    this.objInstanceSelecter = new DropdownList(this.objDropdownSelectorID, GuiTabContent.NO_STYLE, this.dropdownList);
    this.widgetList.push(this.objInstanceSelecter);

    this.instanceAddButton = new Button("instanceAddButton", GuiTabContent.NO_STYLE, "+Instance");
    this.widgetList.push(this.instanceAddButton);

    this.instanceSelectList = new SelectList(this.selectListID, 'list-style-type: none; margin: 0; padding: 0', [], 'display: inline; margin: 5px');
    var sceneInstances = gGuiBase.SceneSupport.gCurrentScene.getInstanceNameList();					// add instance to instance content
    this.instanceSelectList.rebuildWithArray( sceneInstances );
    this.widgetList.push(this.instanceSelectList);
};

InstanceContent.prototype.initializeEventHandling = function () {
    this.instanceAddButton.setOnClick(this.buttonOnClick);
    this.instanceSelectList.setOnSelect(this.onListSelect);
	
	this.instanceSelectList.addListClass("instanceListMenu");
	
	$(this.instanceSelectList.getID()).contextmenu({
		delegate: ".instanceListMenu",
		menu: [
			{title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
			{title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"},
			],
		select: function(event, ui) {
			switch (ui.cmd) {
				case 'details':
					gGuiBase.Core.selectInstanceDetails(ui.target.text());
					break;
				case 'delete':
                    gGuiBase.InstanceSupport.deleteInstance(ui.target.text());
					break;
			}
		}
	});
	
};

InstanceContent.prototype.buttonOnClick = function() {
    gGuiBase.Core.addInstance();
};

InstanceContent.prototype.onListSelect = function(ui) {
    // get objectName/objectID
    var selectedInstanceName = ui["selected"]["id"];
    gGuiBase.Core.selectInstanceDetails( selectedInstanceName );
};

InstanceContent.prototype.getDropdownObjectName = function() {
    return this.objInstanceSelecter.getSelectedListItem();
};

InstanceContent.prototype.setDropdownToSelectedGO = function() {
    var selectedGO = gGuiBase.Core.selectedGameObject;
    if (selectedGO) {
        $('#' + this.objDropdownSelectorID).val(selectedGO.mName);
    }
};


