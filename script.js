'use strict';
//Function generating a random number from 1 to 6
let generateRndom = () => Math.floor(Math.random() * 6) + 1;

//Selecting Elements
let scoreP1 = document.querySelector('#score--0');
let scoreP2 = document.querySelector('#score--1');
let currentP1 = document.querySelector('#current--0');
let currentP2 = document.querySelector('#current--1');
let diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHelp = document.querySelector('.btn--help');
const help = document.querySelector('.help');
const overlay = document.querySelector('.overlay');
const btnClose = document.getElementById('btn-close');
const section1 = document.querySelector('.player--0');
const section2 = document.querySelector('.player--1');
let selectedPlayer, currentScore, scores, playing;

const reset = function () {
  diceImg.classList.add('hidden');
  selectedPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  //hiding the dice image
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  scores[(0, 0)] = 0;
  currentP1.textContent = 0;
  currentP2.textContent = 0;
  section1.classList.remove('player--winner');
  section2.classList.remove('player--winner');
  section1.classList.add('player--active');
  section2.classList.remove('player--active');
};

const closeHelp = function () {
  help.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Starting Conditions
reset();
const switchPlayer = function () {
  document.getElementById(`current--${selectedPlayer}`).textContent = 0;
  selectedPlayer = selectedPlayer === 0 ? 1 : 0;
  currentScore = 0;
  section1.classList.toggle('player--active');
  section2.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating a random dice
    const randomNumber = generateRndom();

    //displaying dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomNumber}.png`;
    //
    //check if dice =1
    if (randomNumber !== 1) {
      //add dice to current score
      currentScore += randomNumber;
      document.getElementById(`current--${selectedPlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[selectedPlayer] += currentScore;
    document.getElementById(`score--${selectedPlayer}`).textContent =
      scores[selectedPlayer];

    //check if player's score is >= 100
    //End game
    if (scores[selectedPlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${selectedPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${selectedPlayer}`)
        .classList.remove('player--active');
      diceImg.classList.add('hidden');
      alert(`Player ${selectedPlayer + 1} wins`);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
//new game button
btnNew.addEventListener('click', reset);

//help button
btnHelp.addEventListener('click', function () {
  help.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//close help
btnClose.addEventListener('click', closeHelp);

//press Esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !help.classList.contains('hidden')) closeHelp();
});
