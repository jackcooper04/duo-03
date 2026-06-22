function showInfo(text){
    infoDoc = document.getElementById("difficultyInfo");
    if(text == ""){
        infoDoc.innerHTML = "Hover over a difficulty, and see Information about it!";
    }else{
        infoDoc.innerHTML = text;
    }
}

function openGame(count, time){
    localStorage.removeItem('gameData');
    window.location.href = "game.html?count=" + count + "&time=" + time;
}

function clearUser(){
    alert("user cleared")
    localStorage.removeItem("user");
}