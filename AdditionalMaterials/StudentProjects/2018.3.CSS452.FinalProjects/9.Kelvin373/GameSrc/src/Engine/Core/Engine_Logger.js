/*
Logger

Util class for logging
 */

var USE_LOGGING = true;

var gEngine = gEngine || { };

gEngine.Logger = (function()
{
    var useLogging = true;

    var info = function(toLog)
    {
        if(useLogging)
        {
            console.log(toLog);
        }
    }

    var error = function(toLog)
    {
        if(useLogging)
        {
            console.error(toLog);
        }
    }

    var public = {
        useLogging: useLogging,
        logInfo: info,
        logError: error
    };

    return public;
}());
