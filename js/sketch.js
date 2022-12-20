let canvas;
let size = 640;
let currentTime = new Date().getTime();

// Inventory Variables
const seed_panel = document.getElementById("seed_panel");
const recipe_book = document.getElementById("recipe_book");
const cooked_inventory = document.getElementById("cooked_inventory");
const cant_cook = document.getElementById("cant_cook");
const cant_bake = document.getElementById("cant_bake");
const cant_sell = document.getElementById("cant_sell");
const no_seed = document.getElementById("no_seed");
const seeds = document.getElementById("seeds");

// Artwork Variables
let tilesetArtwork,
  cropsArtwork,
  foodArtwork,
  cloud,
  cowPic,
  milkPic,
  poopPic,
  bucketPic,
  NPCArtwork,
  chickenArtwork;

// Start Screen artwork variables
let carrotPic,
  lettucePic,
  potatoPic,
  pumpkinPic,
  strawberryPic,
  tomatoPic,
  watermelonPic;
let bakedPotatoPic,
  carrotCakePic,
  kebabPic,
  pumpkinPiePic,
  saladPic,
  sandwichPic,
  strawberryJamPic,
  slicedWatermelonPic;
let startScreenObjects = [];
let startScreenArt = [];

// Game State variables
let gameState, cowGameState;
// gameState can be startScreen, farming, cowGame, endCowGame

// Recipe Variables
let recipe, recipeName, canCook;

// Achievement Variables
let achieved = [false,false,false,false,false];
const cookedSet = new Set();

// cow game variables
let myCow;
let milks = [];
let poops = [];
let myBucket;

// soundFile variables
let mainBGM;
let cowBGM;
let mainBGMStart = false;
let cowBGMStart = false;

// Player inventory - increases when harvesting and decreases when cooking
let inventory = {
  'potatoes': 10,
  'tomatoes': 10,
  'lettuce': 10,
  'carrots': 10,
  'strawberries': 10,
  'watermelons': 10,
  'pumpkins': 10,
  'milk': 10,
};

let seedInventory = {
  potatoes: 5,
  tomatoes: 5,
  lettuce: 5,
  carrots: 5,
  strawberries: 5,
  watermelons: 5,
  pumpkins: 5,
  milk: 5,
};

let cookedInventory = {
  "baked potatoes": 1,
  "strawberry jam": 1,
  "sliced watermelons": 1,
  salad: 1,
  kebabs: 1,
  sandwich: 1,
  "pumpkin pie": 1,
  "carrot cake": 1,
};

function preload() {
  tilesetArtwork = loadImage("images/tileset2.png");
  NPCArtwork = loadImage("images/npc.png");
  characterArtwork = loadImage("images/character.png");
  foodArtwork = loadImage("images/food.png");
  chickenArtwork = loadImage("images/chicken_walk.png");
  cloud = loadImage("images/cloud.png");
  cowPic = loadImage("images/cow.png");
  milkPic = loadImage("images/milk.png");
  poopPic = loadImage("images/poop.png");
  bucketPic = loadImage("images/bucket.png");

  // start screen images
  carrotPic = loadImage("images/inventory_carrot.png");
  lettucePic = loadImage("images/inventory_lettuce.png");
  potatoPic = loadImage("images/inventory_potato.png");
  pumpkinPic = loadImage("images/inventory_pumpkin.png");
  strawberryPic = loadImage("images/inventory_strawberry.png");
  tomatoPic = loadImage("images/inventory_tomato.png");
  watermelonPic = loadImage("images/inventory_watermelon.png");

  bakedPotatoPic = loadImage("images/rb_bakedpotato.png");
  carrotCakePic = loadImage("images/rb_carrotcake.png");
  kebabPic = loadImage("images/rb_kebab.png");
  pumpkinPiePic = loadImage("images/rb_pumpkinpie.png");
  saladPic = loadImage("images/rb_salad.png");
  sandwichPic = loadImage("images/rb_sandwich.png");
  strawberryJamPic = loadImage("images/rb_strawberryjam.png");
  slicedWatermelonPic = loadImage("images/rb_watermelon.png");

  startScreenArt = [
    potatoPic,
    tomatoPic,
    lettucePic,
    carrotPic,
    strawberryPic,
    watermelonPic,
    pumpkinPic,
    milkPic,
    bakedPotatoPic,
    strawberryJamPic,
    slicedWatermelonPic,
    saladPic,
    kebabPic,
    sandwichPic,
    pumpkinPiePic,
    carrotCakePic,
  ];

  WebFont.load({
    google: { families: ["Grandstander:400"] },
  });
}

