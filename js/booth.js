// Track all available booths in an array of Booth objects
let booths = [];

class Booth {
  // constructor for Booth object with progress tracking how selled something is
  constructor(x, y) {
    this.on = false;
    this.x = x;
    this.y = y;
    this.id = 52;
  }

  // sells a recipe and marks the booth as used
  sell(recipe) {
    this.on = true;
    this.recipe = recipe;
  }

  // Reset booth settings
  turnOff() {
    this.on = false;
    profit += this.recipe.price;
    cookedInventory[this.recipe.name]--;
  }

  // Show development of selling
  displaySellingProgress() {
    drawRecipe(this.recipe.id, this.x * tileSize, this.y * tileSize, 1);
  }
}

// Configure booths setup
function setupBooths() {
  for (let x = 2; x < 6; x++) {
    let temp = new Booth(x, 16);
    booths.push(temp);
  }
}

// Show off the booths
function displayBooths() {
  for (booth of booths) {
    drawTile(booth.id, booth.x * tileSize, booth.y * tileSize);
    if (booth.on) {
      booth.displaySellingProgress();
    }
  }
}

// Allow for cokoking based on recipe
function sellOnBooth(recipe) {
  let boothNum = constrain(int(map(player.x, 48, 180, 0, 4)), 0, 3);

  let booth = booths[boothNum];
  turnOnNPC(boothNum);
  if (booth.on) {
    return false;
  } else {
    booth.sell(recipe);
    return true;
  }
}

function finishSelling(screenX, screenY) {
  let boothNum = int(screenX / 32) - 2;
  if (booths[boothNum].on) {
    booths[boothNum].turnOff();
  }
}
