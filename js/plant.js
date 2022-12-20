
class Plant {

  constructor(arrayX, arrayY, id, growthTime, currentGrowth, flowerId, hasFlowers, matured, seedPosition, seedName){
    if (growthTime == undefined){
      this.arrayX = arrayX;
      this.arrayY = arrayY;
      // plants will grow every x frames
      this.growthTime = 300;
      this.currentGrowth = this.growthTime + 1;
      this.id = id;
      // Randomly set certain grasses to display flowers
      this.hasFlowers = int(random(1, 10));
      this.flowerId = random([1, 13, 14, 15, 16]);
      // tracks plant growing lifespan
      this.matured = false;
      this.seedPosition = -1;
    } else {
      this.arrayX = arrayX;
      this.arrayY = arrayY;
  
      this.growthTime = growthTime;
      this.currentGrowth = currentGrowth;
      this.id = id;
      // Randomly set certain grasses to display flowers
      this.hasFlowers = hasFlowers;
      this.flowerId = flowerId;
      // tracks plant growing lifespan
      this.matured = matured;
      this.seedPosition = seedPosition;
      this.seedName = seedName;
  
    }  
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
    while (this.seedPosition != -1 && this.currentGrowth >= this.growthTime) {
      if (this.seedPosition >= 3) {
        this.matured = true;
      }
      // grow here.
      if (!this.matured) {
        this.grow();
      }
      this.currentGrowth -= this.growthTime;
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
  screenX -= offsetX;
  screenY -= offsetY;
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
  } else if (seedInventory[player.currentSeed] <= 0) {
    no_seed.classList.remove("hidden");
    document.getElementById("no_seeds").innerHTML = player.currentSeed;
  }
}

// interactions with a plant - harvesting/water
function checkPlant(screenX, screenY) {
  let p = getPlant(screenX, screenY);
  // harvest if possible - reset plant stats as well
  if (crops[p.seedName] != undefined && p.id == crops[p.seedName][4] || p.matured) {
    inventory[p.seedName]++;
    p.id = dirtId;
    p.seedPosition = -1;
    p.matured = false;
  } else if (player.water) {
    // water reduces remaining growth time by half
    let remainingTime = p.growthTime - p.currentGrowth;
    p.currentGrowth += remainingTime / 2;
    player.water -= 1;
  } else if (crops[p.seedName] == undefined){
    console.log(p.seedName + " is not a crop");
  }
}
