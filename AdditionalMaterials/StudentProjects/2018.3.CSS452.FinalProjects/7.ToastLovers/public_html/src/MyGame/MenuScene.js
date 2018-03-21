"use strict";

function MenuScene() {
	this.mPreviousSegment = MenuScene.currentState.splash;
	this.mSegment = this.mPreviousSegment;
	this.mCam = null;
	this.mTimer = 0;

	this.mImageNames = [];
	this.mImageNames.push("assets/MenuSplash.png");
	this.mImageNames.push("assets/MenuLevelSelect.png");
	this.mImageNames.push("assets/MenuHelp.png");
	this.mImageNames.push("assets/MenuCredits.png");
	this.mImageNames.push("assets/MenuExit.png");
	this.mImageNames.push("assets/MenuEasy.png");
	this.mImageNames.push("assets/MenuHard.png");
	this.mImageNames.push("assets/MenuMed.png");

	this.mBgMusic = "assets/audio/Ove - Earth Is All We Have .ogg";
	this.aScreenChange = "assets/audio/potpickup.ogg";
}
gEngine.Core.inheritPrototype(MenuScene, Scene);

MenuScene.currentState = Object.freeze({
	splash: {x: 0, y: 0},
	levelSelect: {x: 0, y: 100},
	confirmEasy: {x: -100, y: 100},
	confirmMed: {x: 0, y: 200},
	confirmHard: {x: 100, y: 100},
	confirmExit: {x: 0, y: -100},
	help: {x: -100, y: 0},
	credits: {x: 100, y: 0}
});

MenuScene.prototype.initialize = function() {
	this.mCam = new Camera(vec2.fromValues(0, 0), 100, [0, 0, 800, 800]);
	this.mCam.mCameraState.configInterpolation(1, 1);

	this.mSplashMenu = new TextureRenderable("assets/MenuSplash.png");
	this.mSplashMenu.getXform().setSize(90, 90);
	this.mSplashMenu.getXform().setPosition(MenuScene.currentState.splash.x, MenuScene.currentState.splash.y);

	this.mLevelSelectMenu = new TextureRenderable("assets/MenuLevelSelect.png");
	this.mLevelSelectMenu.getXform().setSize(90, 90);
	this.mLevelSelectMenu.getXform().setPosition(MenuScene.currentState.levelSelect.x, MenuScene.currentState.levelSelect.y);

	this.mHelpMenu = new TextureRenderable("assets/MenuHelp.png");
	this.mHelpMenu.getXform().setSize(90, 90);
	this.mHelpMenu.getXform().setPosition(MenuScene.currentState.help.x, MenuScene.currentState.help.y);

	this.mCreditsMenu = new TextureRenderable("assets/MenuCredits.png");
	this.mCreditsMenu.getXform().setSize(90, 90);
	this.mCreditsMenu.getXform().setPosition(MenuScene.currentState.credits.x, MenuScene.currentState.credits.y);

	this.mExitMenu = new TextureRenderable("assets/MenuExit.png");
	this.mExitMenu.getXform().setSize(90, 90);
	this.mExitMenu.getXform().setPosition(MenuScene.currentState.confirmExit.x, MenuScene.currentState.confirmExit.y);

	this.mEasyMenu = new TextureRenderable("assets/MenuEasy.png");
	this.mEasyMenu.getXform().setSize(90, 90);
	this.mEasyMenu.getXform().setPosition(MenuScene.currentState.confirmEasy.x, MenuScene.currentState.confirmEasy.y);

	this.mHardMenu = new TextureRenderable("assets/MenuHard.png");
	this.mHardMenu.getXform().setSize(90, 90);
	this.mHardMenu.getXform().setPosition(MenuScene.currentState.confirmHard.x, MenuScene.currentState.confirmHard.y);

	this.mMedMenu = new TextureRenderable("assets/MenuMed.png");
	this.mMedMenu.getXform().setSize(90, 90);
	this.mMedMenu.getXform().setPosition(MenuScene.currentState.confirmMed.x, MenuScene.currentState.confirmMed.y);

	var c = gEngine.DefaultResources.getGlobalAmbientColor();
	c[0] = 1.0;
	c[1] = 1.0;
	c[2] = 1.0;
	c[3] = 1.0;

	gEngine.AudioClips.playBackgroundAudio(this.mBgMusic);
};

