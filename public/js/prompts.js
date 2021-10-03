const prompts = [
    `<p>In this experiment you will be registering emotion on two scales:</p><p><b>arousal</b> and <b>pleasantness</b>.</p>`,

    `<p>To begin video playback, press the spacebar. </p>
    
    <p>As you watch the video, we will record your response as you click and drag the <b>red cursor</b> in the response box. As you watch the video, the cursor is being tracked over time. Please click and drag throughout.</p>
​
	<p><b>NOTE: </b> We are interested in your response <b>as it changes over time</b>. Please continue to click and drag throughout the video.</p>
​
    <img src="./img/cursor.png" style="width:75%;height:75%" alt="Showing the cursor">`,

    `<p>
    <h1>Arousal</h1>
    </p>
    <img src="img/arousal_mani.png" width="100%">
    <p>
        This scale relates to how <b>awake</b>, <b>stimulated</b>, or <b>stirred up</b> someone is.
    </p>
​
    <p>
        <b>High arousal</b> is when someone has extreme feelings, like excitement or furious anger 🤯😠🤩.
    </p>
​
    <p>
        <b>Low arousal</b> is closer to sleep, when people are most relaxed, or even bored 😴😪.
    </p>
​
    <p>
        You will rate someone's arousal using the up/down dimension of the reponse grid.
    </p>
    
    <img src="./img/arousal.png" style="width:75%;height:75%" alt="Arousal dimension">`,

    `<p>
    <h1>Pleasantness</h1>
    </p>
​
    <img src="img/valence_mani.png" width="100%">
    
    <p> 
        This scale relates to how <b>pleasurable</b> an emotion is.
    </p>
​
    <p>
        <b>High pleasantness</b> is when someone has very nice, positive feelings like excitement, happiness, and joy 🤗😂😀.
    </p>
​
    <p>
        <b>Low pleasantness</b> relates to highly negative emotions like anger or fear 😢😠😨.
    </p>
​
    <p>
        You will rate someone's pleasantness using the left/right dimension of the response grid.
    </p>
    
    <img src="./img/valence.png" style="width:75%;height:75%" alt="Pleasantness dimension">`,

    `<b>Tutorial</b> 
    <br>with those dimensions in mind, here is a handy tutorial video on how to complete the experiment
     <video width="100%" controls>
        <source src="./vid/tutorial.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video> `,

    `<p>The next screen will bring you to the experiment.</p>
    <p>Remember: you must rate the emotions of the audience <b>over time</b> and <b>not statically</b>. A video will have many different emotions contained within it. We are logging how your emotion ratings <b>change over time</b>, and thus are recording the <b>time varying movements of the crosshair</b> and <b>not</b> a singular value, so do not wait until the end of the video to make a rating.</p>
    
    <p>As mentioned, please rate how you think the <b>audience</b> feels. <b>If there is no audience visualization present, rate how you think a hypothetical audience will feel</b>. There is a fair amount of repetition in this experiment, that is normal!</p>`
];

export default prompts;
