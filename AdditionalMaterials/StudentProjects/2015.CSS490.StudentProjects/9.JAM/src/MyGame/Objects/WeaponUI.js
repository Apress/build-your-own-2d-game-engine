/**
 * Created by MetaBlue on 12/15/15.
 */
function WeaponUI(normal, shotgun, bigshot) {
    this.mNormalTexture = new TextureRenderable(normal);
    this.mNormalTexture.getXform().setSize(5, 5);
    this.mShotgunTexture = new TextureRenderable(shotgun);
    this.mShotgunTexture.getXform().setSize(10, 2.5);
    this.mBigshottexture = new TextureRenderable(bigshot);
    this.mBigshottexture.getXform().setSize(10, 2.5);
    this.mCurrentTexture = this.mNormalTexture;
}

WeaponUI.prototype.draw = function (aCamera) {
    var xf = this.mCurrentTexture.getXform();
    var w = aCamera.getWCWidth();
    var h = aCamera.getWCHeight();
    var c = aCamera.getWCCenter();
    xf.setXPos(c[0] - w/2 + 7);
    xf.setYPos(c[1] + h/2 - 8);
    this.mCurrentTexture.draw(aCamera);
};

WeaponUI.prototype.update = function (aCamera, hero) {
    switch(hero.getShotType()) {
        case HeroGroup.eHeroShotType.eNormal:
            this.mCurrentTexture = this.mNormalTexture;
            break;
        case HeroGroup.eHeroShotType.eShotGun:
            this.mCurrentTexture = this.mShotgunTexture;
            break;
        case HeroGroup.eHeroShotType.eBigShot:
            this.mCurrentTexture = this.mBigshottexture;
            break;
    }
};