MenuScene.prototype.update = function(dt) {
	this.mCam.mCameraState.updateCameraState();
	
	if(this.mPreviousSegment !== this.mSegment) {
		if(this.mTimer === 0)
			gEngine.AudioClips.playACue(this.aScreenChange);

		this.mTimer += 1.5 * dt;

		if(this.mTimer >= 1) {
			this.mPreviousSegment = this.mSegment;
			this.mCam.setWCCenter(this.mSegment.x, this.mSegment.y);
			this.mTimer = 0;
		} else {
			this.mCam.setWCCenter(
				this.mPreviousSegment.x + this.mTimer * (this.mSegment.x - this.mPreviousSegment.x),
				this.mPreviousSegment.y + this.mTimer * (this.mSegment.y - this.mPreviousSegment.y));
		}
	} else {
		if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Left) || gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
			if(this.mSegment === MenuScene.currentState.splash)
				this.mSegment = MenuScene.currentState.help;
			else if(this.mSegment === MenuScene.currentState.credits)
				this.mSegment = MenuScene.currentState.splash;
			else if(this.mSegment === MenuScene.currentState.levelSelect)
				this.mSegment = MenuScene.currentState.confirmEasy;
			else if(this.mSegment === MenuScene.currentState.confirmHard)
				this.mSegment = MenuScene.currentState.levelSelect;
		} else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Right) || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
			if(this.mSegment === MenuScene.currentState.help)
				this.mSegment = MenuScene.currentState.splash;
			else if(this.mSegment === MenuScene.currentState.splash)
				this.mSegment = MenuScene.currentState.credits;
			else if(this.mSegment === MenuScene.currentState.confirmEasy)
				this.mSegment = MenuScene.currentState.levelSelect;
			else if(this.mSegment === MenuScene.currentState.levelSelect)
				this.mSegment = MenuScene.currentState.confirmHard;
		} else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Up) || gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
			if(this.mSegment === MenuScene.currentState.confirmExit)
				this.mSegment = MenuScene.currentState.splash;
			else if(this.mSegment === MenuScene.currentState.splash)
				this.mSegment = MenuScene.currentState.levelSelect;
			else if(this.mSegment === MenuScene.currentState.levelSelect)
				this.mSegment = MenuScene.currentState.confirmMed;
		} else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Down) || gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
			if(this.mSegment === MenuScene.currentState.confirmMed)
				this.mSegment = MenuScene.currentState.levelSelect;
			else if(this.mSegment === MenuScene.currentState.levelSelect)
				this.mSegment = MenuScene.currentState.splash;
			else if(this.mSegment === MenuScene.currentState.splash)
				this.mSegment = MenuScene.currentState.confirmExit;
		} else if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter) || gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
			if(this.mSegment === MenuScene.currentState.confirmExit) {
				console.log("you are here forever");
			} else if(this.mSegment === MenuScene.currentState.confirmEasy
				|| this.mSegment === MenuScene.currentState.confirmMed
				|| this.mSegment === MenuScene.currentState.confirmHard) {
				gEngine.GameLoop.stop();
			}
		}

		if(this.mCam.isMouseInViewport() && gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
			var mx = this.mCam.mouseWCX(), my = this.mCam.mouseWCY();

			switch(this.mSegment) {
			case MenuScene.currentState.splash:
				if(my > MenuScene.currentState.splash.y - 2 && my < MenuScene.currentState.splash.y + 2) {
					if(mx > MenuScene.currentState.splash.x - 44 && mx < MenuScene.currentState.splash.x - 29)
						this.mSegment = MenuScene.currentState.help;
					else if(mx > MenuScene.currentState.splash.x + 24 && mx < MenuScene.currentState.splash.x + 44)
						this.mSegment = MenuScene.currentState.credits;
				} else if(mx > MenuScene.currentState.splash.x - 12.5 && mx < MenuScene.currentState.splash.x + 12.5) {
					if(my > MenuScene.currentState.splash.y + 37 && my < MenuScene.currentState.splash.y + 44)
						this.mSegment = MenuScene.currentState.levelSelect;
					else if(my > MenuScene.currentState.splash.y - 44 && my < MenuScene.currentState.splash.y - 37)
						this.mSegment = MenuScene.currentState.confirmExit;
				}

				break;

			case MenuScene.currentState.levelSelect:
				if(my > MenuScene.currentState.levelSelect.y - 2 && my < MenuScene.currentState.levelSelect.y + 2) {
					if(mx > MenuScene.currentState.levelSelect.x - 44 && mx < MenuScene.currentState.levelSelect.x - 29)
						this.mSegment = MenuScene.currentState.confirmEasy;
					else if(mx > MenuScene.currentState.levelSelect.x + 24 && mx < MenuScene.currentState.levelSelect.x + 44)
						this.mSegment = MenuScene.currentState.confirmHard;
				} else if(mx > MenuScene.currentState.levelSelect.x - 12.5 && mx < MenuScene.currentState.levelSelect.x + 12.5) {
					if(my > MenuScene.currentState.levelSelect.y + 37 && my < MenuScene.currentState.levelSelect.y + 44)
						this.mSegment = MenuScene.currentState.confirmMed;
					else if(my > MenuScene.currentState.levelSelect.y - 44 && my < MenuScene.currentState.levelSelect.y - 37)
						this.mSegment = MenuScene.currentState.splash;
				}

				break;

			case MenuScene.currentState.credits:
				if(mx > MenuScene.currentState.credits.x - 44 && mx < MenuScene.currentState.credits.x - 29 &&
					my > MenuScene.currentState.credits.y - 2 && my < MenuScene.currentState.credits.y + 2)
					this.mSegment = MenuScene.currentState.splash;

				break;

			case MenuScene.currentState.help:
				if(mx > MenuScene.currentState.help.x + 29 && mx < MenuScene.currentState.help.x + 44 &&
					my > MenuScene.currentState.help.y - 2 && my < MenuScene.currentState.help.y + 2)
					this.mSegment = MenuScene.currentState.splash;

				break;

			case MenuScene.currentState.confirmExit:
				if(mx > MenuScene.currentState.confirmExit.x - 7 && mx < MenuScene.currentState.confirmExit.x + 7 &&
					my > MenuScene.currentState.confirmExit.y + 37 && my < MenuScene.currentState.confirmExit.y + 44)
					this.mSegment = MenuScene.currentState.splash;

				break;

			case MenuScene.currentState.confirmEasy:
				if(mx > MenuScene.currentState.confirmEasy.x + 29 && mx < MenuScene.currentState.confirmEasy.x + 44 &&
					my > MenuScene.currentState.confirmEasy.y - 2 && my < MenuScene.currentState.confirmEasy.y + 2)
					this.mSegment = MenuScene.currentState.levelSelect;

				break;

			case MenuScene.currentState.confirmMed:
				if(mx > MenuScene.currentState.confirmMed.x - 7 && mx < MenuScene.currentState.confirmMed.x + 7 &&
					my > MenuScene.currentState.confirmMed.y - 44 && my < MenuScene.currentState.confirmMed.y - 37)
					this.mSegment = MenuScene.currentState.levelSelect;

				break;

			case MenuScene.currentState.confirmHard:
				if(mx > MenuScene.currentState.confirmHard.x - 44 && mx < MenuScene.currentState.confirmHard.x - 29 &&
					my > MenuScene.currentState.confirmHard.y - 2 && my < MenuScene.currentState.confirmHard.y + 2)
					this.mSegment = MenuScene.currentState.levelSelect;

				break;
			}
		}
	}
};

