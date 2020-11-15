/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // Generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        //Display the result 
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        var diceDOM1 = document.querySelector(".dice1");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + dice1 + ".png";
    
        //Update the roundScore IF the rolled dice is not 1
        if (dice === 6 && dice1 === 6) {
            scores[activePlayer] = 0;
            roundScore = 0;
            //nextPlayer
            nextPlayer();
        }
        if (dice !== 1 || dice1 !== 1) {
            roundScore += dice;
            roundScore += dice1;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } 
        if (dice === 1 || dice1 === 1){
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = "0";
            
            document.querySelector("#current-" + activePlayer).textContent = "0";
           
            //nextPlayer
            nextPlayer();
        }

    }
    
});


document.querySelector(".btn-hold").addEventListener("click", function() {
    //Add the roundScore to the Global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    //Check if there is a winner
    if (scores[activePlayer] >= document.getElementById("typeWinningScore").value) {
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice1").style.display = "none";
        document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;

    } else {
        //nextPlayer
        nextPlayer();
    }
    
})


function nextPlayer() {
    gamePlaying = true;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";

    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "PLAYER 1";
    document.querySelector("#name-1").textContent = "PLAYER 2";
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
}






