let canvasWidth = 300;
let canvasHeight = 300;

let crossSize = 10;
let reportX = 0;
let reportY = 0;

function setup() 
{
  var canvas = createCanvas(canvasWidth, canvasHeight);

  // Place canvas in appropriate div.
  canvas.parent('canvas-holder');

  background(204);
}

let drawX = canvasWidth/2;
let drawY = canvasHeight/2;

function draw() 
{

  background(204);
  
  // Grid.
  
  let gridResolution = 20;
  strokeWeight(1);
  stroke(195);

  for (var i = 1; i < gridResolution; i++)
  {
    line(0, canvasHeight/gridResolution * i, canvasWidth, canvasHeight/gridResolution * i);
    line(canvasWidth/gridResolution * i, 0, canvasWidth/gridResolution * i, canvasHeight);
  }

  stroke(150);
  line(0, canvasHeight/2, canvasWidth, canvasHeight/2);
  line(canvasWidth/2, 0, canvasWidth/2, canvasHeight);

  // Crosshair.

  if (isDrawing)
  {
    drawX = mouseX;
    drawY = mouseY;
  }

  stroke('red');
  strokeWeight(2);
  line(drawX - crossSize, drawY, drawX + crossSize, drawY);
  line(drawX, drawY - crossSize, drawX, drawY + crossSize);

  // Report centered, normalized values.
  reportX = (mouseX - (canvasWidth / 2)) / canvasWidth;
  reportY = (-(mouseY - (canvasHeight / 2))) / canvasHeight;
}