function setup() {
  canvas = createCanvas(size, size).id("canvas");
  canvas.parent("#game");
  background(0);

  // create our player
  player = new Player(width / 2, height / 2);

  // setup our configurations
  setupRecipes();

  // check for saved plants
  // if (localStorage.getItem('plantWorld')) {
  //   plantWorld = JSON.parse(localStorage.getItem('plantWorld'));
  // } else {
    setupPlantWorld();
  // }

  // grow plants based on time elapsed since last time played
  // if (localStorage.getItem('lastPlayed')) {
  //   let diff = currentTime - int(localStorage.getItem('lastPlayed'));
  //   let frames = (diff*60)/1000;
  //   for (plant of plantWorld) {
  //     if (plant.id > 5 && plant.id != 49 && plant.id != 51 && 
  //       plant.id != 24 && plant.id != 25 && plant.id != 26 && plant.id != 36) {
  //       plant.currentGrowth += frames;
  //     }
  //   }
  // }

  setupStoves();
  setupBooths();
  setupNPC();
  setupAnimals();

  // get any inventory/profit from previous play
  // if (localStorage.getItem('seedInventory')) {
  //   seedInventory = JSON.parse(localStorage.getItem('seedInventory'));
  // }
  // if (localStorage.getItem('cookedInventory')) {
  //   cookedInventory = JSON.parse(localStorage.getItem('cookedInventory'));
  // }
  if (localStorage.getItem('inventory')) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
  }
  if (localStorage.getItem('profit')) {
    profit = int(localStorage.getItem('profit'));
  }
  // if (localStorage.getItem('achieved')) {
  //   achieved = JSON.parse(localStorage.getItem('achieved'));
  // }

  // set up start screen
  for (let i = 0; i < 8; i++) {
    startScreenObjects.push(
      new StartScreenFood(
        50 + i * 75,
        120,
        startScreenArt[i],
        startScreenArt[i].width,
        startScreenArt[i].height
      )
    );
  }
  for (let i = 8; i < 16; i++) {
    startScreenObjects.push(
      new StartScreenFood(40 + (i - 8) * 72, 460, startScreenArt[i], 50, 50)
    );
  }
  gameState = "farming";
}

function draw() {
  clear();
  currentTime = new Date().getTime();

  if (gameState == "startScreen") {
    background(169, 227, 255);

    // text
    textAlign(LEFT);
    fill(0);
    textFont("Grandstander");
    textSize(45);
    text("The Recessionary Ranch", 65, 290);
    textSize(25);
    text("Click anywhere to begin farming!", 115, 350);

    // jittering images
    for (let i = 0; i < startScreenObjects.length; i++) {
      startScreenObjects[i].displayAndJitter();
    }
  } else if (gameState == "farming") {
    displayBackground();
    displayRecipes();
    displayStoves();
    displayInventory();
    displayBooths();
    displayNPC();
    displayAnimals();
    player.moveAndDisplay();

    // achievement popup windows
    if (profit >= 50 && achieved[0] == false) {
      document.getElementById("achievement0").classList.remove("hidden");
    }

    if (profit >= 100 && achieved[1] == false) {
      document.getElementById("achievement0").classList.add("hidden");
      document.getElementById("achievement1").classList.remove("hidden");
    }

    if (profit >= 500 && achieved[2] == false) {
      document.getElementById("achievement1").classList.add("hidden");
      document.getElementById("achievement2").classList.remove("hidden");
    }

    if (profit >= 1000 && achieved[3] == false) {
      document.getElementById("achievement2").classList.add("hidden");
      document.getElementById("achievement3").classList.remove("hidden");
    }

    if (cookedSet.size == 8 && achieved[4] == false) {
      document.getElementById("achievement4").classList.remove("hidden");
    }

    // check if cow game is over
    cowGameState = localStorage.getItem('cowGameOver');
    if (cowGameState=="true") {
      swapCanvasIframe();
      localStorage.setItem('cowGameOver', "false");
      localStorage.setItem("cowGameStarted", "true");
      inventory['milk'] += int(localStorage.getItem('cowGameBottles'));
      localStorage.setItem('cowGameBottles', 0);
    }

    // save state of game by setting localStorage
    localStorage.setItem('plantWorld', JSON.stringify(plantWorld));
    localStorage.setItem('seedInventory', JSON.stringify(seedInventory));
    localStorage.setItem('cookedInventory', JSON.stringify(cookedInventory));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('lastPlayed', currentTime);
    localStorage.setItem('profit', profit);
    localStorage.setItem('achieved', JSON.stringify(achieved));
  } 
}

