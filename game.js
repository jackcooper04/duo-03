
const container = document.getElementById('gameContainer');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function loadQuestion(question) {
    // create a new div element
    const newDiv = document.createElement("div");
    
    newDiv.className = "questionObj";
  
    // and give it some content
    const newContent = document.createTextNode(question);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    
    container.appendChild(newDiv);
    return newDiv;
  }
  
function animate(obj, level){
    
    let yPos;
    let xPos;
    let endXPos;
    switch(level){
        case 0:
            yPos = "15vh";
            break;
        case 1:
            yPos = "40vh";
            break;
        case 2:
            yPos = "65vh";
            break;   
    }
    if(level == 1){
        xPos = "-10vw";
        endXPos = "110vw";
    }else{
        xPos = "110vw";
        endXPos = "-10vw";
    }

    console.log("xPos: " + xPos + " endXPos: " + endXPos + " yPos: " + yPos + "level" + level)
    gsap.fromTo(obj, {y: yPos, x:xPos}, {x:endXPos, duration: 5});
}

console.log(generateQuestions())