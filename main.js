const SERVER_DEVELOPEMENT_MODE = false;

if (SERVER_DEVELOPEMENT_MODE) {
    var server_url = "http://localhost:4200/"
} else {
    var server_url = "http://206.189.246.53/";
}

function logSubmit(event) {
    var newName = document.getElementById("fname").value;
    event.preventDefault();
    var settings = {
        "url": server_url + "makeUserPublic/hxv8HFX3hak-aep2pqh?id=" + localStorage.getItem("user") + "&name=" + newName,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        const element = document.getElementById("enterName");
        element.remove();
    });

}

const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', logSubmit);


function aquireData() {
    const params = new URLSearchParams(window.location.search);
    const score = params.get("score") ?? localStorage.getItem("score") ?? 0;
    const highScore = params.get("high") ?? localStorage.getItem("high_score") ?? 0;
    const shots = params.get("shots") ?? localStorage.getItem("shots_taken") ?? 0;
    const timeSecs = Math.floor((params.get("time") ?? localStorage.getItem("time_taken") ?? 0) / 1000);

    document.getElementById("currentScore").innerText = score;
    document.getElementById("highScore").innerText = highScore;
    document.getElementById("shotsTaken").innerText = shots;
    document.getElementById("timeTaken").innerText = timeSecs + " Seconds";

    if (localStorage.getItem("online") == "true") {
        var settings = {
            "url": server_url + "grabUserDetails/hxv8HFX3hak-aep2pqh?id=" + localStorage.getItem("user"),
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            var userRegistered = response.user && response.user.shown;
            if (userRegistered) {
                const el = document.getElementById("enterName");
                if (el) el.remove();
            }

            var allScores = response.allScores;
            var tbodyRef = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
            for (idx in allScores) {
                if (allScores[idx].user && allScores[idx].user.shown) {
                    var newRow = tbodyRef.insertRow();
                    var newCellName = newRow.insertCell();
                    var newCellScore = newRow.insertCell();
                    var newCellTaken = newRow.insertCell();
                    var newCellTime = newRow.insertCell();
                    newCellName.appendChild(document.createTextNode(allScores[idx].user.name));
                    newCellScore.appendChild(document.createTextNode(allScores[idx].score));
                    newCellTaken.appendChild(document.createTextNode(allScores[idx].shotsTaken));
                    newCellTime.appendChild(document.createTextNode(Math.floor(allScores[idx].timeTaken / 1000)));
                }
            }
        }).fail(function () {
            const el = document.getElementById("removeMe");
            if (el) el.remove();
            const el2 = document.getElementById("enterName");
            if (el2) el2.remove();
        });
    } else {
        const el = document.getElementById("removeMe");
        if (el) el.remove();
        const el2 = document.getElementById("enterName");
        if (el2) el2.remove();
    }
};

function playAgain(){
    window.location.href = "index.html";
}

aquireData();