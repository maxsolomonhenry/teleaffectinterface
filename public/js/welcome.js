let ctr = 0;

let prompts = [
    "Test",
    "This is a test",
    "This <b>too</b> is a test.",
    "On the last prompt it goes to the experiment page... (*windchime*)..."
]

function nextButton(){
    let x = document.getElementById("prompt");
    let thisPrompt = prompts[ctr++];
    if (typeof thisPrompt !== 'undefined')
        x.innerHTML = thisPrompt;
    else
        window.location.href = 'experiment.html';
}