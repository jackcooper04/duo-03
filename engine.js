const DEFAULT_POINT_VALUE = 5;
const DEFAULT_GAME_TIME = 10000;
var active_gameData = {};



// Creates Unique ID for question
const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


// Random Number Generator
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}


// Function that generates questions
/*
REQUIRED questionCount: int
OPTIONAL tables DEFAULT [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] 
*/
function generateQuestions(questionCount, tables) {
    if (!questionCount) {
        return false;
    }
    var questions = new Array();
    var order = 1;
    for (i = 0; i < questionCount; i++) {
        if (!tables || tables.length == 0) {
            tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        };
        var firstInt = randomNum(1, 12);
        var secondInt = tables[randomNum(0, tables.length)];
        var answer = firstInt * secondInt;
        if (order == 1) {
            var string = `${firstInt} * ${secondInt}`
            order = 2
        } else {
            var string = `${secondInt} * ${firstInt}`
            order = 1
        }
        var obj = {
            id:makeid(10),
            firstInt: firstInt,
            secondInt: secondInt,
            string: string,
            active: false,
            correct: false,
            answer: answer
        };
        questions.push(obj);
    };
    questions = questions.sort(() => Math.random() - 0.5);
    return questions;
};

// Checks LocalStorage for Active Game
function checkForActiveGames() {
    return localStorage.getItem('gameData') || false;
};

// Stores GameData to localstorage
function storeGameData(questions) {
    //localStorage.setItem('gameData',CryptoJS.AES.encrypt(JSON.stringify(questions), "noanswersforyou"))
    localStorage.setItem('gameData',JSON.stringify(questions));

}

//Retrives GameData from localstorage
function retreiveGameData() {
    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem('gameData'), "noanswersforyou");
    //var parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return JSON.parse(localStorage.getItem('gameData'));
};

//Start Game Function
/*
REQUIRED: questionCount
OPTIONAL: tables DEFAULT [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
OPTIONAL: timeLimit DEFAULT DEFAULT_GAME_TIME
*/
function startGame(questionCount, tables, timeLimit) {

    if (!questionCount) {
        return false;
    }


    // Check for active game (ensures no multi games) and allows restore
    if (checkForActiveGames()) {
        console.log('Reload!')
        active_gameData = retreiveGameData();
        return active_gameData;
    } else {
        if (!tables) {
            tables = []
        };
        var questions = generateQuestions(questionCount,tables);       
        var gameData = {
            timeAlloted:timeLimit || DEFAULT_GAME_TIME,
            score:0,
            questions:questions
        };
        active_gameData = gameData;
        storeGameData(gameData);
        return active_gameData;
    }
};

function endGame() {
    // Check if game actually exists
    if (!checkForActiveGames()) {
        return false;
    };
    var gameData = active_gameData;
    localStorage.clear();
    var correctAnswers = gameData.questions.map((elm, idx) => elm.correct == true ? idx : '').filter(String)
    console.log('END GAME');
    console.log(correctAnswers);
    return active_gameData;
};

//Activate Question

function activateQuestion(id) {
    index = active_gameData.questions.findIndex(x => x.id === id);
    if (index >= 0) {
        active_gameData.questions[index].active = true;
        storeGameData(active_gameData);
    } else {
        console.log('no question' + id)
    }
};

//Deactivate Question

function deactivateQuestion(id) {
    index = active_gameData.questions.findIndex(x => x.id === id);
    if (index >= 0) {
        active_gameData.questions[index].active = false;
        storeGameData(active_gameData);
    } else {
        console.log('no question')
    }
};

//Recive Answer

function receiveAnswer(number) {
    var indexes = active_gameData.questions.map((elm, idx) => elm.answer == number && elm.active ? idx : '').filter(String);
    for (idx in indexes) {
        // Prevent multiple "point redemptions"
        if (!active_gameData.questions[indexes[idx]].correct) {
            active_gameData.questions[indexes[idx]].correct = true;
            active_gameData.questions[indexes[idx]].active = false;
            addScore();
        };
    };
    storeGameData(active_gameData);
};

function addScore() {
    active_gameData.score = active_gameData.score + DEFAULT_POINT_VALUE;
    storeGameData(active_gameData);
    // Trigger Score Update
};



console.log('Engine Activated');
var chord = -1;
document.addEventListener("keypress", function onEvent(event) {
    if (chord == -1) {
        //Start new Chord
        if (Number(event.key) || '0'){
            chord = event.key;
            //trigger number event
            startChordDestruction();
        } else {
            console.log('nan')
        }
    } else {
        clearTimeout(chordDestruction);
        chord += event.key
        startChordDestruction();
    }
    console.log(event.key)
});

function startChordDestruction() {
    chordDestruction = setTimeout(function(){
        console.log(Number(chord))
        receiveAnswer(chord);
        chord = -1;
        //trigger clear
   }, 500);
}