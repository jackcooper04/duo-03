function showInfo(text){
    infoDoc = document.getElementById("difficultyInfo");
    if(text == ""){
        infoDoc.innerHTML = "Hover over a difficulty, and see Information about it!";
    }else{
        infoDoc.innerHTML = text;
    }
}

async function openGame(count, time){

    setCount = await localStorage.setItem("count", count);
    setTimer = await localStorage.setItem("time", time);
    window.location.replace("/game.html");
}