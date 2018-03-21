/*-----------------------------------------------------------------------------
//	GUI Base core
//	Controls the resizing and sorting between GuiPanels, and maintains objects that
//	need to be globally referenced 
//
//	Author: Jason Herold/Thoof
-----------------------------------------------------------------------------*/
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.View = (function() {
	var CONTENT_STYLE = 'border: 2px solid #d3d3d3; border-radius: 1px; padding: 0px; margin-bottom: 20px;';
	
	var panelList = []; //List for static panels
	var floatingPanelList = []; //List for floating panels
	var tabMap = {};
	
	var tabList = [];
	
	var numFloatingPanels = 0;
	var numFloatingPanelsCreated = 0;
	
	//Constants
	var MIN_PANEL_PADDING = 5;
	var PANEL_PADDING = 1;
	var TAB_HEIGHT = 60;

	//For polling mouse position
	var mouseX = 0;
	var mouseY = 0;

	//Constantly poll our mouse position
	$(document).on('mousemove', function(e){
		mouseY = e.pageY;
		mouseX = e.pageX;	
	});
 
	// Add a new panel to the list. Set resize functions and make the panels sortable between eachother
	var addPanel = function(guiPanel) {
		if (guiPanel.panelType == GuiPanelType.FLOATING) {
			floatingPanelList.push(guiPanel);
		} else {
			panelList.push(guiPanel);
		}
		
		setResizeFunction(guiPanel); //Resize based on panel type
		addTabStyle(guiPanel); //Make panels scrollable
		
		//Connect the panels with jquery ui sortable
		var panelConnectorString = "";
		
		//Add the static panels to the list
		for (var i = 0; i < panelList.length; i++) {
			panelConnectorString += panelList[i].PanelID + "Sortable, ";
		}
		
		//If no floating panels, remove the last comma
		if (floatingPanelList.length == 0) {
			panelConnectorString = panelConnectorString.substring(0, panelConnectorString.length-2);
		}
		
		//Add the floating panels to the list
		for (var i = 0; i < floatingPanelList.length; i++) {
			panelConnectorString += floatingPanelList[i].PanelID + "Sortable";
			if (i != floatingPanelList.length-1) panelConnectorString += ", ";
		}
		
		//Final string should look like #panelLeftSortable, #panelRightSortable, #panelFloater0Sortable
		$(panelConnectorString).sortable({
			opacity: 0.5,
			connectWith: ".connectedSortable"
		});
		
		
		var bottomPanels = getPanelsOfType(GuiPanelType.BOTTOM);
		if (bottomPanels.length > 0 && (guiPanel.panelType == GuiPanelType.RIGHT || guiPanel.panelType == GuiPanelType.LEFT)) {
			$(guiPanel.PanelID).outerHeight($(window).height() - getBottomPanelsHeight() - 20);
		} 
		
		//If the bottom panel is added last, need to update the positions of any left/right panels
		//if (guiPanel.panelType == GuiPanelType.BOTTOM) {
		resizeLeftRightHelper();
		//}
		
		
	};

	//Remove a panel from the list based on ID
	var removePanel = function(panelID) {
		//Remove from static panel list if present
		for (var i = 0; i < panelList.length; i++) {
			if (panelList[i].PanelID == panelID)
				panelList.splice(i, 1);
		}
		
		//Remove from floating panel list if present
		for (var i = 0; i < floatingPanelList.length; i++) {

			if (floatingPanelList[i].PanelID == panelID) {
				floatingPanelList.splice(i, 1);
			}
		}
		
		//Update the sortable behavior
		var panelConnectorString = "";
		
		for (var i = 0; i < panelList.length; i++) {
			panelConnectorString += panelList[i].PanelID + "Sortable, ";
		}

		if (floatingPanelList.length == 0) {
			panelConnectorString = panelConnectorString.substring(0, panelConnectorString.length-2);
		}
		
		for (var i = 0; i < floatingPanelList.length; i++) {
			panelConnectorString += floatingPanelList[i].PanelID + "Sortable";
			if (i != floatingPanelList.length-1) panelConnectorString += ", ";
		}

		$(panelConnectorString).sortable({
			opacity: 0.5,
			appendTo: 'body',
			zIndex: 10000,
			connectWith: ".connectedSortable"
		});
	};

	//Sets a specific resize function for specified panel type
	var setResizeFunction = function(panel) {
		switch(panel.panelType) {
			case GuiPanelType.BOTTOM:
				resizeBottom(panel);
				break;
			case GuiPanelType.TOP:
				resizeTop(panel);
				break;
			case GuiPanelType.LEFT:
				resizeLeft(panel);
				break;
			case GuiPanelType.RIGHT:
				resizeRight(panel);
				break;
			case GuiPanelType.FLOATING:
				resizeFloating(panel);
				break;
			default:
				console.log("No existing panel type for: " + panel.panelType);
		}
	};

	//Resize behavior for a panel on the bottom of the page. Pushes up panels on the right and left
	var resizeBottom = function(panel) {
		var panelID = panel.PanelID;
		
		$(panelID).resizable({
			handles: "n", //Only resize upward
			resize: function(event, ui) {
				resizeBottomHelper();
				resizeLeftRightHelper(); //Resize left and right's height according to the bottom panel
				ui.position.top = $(window).height() - ui.size.height; //Works without this in firefox, not with chrome
			}
		});
		
		
		$( window ).resize(function() {
			$(panelID).css("top", $(window).height() - $(panelID).outerHeight(true));
			resizeLeftRightHelper();
		});
	};
	
	$( window ).resize(function() {
		resizeBottomHelper();
		resizeLeftRightHelper();
		
	});
	
	//Handle bottom resize
	var resizeBottomHelper = function() {
		var bottomPanels = getPanelsOfType(GuiPanelType.BOTTOM);
		
		for (var i = 0; i < bottomPanels.length; i++) {
			var panelID = bottomPanels[i].PanelID;
			var tabList = $(panelID + "Sortable");
			var tabs = tabList.find("li");
			for (var i = 0; i < tabs.length; i++) {
				
				var linkHTML = tabs[i].innerHTML;
				var href = linkHTML.match(/href="([^"]*)/)[1];
				$(href).css("height", $(panelID).outerHeight(true) - TAB_HEIGHT);
			}
		}
	};

	//Handle left/right resize
	var resizeLeftRightHelper = function() {
		var leftPanels = getPanelsOfType(GuiPanelType.LEFT); //Get all panels of type left
		var rightPanels = getPanelsOfType(GuiPanelType.RIGHT); //Get all panels of type right
		
		var bottomPanelsHeight = getBottomPanelsHeight();
		for (var i = 0; i < leftPanels.length; i++) {
			//Adjust height of actual panel based on bottom panel
			var margin = $(leftPanels[i].PanelID).css("margin-top");
			margin = margin.substring(0, margin.length-2);
			var marginInt = parseInt(margin);
			
			var topDistance = leftPanels[i].getTopDistance();
			
			$(leftPanels[i].PanelID).css("height", $(window).height() - bottomPanelsHeight - PANEL_PADDING - marginInt - topDistance);
			
			resizeLeftRightTabContentPane(leftPanels[i]);
			
		}
		//Same process for right panels
		for (var i = 0; i < rightPanels.length; i++) {
			var margin = $(rightPanels[i].PanelID).css("margin-top");
			margin = margin.substring(0, margin.length-2);
			var marginInt = parseInt(margin);
			
			var topDistance = rightPanels[i].getTopDistance();
			//Adjust height according to bottom panel
			$(rightPanels[i].PanelID).css("height", $(window).height() - bottomPanelsHeight - PANEL_PADDING - marginInt - topDistance);
			resizeLeftRightTabContentPane(rightPanels[i]);
		}
	};

	//Resize the left or right content pane so that the scrollbar fits
	var resizeLeftRightTabContentPane = function(panel) {
			//Get the list of tab content containers
			var tabList = $(panel.PanelID + "Sortable");
			var tabs = tabList.find("li");
			
			for (var i = 0; i < tabs.length; i++) {
				//For each tab content container, resize it so that the scrollbar will fit
				var linkHTML = tabs[i].innerHTML;
				var href = linkHTML.match(/href="([^"]*)/)[1];
				
				var heightSum = getBottomPanelsHeight();
				var margin = $(panel.PanelID).css("margin-top");
				margin = margin.substring(0, margin.length-2);
				var marginInt = parseInt(margin);
				
				var topDistance = panel.getTopDistance();
				
				$(href).css("height", $(window).height() - heightSum - TAB_HEIGHT - marginInt - topDistance);
			}
	};

	var resizeTop = function(panel) {
		//Not currently used
		var panelID = panel.PanelID;
		
	};

	//Resize for left type panels
	var resizeLeft = function(panel) {
		 var panelID = panel.PanelID; 
		 $(panelID).resizable({ handles: "e",
			resize: function(event, ui) {
				var tabWidth = getTabsWidth(panelID);
				//ui.size.width = Math.max(ui.size.width, tabWidth);
				//$(panelID).outerWidth(Math.max(ui.size.width, tabWidth), true);
				$(panelID).resizable( "option", "minWidth", tabWidth );
				
			}
		 }); //Just resize to the right
		 $(panelID).css("height", $(window).height() - parseInt($(panelID).css("height")) - MIN_PANEL_PADDING);
		 
		 
	};

	//Resize for right type panels
	var resizeRight = function(panel) {
		var panelID = panel.PanelID;
		$(panelID).resizable({
			handles: "w",
			resize: function(event, ui) { //Fix for right panel repositioning on resize
				ui.position.left = 0;
				var tabWidth = getTabsWidth(panelID);
				//$(panelID).outerWidth(Math.max(ui.size.width, tabWidth), true);
				$(panelID).resizable( "option", "minWidth", tabWidth );
				
			}
		});
		$(panelID).css("height", $(window).height() - parseInt($(panelID).css("height")));
		
	};

	//Get the combined height of all bottom panels, for use in resizing
	var getBottomPanelsHeight = function() {
		var bottomPanels = getPanelsOfType(GuiPanelType.BOTTOM);
		var heightSum = 0; //Sum up the heights of all the bottom panels
		for (var i = 0; i < bottomPanels.length; i++) {
			heightSum += $(bottomPanels[i].PanelID).outerHeight(true);
		}
		return heightSum;
	};

	//Resizes floating panel tab content pane
	var resizeFloating = function(panel) {
		var panelID = panel.PanelID;
		//var numFloating = numFloatingPanels.toString();
		$(panelID).resizable({
			
			resize: function(event, ui) {
				var tabWidth = getTabsWidth(panelID);
				ui.size.width = Math.max(ui.size.width, tabWidth);
				
				var tabList = $(panelID + "Sortable");
				var tabs = tabList.find("li");
				for (var i = 0; i < tabs.length; i++) {
					
					var linkHTML = tabs[i].innerHTML;
					var href = linkHTML.match(/href="([^"]*)/)[1];
					//var divID = href.substring(1); //Remove the # since we won't be referring to it as a link

					$(href).css("height", $(panelID).outerHeight(true) - TAB_HEIGHT);
					//console.log($(panelID).height());
				}
			}
		});
		
		var tabList = $(panelID + "Sortable");
		var tabs = tabList.find("li");
		for (var i = 0; i < tabs.length; i++) {
			var linkHTML = tabs[i].innerHTML;
			var href = linkHTML.match(/href="([^"]*)/)[1];
			$(href).css("height", $(panelID).outerHeight(true) - TAB_HEIGHT);
		}
	};

	//Creates a floating panel with the div "panelFloater<Some number>" and the sortable "panelFloater<Some number>Sortable"
	var createFloatingPanel = function(tabheader, tab) {
		
		var uniqueID = findUniqueFloatingPanelID();
		var panelID = "#panelFloater" + uniqueID;
		var panelSortable = panelID + "Sortable";
		
		$("body").append('<div id="panelFloater' + uniqueID + '"><ul id="panelFloater' + uniqueID +'Sortable" class="connectedSortable"></ul></div></div>');
		var floaterTabs = $(panelID).tabs();  
		
		var floatingPanel = new GuiPanel(panelID, GuiPanelType.FLOATING);
		addPanel(floatingPanel);
		
		//Apply floater css elements
		$(panelID).css("position", "fixed");
		$(panelID).css("height", "234px");
		$(panelID).css("width", "234px");
		
		//Attach the dragged tab and its content to the new panel
		var floatingTabs = $(panelSortable);
		tabheader.removeAttr("style"); //Dragging gives some style elements that we don't want
		tabheader.detach().appendTo(floatingTabs); //Take the dragged tab header and put it on the new panel
		$(tab).detach().appendTo(panelID); //Take the tab contents and put it on the new panel
		
		refreshAll();
		
		var tabList = $(panelSortable);
		var tabs = tabList.find("li");
		for (var i = 0; i < tabs.length; i++) {
			
			var linkHTML = tabs[i].innerHTML;
			var href = linkHTML.match(/href="([^"]*)/)[1];
			
			$(href).css("height", $(panelID).outerHeight(true) - TAB_HEIGHT);
		}
		
		//Make the floating panel draggable only by the top bar
		$(panelID).draggable({
			handle: panelSortable,
			stack: "div" //Make currently dragged panel stack on top of other panels/divs
		});
		
		//Place the panel at the dropped mouse position
		$(panelID).css("top", mouseY);
		$(panelID).css("left", mouseX);
		
		floatingPanel.setFirstTabActive();
		
		numFloatingPanels++;
		numFloatingPanelsCreated++;
	};
	
	var removeEmptyFloatingPanels = function() {
		for (var i = 0; i < floatingPanelList.length; i++) {
			var panelID = floatingPanelList[i].PanelID;
			if ($(panelID + 'Sortable li').length == 0) {
				gGuiBase.View.removePanel(panelID);
				$(panelID).remove(); //Delete the panel
				numFloatingPanels--; 
			}
		}
	};
	
	//Check what floating panel id #s are in use, and pick the smallest
	var findUniqueFloatingPanelID = function() {
		for (var i = 0; i <= numFloatingPanelsCreated; i++) {
			if (!$("#panelFloater" + i).length > 0) { //Panel doesn't exist
				return i;
			}
		}
		return -1;
	};

	//Refresh all panels within the group
	var refreshAll = function() {
		for (var i = 0; i < panelList.length; i++) {
			
			var panelID = panelList[i].PanelID;
			panelList[i].guiTab.tabs("refresh");
			
			var tabWidth = getTabsWidth(panelID);
			$(panelID).width(Math.max($(panelID).width(), tabWidth));
		}
		
		for (var i = 0; i < floatingPanelList.length; i++) {
			
			var panelID = floatingPanelList[i].PanelID;
			floatingPanelList[i].guiTab.tabs("refresh");
			
			var tabWidth = getTabsWidth(panelID);
			$(panelID).width(Math.max($(panelID).width(), tabWidth));
		}
	};

	//Get all panels of a specific type
	var getPanelsOfType = function(panelType) {
		var panelArray = [];
		for (var i = 0; i < panelList.length; i++) {
			if (panelList[i].panelType == panelType) {
				panelArray.push(panelList[i]);
			}
		}
		return panelArray;
	};

	//Add scrollbars to all tab containers
	var addTabStyle = function(panel) {
		var tabList = $(panel.PanelID + "Sortable");
		var tabs = tabList.find("li");
		
		for (var i = 0; i < tabs.length; i++) {
			var linkHTML = tabs[i].innerHTML;
			var href = linkHTML.match(/href="([^"]*)/)[1];
			//var divID = href.substring(1); //Remove the # since we won't be referring to it as a link
			
			$(href).css("overflow", "auto");
			
			var bottomPanelHeight = getBottomPanelsHeight();
			
			$(href).css("height", $(window).height() - bottomPanelHeight - TAB_HEIGHT);
		}
	};

	var getTabsWidth = function(panelID) {
		var widthInPixel = 0;
		
		var tabList = $(panelID + "Sortable li");
		
		tabList.each(function(index) {
			widthInPixel += ($(this).width());
			var padding = $(this).css("border-top-right-radius");
			//todo what is this for?
			padding = parseInt(padding.substring(0, padding.length - 2));
			widthInPixel += 15;
		});
		
		return widthInPixel;

	};

	var addTab = function (tabID, theTab) {
		tabMap[tabID] = theTab;
		$(tabID).css("overflow", "auto");
		tabList.push(theTab);
	};

	var getTab = function (tabID) {
		return tabMap[tabID];
	};
	
	//Checks if the mouse position (Global variables mouseX and mouseY) is within specified element
	var mouseInElement = function(element) {
		
		var position = element.position();
		
		//If mouseX, mouseY is within the bounds of the element
		if (mouseX > position.left && mouseX < position.left + element.width() &&
			mouseY > position.top && mouseY < position.top + element.outerHeight(true)) {
			return true;
		} 
		return false;
	};

	//Checks if mouse position is in any of the panels in the panel list
	var mouseInPanelList = function() {
		for (var i = 0; i < panelList.length; i++) {
			var tab = $(panelList[i].PanelID).tabs();
			var returnValue = mouseInElement(tab);
			if (returnValue) return true;
			
		}
		
		for (var i = 0; i < floatingPanelList.length; i++) {
			var tab = $(floatingPanelList[i].PanelID).tabs();
			var returnValue = mouseInElement(tab);
			if (returnValue) return true;
		}
		
		return false;
	};
	
	var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
	};
	
	var findPanelObjectByID = function(id) {
		for (var i = 0; i < panelList.length; i++) {
			if (panelList[i].PanelID = id)
				return panelList[i];
		}
		return null;
	};
	
	var findTabByID = function (id) {
		for (var i = 0; i < tabList.length; i++) {
			if (tabList[i].getID() == id) return tabList[i];
		}
	};
	
	var findTabContentByID = function (id) {
		
		for (var i = 0; i < tabList.length; i++) {
			var tabContents = tabList[i].getContent();
			
			for (var j = 0; j < tabContents.length; j++) {

				if (tabContents[j].getID() == id) {
					
					return tabContents[j];
					
				}
			}
		}
		
	};
	
	var findWidgetByID = function (id) {
		for (var i = 0; i < tabList.length; i++) {
			var tabContents = tabList[i].getContent();
			
			for (var j = 0; j < tabContents.length; j++) {
				var widget = tabContents[j].findWidgetByID(id);
				if (widget !== null) {
					return widget;
				}
			}
		}
		
	};
	
	var refreshAllTabContent = function() {
		for (var i = 0; i < tabList.length; i++) {
			tabList[i].refreshContent();
		}
	};

	
	var colorStringToRGBA = function(colorPickerString) {
		// We know the format of given string must be rgba(r,g,b,a) or r,g,b,a
		var colors;
		if (colorPickerString.startsWith("rgba(")) {
			// Format was: rgba(r,g,b,a) from 0-255
			colors = colorPickerString.split("rgba(")[1].split(")")[0].split(",");
			colors[0] /= 255;
			colors[1] /= 255;
			colors[2] /= 255;
		} else {
			// Format was: r,g,b,a from 0-1
			colors = colorPickerString.split(",");
			colors[0] *= 255;
			colors[1] *= 255;
			colors[2] *= 255;
		}
		return colors;
	};
	
	var onWindowResize = function() {
		var initWidth = 640.0;
		var initHeight = 480.0;
		
		//var tabWidth = gGuiBase.View.getTabsWidth("#panelLeft");
		//var leftPanelEdge = Math.max($("#panelLeft").outerWidth(true), tabWidth);
		var leftPanelEdge = $("#panelLeft").outerWidth(true);
		
		//var tabWidth = gGuiBase.View.getTabsWidth("#panelRight");
		//var rightEdge = Math.max($("#panelRight").outerWidth(true), tabWidth);
		//var rightPanelEdge = $(window).width() - rightEdge;
		var rightPanelEdge = $(window).width() - $("#panelRight").outerWidth(true);
		
		var dropdownEdge = 48;
		var bottomPanelEdge = $("#panelBottom").position().top;

		// Vars to resize the GLCanvas with
		var availableWidth = rightPanelEdge - leftPanelEdge;
		var availableHeight = bottomPanelEdge - dropdownEdge;
		var width = availableWidth;
		var height = availableHeight;
		
		// Resize to the dimension with the lowest proportion
		if (availableWidth / initWidth > availableHeight / initHeight) {
			width = (height / initHeight) * initWidth;  // Resize based on height
		} else {
			height = (width / initWidth) * initHeight;  // Resize based on width
		}

		// Set the proper width and height
		$('#GLCanvas').width(width);
		$('#GLCanvas').height(height);
		
		
		//console.log (rightPanelEdge - leftPanelEdge);
		var centerX = ((rightPanelEdge - leftPanelEdge) / 2) + leftPanelEdge - (width / 2);
		var centerY = ((bottomPanelEdge - dropdownEdge) / 2) + dropdownEdge - (height / 2);

		
		// Keep it centered (note: 219 and 229 are the w/h of the left/bottom panels including their white space)
		$('#GLCanvasDiv').css('position', 'absolute');
		$('#GLCanvasDiv').css("top", centerY + "px");
		$('#GLCanvasDiv').css("left", centerX + "px");
	};





	//Public functions and variables
	var mPublic = {
        addPanel: addPanel,
        removePanel: removePanel,
        refreshAll: refreshAll,
        resizeLeftRightHelper: resizeLeftRightHelper,
        resizeBottomHelper: resizeBottomHelper,
		createFloatingPanel: createFloatingPanel,
		removeEmptyFloatingPanels: removeEmptyFloatingPanels,
		addTab: addTab,
		getTab: getTab,
		mouseInElement: mouseInElement,
		mouseInPanelList: mouseInPanelList,
		findTabByID: findTabByID,
		findTabContentByID: findTabContentByID,
		findWidgetByID: findWidgetByID,
		refreshAllTabContent: refreshAllTabContent,
		getTabsWidth: getTabsWidth,
		CONTENT_STYLE: CONTENT_STYLE,
		colorStringToRGBA: colorStringToRGBA,
		onWindowResize: onWindowResize,
		
		inheritPrototype: inheritPrototype
    };

    return mPublic;

}());