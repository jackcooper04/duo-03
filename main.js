const SERVER_DEVELOPEMENT_MODE = true;

if (SERVER_DEVELOPEMENT_MODE) {
    var server_url = "http://localhost:4200/"
} else {
    var server_url = "http://206.189.246.53/";
}

function logSubmit(event) {
    var newName = document.getElementById("fname").value;
    event.preventDefault();
    var settings = {
        "url":  server_url+"makeUserPublic/hxv8HFX3hak-aep2pqh?id="+localStorage.getItem("user")+"&name="+newName,
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
    var settings = {
        "url":  server_url+"grabUserDetails/hxv8HFX3hak-aep2pqh?id="+localStorage.getItem("user"),
        "method": "GET",
        "timeout": 0,
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response)

        var userScores = response.scores;
        var latestScore = userScores[userScores.length -1].score;
        var highestScore = latestScore;
        for (idx in userScores) {
            if (userScores[idx].score > highestScore) {
                highestScore = userScores[idx].score
            }
        };

        document.getElementById("currentScore").innerText = latestScore;
        document.getElementById("highScore").innerText = highestScore;
    });
}

aquireData();