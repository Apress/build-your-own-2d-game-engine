/*
 * File: EngineCore_TextFileLoader.js 
 * loads an text file into resourceMap, either as simple text or as XML
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, XMLHttpRequest: false, DOMParser: false, alert: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };

/**
 * Default Constructor<p>
 * loads an text file into resourceMap, either as simple text or as XML<p>
 * Note: loads the a textfile and when done calls the callbackFunction()<p>
 *      fileName is treated as resource map key, file content is stored as asset
 * @class gEngine.TextFileLoader
 * @type TextFileLoader
 */
gEngine.TextFileLoader = (function () {
    /**
     * Text file type tokens
     * @type {enum|eTextFileType}
     * @memberOf gEngine.TextFileLoader
     */
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    /**
     * Load text file if fileType is a eTextFileType
     * @memberOf gEngine.TextFileLoader
     * @param {String} fileName File Path name
     * @param {enum|eTextFileType} fileType File type token
     * @param {Function} callbackFunction Callback Function called when file load is complete
     * @returns {void}
     */
    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!(gEngine.ResourceMap.isAssetLoaded(fileName))) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            // Asynchronously request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName + ": loading failed! [Hint: you cannot double click index.html to run this project. " +
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
                    fileContent = req.responseText;
                }
                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);
                if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                    callbackFunction(fileName);
                }
            };
            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(fileName);
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName);
            }
        }
    };

    /**
     * Unload the TextFile
     * @memberOf gEngine.TextFileLoader
     * @param {type} fileName file name to unload
     * @returns {void}
     */
    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        eTextFileType: eTextFileType
    };
    return mPublic;
}());