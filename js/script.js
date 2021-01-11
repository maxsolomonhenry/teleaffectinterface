// Can come from external file I guess?
let listOfVids = 
        [
          "https://archive.org/download/CEP146/CEP146_512kb.mp4",
          "https://archive.org/download/SF121/SF121_512kb.mp4"
        ]

// Don't know if there's a more appropriate approach, scope-wise.
let videoIndex = 0;
let data = [];
let canvasHolder;
let isDrawing = false;

window.onload = () => 
{
  canvasHolder = document.getElementById('canvas-holder');
  canvasHolder.addEventListener('mousedown', e => 
  {
    // TODO: move this.
    let datum = {'x': reportX, 'y': reportY};
    console.log(datum);
    isDrawing = true;
  });

canvasHolder.addEventListener('mouseup', e => 
{
    isDrawing = false;
  });

  nextTrial();
}

document.onkeydown = (e) => 
{
  /* Space -> play/pause. Behaviour is a bit odd to control. */

  let focus = document.activeElement.id;

  if (e.keyCode == 32)
  {
    // Prevent scrolling on spacebar.
    if (focus != "textin" && focus != "player")
    {
      e.preventDefault();
      playPause();
    }
  }
}

function reportXY()
{
  // Reporting XY position in canvas.
  if (isDrawing)
  {
    let datum = {'x': reportX, 'y': reportY};
    console.log(datum);
  }
}

function playPause()
{
  let player = document.getElementById("player");
  if (player.paused)
  {
    player.play();
  }
  else
  {
    player.pause();
  }
}

function nextButton() 
{
  // Collects input in "data" variable.

  let rawTags = document.getElementById("textin").value;

  if (rawTags) 
  {
    let datum = { 
      condition : getVideo(),
      tags      : parseTags(rawTags),
    }

    data.push(datum);
    clearTextArea();
    nextTrial();
  }
  else
  {
    alert("Please enter tags in the text box before proceeding.");
  }

}

function getVideo ()
{
  return document.getElementById("player").src;
}

function nextTrial ()
{
  document.getElementById("player").src = nextVideo();
}

function nextVideo ()
{
  if (videoIndex === listOfVids.length)
  {
    alert("Reached end of video list.");

    // Debugging.
    console.log(data);
  }
  else 
  {
    return listOfVids[videoIndex++];
  }
}

function parseTags(rawTags)
{
  return rawTags.split(",");
}


function clearTextArea()
{
  document.getElementById("textin").value = "";
}