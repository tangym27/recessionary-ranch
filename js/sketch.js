let canvas;

// Inventory Variables
const seed_panel = document.getElementById("seed_panel");
const recipe_book = document.getElementById("recipe_book");
const cooked_inventory = document.getElementById("cooked_inventory");
const cant_cook = document.getElementById("cant_cook");
const cant_bake = document.getElementById("cant_bake");
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
  NPCArtwork;

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
let achievement1 = false;
let achievement2 = false;
let achievement3 = false;
let achievement4 = false;
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
  potatoes: 10,
  tomatoes: 10,
  lettuce: 10,
  carrots: 10,
  strawberries: 10,
  watermelons: 10,
  pumpkins: 10,
  milk: 10,
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
  canvas = createCanvas(640, 640).id("canvas");
  canvas.parent("#game");
  background(0);

  // create our player
  player = new Player(width / 2, height / 2);

  // setup our configurations
  setupRecipes();
  setupPlantWorld();
  setupStoves();
  setupBooths();
  setupNPC();

  // setting up cow game
  cowGameState = false;
  myCow = new Cow(10, 10);
  myBucket = new Bucket(300, 580);
  for (let i = 0; i < 10; i++) {
    milks.push(new Milk());
  }
  for (let i = 0; i < 20; i++) {
    poops.push(new Poop());
  }

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
    player.moveAndDisplay();

    // achievement popup windows
    if (profit >= 100 && achievement1 == false) {
      document.getElementById("achievement1").classList.remove("hidden");
    }

    if (profit >= 100 && achievement2 == false) {
      document.getElementById("achievement1").classList.add("hidden");
      document.getElementById("achievement2").classList.remove("hidden");
    }

    if (profit >= 500 && achievement3 == false) {
      document.getElementById("achievement2").classList.add("hidden");
      document.getElementById("achievement3").classList.remove("hidden");
    }

    if (cookedSet.size == 8 && achievement4 == false) {
      document.getElementById("achievement4").classList.remove("hidden");
    }
  } else if (gameState == "cowGame") {
    image(cloud, 0, 0);
    cowGameStart();
  } else if (gameState == "endCowGame") {
    cowGameEnd();
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

  // cooked inventory
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
  // TODO: error message if you can't sell something bc inventory or space
  let canSell = recipe.canSell();
  if (canSell) {
    cooked_inventory.classList.add("hidden");
    let canBake = recipe.sell(inventory);
  } else {
    console.log("no inventory to sell");
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
    } else {
      seed_panel.classList.add("hidden");
    }
  }

  if (key == "Escape") {
    closeAchievement();
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
    recipe_book.classList.remove("hidden");
    seed_panel.classList.add("hidden");
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
    recipe_book.classList.add("hidden");
    seed_panel.classList.add("hidden");
    cooked_inventory.classList.remove("hidden");
  } else {
    cooked_inventory.classList.add("hidden");
    recipe_book.classList.add("hidden");
    cant_cook.classList.add("hidden");
    cant_bake.classList.add("hidden");
  }
}

// Closes achievement popups appropriately
function closeAchievement() {
  if (profit >= 10) {
    if (profit >= 200) {
      document.getElementById("achievement3").classList.add("hidden");
      achievement3 = true;
    } else if (profit >= 100) {
      document.getElementById("achievement2").classList.add("hidden");
      achievement2 = true;
    }
    document.getElementById("achievement1").classList.add("hidden");
    achievement1 = true;
  }
  if (cookedSet.size >= 8) {
    document.getElementById("achievement4").classList.add("hidden");
    achievement4 = true;
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
