// Display-related constants frequently used
let tileSize = 32;
let dirtId = 12;

// background layer - all grass
let bkworld = [
  [, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 0,0, 0, 0, 0, 0, 0, 0, 0,0,0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 0,0, 0, 0, 0, 0, 0, 0,0,0,0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],


];

// middle layer - dirt, water, fences, etc.
let world = [
  [78,77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77,77, 77, 78,77],
  [77, 37, 3, 3, 3, 3, 3, 3, 37, 36, 3, 3, 3, 3,  81, 81, 3,3, 3, 3, 3],
  [77, 37, 3, 38, 38, 38, 38, 3, 37, 36, 3, 3, 3, 3, 81, 81, 3,3, 3, 3, 3],
  [77, 37, 3, 48, 48, 48, 48, 3, 37, 36, 3, 3, 3, 3, 81, 81, 91,3, 3, 3, 3],
  [78, 37, 3, 3, 3, 3, 3, 3, 37, 36, 3, 3, 3, 3, 81, 81, 91,3, 3, 3, 3],
  [77, 24,25, 26, 3, 3, 24, 25, 25, 26, 3, 3, 3, 3, 81, 81, 90,89, 89, 90,89,90,89, 90 ],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [78,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 51],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 51],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3],
  [78,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3],
  [78, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 39, 39, 3, 3, 39, 39, 3, 3],
  [77, 3, 3, 52, 52, 52, 52, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 27, 27, 27, 27, 27, 27, 27, 27, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3],
  [78,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [78,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [78,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

// dynamic layer - growing seed, plants, etc.
let plantWorld = [];

// from cropsArtwork, all the id of a growing crop
let crops = {
  potatoes: [11, 23, 35, 47, 59],
  strawberries: [10, 22, 34, 46, 58],
  tomatoes: [9, 21, 33, 45, 57],
  lettuce: [8, 20, 32, 44, 56],
  pumpkins: [7, 19, 31, 43, 55],
  watermelons: [6, 18, 30, 42, 54],
  carrots: [5, 17, 29, 41, 53],
};

let cropsList = Object.keys(crops);
// Show off all seeds.
function displayRecipes() {
  let first = ["potatoes", "strawberries", "tomatoes"];
  let second = ["lettuce", "pumpkins", "watermelons", "carrots"];
  for (let i = 0; i < 3; i++) {
    let r = crops[first[i]];
    // drawTile(r[2], 1, tileSize * i, 0.8);
  }
  for (let i = 0; i < 4; i++) {
    let r = crops[second[i]];
    // drawTile(r[2], tileSize * 7 + 3, tileSize * i, 0.8);
  }
}

// draw background
function displayBackground() {
  for (let y = 0; y < bkworld.length; y++) {
    for (let x = 0; x < bkworld[y].length; x++) {
      let id = bkworld[y][x];

      drawTile(id, x * tileSize, y * tileSize);
    }
  }
  drawWorld();
}

// fills dynamic array with plant objects
function setupPlantWorld() {
  for (let y = 0; y < world.length; y++) {
    let pCol = [];
    for (let x = 0; x < world[y].length; x++) {
      let id = world[y][x];
      // creating plant object to be able to update graphics for plants easily
      let p = new Plant(y, x, id);
      pCol.push(p);
    }
    plantWorld.push(pCol);
  }
}

// draws world with dynamic plant objects
// does not need to be offset bc it is called from something that already is
function drawWorld() {
  for (let y = 0; y < plantWorld.length; y++) {
    for (let x = 0; x < plantWorld[y].length; x++) {
      let p = plantWorld[y][x];
      p.display();
    }
  }
}

// drawing using the main tileset (background designs)
function drawTile(id, screenX, screenY, progress) {
  push();
  translate(offsetX, offsetY);
  if (progress == undefined) {
    progress = 1;
  }
  let tilesPerRow = int(tilesetArtwork.width / tileSize);
  let imageX = int(id % tilesPerRow) * tileSize;
  let imageY = int(id / tilesPerRow) * tileSize;

  image(
    tilesetArtwork,
    screenX,
    screenY,
    tileSize * progress,
    tileSize * progress,
    imageX,
    imageY,
    tileSize,
    tileSize
  );
  pop();

}

// drawing using the character tileset (all directions and mvmt of a player)
function drawPlayer(id, screenX, screenY) {


  let tilesPerRow = int(characterArtwork.width / tileSize);
  let imageX = int(id % tilesPerRow) * tileSize;
  let imageY = int(id / tilesPerRow) * tileSize;

  image(
    characterArtwork,
    screenX,
    screenY,
    tileSize,
    tileSize,
    imageX,
    imageY,
    tileSize,
    tileSize
  );


}

// drawing using the character tileset (all directions and mvmt of a player)
function drawNPC(id, screenX, screenY) {
  push();
  translate(offsetX, offsetY);


  let tilesPerRow = int(characterArtwork.width / tileSize);
  let imageX = int(id % tilesPerRow) * tileSize;
  let imageY = int(id / tilesPerRow) * tileSize;

  image(
    NPCArtwork,
    screenX,
    screenY,
    tileSize,
    tileSize,
    imageX,
    imageY,
    tileSize,
    tileSize
  );

  pop();


}

// drawing using the food tileset (progress represents how big the image is)
function drawRecipe(id, screenX, screenY, progress) {
  push();
  translate(offsetX, offsetY);

  let tilesPerRow = int(foodArtwork.width / tileSize);
  let imageX = int(id % tilesPerRow) * tileSize;
  let imageY = int(id / tilesPerRow) * tileSize;

  image(
    foodArtwork,
    screenX,
    screenY,
    tileSize * progress,
    tileSize * progress,
    imageX,
    imageY,
    tileSize,
    tileSize
  );
  pop();
}

// returns the program meaning behind an id
function getState(screenX, screenY) {
  let id = getTileAtPosition(screenX, screenY);
  if (id == 3) {
    return "walk";
  } else if (id == 12) {
    return "dirt";
  } else if (id == 50 || id == 27) {
    return "water";
  } else if (id == 38) {
    return "food";
  } else if (id == 48) {
    return "stove";
  } else if (id == 51) {
    return "cow";
  } else if (id == 39) {
    return "sale";
  } else if (id == 37) {
    return "seedSale";
  } else if (id == 52) {
    return "sellRecipe";
  } else if (id > 5 && id != 49 && id != 51 && id != 24 && id != 25 && id != 26 && id != 36) {
    return "plant";
  }
}

// returns the tile id given a position on the screen
function getTileAtPosition(screenX, screenY) {
  let arrayX = int((screenX - offsetX) / tileSize);
  let arrayY = int((screenY - offsetY) / tileSize);
  if (plantWorld[arrayY] != undefined && plantWorld[arrayY][arrayX] != undefined) {
    return plantWorld[arrayY][arrayX].id;
  }
  return -1;
}
