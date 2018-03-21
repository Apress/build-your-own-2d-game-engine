/**
 * Level Class
 *
 * Class that contains all of the platforms, the lights and the background renderable
 * that represents a unique level.
 *
 * This is used so that later on the contents of the level can be parsed from a file.
 */

/**
 * Constructor
 *
 * Initializes all of the data for the Level, but doesn't set up anything.
 * Constructor parameters were left out in favor of using accessor methods instead
 * because there would be many parameters to set, which may be difficult to maintain.
 *
 * @constructor
 */
function Level()
{
    // the texture for the renderable that is shown for the background
    this.mBackgroundRenderable = null;

    // the ratio of height/width that is used to indicate how tall the
    // renderable should be based on the supplied width of the camera
    // this makes the assumption that the aspect ratio of the camera does not change
    this.mBackgroundAspectRatio = 1;

    // if true, the background's center and size will match that of the supplied
    // referenced camera
    // otherwise, the background will have a fixed position
    this.mBackgroundFixedToCamera = false;

    // reference to the camera that is being drawn to
    // this is used when the background is fixed to camera to ensure
    // that the background is always centered to the active camera
    this.mCameraRef = null;

    // where the camera should be centered
    this.mCameraCenter = [0, 0];

    // Represents the GameObjectSet of all objects that the player interacts with
    // for moving around the level
    // this (future) will be populated from a file
    // this should not contain enemies or the player themselves, just the stuff
    // that they interact with
    this.mPlatforms = new GameObjectSet();

    // A LightSet for all of the lights that are associated to the level
    this.mLightSet = new LightSet();

    // the world coordinate position of the player spawn point
    // this should be the position where the player will be centered on when the game
    // begins
    this.mPlayerSpawn = [0, 0];

    // defines the type of level that this is, to instruct the camera
    // how to move
    this.mLevelType = "boss"; // "boss", "regular"

    this.mWorldBounds = null;
};

/**
 * Sets the active camera for the background to track to.
 * @param camera
 */
Level.prototype.setActiveCamera = function(camera)
{
    this.mCameraRef = camera;
};

/**
 * Sets the background to use a regular texture
 * @param backgroundTexture
 */
Level.prototype.setBackgroundRegularTexture = function(backgroundTexture)
{
    this.mBackgroundRenderable = new TextureRenderable(
        backgroundTexture
    );
};

/**
 * Sets the background aspect ratio
 * This value should be equal to height/width
 * @param ratio
 */
Level.prototype.setBackgroundAspectRatio = function(ratio)
{
    this.mBackgroundAspectRatio = ratio;
};

/**
 * Sets the background to use a texture and normal map pair
 * @param backgroundTexture
 * @param backgroundNormalMap
 */
Level.prototype.setBackgroundNormalMap = function(backgroundTexture, backgroundNormalMap)
{
    this.mBackgroundRenderable = new IllumRenderable(
        backgroundTexture,
        backgroundNormalMap
    );
};

/**
 * Update
 *
 * Handles updating the position of the background relative to the active camera
 */
Level.prototype.update = function()
{
    // update the background to be fixed to the camera, if this is set
    // otherwise the position of the background will be fixed

    if(this.mBackgroundFixedToCamera)
    {
        // ensure that the background and camera are not null first
        if(this.mBackgroundRenderable != null && this.mCameraRef != null)
        {
            var xform = this.mBackgroundRenderable.getXform();
            // update the position to match
            xform.setPosition(this.mCameraRef.getWCCenter()[0], this.mCameraRef.getWCCenter()[1]);

            // update the size using the supplied aspect ratio
            // this could be done using the aspect ratio of the camera, although
            // the texture will not always be in this same aspect ratio
            xform.setSize(
                this.mCameraRef.getWCWidth(),
                this.mCameraRef.getWCWidth() * this.mBackgroundAspectRatio
            );
        }
    }
};

/**
 * Set the position and the size of the background renderable
 * Size is determined from the width and the aspect ratio
 * @param center an array of 2 elements containing the WC X and WC Y center positions
 * @param width
 */
Level.prototype.setBackgroundXform = function(center, width)
{
    if(this.mBackgroundrenderable != null)
    {
        this.mBackgroundRenderable.getXform().setPosition(
            center[0], center[1]
        );
        this.mBackgroundAspectRatio.getXform().setSize(
            width,
            width * this.mBackgroundAspectRatio
        );
    }
};

/**
 * Adds a platform to the collection of platforms tracked by the level
 * @param platform
 */
Level.prototype.addPlatform = function(platform)
{
    this.mPlatforms.addToSet(platform);
};

/**
 * Adds a light to the set of lights for the level
 * @param light
 */
Level.prototype.addLight = function(light)
{
    this.mLightSet.addToSet(light);

    if(this.mBackgroundRenderable != null)
    {
        this.mBackgroundRenderable.addLight(light);
    }
};

/**
 * Sets the player spawn point position in world coordinates
 * @param x
 * @param y
 */
Level.prototype.setPlayerSpawnXY = function(x, y)
{
    this.setPlayerSpawnPoint([x, y]);
};

/**
 * Sets the player spawn point position in world coordinates
 * @param wcPoint
 */
Level.prototype.setPlayerSpawnPoint = function(wcPoint)
{
    this.mPlayerSpawn = wcPoint;
};

/**
 * Sets the camera center point in X and Y world coordinates
 * @param x
 * @param y
 */
Level.prototype.setCameraCenterXY = function(x,y)
{
    this.setCameraCenterPoint([x, y]);
};

Level.prototype.setCameraCenterPoint = function(point)
{
    this.mCameraCenter = point;
};

Level.prototype.setWorldBounds = function(center, width, height)
{
    this.mWorldBounds = new WorldBounds(center, width, height);
};

//todo Level class - integrate loading from a Tiled editor map, or some other way of defining levels