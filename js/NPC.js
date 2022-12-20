let npcIds = [0,12,24,2,14,26];
let npcs = [];
let fakeNpcs = [];

class NPC {
  // NPC can move up and down and imageFactor tracks their graphic (one of seven ppl)
  constructor(x, y, imageFactor) {
    this.x = x;
    this.y = y;
    this.speed = random(3,5) * random(.5,.8);
    if (imageFactor == undefined){
      this.imageFactor = random(npcIds);
    } else {
      this.imageFactor = imageFactor
    }
    // NPC tileset has three images in each direction.
    // Offset allows us to fluctuate between all three to mimic the animation of walking
    this.graphicOffset = 0;
    this.graphic = this.imageFactor;
    this.on = false;
  }

  // Code from class - finds surround X and Y points
  computeSensors() {
    this.middleX = int(this.x + tileSize / 2);
    this.middleY = int(this.y + tileSize / 2);
    this.up = int(this.y - 2);
    this.down = int(this.y + tileSize + 2);
  }

  // moving npcs
  moveAndDisplay() {
    this.computeSensors();

    if (this.y >= plantWorld.length * tileSize){
      if (this.on){
        this.direction = "up";
      } else {
        this.y = (plantWorld.length + 1)* tileSize;
        this.imageFactor = random([0,12,24,2,14,26]);
      }
    }

    // buy item
    if (this.y <= plantWorld.length * tileSize - (tileSize * 7)){
      finishSelling(this.middleX, this.up + tileSize);
      this.on = false;
      this.direction = "down"
    }

    if (this.direction == "up"){
      this.y -= this.speed;
      this.graphic = [1 + this.imageFactor, 5 + this.imageFactor, 9 + this.imageFactor][this.graphicOffset];
    } else if (this.direction == "down"){

      this.y += this.speed;
      this.graphic = [0 + this.imageFactor, 4 + this.imageFactor, 8 + this.imageFactor][this.graphicOffset];
    }

    this.graphicOffset++;
    if (this.graphicOffset == 3) {
      this.graphicOffset = 0;
    }

    drawNPC(this.graphic, this.x, this.y);   
  }

  // non-moving npc
  display(){
    drawNPC(this.graphic, this.x, this.y);   
  }
}

// Configure npc setup
function setupNPC() {
  for (let x = 32; x < 39; x++) {
    let temp = new NPC(x * tileSize, (plantWorld.length + 1) * tileSize);
    npcs.push(temp);
  }
  for (let x = 23; x < 30; x++) {
    let temp = new NPC(x * tileSize, (plantWorld.length + 1) * tileSize - 190, npcIds[x-23]);
    fakeNpcs.push(temp);
  }
}

// Show off the npc
function displayNPC() {
  for (npc of npcs) {
    npc.moveAndDisplay();
  }
  for (npc of fakeNpcs){
    npc.display();

  }
}

function turnOnNPC(index){
  npcs[index].on = true;
}