
const container = document.getElementById('gameContainer');
var game;
var questions;
var questionObjects = [];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function loadQuestion(question) {
    


    // create a new div element
    const newDiv = document.createElement("div");
    newDiv.className = "hiddenQuestionObj";
    // and give it some content
    const newContent = document.createTextNode(question?.string);
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    // Add needed attributes to Div
    newDiv.setAttribute('level', question.level)
    newDiv.setAttribute('qID', question.id)
    // add the newly created element and its content into the DOM
    container.appendChild(newDiv);

    return newDiv;
}

function animate(obj){
    obj.className = "questionObj";
    level = Number(obj.getAttribute("level"));
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
        xPos = "-15vw";
        endXPos = "110vw";
    }else{
        xPos = "110vw";
        endXPos = "-15vw";
    }
    activateQuestion(obj.getAttribute("qID"))
    return gsap.fromTo(obj, {y: yPos, x:xPos}, {x:endXPos, duration: 7.5, onCompleteParams:[obj] ,onComplete: endQuestion} );
}

function endQuestion(obj){
    obj.className = "hiddenQuestionObj";
    deactivateQuestion(obj.getAttribute("qID"))
}

function initialise(){
    game = startGame(20); 
    questions = game.questions;
}

function play(){
    questionObjs = [];
    console.log(questions)
    for(questionData of questions){
        level = getRandomInt(3)
        questionData.level = level;
        questionObj = loadQuestion(questionData);
        questionObjects.push(questionObj);
        }
    }
    
    
function run(){

    runQuestions = setInterval(function(){
        try{
            obj = questionObjects[0]
            questionObjects.shift();
            animate(obj);
        }catch(e){
            console.log("no more questions")
        }
        
    }, 2000)

}

initialise()
play()
run()