MenuScene.prototype.draw = function() {
	this.mCam.setupViewProjection();

	if(this.mSegment === MenuScene.currentState.splash || this.mPreviousSegment === MenuScene.currentState.splash)
		this.mSplashMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.levelSelect || this.mPreviousSegment === MenuScene.currentState.levelSelect)
		this.mLevelSelectMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.help || this.mPreviousSegment === MenuScene.currentState.help)
		this.mHelpMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.credits || this.mPreviousSegment === MenuScene.currentState.credits)
		this.mCreditsMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.confirmExit || this.mPreviousSegment === MenuScene.currentState.confirmExit)
		this.mExitMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.confirmEasy || this.mPreviousSegment === MenuScene.currentState.confirmEasy)
		this.mEasyMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.confirmHard || this.mPreviousSegment === MenuScene.currentState.confirmHard)
		this.mHardMenu.draw(this.mCam);

	if(this.mSegment === MenuScene.currentState.confirmMed || this.mPreviousSegment === MenuScene.currentState.confirmMed)
		this.mMedMenu.draw(this.mCam);
};

MenuScene.prototype.loadScene = function() {
	gEngine.AudioClips.loadAudio(this.mBgMusic);
	gEngine.AudioClips.loadAudio(this.aScreenChange);

	for(var i = 0; i < this.mImageNames.length; ++i)
		gEngine.Textures.loadTexture(this.mImageNames[i]);
};

MenuScene.prototype.unloadScene = function() {
	gEngine.AudioClips.unloadAudio(this.aScreenChange);
	gEngine.AudioClips.stopBackgroundAudio();

	for(var i = 0; i < this.mImageNames.length; ++i)
		gEngine.Textures.unloadTexture(this.mImageNames[i]);

	switch(this.mSegment) {
	case MenuScene.currentState.confirmEasy:
		gEngine.Core.startScene(new GameScene(0));
		break;

	case MenuScene.currentState.confirmMed:
		gEngine.Core.startScene(new GameScene(1));
		break;

	case MenuScene.currentState.confirmHard:
		gEngine.Core.startScene(new GameScene(2));
		break;
	}
};
