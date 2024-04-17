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
        var userRegistered = response.user.shown;
        var userScores = response.scores;
        var latestScore = userScores[userScores.length -1].score;
        var highestScore = latestScore;
        var allScores = response.allScores;

        if (userRegistered) {
            const element = document.getElementById("enterName");
            element.remove();
        }
        for (idx in userScores) {
            if (userScores[idx].score > highestScore) {
                highestScore = userScores[idx].score
            }
        };

        var tbodyRef = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
        for (idx in allScores) {
            console.log(allScores[idx])
            var newRow = tbodyRef.insertRow();

            //New Row
            var newName = document.createTextNode(allScores[idx].user.name);
            var newScore = document.createTextNode(allScores[idx].score);
            var newCellName = newRow.insertCell();
            var newCellScore = newRow.insertCell();
            newCellName.appendChild(newName);
            newCellScore.appendChild(newScore);


            // newCellName.appendChild(newTaken);
            // newCellScore.appendChild(newShot);



        }
        // 

        // // Insert a row at the end of table
        // 
        
        // // Insert a cell at the end of the row
        // 
        // // Append a text node to the cell
        // 
        // newCell.appendChild(newText);
        // var newCell = newRow.insertCell();
        // // Append a text node to the cell
        // var newText = document.createTextNode('new row');
        // newCell.appendChild(newText);



        document.getElementById("currentScore").innerText = latestScore;
        document.getElementById("highScore").innerText = highestScore;
    });
};

function playAgain(){
    window.location.replace("/index.html");
}

aquireData();