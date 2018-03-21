"use strict";

function Node(pf, center, w, h, tileSet, outlined = true) {
	this.w = w;
	this.h = h;
	this.pf = pf;

	this.br = [center[0] - w / 2, center[1] - h / 2];
	this.drawOutline = outlined;

	if(tileSet) {
		this.tile = new LightRenderable(tileSet);
		this.tile.getXform().setSize(this.w, this.h);
		this.tile.getXform().setPosition(center[0], center[1]);
		this.tile.obj = new GameObject(this.tile);
		this.tile.obj.mRigid = new RigidRectangle(this.tile.getXform(), this.w, this.h);

		for(var i = 0; i < pf.mLights.length; ++i)
			this.tile.addLight(pf.mLights[i]);
	}

	this.top = new LineRenderable();
	this.bottom = new LineRenderable();
	this.left = new LineRenderable();
	this.right = new LineRenderable();

	this.top.setVertices(this.minX(), this.maxY(), this.maxX(), this.maxY());
	this.bottom.setVertices(this.minX(), this.minY(), this.maxX(), this.minY());
	this.left.setVertices(this.minX(), this.minY(), this.minX(), this.maxY());
	this.right.setVertices(this.maxX(), this.minY(), this.maxX(), this.maxY());

	this.top.obj = new GameObject(this.top);
	this.bottom.obj = new GameObject(this.bottom);
	this.left.obj = new GameObject(this.left);
	this.right.obj = new GameObject(this.right);

	this.top.obj.mRigid = new RigidRectangle(this.top.getXform(), this.w, 0.1);
	this.bottom.obj.mRigid = new RigidRectangle(this.bottom.getXform(), this.w, 0.1);
	this.left.obj.mRigid = new RigidRectangle(this.left.getXform(), 0.1, this.h);
	this.right.obj.mRigid = new RigidRectangle(this.right.getXform(), 0.1, this.h);

	this.mPhysicsEnabled = false;
}
gEngine.Core.inheritPrototype(Node, GameObject);

/*
 * 	this.w = w;
	this.h = h;

	this.br = [center[0] - w / 2, center[1] - h / 2];

	this.top = new Renderable();
	this.bottom = new Renderable();
	this.left = new Renderable();
	this.right = new Renderable();
	
	this.top.getXform().setSize(this.w, 0.1);
	this.bottom.getXform().setSize(this.w, 0.1);
	this.left.getXform().setSize(0.1, this.h);
	this.right.getXform().setSize(0.1, this.h);
	
	this.top.getXform().setPosition(center[0], center[1] - h / 2);
	this.bottom.getXform().setPosition(center[0], center[1] + h / 2);
	this.left.getXform().setPosition(center[0] - h / 2, center[1]);
	this.right.getXform().setPosition(center[0] + h / 2, center[1]);
	
	this.top.mRigid = new RigidRectangle(this.top.getXform(), this.w, 0.1);
	this.bottom.mRigid = new RigidRectangle(this.getXform(), this.w, 0.1);
	this.left.mRigid = new RigidRectangle(this.getXform(), 0.1, this.h);
	this.right.mRigid = new RigidRectangle(this.getXform(), 0.1, this.h);
	this.mPhysicsEnabled = false;
 */

Node.prototype.draw = function(cam) {
	if(this.tile)
		this.tile.draw(cam);

	if(this.drawOutline) {
		this.top.draw(cam);
		this.bottom.draw(cam);
		this.left.draw(cam);
		this.right.draw(cam);
	}
};

Node.prototype.update = function() {
	if(this.tile) {
		this.tile.update();
		this.tile.obj.mRigid.update();
	}

	this.top.update();
	this.bottom.update();
	this.left.update();
	this.right.update();
	this.top.obj.mRigid.update();
	this.bottom.obj.mRigid.update();
	this.left.obj.mRigid.update();
	this.right.obj.mRigid.update();
};

Node.prototype.startPhysics = function() {
	this.mPhysicsEnabled = true;

	if(this.tile)
		this.startPhysicsOnObject(this.tile.obj);

	this.startPhysicsOnObject(this.top.obj);
	this.startPhysicsOnObject(this.bottom.obj);
	this.startPhysicsOnObject(this.left.obj);
	this.startPhysicsOnObject(this.right.obj);
};

Node.prototype.startPhysicsOnObject = function(object) {
	object.setRigidBody(object.mRigid);
	object.mRigid.setAngularVelocity((Math.random() - 0.5) * 10);
	object.mRigid.setVelocity((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60);
};

Node.prototype.minX = function() { return this.br[0]; };
Node.prototype.maxX = function() { return this.br[0] + this.w; };
Node.prototype.minY = function() { return this.br[1]; };
Node.prototype.maxY = function() { return this.br[1] + this.h; };
