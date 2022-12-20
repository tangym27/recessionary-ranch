// Player Variables
let player;
let playerId = 4;
let profit = 50;

class Player {
  // Players have a default speed, do not carry a water can, and will grow potatoes
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.water = false;
    this.currentSeed = "potatoes";
    // Character tileset has three images in each direction.
    // Offset allows us to fluctuate between all three to mimic the animation of walking
    this.graphicOffset = 0;
  }

  // Code from class - finds surround X and Y points
  computeSensors() {
    this.middleX = int(this.x + tileSize / 2);
    this.middleY = int(this.y + tileSize / 2);
    this.left = int(this.x - 2);
    this.right = int(this.x + tileSize + 2);
    this.up = int(this.y - 2);
    this.down = int(this.y + tileSize + 2);
  }

  // Based on which way the player faces and the id/value of the tile, act accordingly
  process() {
    this.computeSensors();

    switch (this.direction) {
      case "up":
        switch (getState(this.middleX, this.up)) {
          case "dirt":
            setPlant(this.middleX, this.up);
            break;
          case "plant":
            checkPlant(this.middleX, this.up);
            break;
          case "water":
            this.water = true;
            break;
          case "food":
            finishCooking(this.middleX, this.up);
            break;
          case "stove":
            openMenu();
            break;
          case "sale":
            processSale();
            break;
          case "seedSale":
            processSeedSale();
            break;
          case "sellRecipe":
            openSellingMenu();
            break;
          case "cow":
            // gameState = "cowGame";
            player.y = player.y + tileSize;
            this.graphic = [0, 4, 8][this.graphicOffset];
            this.direction = "down";
            swapCanvasIframe();
            break;
        }
        break;
      case "down":
        switch (getState(this.middleX, this.down)) {
          case "dirt":
            setPlant(this.middleX, this.down);
            break;
          case "plant":
            checkPlant(this.middleX, this.down);
            break;
          case "water":
            this.water = true;
            break;
          case "food":
            finishCooking(this.middleX, this.down);
            break;
          case "stove":
            openMenu();
            break;
          case "sale":
            break;
          case "seedSale":
            processSeedSale();
            break;
          case "sellRecipe":
            openSellingMenu();
            break;
          case "cow":
            // gameState = "cowGame";
            player.y = player.y - tileSize;
            this.graphic = [2, 6, 10][this.graphicOffset];
            this.direction = "up";
            swapCanvasIframe();
            break;
        }
        break;
      case "left":
        switch (getState(this.left, this.middleY)) {
          case "dirt":
            setPlant(this.left, this.middleY);
            break;
          case "plant":
            checkPlant(this.left, this.middleY);
            break;
          case "water":
            this.water = true;
            break;
          case "food":
            finishCooking(this.left, this.middleY);
            break;
          case "stove":
            openMenu();
            break;
          case "sale":
            break;
          case "seedSale":
            processSeedSale();
            break;
          case "sellRecipe":
            openSellingMenu();
            break;
          case "cow":
            // gameState = "cowGame";
            player.x = player.x - tileSize;
            this.graphic = [3, 7, 11][this.graphicOffset];
            this.direction = "left";
            swapCanvasIframe();
            break;
        }
        break;
      case "right":
        switch (getState(this.right, this.middleY)) {
          case "dirt":
            setPlant(this.right, this.middleY);
            break;
          case "plant":
            checkPlant(this.right, this.middleY);
            break;
          case "water":
            this.water = true;
            break;
          case "food":
            finishCooking(this.right, this.middleY);
            break;
          case "stove":
            openMenu();
            break;
          case "sale":
            break;
          case "seedSale":
            processSeedSale();
            break;
          case "sellRecipe":
            openSellingMenu();
            break;
          case "cow":
            // gameState = "cowGame";
            player.x = player.x - 5;
            this.graphic = [3, 7, 11][this.graphicOffset];
            this.direction = "left";
            swapCanvasIframe();
            break;
        }
        break;
    }
  }

  moveAndDisplay() {  
    this.computeSensors();

    // Right
    if (keyIsDown(68)) {
      let id = getTileAtPosition(this.right, this.middleY);
      if (
        getState(this.right, this.middleY) == "walk" &&
        this.x < width - tileSize
      ) {
        var slideStatus = requestSlide("left", this.speed);
        if (!slideStatus) {
          // move
          this.x += this.speed;
        }
      }
      // Fluctuate between the three up images to mimic animation
      this.graphic = [1, 5, 9][this.graphicOffset];
      this.direction = "right";
    }
    // Left
    if (keyIsDown(65)) {
      let id = getTileAtPosition(this.left, this.middleY);

      if (getState(this.left, this.middleY) == "walk" && this.x > 0) {
        var slideStatus = requestSlide("right", this.speed);
        if (!slideStatus) {
          this.x -= this.speed;
        }
      }
      this.graphic = [3, 7, 11][this.graphicOffset];
      this.direction = "left";
    }
    // Up
    if (keyIsDown(87)) {
      if (getState(this.middleX, this.up) == "walk" && this.y > 0) {

        var slideStatus = requestSlide("down", this.speed);
        if (!slideStatus) {
          this.y -= this.speed;
        }

      }
      this.graphic = [2, 6, 10][this.graphicOffset];
      this.direction = "up";
    }
    // Down
    if (keyIsDown(83)) {
      let id = getTileAtPosition(this.middleX, this.down);
      if (
        getState(this.middleX, this.down) == "walk" &&
        this.y < height - (tileSize + this.speed)
      ) {
        var slideStatus = requestSlide("up", this.speed);
        if (!slideStatus) {
          this.y += this.speed;
        }

      }
      this.graphic = [0, 4, 8][this.graphicOffset];
      this.direction = "down";
    }

    this.graphicOffset++;
    if (this.graphicOffset == 3) {
      this.graphicOffset = 0;
    }

    drawPlayer(this.graphic, this.x, this.y);

    // Close recipe book when out of range of the stoves
    // if (this.y < 80 || this.y > 110 || this.x < 40 || this.x > 180) {
    //   recipe_book.classList.add("hidden");
    //   cant_cook.classList.add("hidden");
    //   cant_bake.classList.add("hidden");
    // }
  }
}

// From the HTML buttons, update what a player grows
function setPlayerSeed(seed) {
  player.currentSeed = seed;
  seed_panel.classList.add("hidden");
}

function processSale() {
  if (profit >= 20) {
    let plotIndex = Math.round((player.x - offsetX) / 32);
    let plotRange = Math.round((player.y - offsetY) / 32);
    let numPlots = 6;
    for (let i = numPlots; i > 1; i--) {
      plantWorld[plotRange - i][plotIndex].id = 12;
    }
    plantWorld[plotRange - 1][plotIndex].id = 3;
    profit -= 20;
  } else {
    // console.log("Not enough money!");
  }
}
let soldCrop = undefined;

function processSeedSale() {
  if (soldCrop == undefined){
    return;
  }
  if (profit >= 1) {
    seedInventory[soldCrop]++
    profit -= 1;
  } else {
    // console.log("Not enough money!");
  }
}

function setSeedSale(cropName){
  soldCrop = cropName
}