//SELECTING ELEMENTS FOR FURTHER MANIPULATIONS//
const pl0 = document.querySelector(".player--0");
const pl1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const diceImg = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const currScore0 = document.getElementById("current--0");
const currScore1 = document.getElementById("current--1");

//SET INITIAL SCORE VALUES TO 0//
score0.textContent = 0;
score1.textContent = 0;

//VARIABLES FOR STORING CURRENT VALUES TO CHANGE
let score, currentScore, isPlaying;
let activePlayer = 0;
//ATTACHING HIDDEN CLASS ON ELEMENTS//
diceImg.classList.add("hidden");

//FUNCTION TO RESET VALUES TO INITIAL SET
function init() {
  score = [0, 0];
  currentScore = 0;

  isPlaying = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  pl0.classList.add("player--active");
  activePlayer = 0;
}

init();
//HELPING FUNCTION FOR RESETING SCORE AND SWITCHING PLAYERS
function togglePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  pl0.classList.toggle("player--active");
  pl1.classList.toggle("player--active");
}
//ADDING FUNCTION TO ROLL BUTTON
btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    //1. GENERATE RANDOM NUMBER IN RANGE 1 - 6
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    //2. RM HIDDEN CLASS AND DISPLAY RESPECTIVE DICE IMG ON THROW
    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${dice}.png`;

    //3. CHECK DICE NUMBER AND ADD SCORE
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // currScore0.textContent = currentScore;
    } else {
      togglePlayer();
    }
  }
});

//ADDING FUNCTION ON HOLD BUTTON TO SAVE SCORE
btnHold.addEventListener("click", () => {
  if (isPlaying) {
    //1.SAVING SCORE OF ACTIVE PLAYER INTO SCORE
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).innerHTML =
      score[activePlayer];
    //2.CHECKING SCORE FOR 100 OR MORE POINTS
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceImg.classList.add("hidden");
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else togglePlayer();
  }
});

//FUNCTION TO RESET ALL GAME STATS ON CLICKING NEW GAME
btnNew.addEventListener("click", () => {
  init();
});
