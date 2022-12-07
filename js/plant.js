class Plant {
  constructor(x, y, id) {
    this.arrayX = x;
    this.arrayY = y;
    // plants will grow every x frames
    this.growthTime = 500;
    this.currentGrowth = this.growthTime + 1;
    this.id = id;
    // Randomly set certain grasses to display flowers
    this.hasFlowers = int(random(1, 10));
    this.flowerId = random([1, 13, 14, 15, 16]);
    // tracks plant growing lifespan
    this.matured = false;
    this.seedPosition = -1;
  }

  setId(id) {
    // seeds only have 4 stages, at that point mark as matured
    if (this.seedPosition >= 4) {
      this.matured = true;
    } else {
      this.id = id;
    }
  }

  // setup to start growing including saving the seed and growing
  setSeed(id) {
    this.seedName = player.currentSeed;
    this.grow();
    this.currentGrowth = 0;
  }

  // update seed position and id/graphic based on growthTime
  grow() {
    this.seedPosition++;
    this.setId(crops[this.seedName][this.seedPosition]);
  }

  display() {
    if (this.seedPosition != -1 && this.currentGrowth >= this.growthTime) {
      // grow here.
      if (!this.matured) {
        this.grow();
      }
      this.currentGrowth = 0;
    }
    if (this.seedPosition >= 3) {
      this.matured = true;
    }
    this.currentGrowth++;
    if (this.seedPosition != -1) {
      drawTile(dirtId, this.arrayY * tileSize, this.arrayX * tileSize);
    }
    drawTile(this.id, this.arrayY * tileSize, this.arrayX * tileSize);
    // Randomly set certain grasses to display flowers
    if (this.id == 3 && this.hasFlowers > 7) {
      drawTile(this.flowerId, this.arrayY * tileSize, this.arrayX * tileSize);
    }
  }
}

// returns the plant object at a given position
function getPlant(screenX, screenY) {
  let arrayX = int(screenX / tileSize);
  let arrayY = int(screenY / tileSize);
  let p = plantWorld[arrayY][arrayX];
  return p;
}

// plants a seed if possible (checks if there is only dirt)
function setPlant(screenX, screenY) {
  let p = getPlant(screenX, screenY);
  if (p.id == dirtId && seedInventory[player.currentSeed] > 0) {
    seedInventory[player.currentSeed]--;
    p.setSeed(player.currentSeed);
  }
}

// interactions with a plant - harvesting/water
function checkPlant(screenX, screenY) {
  let p = getPlant(screenX, screenY);
  // harvest if possible - reset plant stats as well
  if (p.id == crops[p.seedName][4] || p.matured) {
    inventory[p.seedName]++;
    p.id = dirtId;
    p.seedPosition = -1;
    p.matured = false;
  } else if (player.water) {
    // water reduces remaining growth time by half
    let remainingTime = p.growthTime - p.currentGrowth;
    p.currentGrowth += remainingTime / 2;
    player.water = false;
  }
}
