// Can come from external file I guess?
let listOfTrials = 
        [
          {
            'source': "https://archive.org/download/CEP146/CEP146_512kb.mp4",
            'type'  : "text"
          },
          {
            'source': "https://archive.org/download/SF121/SF121_512kb.mp4",
            'type'  : "text"
          },
          {
            'source': "https://archive.org/download/CEP146/CEP146_512kb.mp4",
            'type'  : "grid"
          },
          {
            'source': "https://archive.org/download/SF121/SF121_512kb.mp4",
            'type'  : "grid"
          }
        ]



let canvasHolder;
let trialIndex;
let subjectData;

let isDrawing = false;
let time_series;



window.onload = () => 
{
  initGlobals();
  clearInputs(); // Clear text field and time series.
  setupCanvas();
  setupSpacebar();

  setupTrial();
}

function initGlobals()
{
  subjectData = [];
  trialIndex = 0;
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

    console.log('Datum registered:')
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
  // Collects input in "subjectData" variable.

  let datum = {"condition" : getVideo()}
  let rawTags = document.getElementById("textin").value;

  if (rawTags || time_series.length > 0) 
  {
    if (rawTags) datum["tags"] = parseTags(rawTags);
    if (time_series.length > 0) datum["time_series"] = time_series;

    subjectData.push(datum);

    // Debugging.
    console.log("Total data so far:");
    console.log(subjectData);

    this.blur();
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
  trialIndex++;

  if (trialIndex === listOfTrials.length)
  {
    alert("Reached end of video list.");

    // Debugging.
    console.log("Final data:");
    console.log(subjectData);
  }
  else 
  {
    setupTrial();
  };
}

function setupTrial()
{
    clearInputs();
    updateLayout( getTrialType() );
    updateVideo( getTrialVideo() );
}


function updateLayout(trialType)
{
  let textin = document.getElementById("textin");
  let prompt = document.getElementById("prompt");

  if (trialType == "text")
  {
    textin.style.display = "block";
    canvasHolder.style.display = "none";

    prompt.textContent =  "Describe what you think the audience is feeling using tags. " +
                          "Separate tags with a\xa0\",\"\xa0(e.g., \"happy, sad\"):"
  }
  else if (trialType == "grid")
  {
    textin.style.display = "none";
    canvasHolder.style.display = "block";

    prompt.textContent = "Click and point on the canvas to indicate how you feel."
  }
  else
  {
    throw "Unknown trial type";
  }
}

function updateVideo(source)
{
  document.getElementById("player").src = source;
}


function getTrialVideo()
{
  return listOfTrials[trialIndex]["source"];
}

function getTrialType()
{
  return listOfTrials[trialIndex]["type"];
}