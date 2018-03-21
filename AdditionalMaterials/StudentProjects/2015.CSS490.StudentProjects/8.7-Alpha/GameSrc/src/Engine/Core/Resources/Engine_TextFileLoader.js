/* 
 * David Watson
 * CSS 490C
 * 2D Game Engine Design
 * File: TextFileLoader.js 
 * 
 * This file contains the utility fuctions to process text files
 */

"use strict";
var gEngine = gEngine || {};



gEngine.TextFileLoader = (function () {
    
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1,
        eJSsonFile: 2
    });

    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            // Asyncrounsly request the data from server.
            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName +
                            ": loading failed! [Hint: you cannot double click index.html to run this project." +
                            "The index.html file must be loaded by a web-server.]");
                }
            };

            req.open('GET', fileName, true);
            req.setRequestHeader('Content-Type', 'text/xml');
            req.onload = function () {
                var fileContent = null;
                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                } else {
                    if (fileType === eTextFileType.eJSONFile) {
                        fileContent = JSON.parse(req.responseText);
                    } else {
                        fileContent = req.responseText;
                    }
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
                if ((callbackFunction !== null) && (callbackFunction !== undefined))
                    callbackFunction(fileName);
            };
            req.send();
        } else {
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
                callbackFunction(fileName);
        }
    };

    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };
    
    // Public interface for this object.
    var mPublic = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        eTextFileType: eTextFileType
    };
    return mPublic;
}());