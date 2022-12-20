// Track all available booths in an array of Booth objects
let booths = [];

class Booth {
  // constructor for Booth object
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
    cookedInventory[this.recipe.name]--;
    profit += this.recipe.price;
  }

  // Reset booth settings
  turnOff() {
    this.on = false;
  }

  // Show development of selling
  displaySellingProgress() {
    drawRecipe(this.recipe.id, this.x * tileSize, this.y * tileSize, 1);
  }
}

// Configure booths setup
function setupBooths() {
  for (let x = 32; x < 39; x++) {
    let temp = new Booth(x, 32);
    booths.push(temp);
  }
}

// Show off the booths
function displayBooths() {
  for (booth of booths) {
    if (booth.on) {
      booth.displaySellingProgress();
    }
  }
}

// Allow for selling based on booth
function sellOnBooth(recipe) {
  let boothNum = constrain(int(map(player.x + offsetX, -276, -276 + (tileSize * 7), 0, 7)), 0, 7);
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
  let boothNum = constrain(int(screenX / 32) - 32, 0, 6);
  if (booths[boothNum].on) {
    booths[boothNum].turnOff();
  }
}
