/**
 * Created by MetaBlue on 6/24/16.
 */



GuiPanelType = Object.freeze({
	TOP: 0,
	BOTTOM: 1,
	LEFT: 2,
	RIGHT: 3,
	FLOATING: 4
});
 
var GuiPanel = function (PanelID, panelType, Height) {
    this.PanelID = PanelID;
    this.guiTab = $(PanelID).tabs(); //Create the tabs
	this.panelType = panelType;
	this.tabObjects = [];
	
	this.panelTopDistance = 0;
	
    if (Height !== undefined) this.guiTab.height(Height);
	
	var tabs = $(PanelID).tabs();
	
    $(PanelID + "Sortable").sortable({ 
        opacity: 0.5, //Opacity while "sorting"
		
        stop: function(event, ui) { //Refresh the tabs after a sort

			if ($(PanelID + 'Sortable li').length > 1) { //Behavior that we don't want for a floating tab window
				if (!gGuiBase.View.mouseInPanelList()) {

					var linkHTML = (ui.item[0].innerHTML); //Get the moved elements <a> information
					//Get the href, which contains the tab name that we need to move
					var href = linkHTML.match(/href="([^"]*)/)[1];
					
					gGuiBase.View.createFloatingPanel(ui.item, href);
				}
			}
        },

        receive : function(event, ui) { //When we drag a tab from panel to panel, also move the content of the tab
            var linkHTML = (ui.item[0].innerHTML); //Get the moved elements <a> information
            //Get the href, which contains the tab name that we need to move

            var href = linkHTML.match(/href="([^"]*)/)[1];
            var divID = href.substring(1); //Remove the # since we won't be referring to it as a link
			
            $(href).detach().appendTo(PanelID); //Actually detach and move the tab
			
			gGuiBase.View.removeEmptyFloatingPanels();
			
			if ((panelType == GuiPanelType.LEFT || panelType == GuiPanelType.RIGHT)) {
				gGuiBase.View.resizeLeftRightHelper();
			} else if (panelType == GuiPanelType.BOTTOM) {
				gGuiBase.View.resizeBottomHelper();
			}
			
            gGuiBase.View.refreshAll();
            return true;
        }
    });
	
	
    return this;
};

GuiPanel.prototype.setFirstTabActive = function() {
	$(this.PanelID).tabs("option", "active", 0);
};

// adds an empty tab to this panel
GuiPanel.prototype.addNewTab = function ( tabID ){
    var newTab = new GuiPanelTab(tabID);						//create new tab
	gGuiBase.View.addTab(tabID, newTab);
    $(this.PanelID + "Sortable").append(newTab.createHeader());		//create tab_header add to panel
    $(this.PanelID).append(newTab.createContentContainer());	//create empty tab_content add to panel
    this.guiTab.tabs("refresh");
};

GuiPanel.prototype.addTab = function ( tab ){						//create new tab
	gGuiBase.View.addTab(tab.tabID, tab);
    $(this.PanelID + "Sortable").append(tab.createHeader());		//create tab_header add to panel
    $(this.PanelID).append(tab.createContentContainer());
	
	//create empty tab_content add to panel
    this.guiTab.tabs("refresh");
	this.tabObjects.push(tab);

};

// moves tab object to the current panel, tab must be in the DOM already
GuiPanel.prototype.moveTabToThisPanel = function ( tabID ){
	// remove tab_header from any panel, append to back of this one
	var guiPanelTab = gGuiBase.View.getTab( tabID );	// find the tab_header
	var $header = guiPanelTab.getHeader().detach();			// remove it
	$(this.PanelID + ' ul').append($header);				// attach to this panel

	// remove tab_content from any panel, append to back of this one
	var $content = guiPanelTab.getContentContainer().detach();
	$(this.PanelID).append($content);
	this.guiTab.tabs("refresh");
};

GuiPanel.prototype.setTopDistance = function(distance) {
	this.panelTopDistance = distance;
};

GuiPanel.prototype.getTopDistance = function() {
	return this.panelTopDistance;
};

GuiPanel.prototype.getID = function() {
	return this.PanelID;
};

GuiPanel.prototype.getWidth = function() {
	
	return $(this.PanelID).outerWidth();
};