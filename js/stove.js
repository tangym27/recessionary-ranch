// Track all available stoves in an array of Stove objects
let stoves = [];

class Stove {
  // constructor for Stove object with progress tracking how cooked something is
  constructor(x, y) {
    this.on = false;
    this.id = 48;
    this.x = x;
    this.y = y;
    this.progress = 0.5;
  }

  // cooks a recipe and marks the stove as used
  cook(recipe) {
    this.on = true;
    this.id = 49;
    this.recipe = recipe;
    this.progress = 0.5;
  }

  // Reset stove settings
  turnOff() {
    this.on = false;
    this.id = 48;

    cookedSet.add(this.recipe.name);
    cookedInventory[this.recipe.name]++;
  }

  // Show development of cooking
  displayCookingProgress() {
    drawRecipe(
      this.recipe.id,
      this.x * tileSize,
      (this.y - 1) * tileSize,
      this.progress
    );
    this.progress += 0.005;
    if (this.progress > 1) this.progress = 1;
  }
}

// Configure stoves setup
function setupStoves() {
  for (let x = 2; x < 6; x++) {
    let temp = new Stove(x, 2);
    stoves.push(temp);
  }
}

// Show off the stoves
function displayStoves() {
  for (stove of stoves) {
    // drawTile(stove.id, stove.x * tileSize, stove.y * tileSize);
    if (stove.on) {
      stove.displayCookingProgress();
    }
  }
}

// Allow for cokoking based on recipe
function cookOnStove(recipe) {
  let stoveNum = constrain(int(map(player.x, 48, 180, 0, 4)), 0, 3);

  let stove = stoves[stoveNum];
  if (stove.on) {
    return false;
  } else {
    stove.cook(recipe);
    return true;
  }
}

function finishCooking(screenX, screenY) {
  let stoveNum = int(screenX / 32) - 2;
  if (stoves[stoveNum].on && stoves[stoveNum].progress >= 1) {
    stoves[stoveNum].turnOff();
  }
}
