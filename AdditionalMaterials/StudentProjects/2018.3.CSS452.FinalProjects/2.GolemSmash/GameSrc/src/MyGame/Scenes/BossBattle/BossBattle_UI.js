/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global BossBattle, vec2, Config, gEngine */

"use strict";

BossBattle.prototype._initializeUI = function() { 
    var configUI = Config.BossBattle.UI;
    
    //The arrow selector in the top right corner
    var arrowSelectSprites = [Config.UI.Textures.UIArrowIcon,
                              Config.UI.Textures.UIFireArrowIcon,
                              Config.UI.Textures.UIIceArrowIcon];
                         
    this.mArrowSelector = new UIArrowSelection(arrowSelectSprites, 
                                Config.UI.Textures.UIArrowBorders, 
                                configUI.ArrowSelection.Position, 
                                configUI.ArrowSelection.IconSize,
                                configUI.ArrowSelection.ActiveTint,
                                configUI.ArrowSelection.InactiveTint,
                                this.mUILight);
                                
    this.mHeroHPText = new UIText(configUI.HeroHPText.Text,
                                  configUI.HeroHPText.Position,
                                  configUI.HeroHPText.TextHeight, null, null);
    this.mHeroHPText.setColor(configUI.HeroHPText.Color);
    
    
    
    this.mBossName = new UIText(configUI.BossName.Text, 
                                configUI.BossName.Position, null, null);
    this.mBossName.setColor(configUI.BossName.Color);
    this.mBossName.setTextHeight(configUI.BossName.TextHeight);
    this.mBossHP = new UIHealthBar(Config.UI.Textures.UIHealthBar,
                               configUI.BossHealthBar.Position,
                               configUI.BossHealthBar.Size,
                               configUI.BossHealthBar.Buffer,
                               this.mUILight);
    this.mBossHP.setMaxHP(this.mBoss.mMaxHP);
    this.mBossHP.setCurrentHP(this.mBoss.mCurrentHP);

    this.mHeroHP = new UIHealthBar(Config.UI.Textures.UIHealthBar,
                               configUI.HeroHealthBar.Position,
                               configUI.HeroHealthBar.Size,
                               configUI.HeroHealthBar.Buffer,
                               this.mUILight);
    this.mHeroHP.setMaxHP(this.mHero.mMaxHP);
    this.mHeroHP.setCurrentHP(this.mHero.mCurrentHP);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHeroHPText);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mArrowSelector);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mBossName);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mBossHP);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mHeroHP);
};

BossBattle.prototype._updateUI = function() {
    this.mArrowSelector.select(this.mHero.getArrowSelection());
    var cooldowns = this.mHero.mArrowSet.getCooldownStatus();
    for(var i = 0; i < cooldowns.length; i++)
        this.mArrowSelector.setActive(i, cooldowns[i]);
    
    if(this.mBoss !== null)
        this.mBossHP.setCurrentHP(this.mBoss.mCurrentHP);
    else
        this.mBossHP.setCurrentHP(0);
    
    this.mHeroHP.setCurrentHP(this.mHero.mCurrentHP);
};

BossBattle.prototype._unloadUI = function () {
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eHUD, this.mHeroHPText);
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eHUD, this.mArrowSelector);
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eHUD, this.mBossName);
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eHUD, this.mBossHP);
    gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eHUD, this.mHeroHP);
};

