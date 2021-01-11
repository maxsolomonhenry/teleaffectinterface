/*

  TODO:   -routing.
            e.g., [elementid].style.display = "none" / "block"
          -switching between types of data.

*/



// Can come from external file I guess?
let listOfVids = 
        [
          "https://archive.org/download/CEP146/CEP146_512kb.mp4",
          "https://archive.org/download/SF121/SF121_512kb.mp4"
        ]



let canvasHolder;
let videoIndex;
let data;

let isDrawing = false;
let time_series;



window.onload = () => 
{
  initGlobals();
  clearInputs(); // Clear text field and time series.
  setupCanvas();
  setupSpacebar();
  nextTrial();
}

function initGlobals()
{
  data = [];
  videoIndex = 0;
}



// =================== 2d IO stuff ====================

function setupCanvas()
{
  canvasHolder = document.getElementById('canvas-holder');
  canvasHolder.addEventListener('mousedown', e => 
  {
    isDrawing = true;
    reportXY();
  });

  canvasHolder.addEventListener('mouseup', e => 
  {
      isDrawing = false;
    });
}



function reportXY()
{
  // Reporting XY position in canvas.
  if (isDrawing)
  {
    let vidTime = document.getElementById('player').currentTime;
    let datum = {'t': vidTime, 'x': reportX, 'y': reportY};


    console.log(datum);
    time_series.push(datum);
  }
}



// ================ Spacebar behaviour ================

function setupSpacebar()
{
  document.onkeydown = (e) => 
  {

    let focus = document.activeElement.id;

    if (e.keyCode == 32)
    {
      if (focus != "textin" && focus != "player")
      {
        // Prevent scrolling.
        e.preventDefault();
        playPause();
      }
    }
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





// =========== Saving data and advancing trial ===========

function nextButton() 
{
  // Collects input in "data" variable.

  let datum = {"condition" : getVideo()}
  let rawTags = document.getElementById("textin").value;

  if (rawTags || time_series.length > 0) 
  {
    if (rawTags) datum["tags"] = parseTags(rawTags);
    if (time_series.length > 0) datum["time_series"] = time_series;

    data.push(datum);

    // Debugging.
    console.log(data);

    clearInputs();
    nextTrial();
  }
  else
  {
    alert("Please enter input before proceeding.");
  }

}



function getVideo ()
{
  return document.getElementById("player").src;
}



function parseTags(rawTags)
{
  return rawTags.split(",");
}



function clearInputs()
{
  document.getElementById("textin").value = "";
  time_series = [];
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