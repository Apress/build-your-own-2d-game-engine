var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.EditorSupport = (function() {
    var gEditorMap = {};            // Hashes mID of objects to an editor id.  Used for making the right editor show on top.
    var gZIndex = 0;                // ID for editors

    var EDITOR_OFFSETS = [30, 192, 95];
    var DETAILS_OBJECTS_OFFSETS = [150, 75, 120];
    
    var createFloatingEditor = function( selectedName ) {
        gGuiBase.DirectManipulationSupport.setPreventInteraction(true); // Turn off direct manipulation when editing!
        var indexToAdd = gZIndex;
        var editorName = "floatingEditor" + indexToAdd;

        // Hash map used for making checking if the editor is already opened, and if so, make the right editor appear on top
        if (typeof(gEditorMap[selectedName]) !== "undefined") {
            // Already opened!  Just make it appear on top so the user can find it.
            gZIndex++;
            $('#' + gEditorMap[selectedName]).css('z-index', gZIndex); // Just use gZIndex to track the highest z-index value we can use
            gZIndex++;
            return;
        } else {
            // New hash
            gEditorMap[selectedName] = editorName;
        }

        var headerName = "codeHeader" + indexToAdd;
        var bodyName = "codeBody" + indexToAdd;
        var aceName = "aceEditor" + indexToAdd;
        var okName = "codeOK" + indexToAdd;
        var cancelName = "codeCancel" + indexToAdd;
        var navBottomName = "navBarBottom" + indexToAdd;
        var objName = "";
        if (typeof(selectedName) === 'undefined' || selectedName === "") {
            objName = "Unnamed object";
        } else {
            objName = selectedName;
        }

        // Make the code editor as a new div in the document body
        $('body').append('<div id="' + editorName + '"></div>');
        var codeEditor = $('#' + editorName);
        codeEditor.css('box-shadow', '4px 4px 4px 4px rgba(0,0,0,0.4)');
        codeEditor.css('z-index', gZIndex);
        gZIndex++; // Done with this index now, increment it for the next use
        codeEditor.draggable({cancel: '#' + aceName});  // Make it draggable, but NOT the editor (the user may want to highlight text!)
        codeEditor.css('position', 'absolute').css('left', '0px').css('top', '0px');
        codeEditor.append('<ul class="floating-nav-menu" id="' + headerName + '">' +
            '<li class="header-text-only">Code Editor (' + objName + ')</li>' +
            '</ul>');

        // If you mousedown (covers both click + drag cases) the panel (e.g. you were selecting a different editor), make it appear on top!
        codeEditor.mousedown(function() {
            gZIndex++;
            codeEditor.css('z-index', gZIndex); // Just use gZIndex to track the highest z-index value we can use
            gZIndex++;
        });

        // Make the body of the code editor
        codeEditor.append('<ul class="floating-panel-body" id="' + bodyName + '"></ul>');

        // Create a separate area within the panel for the editor
        var isGameObject = true;
        var code = gGuiBase.ObjectSupport.getGameObjectCodeByID(selectedName);
        if (code == undefined) {
            code = gGuiBase.CameraSupport.getCameraCodeByName(selectedName);
            isGameObject = false;
        }

        var editorArea = $('#' + bodyName);
        var editorDiv = $('<div id="' + aceName + '">' + code + '</div>');
        editorArea.append(editorDiv);

        // Set up the editor
        var editor = ace.edit(aceName);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');

        // Set a size for it
        editorDiv.width(800);
        editorDiv.height(600);
        editorDiv.css('position', 'relative').css('top', '0px');
        editorArea.height(664);

        // Add a button at the bottom
        editorArea.append('<br>');
        editorArea.append('<ul class="floating-nav-menu" id="' + navBottomName + '">' +
            '<li id="' + okName + '"><a href="#"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-floppy-disk"></span> Save</button></a></li>' +           // Places this on the farthest right
            '<li id="' + cancelName + '"><a href="#"><button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Cancel</button></a></li>' +   // Left of the OK button
            '</ul>');
        $('#' + okName)
            .css('float', 'right')
            .css('margin-left', '4px');
        $('#' + cancelName).css('float', 'right');
        $('.floating-nav-menu')
            .css('margin', 0)
            .css('padding', 0)
            .css('background-color', 'white');
        // Add the function directly to it
        $('#' + okName).click(function() {
            // Get editor contents as a string
            var result = editor.getValue();

            // First set the code for the object only (so it's saved and the user can come back to it)
            if (isGameObject) {
                gGuiBase.ObjectSupport.setGameObjectCodeByID(selectedName, result);

                var msg = "";
                try {
                    // Puts code into system
                    eval(result);

                    // todo remove direct access to scene data structure
                    var sceneList = gGuiBase.SceneSupport.getSceneList();
                    for (var j = 0; j < sceneList.length; j++) {

                        // First update all instances with the new name and class
                        var instances = sceneList[j].getInstanceList();
                        for (i = 0; i < instances.length; i++) {
                            var name = instances[i].mName;
                            if (name === selectedName) {
                                var instID = instances[i].mID;
                                // Each instance needs to be re-created exactly as the old one, but as a new class
                                // They also need their name value modified
                                var rend = instances[i].getRenderable();
                                var xf = instances[i].getXform();
                                var newInstance;
                                eval("newInstance = new " + name + "(rend);");
                                newInstance.mID = instances[i].mID;
                                newInstance.mName = instances[i].mName;
                                var newXf = newInstance.getXform();
                                newXf = xf;
                                instances[i] = newInstance;
                            }
                        }
                    }
                    msg = "Code saved!";
                } catch (error) {
                    msg = "Your code contains an error.  Please review.\n\n" + error;
                }
            } else {
                // Process camera code changes
                var msg = "";
                try {
                    // Puts code into system
                    // todo remove direct access to scene data structure
                    // todo use the same function as the saveload, createCamera

                    var cam = gGuiBase.CameraSupport.getCameraByName(selectedName);
                    gGuiBase.CameraSupport.deleteCamera(selectedName);

                    var center = cam.getWCCenter();
                    var width = cam.getWCWidth();
                    var viewport = cam.getViewport();
                    var bgColor = cam.getBackgroundColor();
                    var bound = undefined;

                    // window[selectedName] = function(center, width, viewport, bound) {
                    //     Camera.call(this, center, width, viewport, bound);
                    // };
                    // gEngine.View.inheritPrototype(window[selectedName], window["Camera"]);
                    eval(result);

                    var newCam;
                    eval("newCam = new " + selectedName + "(center, width, viewport, bound);");
                    newCam.mID = cam.mID;
                    newCam.mName = cam.mName;
                    newCam.setBackgroundColor(bgColor);
                    newCam.mLayer = cam.mLayer;
                    console.log('old cam', cam);
                    console.log('new cam', newCam);
                    gGuiBase.CameraSupport.setCameraByName(selectedName, newCam);
                    gGuiBase.CameraSupport.setCameraCodeByName(selectedName, result);
                    var cameraObject = new CameraObject(newCam);
                    // add cameras to the scene
                    gGuiBase.SceneSupport.gCurrentScene.cameraObjects.push(cameraObject);
                    gGuiBase.SceneSupport.gCurrentScene.addCamera(newCam);
                    msg = "Code saved!";
                    // refresh panel
                    gGuiBase.View.findWidgetByID("#cameraSelectList").rebuildWithArray(gGuiBase.CameraSupport.getCameraListNames());
                    gGuiBase.View.refreshAllTabContent();
                    gGuiBase.Core.selectDetailsCamera(selectedName);
                } catch (error) {
                    msg = "Your code contains an error.  Please review.\n\n" + error;
                }
            }

            // Remove the editor
            codeEditor.remove();
            delete gEditorMap[selectedName];
            alert(msg);
            gGuiBase.DirectManipulationSupport.setPreventInteraction(false); // turn direct manipulation back on!
        });
        
        // remove editor
        $('#' + cancelName).click(function() {
            // Remove the editor
            codeEditor.remove();
            delete gEditorMap[selectedName];
            gGuiBase.DirectManipulationSupport.setPreventInteraction(false); // turn direct manipulation back on!
        });
    };


    var mPublic = {
        createFloatingEditor: createFloatingEditor,
		gEditorMap: gEditorMap
    };
    return mPublic;
}());