// HTML interactions
function displayInventory() {
  // inventory
  document.getElementById("potatoes_inventory").innerHTML =
    inventory["potatoes"];
  document.getElementById("tomato_inventory").innerHTML = inventory["tomatoes"];
  document.getElementById("lettuce_inventory").innerHTML = inventory["lettuce"];
  document.getElementById("carrot_inventory").innerHTML = inventory["carrots"];
  document.getElementById("strawberry_inventory").innerHTML =
    inventory["strawberries"];
  document.getElementById("watermelon_inventory").innerHTML =
    inventory["watermelons"];
  document.getElementById("pumpkin_inventory").innerHTML =
    inventory["pumpkins"];
  document.getElementById("milk_inventory").innerHTML = inventory["milk"];

  // cooked inventory = dishes available to sell
  document.getElementById("baked_potatoes").innerHTML =
    cookedInventory["baked potatoes"];
  document.getElementById("strawberry_jam").innerHTML =
    cookedInventory["strawberry jam"];
  document.getElementById("sliced_watermelons").innerHTML =
    cookedInventory["sliced watermelons"];
  document.getElementById("salad").innerHTML = cookedInventory["salad"];
  document.getElementById("kebabs").innerHTML = cookedInventory["kebabs"];
  document.getElementById("sandwich").innerHTML = cookedInventory["sandwich"];
  document.getElementById("pumpkin_pie").innerHTML =
    cookedInventory["pumpkin pie"];
  document.getElementById("carrot_cake").innerHTML =
    cookedInventory["carrot cake"];

  // seed inventory
  document.getElementById("potatoes_seed_inventory").innerHTML =
    seedInventory["potatoes"];
  document.getElementById("tomatoes_seed_inventory").innerHTML =
    seedInventory["tomatoes"];
  document.getElementById("lettuce_seed_inventory").innerHTML =
    seedInventory["lettuce"];
  document.getElementById("carrots_seed_inventory").innerHTML =
    seedInventory["carrots"];
  document.getElementById("strawberries_seed_inventory").innerHTML =
    seedInventory["strawberries"];
  document.getElementById("watermelons_seed_inventory").innerHTML =
    seedInventory["watermelons"];
  document.getElementById("pumpkins_seed_inventory").innerHTML =
    seedInventory["pumpkins"];

  if (player.water) {
    document.getElementById("watering_can").innerHTML = "full";
  } else {
    document.getElementById("watering_can").innerHTML = "empty";
  }
  document.getElementById("profit").innerHTML = "$" + profit;
  document.getElementById("current_seed").innerHTML = player.currentSeed;
}

// From HTML button, check if something can be cooked based on inventory and stove availaibity
function cook(tempRecipe) {
  let recipe = getRecipe(tempRecipe);
  recipeName = tempRecipe;
  canCook = recipe.canCook(inventory);
  if (canCook) {
    let canBake = recipe.cook(inventory);
    cant_cook.classList.add("hidden");
    if (canBake) {
      recipe_book.classList.add("hidden");
      cant_cook.classList.add("hidden");
      cant_bake.classList.add("hidden");
    }
  } else {
    cant_cook.classList.remove("hidden");
    cant_bake.classList.add("hidden");
    return;
  }
}

// From HTML button, sell something based on table availability.
function sell(tempRecipe) {
  let recipe = getRecipe(tempRecipe);
  // if there's enough inventory of this recipe/dish
  let canSell = recipe.canSell();
  if (canSell) {
    let canBake = recipe.sell(inventory);
    // if the booth is empty
    if (canBake) {
      cant_sell.classList.add("hidden");
      cooked_inventory.classList.add("hidden");
    } else {
      cant_sell.classList.remove("hidden");
    }
  } else {
    // console.log("no inventory to sell");
    cant_sell.classList.remove("hidden");
    return;
  }
}

// User interactions - space for most interactions,
// p to visit seeds, escape for exiting out of achievement popups
function keyPressed() {
  if (key == " ") {
    player.process();
  }

  if (key == "p" && gameState == "farming") {
    if (seed_panel.classList.contains("hidden")) {
      seed_panel.classList.remove("hidden");
      recipe_book.classList.add("hidden");
      closeAchievement();
      closeNoSeeds();
    } else {
      seed_panel.classList.add("hidden");
    }
  }

  if (key == "Escape") {
    closeAchievement();
    closeNoSeeds();
  }

  if (key == "v") {
    swapCanvasIframe();
  }
}

// Start Screen says "Click anywhere to begin" -
// change to "farming" game state and scroll to bottom of page
function mousePressed() {
  if (gameState == "startScreen") {
    gameState = "farming";
    window.scrollTo(0, document.body.scrollHeight);
  }
}

