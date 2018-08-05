/*
 * File: LoadingIconConfig.js
 */

/*jslint node: true, vars: true */
/*global gEngine: false*/
/* find out more about jslint: http://www.jslint.com/help.html */


var gEngine = gEngine || { };

gEngine.LoadingIconConfig = (function () {
    
    /**
     * A varuable used to keep track of total # of loads necessary for the laoding bar
     * @memberOf gEngine.LoadingIconConfig
     */
    var levelLoadCount=0;
    
    /**
     * Creates the necessary elements needed for the loading screen
     * @memberOf gEngine.LoadingIconConfig
     */
var setup = function(){
    var cwidth=document.getElementById("LoadingIconParent").style.width;
    var cheight=document.getElementById("LoadingIconParent").style.height;
    document.getElementById("GLCanvas").width=cwidth.substr(0,cwidth.length - 2);
    document.getElementById("GLCanvas").height=cheight.substr(0,cheight.length - 2);
    document.write("<div class='LoadingSpinnerAnimation' id='LoadingSpinner'></div>");
    document.write("<p class='LoadingDotsAnimation' id='LoadingDots'>Loading<span>.</span><span>.</span><span>.</span></p>");
    document.write("<div id='LoadingScreenProgress'><div id='LoadingScreenBar'>0%</div></div>");
};

/**
     * Makes the screen black, and enters the loading screen
     * @memberOf gEngine.LoadingIconConfig
     */
var start = function(){
    document.getElementById("LoadingSpinner").style.display = "block";
    document.getElementById("LoadingDots").style.display="block";
    document.getElementById("LoadingScreenBar").style.display="block";
    document.getElementById("LoadingScreenProgress").style.display="block";
    gEngine.Core.clearCanvas([0,0,0,1]);
};
/**
     * Resets the loading bar and exits the loading screen
     * @memberOf gEngine.LoadingIconConfig
     */
var stop = function(){
    levelLoadCount=0;
    document.getElementById("LoadingScreenBar").style.width="0%";
    document.getElementById("LoadingScreenBar").innerHTML = "0%";
    document.getElementById("LoadingSpinner").style.display="none";
    document.getElementById("LoadingDots").style.display="none";
    document.getElementById("LoadingScreenBar").style.display="none";
    document.getElementById("LoadingScreenProgress").style.display="none";
};

/**
     * Updates loading bar
     * @memberOf gEngine.LoadingIconConfig
     */
var loadingUpdate = function() {
    document.getElementById("LoadingScreenBar").style.width=Math.floor(((levelLoadCount - gEngine.ResourceMap.getNumOutstandingLoads())/levelLoadCount)*100)+"%";
    document.getElementById("LoadingScreenBar").innerHTML = Math.floor(((levelLoadCount - gEngine.ResourceMap.getNumOutstandingLoads())/levelLoadCount)*100)+"%";
};

var loadCountReset = function() {
        levelLoadCount = 0;
    };
    
    /**
     * Checks if a level is currently loading
     * @memberOf gEngine.LoadingIconConfig
     */
    var isLevelSet = function() {
        return levelLoadCount!==0;
    };
    
    /**
     * Returns the number of loads needed for the level
     * @memberOf gEngine.LoadingIconConfig
     */
    var getLevelLoadCount = function() {
        return levelLoadCount;
    };
    
    /**
     * Sets the progress bar amount to the number of loads needed for the level
     * @memberOf gEngine.LoadingIconConfig
     */
    var loadCountSet = function() {
        levelLoadCount = gEngine.ResourceMap.getNumOutstandingLoads();
    };

var mPublic = {
        setup: setup,
        start: start,
        stop: stop,
        loadingUpdate: loadingUpdate,
        loadCountReset: loadCountReset,
        isLevelSet: isLevelSet,
        getLevelLoadCount: getLevelLoadCount,
        loadCountSet: loadCountSet
    };
    return mPublic;

}());