var socket = io();

let listOfTrials = 
        [
          {
            'type'  : "id"
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
  clearRecordedInputs(); // Clear text field and time series.
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
    canvasHolder.style.cursor = 'none';
    reportXY();
  });

  canvasHolder.addEventListener('mouseup', e => 
  {
    canvasHolder.style.cursor = 'default';
    isDrawing = false;
  });
}



function reportXY()
{
  // Reporting XY position in canvas.
  if (isDrawing && !player.paused)
  {
    let vidTime = Math.round(document.getElementById('player').currentTime * 1000);
    let datum = {'timeMs': vidTime, 'valence': reportX, 'arousal': reportY};

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
  // Pause video.
  let player = document.getElementById("player");
  player.pause();  

  // De-focus the `next` button.
  thisEffingButton = document.getElementById("the-button");
  thisEffingButton.blur();
  // player.focus();

  // Collects input in "subjectData" variable.

  let datum = {"condition" : getVideo()}
  let idtxt = document.getElementById("id-text");

  // `tags` comes from tags.js 

  if (idtxt.value != "" || input.value || tags.length > 0 || time_series.length > 0) 
  {

    if (idtxt.value != "") 
    {
      datum["PID"] = idtxt.value;
      idtxt.value = "";
      datum["condition"] = "ID_FIELD";
    }

    if (tags){
      // Collect whatever was in the input field. `input` from tags.js
      tags.push(input.value);

      // Then add all tags to datum for this trial.
      datum["tags"] = tags;
    } 

    if (time_series.length > 0){
      datum["time_series"] = time_series;
      
      // Reset crosshair for next trial.
      drawX = canvasWidth/2;
      drawY = canvasHeight/2
    }

    subjectData.push(datum);

    // Debugging.
    console.log("Total data so far:");
    console.log(subjectData);

    // Move on.
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



// function parseTags(rawTags)
// {
//   return rawTags.split(",");
// }



function clearRecordedInputs()
{
  tags = [];
  time_series = [];
}

function nextTrial ()
{
  trialIndex++;

  if (trialIndex === listOfTrials.length)
  {
    alert("You have finished the experiment. Thank you!");

    // Debugging.
    console.log("Final data:");
    console.log(subjectData);

    let PID = subjectData[0]["PID"];
    let dateTime = getFormattedDate();
    let filename = "PID_" + PID + "__" + dateTime + ".json";
    socket.emit('new-datum', subjectData, filename);

  }
  else 
  {
    setupTrial();
  };
}

function setupTrial()
{
    clearRecordedInputs();
    clearTagField();

    updateLayout( getTrialType() );
    updateVideo( getTrialVideo() );
}


function clearTagField()
{
    // from tags.js, redraws empty input field.
    addTags();

    // (`input` from tags.js) clears any text sitting in the input field.
    input.value = '';
}

function updateLayout(trialType)
{
  let tagContainer = document.getElementById("tag-container");
  let prompt = document.getElementById("prompt");
  let idContainer = document.getElementById("id-container");
  let pressSpace = document.getElementById("press-space");

  if (trialType == "id")
  {
    player.style.display = "none";
    idContainer.style.display = "block";
    tagContainer.style.display = "none";
    canvasHolder.style.display = "none";
    pressSpace.style.display = "none";
    
    prompt.textContent =  "Please enter participant ID:"
  }
  else if (trialType == "text")
  {
    player.style.display = "block";
    idContainer.style.display = "none";
    tagContainer.style.display = "block";
    canvasHolder.style.display = "none";
    pressSpace.style.display = "block";

    prompt.textContent =  "Describe what you think the audience is feeling using tags. " +
                          "Separate tags with a\xa0\",\"\xa0(e.g., \"happy, sad\"):"
  }
  else if (trialType == "grid")
  {
    player.style.display = "block";
    idContainer.style.display = "none";
    tagContainer.style.display = "none";
    canvasHolder.style.display = "block";
    pressSpace.style.display = "block";

    prompt.textContent = "Click and point on the canvas to indicate how the audience feels."
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

function getFormattedDate() {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "h" + date.getMinutes() + "-" + date.getSeconds();

  return str;
}