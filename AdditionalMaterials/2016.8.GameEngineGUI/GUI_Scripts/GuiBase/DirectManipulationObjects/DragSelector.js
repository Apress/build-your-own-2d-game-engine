function DragSelector( texture, lightObject ) {
    this.LIGHT_ICON_SIZE = 3;
    this.icon = this.getIcon(texture);
    this.lightObject = lightObject;
}

// draw icon
DragSelector.prototype.draw = function(aCamera) {
    this.icon.draw(aCamera);
};

// create new icon
DragSelector.prototype.getIcon = function (texture) {
    var icon = new TextureRenderable(texture);
    var xf = icon.getXform();
    xf.setWidth(this.LIGHT_ICON_SIZE);
    xf.setHeight(this.LIGHT_ICON_SIZE);
    return icon;
};

DragSelector.prototype.update = function() {
    // move to light
    var xf = this.icon.getXform();
    xf.setPosition(this.lightObject.mPosition[0], this.lightObject.mPosition[1]);
};

DragSelector.prototype.mouseInIcon = function (mouseX, mouseY) {
    var pos = this.icon.getXform().getPosition();
    console.log(pos);
    return gGuiBase.DirectManipulationSupport.mouseInBound(mouseX, mouseY,
        pos[0], pos[1], 
        this.LIGHT_ICON_SIZE);
};