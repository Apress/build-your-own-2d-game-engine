/*-----------------------------------------------------------------------------
//	Selectable list widget extending GuiContentWidget
//  Uses JQueryUI selectable
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function ImageSelectList(listID, style, list, listStyle, imageStyle) {
	this.list = list;
	
	if (listStyle !== undefined) {
		this.listStyle = 'style="' + listStyle + '"';
	} else {
		this.listStyle = "";
	}
	
	if (imageStyle !== undefined) {
		this.imageStyle = 'style="' + imageStyle + '"';
	} else {
		this.imageStyle = "";
	}
	
	GuiContentWidget.call(this, listID, style);
}

gGuiBase.View.inheritPrototype(ImageSelectList, GuiContentWidget);

ImageSelectList.prototype.initializeWidget = function () {
	this.setHTML();
};

ImageSelectList.prototype.setHTML = function() {
	if (this.style !== GuiContentWidget.NO_STYLE) { 
		this.htmlSnippet = '<ul id="' + this.widgetID + '" ' + this.style + '>';
	} else { //No style specified
		this.htmlSnippet = '<ul id="' + this.widgetID + '">'
	}


	//Add each list element as a <li> tag
	for (var i = 0; i < this.list.length; i++) {
		if (this.listStyle !== GuiContentWidget.NO_STYLE) {
			this.htmlSnippet += '<li id="' + this.list[i] + '" ' + this.listStyle + '><img src=' + this.list[i] + ' ' + this.imageStyle + '></li>';
		} else {
			this.htmlSnippet += '<li id="' + this.list[i] + '"><img src=' + this.list[i] + '></li>';
		}
	}
	
	this.htmlSnippet += '</ul>';
};

ImageSelectList.prototype.addElement = function(listElement) {
	this.list.push(listElement);
	this.setHTML();
};

ImageSelectList.prototype.rebuildWithArray = function(list) {
	this.list = list;
	this.setHTML();
};

ImageSelectList.prototype.addListClass = function(className) {
	var list = $(this.getID() + ' li');

	list.each(function(index) {
		$(this).attr('class', $(this).attr('class') + ' ' + className);
	});
};

//Set jquery ui selectable
ImageSelectList.prototype.setOnSelect = function (onSelectFunction) {
	$(this.getID()).selectable({
		
		selecting: function(event, ui){
            if( $(".ui-selected, .ui-selecting").length > 1){
                  $(ui.selecting).removeClass("ui-selecting");
            }
		},
		
		selected: function(event, ui) {
			//Get the selected item
			onSelectFunction( ui );
		}
	});
};
