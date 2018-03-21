/*-----------------------------------------------------------------------------
//	Texture selection dialog
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
function TextureSelectDialog(dialogID, style) {
	this.imageSelectList = null;
	this.selectedImage = null;
	GuiContentWidget.call(this, dialogID, style);
}

gGuiBase.View.inheritPrototype(TextureSelectDialog, GuiContentWidget);

TextureSelectDialog.prototype.initializeWidget = function () {
	var imageList = gGuiBase.TextureSupport.getImageList();
	this.imageSelectList = new ImageSelectList("TextureSelectListDialog", 'list-style-type: none; margin: 0; padding: 0', imageList, GuiTabContent.NO_STYLE, "width: 33%; height: auto; width: auto; float: left; min-width: 50px; min-height: 50px; max-width: 100px; max-height: 100px;");
	this.imageSelectList.initializeWidget();
	
	if (this.style !== GuiContentWidget.NO_STYLE) {
		this.htmlSnippet += '<div id="' + this.widgetID + '" title="Select a texture"' + this.style + '>' + this.imageSelectList.getWidgetHTML() + '</div>';
	} else {
		this.htmlSnippet += '<div id="' + this.widgetID + '">' + this.imageSelectList.getWidgetHTML() + '</div>';
	}

};

TextureSelectDialog.prototype.initializeEventHandling = function() {

	gGuiBase.DirectManipulationSupport.setPreventInteraction(true);
	$('#' + this.widgetID).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true
	});
	
	var widgetSelector = '#' + this.widgetID;

	$('#TextureSelectListDialog').selectable({
		selecting: function(event, ui){
            if( $(".ui-selected, .ui-selecting").length > 1){
                  $(ui.selecting).removeClass("ui-selecting");
            }
		},
		
		selected: function(event, ui) {
			event.preventDefault();
			event.stopPropagation();
			this.selectedImage = gGuiBase.TextureSupport.getImageName(ui.selected.id);
			
			var gameObjectName = gGuiBase.Core.selectedGameObject.mName;
			var colorTextureContent = gGuiBase.View.findTabContentByID("#ColorTextureContent");
			if (this.selectedImage == "None") {
				gGuiBase.TextureSupport.removeTextureFromGameObject(gameObjectName);
			} else {
				gGuiBase.TextureSupport.addTextureToGameObject(gameObjectName, this.selectedImage);
			}
			$(widgetSelector ).dialog( "close" );
		}
	});
};

//Set jquery ui button click function
TextureSelectDialog.prototype.setOnClose = function (onCloseFunction) {
	$('#' + this.widgetID).dialog({
		close: onCloseFunction
    });
};
