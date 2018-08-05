function Clock(period) {
    this.period = period*60;
    this.cnt = 0;
}

Clock.prototype.update = function(){
    this.cnt += 1;
    if(this.cnt > this.period){
        this.cnt = 0;
    }
};


Clock.prototype.getTime = function(){
    return Math.ceil((this.period - this.cnt)/60);
};