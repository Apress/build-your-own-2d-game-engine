"use strict";

function MinionFactory(pf, paths) {
	this.pf = pf;
	this.graph = pf.graph;
	this.minions = pf.minions;

	this.spawnMode = MinionFactory.SpawnMode.entireBorder;
	this.spawnPointCount = paths;
	this.spawnWait = 1;
	this.spawnPoints = [];
	
	this.waveComposition = [
		[1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 3, 3, 3, 3, 3],
		[1, 1, 1, 3, 3, 3, 2, 2, 2],
		[2, 3, 2, 3, 2, 3, 2, 3, 2, 3],
		[1, 1, 1, 1, 4, 4],
		[2, 2, 3, 3, 2, 3, 4, 3, 2, 2, 3],
		[4, 4, 4, 4, 4],
		[2, 2, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 2, 2, 4]
	];

	this.wave = 0;
	this.start = false;
	this.waveCompleted = true;
	this.timer = 0;
};

MinionFactory.SpawnMode = Object.freeze({
	entireBorder: 0,
	specificPoints: 1
});

MinionFactory.prototype.reduceSpawnPossibilities = function(args) {
	this.spawnMode = MinionFactory.SpawnMode.specificPoints;
	this.spawnPointPossibilities = args;
};

MinionFactory.prototype.update = function(dt) {
	if(gEngine.Input.isKeyClicked(gEngine.Input.keys.N))
		this.startWave();

	if(this.waveComposition.length > 0 && this.waveComposition.length > this.wave) {
		if(this.waveComposition[this.wave] !== null && this.waveComposition[this.wave].length === 0) {
			this.start = false;
			++this.wave;
		}
	} else {
		this.pf.allWavesSpawned = true;
		console.log("All Waves completed");
	}

	if(!this.start) {
		if(!this.waveCompleted && this.minions.size() === 0) {
			gEngine.AudioClips.playACue("assets/audio/gem.ogg");
			this.waveCompleted = true;
			this.pf.onWaveCompleted(this.wave);
		}

		return;
	}

	this.timer += dt;

	if (this.timer >= this.spawnWait && this.waveComposition.length > 0 && this.waveComposition.length >= this.wave) {
		if (this.waveComposition[this.wave] !== null && this.waveComposition[this.wave].length > 0) {
			this.spawn(this.waveComposition[this.wave][0])
			this.waveComposition[this.wave].shift();
			this.timer = 0;
		}
	}
};

MinionFactory.prototype.startWave = function() {
	this.start = true;
	this.waveCompleted = false;
	this.spawnPoints = [];
	var holeNumbers = [];

	if(this.spawnMode == MinionFactory.SpawnMode.entireBorder) {
		for(var i = 0; i < this.spawnPointCount; ++i) {
			var n = Math.floor(Math.random() * ((this.pf.gWidth + this.pf.gHeight - 2) * 2 - i));

			for(var j = 0; j < i; ++j) {
				if(n >= holeNumbers[j])
					++n;
			}

			holeNumbers.push(n);
		}

		for(var i = 0; i < holeNumbers.length; ++i) {
			var n = holeNumbers[i];

			if(n < this.pf.gWidth) {
				this.spawnPoints.push([n, 0]);
				continue;
			}

			n -= this.pf.gWidth;

			if(n < this.pf.gWidth) {
				this.spawnPoints.push([n, this.pf.gHeight - 1]);
				continue;
			}

			n -= this.pf.gWidth;

			if(n < this.pf.gHeight - 2) {
				this.spawnPoints.push([0, n + 1]);
				continue;
			}

			n -= this.pf.gHeight - 2;
			this.spawnPoints.push([this.pf.gWidth - 1, n + 1]);
		}
	} else if(this.spawnMode == MinionFactory.SpawnMode.specificPoints) {
		for(var i = 0; i < this.spawnPointCount; ++i) {
			var n = Math.floor(Math.random() * (this.spawnPointPossibilities.length - i));

			for(var j = 0; j < i; ++j) {
				if(n >= holeNumbers[j])
					++n;
			}

			holeNumbers.push(n);
		}

		for(var i = 0; i < holeNumbers.length; ++i)
			this.spawnPoints.push(this.spawnPointPossibilities[holeNumbers[i]]);
	}
};

MinionFactory.prototype.spawn = function(type) {
	var newMinion = new Minion(this.pf, this.spawnPoints[Math.floor(Math.random() * this.spawnPointCount)]);
	console.log("type: " + type);

	switch(type) {
	case 2:
		newMinion.mSpeed = 20;
		newMinion.mHealth = 75;
		break;

	case 3:
		newMinion.mSpeed = 5;
		newMinion.mHealth = 150;
		break;

	case 4:
		newMinion.mSpeed = 18;
		newMinion.mHealth = 150;
		break;
	}
	newMinion.changeColor(type);
	newMinion.mHealth *= Math.pow(1.2, this.wave);
	this.minions.addToSet(newMinion);
};
