/*------------------------------------------------------------------------------
 * File:   main.js
 * Author: Terry Rogers
 * Date:   10/22/2015
 * This is the main entry point for the game.
 *----------------------------------------------------------------------------*/
    
// Execute when the DOM is ready to be manipulated.
$(document).ready(function() {
  // Create the game.
  var game = new StartScene();
  
  // Initialize the game.
  gEngine.Core.initializeEngineCore('gl_canvas', game);
  
  // When the window is resized, we should resize the canvas as well.
  $(window).on('resize', function() {
    var scene = gEngine.GameLoop.getScene();
    
    if(scene !== null) {
      scene.resize();
    }
  });
});
