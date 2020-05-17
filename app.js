/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying, customScore;

init();

var rollPrior;

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if (gamePlaying){
        // First step - generate a random number
        var dice = Math.floor(Math.random()*6 + 1);

        //2nd step - display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3rd step - logic for the result of the roll
        if (dice === 6 && rollPrior ===6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }else if (dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            // Don't add score, it's the next player's turn
            nextPlayer();
        }
    }

    rollPrior = dice;
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
customScore = document.querySelector('#customScoreField').value;
console.log(customScore);
    if (gamePlaying){
        // First step - add current score to global score
        scores[activePlayer] += roundScore;

        // Update the User Interface 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (customScore){
            if (scores[activePlayer] >= customScore){
                // That players wins
                document.getElementById('name-' + activePlayer).textContent = "WINNER!";
                // Make the dice invisible
                document.querySelector('.dice').style.display = 'none';
                // Toggle winning player from active to winner class
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
    
            }else {
                //Next player
                nextPlayer();
            }
        }else{
            if (scores[activePlayer] >= 20){
                // That players wins
                document.getElementById('name-' + activePlayer).textContent = "WINNER!";
                // Make the dice invisible
                document.querySelector('.dice').style.display = 'none';
                // Toggle winning player from active to winner class
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
    
            }else {
                //Next player
                nextPlayer();
            }
        }
        
    } 
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        /*
        *** TOGGLE EXAMPLE, these are what it would look like without toggle option ***
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('player-1-panel').classList.add('active');
        */
       document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-panel').classList.toggle('active');

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    // Starting the game - set scores to display as 0 and hide the die
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Set player names back to normal instead of "Winner"
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}