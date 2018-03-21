function AddTextureContent(tabContentID, style, title) {
	this.fileInputButton = null;
	this.textureSelectList = null;
    this.widgetList = null;
    this.textureSelectList = null;
    this.materialInput = null;

    this.selectListID = "texSelectList1";
    GuiTabContent.call(this, tabContentID, style, title);
}

gGuiBase.View.inheritPrototype(AddTextureContent, GuiTabContent);

AddTextureContent.prototype.initialize = function () {
	this.fileInputButton = new FileInputButton("TextureInput", GuiTabContent.NO_STYLE, "Add texture");
	this.widgetList.push(this.fileInputButton);
	
	var textures = gGuiBase.TextureSupport.getImageList();
	this.textureSelectList = new ImageSelectList("TextureSelectList", 'list-style-type: none; margin: 0; padding: 0', textures, GuiTabContent.NO_STYLE, "width: 33%; height: auto; width: auto; float: left; min-width: 50px; min-height: 50px; max-width: 100px; max-height: 100px;");
	this.widgetList.push(this.textureSelectList);

    this.materialInput = new FileInputButton("MaterialInput", GuiTabContent.NO_STYLE, "Add Material");
    this.widgetList.push(this.materialInput);

    var materials = gGuiBase.LightSupport.getMaterialNameList();
    this.materialSelectList = new ImageSelectList("MaterialSelectList", 'list-style-type: none; margin: 0; padding: 0', materials, GuiTabContent.NO_STYLE, "width: 33%; height: auto; width: auto; float: left; min-width: 50px; min-height: 50px; max-width: 100px; max-height: 100px;");
    this.widgetList.push(this.materialSelectList);
	
    this.initializeEventHandling();
};

// connects the eventHandlers to their specific methods
AddTextureContent.prototype.initializeEventHandling = function () {
	this.fileInputButton.setOnFileSelect(this.onTextureFileSelect);
    this.materialInput.setOnFileSelect(this.onMaterialFileSelect);

    this.textureSelectList.setOnSelect(this.selectObject);
    this.textureSelectList.addListClass("imageListMenu");
    $(this.textureSelectList.getID()).contextmenu({
        delegate: ".imageListMenu",
        menu: [
            {title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
            {title: "Create GameObject", cmd: "create", uiIcon: "ui-icon-arrowthick-1-e"},
            {title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"}
        ],
        select: function(event, ui) {

            var imageName = gGuiBase.TextureSupport.getImageName(ui.target[0].currentSrc);
            switch (ui.cmd) {
                case 'details':
                    alert('to be implemented');
                    break;
                case 'create':
                    gGuiBase.TextureSupport.addTextureObject(imageName);
                    break;
                case 'delete':
                    gGuiBase.TextureSupport.removeTextureFromAll(imageName);
                    break;
            }
        }
    });

    this.materialSelectList.setOnSelect(this.selectObject);
    this.materialSelectList.addListClass("materialListMenu");
    $(this.materialSelectList.getID()).contextmenu({
        delegate: ".materialListMenu",
        menu: [
            {title: "Details", cmd: "details", uiIcon: "ui-icon-info"},
            {title: "Delete", cmd: "delete", uiIcon: "ui-icon-closethick"}
        ],
        select: function(event, ui) {
            var imageName = gGuiBase.TextureSupport.getImageName(ui.target[0].currentSrc);
            switch (ui.cmd) {
                case 'details':
                    alert('to be implemented');
                    break;
                case 'delete':
                    //todo implement delete
                    alert('delete hit, but not implemented');
                    // gGuiBase.TextureSupport.removeTextureFromAll(imageName);
                    break;
            }
        }
    });
};

// this function handles the left click event on an object in the object tab
// populates the details tab with the object information
AddTextureContent.prototype.selectObject = function( ui ) {
    var selectedTextureName = ui["selected"]["id"];
};

AddTextureContent.prototype.onTextureFileSelect = function() {
	gEngine.Textures.loadTextureFromFile("TextureInput", gGuiBase.TextureSupport.addTexture);
};

AddTextureContent.prototype.onMaterialFileSelect = function() {
    gEngine.Textures.loadTextureFromFile("MaterialInput", gGuiBase.LightSupport.addNormal);

};


