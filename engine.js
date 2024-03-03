

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function generateQuestions(questionCount,constraints) {
    var questions = new Array();
    var order = 1;
    for (i=0; i < questionCount; i++) {
        if (!constraints) {
            constraints = [1,2,3,4,5,6,7,8,9,10,11,12]
        };
        var firstInt = randomNum(1,12);
        var secondInt = constraints[randomNum(0,constraints.length)];
        var answer = firstInt * secondInt;
        if (order == 1) {
            var string = `${firstInt} * ${secondInt}`
            order = 2
        } else {
            var string = `${secondInt} * ${firstInt}`
            order = 1
        }
        var obj = {
            firstInt: firstInt,
            secondInt: secondInt,
            string: string,
            answer: answer
        };
        questions.push(obj);
    };
    questions = questions.sort(() => Math.random() - 0.5);
    return questions;
};


generateQuestions(20,[2])