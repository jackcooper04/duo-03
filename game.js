
const container = document.getElementById('gameContainer');
var game;
var questions;
var questionCount = 5;
var questionDone = 0;
var questionObjects = [];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function loadQuestion(question) {
    


    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.className = "hiddenQuestionObj";
    // and give it some content
    const newContent = document.createElement("p");
    newContent.textContent = question?.string;
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    // Add needed attributes to Div
    newDiv.setAttribute('level', question.level)
    newDiv.setAttribute('qID', question.id)
    // add the newly created element and its content into the DOM
    container.appendChild(newDiv);

    return newDiv;
}


// Animate Object
function animate(obj){
    obj.className = "questionObj";
    level = Number(obj.getAttribute("level"));
    let yPos;
    let xPos;
    let endXPos;

    // Set Rendered Level for Question
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
        xPos = "-15vw";
        endXPos = "110vw";
    }else{
        xPos = "110vw";
        endXPos = "-15vw";
    }

    // Run Animation 
    activateQuestion(obj.getAttribute("qID"))
    return gsap.fromTo(obj, {y: yPos, x:xPos}, {x:endXPos, duration: 7.5, onCompleteParams:[obj] ,onComplete: endQuestion} );
}

function endQuestion(obj){
    obj.className = "hiddenQuestionObj";
    deactivateQuestion(obj.getAttribute("qID"))
    questionDone++;
}


function play(){
    
    // Start Game, get questions
    game = startGame(questionCount);
    questions = game.questions;

    // Initialise Each Question Object
    questionObjs = [];
    console.log(questions)
    for(questionData of questions){
        level = getRandomInt(3)
        questionData.level = level;
        questionObj = loadQuestion(questionData);
        questionObjects.push(questionObj);
    }


    // Running Question Objects (Activating, Animating, and End Game Checking)

    runQuestions = setInterval(function(){
        try{
            obj = questionObjects[0]
            questionObjects.shift();
            animate(obj);
            
        }catch(e){
            // Checks if all questions have finished running and ends game
            if(questionDone == questionCount){
                clearInterval(runQuestions);
            }
        }
    }, 2000)

}

function endRoutine(){
    let endGameData = endGame();
    
}

play()