// Player Variables


class Animal {
  // Players have a default speed, do not carry a water can, and will grow potatoes
  constructor() {
    this.x = random(30,34) ;
    this.minX = random(27, 30);
    this.maxX = random(34,37);
    this.y = random(2,8) ;
    this.speed = random(0.01,0.05);
    this.ySpeed = random(-0.03,0.03);

    if (random([1,2]) == 1){
      this.speed *= -1;
    }
    // Character tileset has three images in each direction.
    // Offset allows us to fluctuate between all three to mimic the animation of walking
    this.graphicOffset = 0;

    this.xNoiseOffset = random(0,500);
    this.yNoiseOffset = random(0,500);

  }
//     this.x = constrain(this.x + xMovement, 27, 37);

  moveAndDisplay() {
    this.x += this.speed;

    if (random(1,10) < 2){
      this.y += this.ySpeed;
    }
    

    if (this.x >= this.maxX){
      this.speed *= -1;
    }

    if (this.x <= this.minX){
      this.speed *= -1;
    }

    if (this.y >= 2){
      this.ySpeed *= -1;
    }

    if (this.y <= 8){
      this.ySpeed *= -1;
    }

    if (this.speed > 0){
      this.direction = "right"
    } else {
      this.direction = "left";
    }

    if (this.direction == "left"){
      this.graphic = [5, 6, 7, 8][this.graphicOffset];
    } else if (this.direction == "right"){
      this.graphic = [13,14,15,16][this.graphicOffset];
    }

    this.graphicOffset++;
    if (this.graphicOffset == 3) {
      this.graphicOffset = 0;
    }



    drawAnimals(this.graphic, this.x * tileSize, this.y * tileSize);   
  }
}

let animals = [];

// Configure booths setup
function setupAnimals() {
  noiseDetail(24);
  for (let x = 0; x < 30; x++) {
    let temp = new Animal();
    animals.push(temp);
  }
}

// Show off the booths
function displayAnimals() {
  for (animal of animals) {
    animal.moveAndDisplay();
  }
}
