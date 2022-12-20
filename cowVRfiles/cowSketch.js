// variables
let cowWorld, sky, floor;
let cow;
let milkDrops = [];
let cowCanvas, oct;
let halo;
let drop_sound;
let collectCount;
let bottleCount;

function setup() {
	// create dynamic texture canvas
	cowCanvas = createCanvas(512,512).id();
	localStorage.setItem("cowGameOver", "false");
	collectCount = 0;
    bottleCount = 0;
	// load sound
	// https://www.freesoundslibrary.com/water-drop-sound/
	// License: Attribution 4.0 International (CC BY 4.0)
	drop = loadSound('assets/water-drop-sound.mp3');

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	cowWorld = new World('VRScene');
	cowWorld.setBackground(173, 216, 230);

	//add floor
    var g = new Plane({x:0, y:0, z:0, width:100, height:100, red:0, green:150, blue:102, rotationX:-90, metalness:0.25});

	// add the plane to our world
	cowWorld.add(g);

	// add 3D cow
	cow = new GLTF({
		asset: 'cow',
		x: 1, y: 0, z: -3,
		scaleX: 0.01,
		scaleY: 0.01,
		scaleZ: 0.01
	});
	cow.rotateY(-80);
	cowWorld.add(cow);
	var board = new Plane({
		x: -3, y: 0.5, z: -5,
		width: 2, height: 3,
		side: 'double',
		asset: cowCanvas,
		dynamicTexture: true,
		dynamicTextureWidth: 512,
		dynamicTextureHeight: 512
	});
	cowWorld.add(board);
	var exitButton = new Box({
		x: -3, y: 0, z: -5,
		width: 2, height: 0.5, depth: 0.5,

		red: 218, green: 165, blue: 32,
		clickFunction: function() {
			localStorage.setItem("cowGameOver", "true");
		}
	});
	cowWorld.add(exitButton);
    	
	// add halo above cow's head
	halo = new Torus({
		x: 1.15, y: 1.9, z: -2.2,
		radius: 0.2,
		radiusTubular: 0.01,
		side: 'double',
		red: 218, green: 165, blue: 32,
		rotationX: -90
	});
	cowWorld.add(halo);
    
	// set user's initial position slightly above origin
	cowWorld.setUserPosition(0,1,0);

	// create and add milk drops to array
	for (let i=0; i<50; i++) {
		let milk = new cowMilk(random(-4.75,4.75),random(5.7),random(-4.75,4.75));
		milkDrops.push(milk);
	}
}

function draw() {
	if (localStorage.getItem("cowGameStarted")=="true") {
		collectCount = 0;
	    bottleCount = 0;
	    cowWorld.setUserPosition(0,1,0);
	    localStorage.setItem("cowGameStarted", "false");
	}

	// milk drops move
	for (let i=0; i<milkDrops.length; i++) {
		milkDrops[i].move();
	}

	// dynamic canvas
	background(200,300);
	//fill(random(255), random(255), random(255));
    fill(0,0,0);
    bottleCount = Math.floor(collectCount/5);
    localStorage.setItem("cowGameBottles", bottleCount);

	textSize(40);
	text("5 drops = 1 Bottle!", 50, 50)
	text(collectCount + " drops", 50,100);
	text(bottleCount + " bottles", 50,150);
	text("Click Yellow Box to Exit!", 50,200);

	if (collectCount  == 50){
	    localStorage.setItem("cowGameOver", "true");
	}
	//circle(random(512), random(512), random(5,30));
}

class cowMilk {
	constructor(x,y,z) {
		
		// make milk drop a composite object
		// made of a hemisphere and cone

		// container for the primitives
		this.container = new Container3D({
			x:x, y:y, z:z 
		});
		cowWorld.add(this.container);

		// sphere
		this.dropSphere = new Sphere({
			x: 0, y: 0, z: 0,
			thetaLength: 180,
			phiLength: 180,
			red: 255, green: 253, blue: 208,
			radius: 0.05,
			rotationX: 90,
			clickFunction: function(s) {
				changePosition(s);
				// console.log("sphere");
			}
		})
		this.container.addChild(this.dropSphere);

		// cone
		this.dropCone = new Cone({
			x: 0, y: 0.1, z: 0,
			height: 0.2,
			radiusBottom: 0,
			radiusTop: 0.05,
			red: 255, green: 253, blue: 208,
			rotationX: 180,
			clickFunction: function(c) {
				changePosition(c);
				// console.log("cone");
			}
		})
		this.container.addChild(this.dropCone);

		this.speed = random(-0.03, -0.01);
	}

	move() {
		// move drop down gradually so it "falls"
		this.container.nudge(0, this.speed, 0);

		// reset position and color when drop hits the "ground"
		if (this.container.getY() <= 0) {
			this.container.setY(random(5,7))
		}
	}
}

// drop plays a drop sound and is recycled when clicked
function changePosition(obj) {
    collectCount += 1;
	drop.play();

	for (milk of milkDrops) {
		if (milk.dropCone == obj || milk.dropSphere == obj) {
			milk.container.setY(random(5,7));
		}
	}
}
