/*-----------------------------------------------------------------------------
//	Scene content
//	Extension of GuiTabContent
//
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function MaterialContent(tabContentID, style, title) {
	this.materialAddButton = null;
	this.materialSelectList = null;
	
	this.selectListID = "materialSelectList1";
	GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(MaterialContent, GuiTabContent);

MaterialContent.prototype.initialize = function () {
	this.materialAddButton = new Button("materialAddButton", GuiTabContent.NO_STYLE, "+Material");
	this.widgetList.push(this.materialAddButton);

	var materials = gGuiBase.MaterialSupport.getMaterialNameList();
	this.materialSelectList = new SelectList(this.selectListID, 'list-style-type: none; margin: 0; padding: 0', materials, 'display: inline; margin: 5px');
	this.widgetList.push(this.materialSelectList);
};

MaterialContent.prototype.initializeEventHandling = function () {
	this.materialAddButton.setOnClick(this.buttonOnClick);
	this.materialSelectList.setOnSelect(this.onListSelect);

	this.materialSelectList.addListClass("materialListMenu");
	
	$(this.materialSelectList.getID()).contextmenu({
		delegate: ".materialListMenu",
		menu: [
			{title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
			{title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"}
			],
		select: function(event, ui) {
			switch (ui.cmd) {
				case 'details':
					gGuiBase.Core.selectDetailsMaterial(ui.target.text());
					break;
				case 'delete':
					if (ui.target.text() !== "Default")
						gGuiBase.MaterialSupport.removeMaterial(ui.target.text());
					else 
						alert ("Cannot delete default material");
					break;
			}
		}
	});
	
};

MaterialContent.prototype.buttonOnClick = function() {
	gGuiBase.MaterialSupport.addNormal();
};

MaterialContent.prototype.onListSelect = function(ui) {
	var selectedMatName = ui["selected"]["id"];
	gGuiBase.Core.selectDetailsMaterial( selectedMatName );

};