// Shows off recipe book
function openMenu() {
  if (recipe_book.classList.contains("hidden")) {
    closeAchievement();
    closeNoSeeds();
    recipe_book.classList.remove("hidden");
    seed_panel.classList.add("hidden");
    cooked_inventory.classList.add("hidden");
  } else {
    recipe_book.classList.add("hidden");
    cant_cook.classList.add("hidden");
    cant_bake.classList.add("hidden");
  }
}

// Shows off cooked_inventory to sell
function openSellingMenu() {
  if (cooked_inventory.classList.contains("hidden")) {
    closeAchievement();
    closeNoSeeds();

    cant_sell.classList.add("hidden");
    recipe_book.classList.add("hidden");
    seed_panel.classList.add("hidden");
    cooked_inventory.classList.remove("hidden");
  } else {
    cooked_inventory.classList.add("hidden");
    recipe_book.classList.add("hidden");
    cant_cook.classList.add("hidden");
    cant_bake.classList.add("hidden");
    cant_sell.classList.add("hidden");
  }
}

// Closes achievement popups appropriately
function closeAchievement() {
  if (profit >= 50) {
    if (profit >= 1000) {
      document.getElementById("achievement3").classList.add("hidden");
      achieved[3] = true;
    } else if (profit >= 500) {
      document.getElementById("achievement2").classList.add("hidden");
      achieved[2] = true;
    } else if (profit >= 100) {
      document.getElementById("achievement1").classList.add("hidden");
      achieved[1] = true;
    }
    document.getElementById("achievement0").classList.add("hidden");
    achieved[0] = true;
  }

  if (cookedSet.size >= 8) {
    document.getElementById("achievement4").classList.add("hidden");
    achieved[4] = true;
  }
}

function closeNoSeeds() {
  if (!no_seed.classList.contains("hidden")) {
    no_seed.classList.add("hidden");
  }
}

// switches between the farming game canvas and VR iframe
function swapCanvasIframe() {
  if (document.getElementById("canvas").classList.contains("hidden")) {
    document.getElementById("canvas").classList.remove("hidden");
    document.getElementById("vr").classList.add("hidden");
  } else {
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("vr").classList.remove("hidden");
  }
}

class StartScreenFood {
  constructor(x, y, pic, width, height) {
    this.x = x;
    this.y = y;
    this.origX = x;
    this.origY = y + int(random(-9, 9));
    this.pic = pic;
    this.width = width;
    this.height = height;
  }
  displayAndJitter() {
    image(this.pic, this.x, this.y, this.width, this.height);

    if (this.goingUp) {
      this.y += 0.5;
    } else {
      this.y -= 0.5;
    }
    if (this.y > this.origY + 10) {
      this.goingUp = false;
    }
    if (this.y < this.origY - 10) {
      this.goingUp = true;
    }
  }
}

let offsetX = 0;
let offsetY = 0;

function requestSlide(direction, speed) {

  if (direction == "left") {
    // no need to slide if the player is on the left side of the screen
    if (player.x < width/2) {
      return false;
    }
    // compute the x position of the right-most tile in our level
    let rightMostX = plantWorld[0].length * tileSize + offsetX;
    // if that position is off the right edge of the screen then we need to slide
    if (rightMostX > width) {
      offsetX -= speed;
      return true;
    }
    // otherwise we have reached the end of the world - no more sliding
    return false;
  }
  if (direction == "right") {
    // no need to slide if the player is on the right side of the screen
    if (player.x > width/2) {
      return false;
    }
    // compute the x position of the left-most tile in our level
    let leftMostX = 0 + offsetX;
    // if that position is off the left edge of the screen then we need to slide
    if (leftMostX < 0) {
      offsetX += speed;
      return true;
    }
    // otherwise we have reached the end of the world - no more sliding
    return false;
  }

// left becomes up
  if (direction == "up") {
    // no need to slide if the player is on the left side of the screen
    if (player.y < height/2) {
      return false;
    }
    // compute the x position of the right-most tile in our level
    let bottomMostY = plantWorld.length * tileSize + offsetY;
    // if that position is off the right edge of the screen then we need to slide
    if (bottomMostY > height) {
      offsetY -= speed;
      return true;
    }
    // otherwise we have reached the end of the world - no more sliding
    return false;
  }
  if (direction == "down") {
    // no need to slide if the player is on the bottom side of the screen
    if (player.y > height/2) {
      return false;
    }
    // compute the x position of the left-most tile in our level
    let topMostY = 0 + offsetY;
    // if that position is off the left edge of the screen then we need to slide
    if (topMostY < 0) {
      offsetY += speed;
      return true;
    }
    // otherwise we have reached the end of the world - no more sliding
    return false;
  }

  return false;
}
