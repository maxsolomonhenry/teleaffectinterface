let canvasWidth = 450;
let canvasHeight = 350;

let crossSize = 10;
let reportX = 0;
let reportY = 0;

function setup() 
{
  var canvas = createCanvas(canvasWidth, canvasHeight);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('canvas-holder');

  background(204);
}

function draw() 
{
	background(204);

	stroke(150);
	line(0, 175, 450, 175);
	line(225, 0, 225, 350);

	// Crosshair
	stroke('red');
	line(mouseX - crossSize, mouseY, mouseX + crossSize, mouseY);
	line(mouseX, mouseY - crossSize, mouseX, mouseY + crossSize);

	reportX = mouseX - (canvasWidth / 2);
	reportY = -(mouseY - (canvasHeight / 2));
}