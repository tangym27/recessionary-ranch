// Player Variables


class Animal {
  // Players have a default speed, do not carry a water can, and will grow potatoes
  constructor(arraySetLeft, arraySetRight, minY, maxY) {
    this.x = random(30,34) ;
    this.minX = random(27, 30);
    this.maxX = random(34,37);
    this.y = random(minY,maxY) ;
    this.minY = minY;
    this.maxY = maxY;
    this.speed = random(0.01,0.05);
    this.ySpeed = random(0.01,0.05);
    this.arraySetLeft = arraySetLeft;
    this.arraySetRight = arraySetRight;

    if (random([1,2]) == 1){
      this.speed *= -1;
    }
    // Character tileset has three images in each direction.
    // Offset allows us to fluctuate between all three to mimic the animation of walking
    this.graphicOffset = 0;


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

    if (this.y <= this.minY){
      this.y = this.minY + .1;
      this.ySpeed *= -1;
    }

    if (this.y >= this.maxY){
      this.y = this.maxY - .1;
      this.ySpeed *= -1;
    }

    if (this.speed > 0){
      this.direction = "right"
    } else {
      this.direction = "left";
    }

    if (this.direction == "left"){
      this.graphic = this.arraySetLeft[int(this.graphicOffset)];

    } else if (this.direction == "right"){
      this.graphic = this.arraySetRight[int(this.graphicOffset)];
    }

    this.graphicOffset+= .3;
    if (this.graphicOffset >= 3) {
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
    let temp = new Animal([5,6,7,8], [13,14,15,16], 1.5, 4.5);
    animals.push(temp);
  }
  for (let x = 0; x < 30; x++) {
    let temp = new Animal([9,10,11,12], [1,2,3,4], 5.5, 7.9);
    animals.push(temp);
  }
}

// Show off the booths
function displayAnimals() {
  for (animal of animals) {
    animal.moveAndDisplay();
  }
}
