/*
 * File: Engine_Network.js
 * For network
 */
/*jslint node: true, vars: true, white: true*/
/*global  */
/* find out more about jslint: http://www.jslint.com/help.html */

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
// initialize the variable while ensuring it is not redefined

/**
 * Global variable EngineLayerManager<p>
 * Central storage for all elements that would be drawn
 * @class gEngine.eLayer
 * @type gEngine.LayerManager
 */
gEngine.Network = (function () {
    var mIp=null;
    var mMs=null;
    var messageBind=false;

    var setUp=function (vIp,onOpenCallback,onCloseCallback) {
        this.mIp=vIp;
        this.mMs=new WebSocket("ws://"+this.mIp);
        this.mMs.onopen=onOpenCallback;
        this.mMs.onclose=onCloseCallback;

    };

    var setCallback=function (event,callback) {
        if(this.messageBind){
            this.mMs.removeEventListener(event,this.messageBind);
            // throw "MessageAlreadyBind";
            this.messageBind=null;
        }

        this.mMs.addEventListener(event,callback);
        // this.messageBind=true;
        this.messageBind=callback;

    };

    var cancelCallback=function (event) {
        if(!this.messageBind)
            return "MessageNotAlreadyBind";
        this.mMs.removeEventListener(event,this.messageBind);
    };

    var send=function (vData) {
        this.mMs.send(String(vData))
    };

    var close=function () {
        this.mMs.close()
    };

    var mPublic = {
        mIp:mIp,
        mMs:mMs,
        setUp:setUp,
        setCallback:setCallback,
        cancelCallback:cancelCallback,
        send:send,
        close:close
    };

    return mPublic;
}());
