
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

function generateQuestions(questionCount, constraints) {
    var questions = new Array();
    var order = 1;
    for (i = 0; i < questionCount; i++) {
        if (!constraints) {
            constraints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        };
        var firstInt = randomNum(1, 12);
        var secondInt = constraints[randomNum(0, constraints.length)];
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
    return localStorage.getItem('activeGame') || false;
};

function storeGameData(questions) {
    localStorage.setItem('questions',CryptoJS.AES.encrypt(JSON.stringify(questions), "noanswersforyou"))
}

function retreiveGameData() {
    var decrypted = CryptoJS.AES.decrypt(localStorage.getItem('questions'), "noanswersforyou");
    var parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return parsed;
};

function startGame(questions) {
    // Check for active game (ensures no multi games) and allows restore
    if (checkForActiveGames()) {
        //Restore Game returning false for now
        return false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        
    } else {       
        var gameData = {
            timeAlloted:10000,
            questions:questions
        };
        active_gameData = gameData;
        storeGameData(gameData);
        //localStorage.setItem('activeGame',true);
    }
};

localStorage.clear();


console.log('Engine Activated')
startGame(generateQuestions(20, [2]));