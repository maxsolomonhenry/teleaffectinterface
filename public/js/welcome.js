import prompts from './prompts.js'

let button = document.getElementById("button");

let ctr = 0;
button.addEventListener("click", () => {
    let x = document.getElementById("prompt");
    let thisPrompt = prompts[ctr++];
    if (typeof thisPrompt !== 'undefined')
        x.innerHTML = thisPrompt;
    else
        window.location.href = 'experiment.html';
})