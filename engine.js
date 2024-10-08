const DEFAULT_POINT_VALUE = 5;
const DEFAULT_GAME_TIME = 10000;
const SERVER_DEVELOPEMENT_MODE = false;
var ONLINE_MODE = true;
localStorage.setItem("online",true);
if (SERVER_DEVELOPEMENT_MODE) {
    var server_url = "http://localhost:4200/"
} else {
    var server_url = "http://206.189.246.53/";
};
var settings = {
    "url": server_url + "ping",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function (response) {

    console.log(response);

})
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Failed to Connect to Server');
        ONLINE_MODE = false;
        localStorage.setItem("online",false);
        // Request failed. Show error message to user. 
        // errorThrown has error message.
    })






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
            id: makeid(10),
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
    localStorage.setItem('gameData', JSON.stringify(questions));

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
        var questions = generateQuestions(questionCount, tables);
        var gameData = {
            timeAlloted: timeLimit || DEFAULT_GAME_TIME,
            score: 0,
            timeStarted: Date.now(),
            timeEnded: undefined,
            shotsTaken: 0,
            questions: questions
        };
        active_gameData = gameData;
        storeGameData(gameData);
        return active_gameData;
    }
};

async function endGame() {
    // Check if game actually exis
    if (!checkForActiveGames()) {
        console.log('no active')
        return false;
    };
    //Execute Kill Function
    var gameData = active_gameData;
    localStorage.removeItem("gameData")
    var correctAnswers = gameData.questions.map((elm, idx) => elm.correct == true ? idx : '').filter(String)
    console.log('END GAME');
    var actualScore = correctAnswers.length * DEFAULT_POINT_VALUE;
    var timeTaken = Date.now() - gameData.timeStarted;
    var endGameObj = {
        questions: gameData.questions,
        score: actualScore,
        timeTaken: timeTaken,
        shotsTaken: gameData.shotsTaken,
        correct: correctAnswers
    };
    const submittedScore = await submitScore(endGameObj.score, endGameObj.shotsTaken, endGameObj.timeTaken);

    console.log(endGameObj);

    return endGameObj;
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
    console.log(active_gameData.shotsTaken)
    active_gameData.shotsTaken = active_gameData.shotsTaken + 1;
    for (idx in indexes) {
        // Prevent multiple "point redemptions"
        endQuestion(active_gameData.questions[indexes[idx]].id);
        if (!active_gameData.questions[indexes[idx]].correct) {
            active_gameData.questions[indexes[idx]].correct = true;
            active_gameData.questions[indexes[idx]].active = false;

            addScore();
        };
    };
    storeGameData(active_gameData);
};
// Retrieve Current Input

function addScore() {
    active_gameData.score = active_gameData.score + DEFAULT_POINT_VALUE;
    document.getElementById("scoreView").innerHTML = active_gameData.score;
    storeGameData(active_gameData);
    // Trigger Score Update
};



console.log('Engine Activated');
var chord = -1;

function getCurrentInput() {
    return chord
}

document.addEventListener("keypress", function onEvent(event) {
    if (chord == -1) {
        //Start new Chord
        if (Number(event.key) || '0') {
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
    chordDestruction = setTimeout(function () {
        console.log(Number(chord))
        receiveAnswer(chord);
        chord = -1;
        //trigger clear
    }, 500);
};


function findOrCreateUserId() {
    // Possible Manual User Creation with name?? However for now going to default to a number based System (3 Digits)
    var userID = localStorage.getItem("user");

    if (!userID && ONLINE_MODE) {
        console.log('no user!')
        var settings = {
            "url": server_url + "user/hxv8HFX3hak-aep2pqh",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            localStorage.setItem("user", response._id)
            console.log(response);
        });
    };

};

async function submitScore(score, shot, time) {

    var settings = {
        "url": server_url + "add/hxv8HFX3hak-aep2pqh",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "user": localStorage.getItem("user"),
            "score": score,
            "time": time,
            "taken": shot
        }),
    };


    if (ONLINE_MODE) {
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.href = "gameEnd.html";
        });
    } else {
        if (localStorage.getItem("score")) {
            if (score > localStorage.getItem("score")) {
                localStorage.setItem("high_score",score)
            };
            localStorage.setItem("score",score);
        } else {
            localStorage.setItem("score",score);
            localStorage.setItem("high_score",score)
        };
        localStorage.setItem("time_taken",time);
        localStorage.setItem("shots_taken",shot);
        window.location.href = "gameEnd.html";

    }
};




findOrCreateUserId();