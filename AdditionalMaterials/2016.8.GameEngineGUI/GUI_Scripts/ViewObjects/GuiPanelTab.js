/**
 * Created by MetaBlue on 6/25/16.
 */

// Tab object that can be added to a GuiPanel
var GuiPanelTab = function (tabID){
    if (tabID === undefined || typeof tabID !==  'string') {
        throw "tabID must be a string";
    }
    // jquery object representing the tab_content
    this.tabID = tabID;                     // stores tabName
    this.content = [];                      // stores the content to place into the tab_content

    // jquery object representing the tab_top
    this.headerID = tabID + 'Header';


    return this;
};

// returns a new jquery tab_header
GuiPanelTab.prototype.createHeader = function () {
    return $('<li id="' + this.headerID + '"><a href="#' + this.tabID + '">' + this.tabID + '</a></li>');
};

// returns a new jquery tab_content
GuiPanelTab.prototype.createContentContainer = function () {
    return $('<div id="' + this.tabID + '"></div>');
};

// returns the current jquery header_information
GuiPanelTab.prototype.getHeader = function() {
    var $header = $('#' + this.headerID);
    if ($header.length < 1) throw "no header found";
    else return $header;
};

// returns the current jquery content_container
GuiPanelTab.prototype.getContentContainer = function () {
    var $content = $('#' + this.tabID);
    if ($content.length < 1) throw "no content found";
    else return $content;
};

GuiPanelTab.prototype.getContent = function() {
	return this.content;
};

GuiPanelTab.prototype.addContent = function(contentobject) {
	this.content.push(contentobject);
	this.appendContent(contentobject, contentobject.getID(), contentobject.getHTMLContent());
	contentobject.initializeEventHandling();
	
};

GuiPanelTab.prototype.getContentObject = function (contentID) {
	for (var i = 0; i < this.content.length; i++) {
		
		if (this.content[i].getID() === contentID) {
			return this.content[i];
		}
	}
};

GuiPanelTab.prototype.addContentToFront = function(contentobject) {
	this.content.push(contentobject);
	this.prependContent(contentobject, content,contentobject.getID(), contentobject.getHTMLContent());
	contentobject.initializeEventHandling();
};

GuiPanelTab.prototype.clearContent = function() {
	$(this.getID()).empty();
	this.content.splice(0, this.content.length);
};

GuiPanelTab.prototype.refreshContent = function() {
	$(this.getID()).empty();

	for (var i = 0; i < this.content.length; i++) {
		this.appendContent(this.content[i], this.content[i].getID(), this.content[i].getHTMLContent());
		this.content[i].initializeEventHandling();
	}
	
	if ($(this.getID()).accordion( "instance" ) !== undefined) {
		$(this.getID()).accordion( "destroy" );
		this.tabContentAccordion(this.getID());
	}
};

GuiPanelTab.prototype.refreshSpecificContent = function(contentID) {
	var contentObject = this.getContentObject(contentID);
	$(contentID).empty();
	$(contentID).append(contentObject.getWidgetHTMLContent());
	contentObject.initializeEventHandling();
};

// appends jquery/html to the tab
GuiPanelTab.prototype.appendContent = function (content, contentID, contentHTML ) {
    this.content[contentID] = true;
	if (content.title !== undefined) 
		$(this.getID()).append('<h3>' + content.title + '</h3>');
    $('#' + this.tabID).append( contentHTML );
		
};

GuiPanelTab.prototype.prependContent = function(content, contentID, contentHTML) {
	this.content[contentID] = true;
	if (content.title !== undefined) 
		$(this.getID()).prepend('<h3>' + content.title + '</h3>');
    $('#' + this.tabID).prepend( contentHTML );
};

// removes content with ID contentID
/*GuiPanelTab.prototype.removeContent = function ( contentID ) {
    if (!(contentID in this.content)) throw contentID + " not found";
    else {
        delete this.content[contentID];
        $('#' + contentID).remove();
    }
};*/

GuiPanelTab.prototype.removeContent = function (contentID) {
	for (var i = 0; i < this.content.length; i++) {
		if (this.content[i].getID() === contentID) {
			$(contentID).empty();
			$(contentID).remove();
			this.content.splice(i, 1);
		}
	}
};

//From http://stackoverflow.com/questions/15702444/jquery-ui-accordion-open-multiple-panels-at-once
GuiPanelTab.prototype.tabContentAccordion = function(tabID) {
	$(tabID).accordion({
		collapsible:true,
		autoHeight: false, 
		heightStyle: "content",
		
		//Activate all tabs on creation
		create: function(event, ui) {
			
			for (var i = 0; i < $(tabID + " h3").length; i++) {
				$(tabID).accordion( "option", "active", i );
			}
			
		},
		beforeActivate: function(event, ui) {
			 // The accordion believes a panel is being opened
			if (ui.newHeader[0]) {
				var currHeader  = ui.newHeader;
				var currContent = currHeader.next('.ui-accordion-content');
			 // The accordion believes a panel is being closed
			} else {
				var currHeader  = ui.oldHeader;
				var currContent = currHeader.next('.ui-accordion-content');
			}
			 // Since we've changed the default behavior, this detects the actual status
			var isPanelSelected = currHeader.attr('aria-selected') == 'true';

			 // Toggle the panel's header
			currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

			// Toggle the panel's icon
			currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);

			 // Toggle the panel's content
			currContent.toggleClass('accordion-content-active',!isPanelSelected)    
			if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

			return false; // Cancel the default action
		}
	});
};


// returns the tab id
GuiPanelTab.prototype.getID = function () {
    return '#' + this.tabID;
};