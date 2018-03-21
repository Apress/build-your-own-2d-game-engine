"use strict";

function Shop() {
	this.cam = new Camera(
		vec2.fromValues(50, 137.5),
		100,
		[266, 0, 534, 200]
	);
	this.cam.setBackgroundColor([0.3, 0.4, 0.8, 1]);

	this.pf = null;
	this.shopState = Shop.shopState.towerShop;
	this.playerCurrency = 10;
	this.playerCurrencyText = new FontRenderable("$10");
	this.shopLight = new Light();
	this.shopLight.set2DPosition([this.cam.getWCCenter()[0], this.cam.getWCCenter()[1]]);
	this.shopLight.setFar(80);

	this.towerButtons = [];
	this.towerButtonTitles = [];
	this.towerButtonCosts = [];

	this.upgradeButton;
	this.upgradeCost;
	this.upgradeText;
	this.closeUpgradeButton;
};

Shop.shopState = Object.freeze({
	towerShop: 1,
	upgradeShop: 2
});

Shop.prototype.initializeShop = function(towers, padding) {
	var shopWidth = this.cam.getWCWidth() - padding * (towers.length + 1);
	var shopHeight = this.cam.getWCHeight();
	var bSz = Math.min(shopWidth / towers.length, shopHeight / 1.5);

	for(var i = 0; i < towers.length; ++i) {
		var tower = towers[i].getRenderable();
		var x = bSz * (i + 0.5) + padding * (i + 1);

		if(towers[i].mName === "Loot Farm")
			tower = towers[i].fg;

		tower.addLight(this.shopLight);
		var newButton = new Button(this.pf, [x, 137.5], bSz, bSz, tower, i + 49);
		var newTitle = new FontRenderable(towers[i].mName);
		var newCost = new FontRenderable("$" + towers[i].mCost.toString());

		newTitle.getXform().setPosition(x, 140 + 1 + bSz / 2);
		newTitle.getXform().setSize(bSz, 5);
		newTitle.mOneChar.addLight(this.shopLight);
		newCost.getXform().setPosition(x, 135 - bSz / 2);
		newCost.getXform().setSize(5, 5);
		newCost.mOneChar.addLight(this.shopLight);

		this.towerButtons.push(newButton);
		this.towerButtonTitles.push(newTitle);
		this.towerButtonCosts.push(newCost);
	}
	this.upgradeButton = new Button(this.pf, [shopWidth / 2, 137.5], bSz, bSz, new LightRenderable("assets/long_range.png"), 85);
	this.upgradeButton.image.addLight(this.shopLight);
	this.closeUpgradeButton = new Button(this.pf, [shopWidth - 7.5, 140 + bSz / 2], 15, 10, new FontRenderable("Back"), 27);
	this.closeUpgradeButton.image.mOneChar.addLight(this.shopLight);
	this.upgradeText = new FontRenderable("Upgrade");
	this.upgradeText.mOneChar.addLight(this.shopLight);
	this.upgradeCost = new FontRenderable("$0");
	this.upgradeCost.mOneChar.addLight(this.shopLight);
	this.upgradeText.getXform().setPosition(shopWidth / 2, 141 + bSz / 2);
	this.upgradeText.getXform().setSize(bSz, 5);
	this.upgradeCost.getXform().setPosition(shopWidth / 2, 135 - bSz / 2);
	this.upgradeCost.getXform().setSize(5, 5);

	this.playerCurrencyText.getXform().setSize(6, 4);
	this.playerCurrencyText.getXform().setPosition(shopWidth, 140.5 - shopHeight / 2);
};

Shop.prototype.getTowers = function() {
	return [new LongRange(this.pf, null), new ShortRange(this.pf, null),
		new Honeypot(this.pf, null), new LootFarm(this.pf, null)];
};

Shop.prototype.PurchaseTower = function(index) {
	var newTower = this.getTowers()[index];
	newTower.getXform().setSize(this.pf.nW, this.pf.nH);
	newTower.mFiringEnabled = false;

	if(this.playerCurrency - newTower.mCost >= 0) {
		if(this.pf.selectedTower === null) {
			this.pf.selectedTower = newTower;
			this.pf.pfState = Playfield.State.placement;
		} else if(this.pf.selectedTower.mGridPos === null) {
			if(newTower instanceof this.pf.selectedTower.constructor) {
				this.pf.selectedTower = null;
				this.pf.pfState = Playfield.State.inactive;
			} else {
				this.pf.selectedTower = newTower;
				this.pf.pfState = Playfield.State.placement;
			}
		}
		if(this.pf.selectedTower)
			this.pf.selectedTower.showIndicator = true;
	}
};

