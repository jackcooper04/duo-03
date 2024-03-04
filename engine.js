const DEFAULT_POINT_VALUE = 5;
const DEFAULT_GAME_TIME = 10000;


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

var active_gameData = {};

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function generateQuestions(questionCount, tables) {
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

function checkForActiveGames() {
    return localStorage.getItem('gameData') || false;
};

function storeGameData(questions) {
    //localStorage.setItem('gameData',CryptoJS.AES.encrypt(JSON.stringify(questions), "noanswersforyou"))
    localStorage.setItem('gameData',JSON.stringify(questions));

}

function retreiveGameData() {
    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem('gameData'), "noanswersforyou");
    //var parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return JSON.parse(localStorage.getItem('gameData'));
};

function startGame(questionCount, tables, timeLimit) {
    // Check for active game (ensures no multi games) and allows restore
    if (checkForActiveGames()) {
        console.log('Reload!')
        active_gameData = retreiveGameData();
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
    }
};

function activateQuestion(id) {
    index = active_gameData.questions.findIndex(x => x.id === id);
    if (index >= 0) {
        active_gameData.questions[index].active = true;
        storeGameData(active_gameData);
    } else {
        console.log('no question')
    }
};

function deactivateQuestion(id) {
    index = active_gameData.questions.findIndex(x => x.id === id);
    if (index >= 0) {
        active_gameData.questions[index].active = false;
        storeGameData(active_gameData);
    } else {
        console.log('no question')
    }
};

function receiveAnswer(number) {
    var indexes = active_gameData.questions.map((elm, idx) => elm.answer == number && elm.active ? idx : '').filter(String);
    for (idx in indexes) {
        // Prevent multiple "point redemptions"
        if (!active_gameData.questions[indexes[idx]].correct) {
            active_gameData.questions[indexes[idx]].correct = true;
            active_gameData.questions[indexes[idx]].active = false;
            // Trigger Score Add
        };
    };
    storeGameData(active_gameData);
};

console.log('Engine Activated')
startGame(22,[2]);
setTimeout(function(){
    receiveAnswer(16)
    // activateQuestion('J6XGJa4lHS');
    // activateQuestion('PpBPlfUAaW');
    // activateQuestion('BgEbCdn0i4');
    // activateQuestion('KixEAO2aFV');
    // activateQuestion('Kytpgn9N6i');
}, 2000);
// setTimeout(function(){
//     deactivateQuestion('5toM0N7fUz');
// }, 4000);
// setTimeout(function(){
//     console.log(retreiveGameData())
// }, 6000);

 