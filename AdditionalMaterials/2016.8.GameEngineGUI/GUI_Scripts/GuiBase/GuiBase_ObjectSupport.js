//  Supports the addition of gameObjects
var gGuiBase = gGuiBase || { }; //Create the singleton if it hasn't already been created

gGuiBase.ObjectSupport = (function() {

    var mGO = {};           // store gameObjects
    var mGOCode = {};       // store gameObjects code
    var mNextObjID = 0;     // stores id used to create unique object names
    
    // returns true if objectName is already in use
    var checkForNameConflict = function( objName ) {
        // they share the same name space because the window stores all classes
        return objName in mGO || gGuiBase.CameraSupport.checkForObjectConflict(objName);
    };

    // returns true if an cameraName is already taken by an objectName
    var checkForCameraConflict = function( cameraName ) {
        return cameraName in mGO;
    };

    // sets GameObject gameObject's transform to default values (arbitrary values)
    var setDefaultTransform = function ( gameObject ) {
        var xf = gameObject.getXform();
        xf.setXPos(20);
        xf.setYPos(60);
        xf.setWidth(5);
        xf.setHeight(5);
    };

    // returns a name for gameobjects
    var getUniqueName = function ( ) {
        var name = "GameObj" + mNextObjID;
        while (checkForNameConflict(name)) {
            mNextObjID++; // This has not been incremented yet so do it here.  After this method is over, + Object will increment it to a unique value.
            name = "GameObj" + mNextObjID;
        }
        return name;
    };

    // creates a defaultObject and returns its name
    var createDefaultObject = function() {
        // create new default name
        var name = getUniqueName();
        // Add code to window
        var code = getDefaultCodeGO(name);
        // dynamically create a new class which inherits from GameObject Class
        eval(code);
        // create a instance of this GO
        var newGO;
        eval('newGO = new ' + name + '(new Renderable());');
        // Make a default xform
        setDefaultTransform( newGO );
        newGO.mID = name;
        newGO.mName = name;                                                    // object class name
        mGO[newGO.mName] = newGO;                                               // add to map
        mGOCode[newGO.mName] = code;                // add code to code map
        return newGO.mName;
    };

    // creates a texture gameObject, whose texture is texture, and has default transform
    var createDefaultTextObject = function(texture) {
        // create new default name
        var name = getUniqueName();
        // Add code to window
        var code = getDefaultCodeGO(name);
        // dynamically create a new class which inherits from GameObject Class
        eval(code);
        // create a instance of this GO
        var newGO;
        eval('newGO = new ' + name + '(new TextureRenderable("' + texture + '"));');
        // Make a default xform
        setDefaultTransform( newGO );
        newGO.mID = name;
        newGO.mName = name;                         // object class name
        mGO[newGO.mName] = newGO;                   // add to map
        mGOCode[newGO.mName] = code;                // add code to code map
        return newGO.mName;
    };

	// delete gameobject whose name is objName from ObjectSupport and all its instances from all scenes
	var deleteObject = function(objName) {
        // remove from details if object is selected
		if (objName === gGuiBase.Core.selectedGameObject.mName) {
			gGuiBase.Core.emptyDetailsTab();
			gGuiBase.Core.selectedGameObject = null;
		}

        // remove from object support
		delete mGO[objName];
		delete mGOCode[objName];

        // remove from all scenes
		gGuiBase.InstanceSupport.deleteInstancesWithName(objName); //Delete instances containing the object name

        // update gui panels to reflect removal
		gGuiBase.Core.updateObjectSelectList();
		gGuiBase.Core.updateInstanceSelectList();
		gGuiBase.View.refreshAllTabContent();		
	};

    // replaces name in ObjectSupport of object whose name is oldName
	var replaceInMap = function(oldName, newName) {
		var object = mGO[oldName];
		delete mGO[oldName];
		var code = mGOCode[oldName];
		delete mGOCode[oldName];
		object.mName = newName;
		object.mID = newName;
		mGO[newName] = object;
		mGOCode[newName] = code;
	};
	
    // returns a new GameObject who is a copy of gameObject
    var cloneGO = function ( gameObject ) {
        var newGO;
        var texture = gameObject.getRenderable().mTexture;
        if (texture) {
			if (gameObject.getRenderable() instanceof IllumRenderable) {
				var normal = gameObject.getRenderable().mNormalMap;
				eval('newGO = new ' + gameObject.mName + '(new IllumRenderable("' + texture + '", "' + normal +  '"));');
				newGO.getRenderable().mMaterial = gameObject.getRenderable().mMaterial;
            } else if (gameObject.getRenderable() instanceof LightRenderable) {
				eval('newGO = new ' + gameObject.mName + '(new LightRenderable("' + texture + '"));');
			} else {
				eval('newGO = new ' + gameObject.mName + '(new TextureRenderable("' + texture + '"));');
			}
        } else {
            eval('newGO = new ' + gameObject.mName + '(new Renderable());');
        }
        // Make a default xform
        this.copyTransform(newGO, gameObject);
        var rend = newGO.getRenderable();
        rend.setColor(gameObject.getRenderable().getColor());
        newGO.mName = gameObject.mName;                                                    // object class name
        return newGO;
    };

    // copies values from gameobject = sourceGO's transform to gameObject = targetGO's transform
    var copyTransform = function ( targetGO, sourceGO ) {
        var targetTransform = targetGO.getXform();                                             // set default transform
        var gameObjectTransform = sourceGO.getXform();
        // targetTransform.cloneTo(gameObjectTransform);
        copyTransformOnTransforms(targetTransform, gameObjectTransform);
    };

    // sets targetXF to sourceXF, does not alter source
    var copyTransformOnTransforms = function ( targetXf, sourceXf) {
        targetXf.setXPos(sourceXf.getXPos());
        targetXf.setYPos(sourceXf.getYPos());
        targetXf.setWidth(sourceXf.getWidth());
        targetXf.setHeight(sourceXf.getHeight());
        targetXf.setRotationInDegree(sourceXf.getRotationInDegree());
    };
    
    // returns a the gameobject (prefab) whose id is name
    var getGameObjectByID = function( name ) {
        return mGO[ name ];
    };

    // default code used to generate a game object
    var getDefaultCodeGO = function( name ) {
        return 'window["' + name + '"] = function(renderableObj) {\n\
            GameObject.call(this, renderableObj);\n\
        }\n\
        gEngine.View.inheritPrototype(window["' + name + '"], window["GameObject"]);\n\
        \n\
        ' + name + '.prototype.update = function() {\n\
            GameObject.prototype.update.call(this);\n\
        };\n\
        \n\
        ' + name + '.prototype.draw = function(aCamera) {\n\
            GameObject.prototype.draw.call(this, aCamera);\n\
        };\n\
        \n\
        ' + name + '.prototype.onCollisionStay = function(otherObj) {\n\
            \n\
        };\n\
        \n\
        ' + name + '.prototype.onCollisionEnter = function(otherObj) {\n\
        \n\
        };\n\
        \n\
        ' + name + '.prototype.onCollisionExit = function(otherObj) {\n\
            \n\
        };';
    };

    // returns code for non gameobjects
    var getDefaultCodeClass = function(name, id) {
        return 'window["' + name + '"] = function() {\n\
            this.mName = "' + name + '";\n\
            this.mID = "' + id + '";\n\
        }';
    };

    // returns a new list of all gameobjects
    var getObjectList = function() {
        var objList = [];
        for (var objName in mGO) {
            objList.push(mGO[objName]);
        }
        return objList;
    };

    // returns a new list of the names of all the game objects
	var getObjectNameList = function() {
		var objList = [];
		for (var objName in mGO) {
			objList.push(objName);
		}
		return objList;
	};

    // returns a new list of all the code for the game objects
	var getObjectCodeList = function() {
		var objList = [];
        for (var objName in mGOCode) {
            objList.push(mGOCode[objName]);
        }
        return objList;
	};

    // sets gameObject whose name is GOName to gameObject Object
	var setGameObjectByID = function ( GOName, object ) {
		mGO[GOName] = object;
	};

    // returns gameObject whose name is GOName
    var getGameObjectCodeByID = function ( GOName ) {
        return mGOCode[GOName];
    };

    // returns code of gameObject whose name is GOName
    var setGameObjectCodeByID = function ( GOName, Code ) {
        mGOCode[GOName] = Code;  
    };

    // removes all gameObjects from ObjectSupport
	var clearObjects = function() {
		for (var objName in mGO) {
			delete mGO[objName];
		}

		for (var objName in mGOCode) {
			delete mGOCode[objName];
		}
		
		mGO = {};
		mGOCode = {};
		mNextObjID = 0;
	};
    
    var mPublic = {
        createDefaultObject: createDefaultObject,
        createDefaultTextObject: createDefaultTextObject,
		deleteObject: deleteObject,
        checkForNameConflict: checkForNameConflict,
        checkForCameraConflict: checkForCameraConflict,
        copyTransform: copyTransform,
        copyTransformOnTransforms: copyTransformOnTransforms,
		replaceInMap: replaceInMap,
        cloneGO: cloneGO,
        getObjectList: getObjectList,
		getObjectNameList: getObjectNameList,
		getObjectCodeList: getObjectCodeList,
        getDefaultCodeGO: getDefaultCodeGO,
        getDefaultCodeClass: getDefaultCodeClass,
        getGameObjectByID: getGameObjectByID,
		setGameObjectByID: setGameObjectByID,
        getGameObjectCodeByID: getGameObjectCodeByID,
        setGameObjectCodeByID: setGameObjectCodeByID,
		mNextObjID: mNextObjID,
		clearObjects: clearObjects
    };
    return mPublic;
}());