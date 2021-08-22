let ctr = 0;

let prompts = [
    "<p>In this experiment you will be registering emotion on two scales:</p><p><b>arousal</b> and <b>pleasantness</b></p>.",
    "<p>" + 
    "<h1>Arousal</h1>" + 
    "</p>" +
    "<p>" + 
        "This scale relates to how <b>awake</b>, <b>stimulated</b>, or <b>stirred up</b> someone is." +
    "</p>" + 
    "<p>" + 
        "<b>High arousal</b> is when someone has extreme feelings, like excitement or furious anger. 🤯😠🤩" + 
    "</p>" + 
    "<p>" + 
        "<b>Low arousal</b> is closer to sleep, when people are most relaxed 😴😪" + 
    "</p>" + 
    "<p>" +
        "You will rate someone's arousal using the up/down dimension of the reponse grid." +
    "</p>" +
    "<p>",
    "<p>" +
    "<h1>Pleasantness</h1>" +
    "</p>" +
    "<p>" + 
        "This scale relates to how <b>pleasurable</b> an emotion is." +
    "</p>" +
    "<p>" +
        "<b>High pleasantness</b> is when someone has very nice, positive feelings like excitement, happiness, and joy 🤗😂😀" +
    "</p>" +
    "<p>" +
        "<b>Low pleasantness</b> relates to highly negative emotions like anger or fear 😢😠😨" +
    "</p>" +
    "<p>" +
        "You will rate someone's pleasantness using the left/right dimension of the response grid." +
    "</p>",
    "<p>The next screen will bring you to the experiment.</p><p>Click the 'next' button to move through trials.</p>"
];

function nextButton(){
    let x = document.getElementById("prompt");
    let thisPrompt = prompts[ctr++];
    if (typeof thisPrompt !== 'undefined')
        x.innerHTML = thisPrompt;
    else
        window.location.href = 'experiment.html';
}