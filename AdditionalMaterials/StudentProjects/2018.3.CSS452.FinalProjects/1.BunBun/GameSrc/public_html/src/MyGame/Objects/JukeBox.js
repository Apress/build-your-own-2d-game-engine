/**
 * NextLevelController.js 
 *
 * Handles standard transition screens. No drawing here.
 * 
 * @author  Erik W. Greif
 * @since   2018-03-11
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


/**
 * Lets the user click a key to go to another level. If the level is not 
 * given as a parameter, the level is pulled from the global key/value store
 * as "next-level".
 */
function JukeBox(audioFile, isLooped) {
    
    this.renderable = new Renderable();
    GameObject.call(this, this.renderable);
    this.setDrawRenderable(false);
    
    this.audioFile = audioFile;
    this.isLooped = !!isLooped;
    
    //Start the audio
    if (this.isLooped) {
        gEngine.AudioClips.playBackgroundAudio(this.audioFile);
    } else {
        gEngine.AudioClips.playNonLoopedAudio(this.audioFile);
    }
}
gEngine.Core.inheritPrototype(JukeBox, GameObject);


/**
 * Constructs a new instance using the properties object.
 * 
 * @param properties  The properties object to be used for construction.
 * @returns A new instance.
 */
JukeBox.fromProperties = function (properties) {

    return new JukeBox(properties["audioFile"], properties["isLooped"]);
};

JukeBox.prototype.delete = function () {
    
    //Stop the audio
    if (this.isLooped) {
        gEngine.AudioClips.stopBackgroundAudio(this.audioFile);
    } else {
        gEngine.AudioClips.stopNonLoopedAudio(this.audioFile);
    }
    
    GameObject.prototype.delete.call(this);
};

JukeBox.prototype.draw = function (camera) {
};


JukeBox.prototype.update = function (camera) {
};

