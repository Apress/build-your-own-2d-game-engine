class HPBar {
    constructor(height, width, lineWidth, centerX, centerY) {
        this._height = height;
        this._width = width;
        this._lineWidth = lineWidth;
        this._centerX = centerX;
        this._centerY = centerY;

        this.BlackBar = new Renderable();
        this.BlackBar.setColor([0, 0, 0, 1]);
        this.GreenBar = new Renderable();
        this.GreenBar.setColor([161 / 255, 196 / 255, 90 / 255, 1]);
        this.HPBar = new Renderable();
        this.HPBar.setColor(_C.HPColor);

        this.HPPercent = 1.0;

        this.computeBackgroundXform();
    }

    get height() {
        return this._height;
    }

    set height(v) {
        this._height = v;
        this.computeBackgroundXform();
    }

    get width() {
        return this._width;
    }

    set width(v) {
        this._width = v;
        this.computeBackgroundXform();
    }

    computeBackgroundXform() {
        this.BlackBar.getXform().setPosition(this._centerX, this._centerY);
        this.BlackBar.getXform().setSize(this._width, this._height);

        this.GreenBar.getXform().setPosition(this._centerX, this._centerY);
        this.GreenBar.getXform().setSize(this._width - this._lineWidth * 2, this._height - this._lineWidth * 2);
    }

    computeHPXform() {
        const HPBarWidth = this._width * this._HPPercent;
        this.HPBar.getXform().setPosition(this._centerX + HPBarWidth / 2 - this._width / 2, this._centerY);
        this.HPBar.getXform().setSize(HPBarWidth - this._lineWidth * 2, this._height - this._lineWidth * 2);
    }

    get HPPercent() {
        return this._HPPercent;
    }

    set HPPercent(v) {
        console.assert(v <= 1.0);
        if (v < 0)
            v = 0;
        this._HPPercent = v;
        this.computeHPXform();
    }

    update() {
        this.computeHPXform();
    }

    draw(camera) {
        this.BlackBar.draw(camera);
        this.GreenBar.draw(camera);
        this.HPBar.draw(camera);
    }
}
