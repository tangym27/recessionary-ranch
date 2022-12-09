// Player Variables


class NPC {
  // Players have a default speed, do not carry a water can, and will grow potatoes
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(3,5) * random(.5,.8);
    // Character tileset has three images in each direction.
    // Offset allows us to fluctuate between all three to mimic the animation of walking
    this.graphicOffset = 0;
    this.on = false;
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

  moveAndDisplay() {
    this.computeSensors();

    if (this.y >= height){
      if (this.on){
        this.direction = "up";
      }
    }
    if (this.y <= height - 96){
      finishSelling(this.middleX, this.up + 32);
      this.on = false;
      this.direction = "down"
    }

    if (this.direction == "up"){
      this.y -= this.speed;
      this.graphic = [2, 6, 10][this.graphicOffset];
    } else if (this.direction == "down"){
      this.y += this.speed;
      this.graphic = [0, 4, 8][this.graphicOffset];
    }

    this.graphicOffset++;
    if (this.graphicOffset == 3) {
      this.graphicOffset = 0;
    }

    drawNPC(this.graphic, this.x, this.y);   
  }
}

let npcs = [];

// Configure booths setup
function setupNPC() {
  for (let x = 2; x < 6; x++) {
    let temp = new NPC(x * 32, height + 10);
    npcs.push(temp);
  }
}

// Show off the booths
function displayNPC() {
  for (npc of npcs) {
    npc.moveAndDisplay();
  }
}

function turnOnNPC(index){
  console.log(index);
  npcs[index].on = true;
}