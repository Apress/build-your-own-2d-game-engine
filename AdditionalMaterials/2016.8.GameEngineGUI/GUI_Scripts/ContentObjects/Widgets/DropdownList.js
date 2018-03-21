/*-----------------------------------------------------------------------------
//	Dropdown list widget extending GuiContentWidget
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function DropdownList(listID, style, list) {
	this.list = list;
	GuiContentWidget.call(this, listID, style);
}

gGuiBase.View.inheritPrototype(DropdownList, GuiContentWidget);

DropdownList.prototype.initializeWidget = function () {
	this.setHTML();
};

DropdownList.prototype.setHTML = function() {
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet = '<select id="' + this.widgetID + '" ' + this.style + '>';
	} else {
		this.htmlSnippet = '<select id="' + this.widgetID + '">';
	}

	//Add each list element as an <option> tag
	for (var i = 0; i < this.list.length; i++) {
		this.htmlSnippet += '<option value="' + this.list[i] + '">' + this.list[i] + '</option>';
	}
	
	this.htmlSnippet += '</select>';
};

DropdownList.prototype.addElement = function(listElement) {
	this.list.push(listElement);
	this.setHTML();
};

DropdownList.prototype.rebuildWithArray = function(list) {
	this.list = list;
	this.setHTML();
};

//On dropdown change
DropdownList.prototype.setOnSelect = function (onSelectFunction) {
	$(this.getID()).change(function() {
		onSelectFunction($(this).val());
	});
};

DropdownList.prototype.getSelectedListItem = function () {
	return $('#' + this.widgetID + ' option').filter(':selected').text();
};
