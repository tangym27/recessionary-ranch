let milkPoint = 0;

class Cow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pic = cowPic;
  }
  displayAndMove() {
    image(this.pic, this.x, this.y);
  }
}

class Milk {
  constructor() {
    this.collected = false;
    this.pic = milkPic;
    this.x = random(40, 640);
    this.y = random(-1000, -100);
    this.speed = random(2, 5);
    this.noiseLocation = random(0, 1000);
  }
  displayAndMove() {
    if (this.collected == false) {
      this.y += this.speed;
      let moveAmount = map(noise(this.noiseLocation), 0, 1, -2, 2);
      this.x += moveAmount;
      this.noiseLocation += 0.01;
      this.x = constrain(this.x, 40, 600);
    }

    // if player collects milk
    let myBucketMidX = myBucket.x + myBucket.pic.width / 2;
    let myBucketMidY = myBucket.y + myBucket.pic.height / 2;
    let thisMidY = this.y + this.pic.height / 2;
    let thisMidX = this.x + this.pic.width / 2;
    if (dist(thisMidX, thisMidY, myBucketMidX, myBucketMidY) < 25) {
      milkPoint++;
      this.collected = true;
      this.x = -100;
      this.y = -100;
    }

    //if player doesnt collect
    if (this.y > height) {
      this.x = random(40, 640);
      this.y = random(-1000, -100);
      this.speed = random(2, 5);
      this.noiseLocation = random(0, 1000);
    }
    image(this.pic, this.x, this.y);
  }
}

class Poop {
  constructor() {
    this.pic = poopPic;
    this.x = random(40, 640);
    this.y = random(-1000, -100);
    this.speed = random(2, 5);
    this.noiseLocation = random(0, 1000);
  }
  displayAndMove() {
    this.y += this.speed;
    let moveAmount = map(noise(this.noiseLocation), 0, 1, -2, 2);
    this.x += moveAmount;
    this.noiseLocation += 0.01;
    this.x = constrain(this.x, 40, 600);

    // if player collects poop
    let myBucketMidX = myBucket.x + myBucket.pic.width / 2;
    let myBucketMidY = myBucket.y + myBucket.pic.height / 2;
    let thisMidY = this.y + this.pic.height / 2;
    let thisMidX = this.x + this.pic.width / 2;
    if (dist(thisMidX, thisMidY, myBucketMidX, myBucketMidY) < 25) {
      gameState = "endCowGame";
      cowGameState = false;
      inventory["milk"] += milkPoint;
    }

    // if player doesnt collect
    if (this.y > height) {
      this.x = random(40, 640);
      this.y = random(-1000, -100);
      this.speed = random(2, 5);
      this.noiseLocation = random(0, 1000);
    }

    image(this.pic, this.x, this.y);
  }
}

class Bucket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pic = bucketPic;
  }
  displayAndMove() {
    this.x = constrain(this.x, 0, 570);
    image(this.pic, this.x, this.y);
  }
}

function cowGameReset() {
  if (cowGameState == false) {
    milkPoint = 0;

    for (let i = 0; i < milks.length; i++) {
      milks[i].collected = false;
      milks[i].x = random(40, 640);
      milks[i].y = random(-1000, -100);
      milks[i].speed = random(2, 5);
      milks[i].noiseLocation = random(0, 1000);
    }
    for (let i = 0; i < poops.length; i++) {
      poops[i].x = random(40, 640);
      poops[i].y = random(-1000, -100);
      poops[i].speed = random(2, 5);
      poops[i].noiseLocation = random(0, 1000);
    }
    myBucket.x = 300;
    myBucket.y = 580;
    cowGameState = true;
  }
}

function cowGameStart() {
  cowGameReset();
  textAlign(CENTER);

  fill(0);
  text("Milk Count: " + milkPoint, 90, 40);
  myCow.displayAndMove();

  for (let i = 0; i < milks.length; i++) {
    milks[i].displayAndMove();
  }
  for (let i = 0; i < poops.length; i++) {
    poops[i].displayAndMove();
  }

  if (keyIsDown(65)) {
    myBucket.x -= 5;
  }
  if (keyIsDown(68)) {
    myBucket.x += 5;
  }

  myBucket.displayAndMove();

  if (milkPoint >= 10) {
    gameState = "endCowGame";
    cowGameState = false;
    inventory["milk"] += milkPoint;
  }
}

function cowGameEnd() {
  background("#a8ebf3");
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text(
    "You've collected " + milkPoint + " bottles of milk!",
    width / 2,
    height / 2
  );
  text("Press SPACE to return to farming.", width / 2, height / 2 + 30);

  if (keyIsDown(32)) {
    gameState = "farming";
  }
}
