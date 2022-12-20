// Display-related constants frequently used
let tileSize = 32;
let dirtId = 12;

// background layer - all grass
let bkworld = new Array(41).fill(new Array(41).fill(0));

// middle layer - dirt, water, fences, etc.
let world = [
  [78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77, 77, 77],
  [77, 101, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 102, 81, 81, 81, 81,3,101, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93,93,93,93, 93, 93, 102, 77],
  [77, 91, 3,37, 37, 37, 37, 37, 37, 37, 37, 3, 103, 81, 81, 81, 81,3, 91, 3, 3, 3, 3, 3, 3, 3, 103, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 103, 77],
  [77, 91, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 103, 81, 81, 81, 81,3, 91, 3, 79, 79, 79, 79, 79, 3, 103, 3, 3, 3, 3, 3, 3,3, 3, 3, 3, 3, 103, 78],
  [78, 91, 3, 3, 38, 38, 38, 38, 38, 38, 3, 3,  103, 81, 81, 81,81, 3, 91, 3, 79, 123, 124, 125, 79, 3, 103, 3, 3, 3, 3 ,3, 3, 3, 3, 3, 3, 3, 103, 77],
  [77, 91, 3, 3, 48, 48, 48, 48, 48, 48, 3,  3, 103, 81, 81, 81,81, 3, 91, 3, 79, 135, 136, 137, 79, 3, 103, 3, 3, 3, 3,3, 3, 3, 3, 3, 3, 3, 103, 77],
  [77, 91, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,  103, 81, 81, 81, 81, 3, 91, 3, 3, 3, 3, 3, 3, 3, 103, 3, 3, 3, 3, 3, 3,3, 3, 3, 3, 3, 103, 77],
  [77, 91, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,  103, 81, 81, 81, 81, 3, 91, 3, 3, 3, 3, 3, 3, 3, 103, 3, 3, 3, 3, 3,3, 3, 3, 3, 3, 3, 103, 78],
  [78, 91, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 103, 81, 81, 81, 81, 3, 91, 3, 3, 3, 3, 3, 3, 3, 103, 3, 3, 3, 3,3, 3, 3, 3, 3, 3, 3, 103, 77],
  [77, 89, 93, 93, 93, 93,  3, 3, 93,93, 93, 93, 90, 81, 81, 81, 81, 3,89, 93, 93, 3, 3, 3, 93, 93, 115, 93, 93, 93, 93,93,93,93,93, 93, 93, 93, 90, 77],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [78, 3, 3, 12, 12, 12, 3, 12, 12, 12, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 12, 12, 12, 3, 12, 12, 12, 3, 3, 12, 81, 81, 81, 12, 3, 12, 81, 81, 81, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 81, 3, 3, 3, 3],
  [78, 3, 3, 12, 12, 12, 12, 12, 12, 12, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 12, 12, 12, 12, 12, 12, 12, 3, 3, 12, 81, 81, 81, 12, 3, 12, 81, 81, 81, 12, 3, 3, 3, 3, 3, 3, 27, 27, 27, 27, 27, 27, 27, 27, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3, 12, 3, 3, 3, 3, 3, 3, 3],
  [78, 3, 3, 12, 12, 12, 3, 12, 12, 12, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 12, 12, 12, 3, 12, 12, 12, 3, 3, 12, 81, 81, 81, 12, 3, 12, 81, 81, 81, 12, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 50, 50, 50, 50, 50, 50, 50, 50, 3, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 3, 3, 3, 3, 3],
  [78, 3, 3, 12, 12, 12, 12, 12, 12, 12, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 81, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 12, 12, 12, 12, 12, 12, 12, 3, 3, 12, 81, 81, 81, 12, 3, 12, 81, 81, 81, 12, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 3, 12, 12, 12, 12, 12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [78, 81, 81, 81, 81, 81, 81, 81, 3, 3, 3, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 101, 93, 93, 3, 3, 3, 3, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 93, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [77, 81, 81, 81, 81, 81, 81, 81, 3, 3, 3, 81, 81, 81, 81, 81, 81, 81, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 108, 109, 109, 109, 109, 109, 109, 109, 110, ],
  [78, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 120, 82, 82, 82, 82, 82, 82, 82, 122, 82, 82, 82, 82, 82, 82, 82, 82, 82],

  [77, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 120, 132, 132, 132, 132, 132, 132, 132, 122, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [78, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 81, 81, 81, 83, 108, 109, 109, 109, 109, 109, 109, 109, 110, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 81, 81, 81, 83, 120, 95, 95, 95, 95, 95, 95, 95, 122, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 3, 40, 40, 3, 81, 81, 81, 83, 120, 96, 97, 98, 99, 100, 111, 112, 122, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [78, 3, 3, 39, 39, 3, 3, 39, 39, 3, 3, 39, 39, 3, 3, 39, 39, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],
  [77, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 81, 81, 81, 83, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82],


];


// booths:  52, 52, 52, 52,
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
    let tempArray = new Array(22).fill(0);
    for (let j = 0; j < 19; j++) {
        tempArray.push(82);
    }
    for (let i = 30; i < 40; i++) {
        bkworld[i] = tempArray;
    }
    for (let y = 0; y < 41; y++) {
        for (let x = 0; x < 41; x++) {
            if (bkworld[y][x] == undefined) {
                let id = 3;
                drawTile(id, x * tileSize, y * tileSize);
            } else {
                let id = bkworld[y][x];
                drawTile(id, x * tileSize, y * tileSize);
            }
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

// drawing using the character tileset (all directions and mvmt of a player)
function drawAnimals(id, screenX, screenY) {
  push();
  translate(offsetX, offsetY);


  let tilesPerRow = int(chickenArtwork.width / tileSize);
  let imageX = int(id % tilesPerRow) * tileSize;
  let imageY = int(id / tilesPerRow) * tileSize;

  image(
      chickenArtwork,
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
let validIds = [3, 82, 122, 120, 108, 110]
// returns the program meaning behind an id
function getState(screenX, screenY) {
    let id = getTileAtPosition(screenX, screenY);
    if (validIds.includes(id)) {
        return "walk";
    } else if (id == 12) {
        return "dirt";
    } else if (id == 50 || id == 27) {
        return "water";
    } else if (id == 38) {
        return "food";
    } else if (id == 48) {
      console.log("a")
        return "stove";
    } else if (id == 135 || id ==  136 || id == 137) {
        return "cow";
    } else if (id == 39) {
        return "sale";
    } else if (id == 96) {
        setSeedSale("potatoes")
        return "seedSale";
    } else if (id == 97) {
        setSeedSale("tomatoes")
        return "seedSale";
    } else if (id == 98) {
        setSeedSale("lettuce")
        return "seedSale";
    } else if (id == 99) {
        setSeedSale("carrots")
        return "seedSale";
    } else if (id == 100) {
        setSeedSale("strawberries")
        return "seedSale";
    } else if (id == 111) {
        setSeedSale("watermelons")
        return "seedSale";
    } else if (id == 112) {
        setSeedSale("pumpkins")
        return "seedSale";
    } else if (id == 132) {
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