Shop.prototype.update = function(dt) {
	var x = null, y = null;
	if(this.cam.isMouseInViewport()) {
		x = this.cam.mouseWCX();
		y = this.cam.mouseWCY();

		if(this.pf.selectedTower) {
			this.pf.selectedTower.getXform().setPosition(x, y);
			this.pf.selectedTower.getRenderable().setColor([1, 0, 0, 0.4]);
			this.pf.selectedTower.update(dt);
		}
	}

	//This is a cheat.
	//if (gEngine.Input.isKeyClicked(gEngine.Input.keys.T)){
	//		this.playerCurrency += 100;
	//		this.UpdateCurrency();
	//	}

	switch(this.shopState) {
		case Shop.shopState.towerShop:
			for(var i = 0; i < this.towerButtons.length; ++i)
				if(this.towerButtons[i].checkButton(x, y))
					this.PurchaseTower(i);
			break;

		case Shop.shopState.upgradeShop:
			if(this.closeUpgradeButton.checkButton(x, y)) {
				this.pf.clickedTower = null;
				this.shopState = Shop.shopState.towerShop;
			}
			if(this.upgradeButton.checkButton(x, y))
				this.PurchaseUpgrade();
			break;
	}
};

Shop.prototype.draw = function() {
	this.cam.setupViewProjection();
	
	this.playerCurrencyText.draw(this.cam);

	switch(this.shopState) {
		case Shop.shopState.towerShop:
			for(var i = 0; i < this.towerButtons.length; ++i)
				this.towerButtons[i].draw(this.cam);

			for(var i = 0; i < this.towerButtonTitles.length; ++i)
				this.towerButtonTitles[i].draw(this.cam);

			for(var i = 0; i < this.towerButtonCosts.length; ++i)
				this.towerButtonCosts[i].draw(this.cam);

			if(this.pf.selectedTower !== null)
				this.pf.selectedTower.draw(this.cam);

			break;

		case Shop.shopState.upgradeShop:
			this.upgradeButton.draw(this.cam);
			this.closeUpgradeButton.draw(this.cam);
			this.upgradeText.draw(this.cam);
			this.upgradeCost.draw(this.cam);
			break;
	}
};

Shop.prototype.OnTowerClicked = function(tower) {
	if(tower instanceof Obstacle || tower instanceof Toast || tower.mName === "Honeypot") {
		this.shopState = Shop.shopState.towerShop;
		return;
	}

	if(tower instanceof ShortRange) {
		this.upgradeButton.image.setTexture("assets/short_range.png");
		this.upgradeButton.image.mTexLeft = 0;
		this.upgradeButton.image.mTexRight = 0.5;
	} else if(tower instanceof LongRange) {
		this.upgradeButton.image.setTexture("assets/long_range.png");
		this.upgradeButton.image.mTexLeft = 0.2535;
		this.upgradeButton.image.mTexRight = 0.5;
	} else if(tower instanceof LootFarm) {
		this.upgradeButton.image.setTexture("assets/lootfarm.png");
		this.upgradeButton.image.mTexLeft = 0;
		this.upgradeButton.image.mTexRight = 0.25;
	}
	this.upgradeButton.image._setTexInfo();

	this.UpdateUpgradeText(tower);
	this.shopState = Shop.shopState.upgradeShop;
};

Shop.prototype.PurchaseUpgrade = function() {
	var tower = this.pf.clickedTower;
	if(tower.mLevel < tower.mMaxLevel && this.playerCurrency - tower.upgradeCosts[tower.mLevel] >= 0) {
		this.playerCurrency -= tower.upgradeCosts[tower.mLevel];
		this.UpdateCurrency();
		tower.upgrade();
		this.UpdateUpgradeText(tower);
	}
};

Shop.prototype.CompleteTransaction = function(tower) {
	this.playerCurrency -= tower.mCost;
	this.UpdateCurrency();
};

Shop.prototype.SellTower = function(tower) {
	this.playerCurrency += tower.mCost * 0.8 * (tower.mHealth / tower.baseHealth);
	this.UpdateCurrency();
};

Shop.prototype.setPlayerCurrency = function(m) {
	this.playerCurrency = m;
	this.UpdateCurrency();
};

Shop.prototype.UpdateUpgradeText = function(tower) {
	if(tower.mLevel < tower.mMaxLevel)
		this.upgradeCost.setText("$" + tower.upgradeCosts[tower.mLevel]);
	else
		this.upgradeCost.setText("Max Level");
};

Shop.prototype.UpdateCurrency = function() {
	if(this.playerCurrency % 1 >= 0.1)
		this.playerCurrencyText.setText("$" + this.playerCurrency.toFixed(1));
	else
		this.playerCurrencyText.setText("$" + this.playerCurrency);
};
