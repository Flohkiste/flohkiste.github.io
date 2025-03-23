let curPlayer = 1;
let logField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let winningFields = [];
let gameRunning = true;
let fields, modal, popupP;

document.addEventListener("DOMContentLoaded", () => {
  const playfield = document.getElementById("playfield");
  fields = playfield.getElementsByClassName("field");

  // Get the modal
  modal = document.getElementById("myModal");
  popupP = document.getElementById("popupText");
  const rematchBtn = document.getElementById("rematchBtn");

  for (let element of fields) {
    element.addEventListener("click", () => {
      clickField(element);
    });
  }

  rematchBtn.addEventListener("click", () => {
    rematch();
  });
});

function clickField(element) {
  if (!gameRunning) {
    return;
  }

  if (
    element.getElementsByClassName("fa-xmark")[0].style.display == "block" ||
    element.getElementsByClassName("fa-circle")[0].style.display == "block"
  ) {
    return;
  }

  let icon = element.getElementsByClassName(
    curPlayer === 1 ? "fa-xmark" : "fa-circle"
  )[0];

  logField[element.id] = curPlayer;
  //element.style.backgroundColor = curPlayer === 1 ? "green" : "blue";
  icon.style.display = "block";
  if (checkForWin()) {
    //playfield.style.backgroundColor = "green";
    gameRunning = false;
    displayWinningFields();

    popupP.innerText = "Player " + curPlayer + " won";
    modal.style.display = "block";
    return;
  }
  if (checkForDraw()) {
    playfield.style.backgroundColor = "red";

    popupP.innerText = "Draw";
    modal.style.display = "block";
    return;
  }
  changePlayer();
}

function changePlayer() {
  if (curPlayer == 1) {
    curPlayer = 2;
  } else {
    curPlayer = 1;
  }

  document.getElementById("curPlayerDisplay").innerText =
    "Player " + curPlayer + " to Move";
}

function checkForWin() {
  if (checkForWinHor() | checkForWinVer() | checkForWinDia()) {
    return true;
  }

  return false;
}

function checkForWinHor() {
  for (let y = 0; y < 3; y++) {
    if (
      logField[y * 3] == logField[y * 3 + 1] &&
      logField[y * 3 + 1] == logField[y * 3 + 2] &&
      logField[y * 3] != 0
    ) {
      winningFields = [y * 3, y * 3 + 1, y * 3 + 2];
      return true;
    }
  }
}

function checkForWinVer() {
  //0, 3, 6:   1, 4, 7:    2, 5, 8

  for (let y = 0; y < 3; y++) {
    if (
      logField[0 + y] == logField[3 + y] &&
      logField[3 + y] == logField[6 + y] &&
      logField[0 + y] != 0
    ) {
      winningFields = [0 + y, 3 + y, 6 + y];
      return true;
    }
  }
}

function checkForWinDia() {
  if (
    logField[0] == logField[4] &&
    logField[4] == logField[8] &&
    logField[0] != 0
  ) {
    winningFields = [0, 4, 8];
    return true;
  }
  if (
    logField[2] == logField[4] &&
    logField[4] == logField[6] &&
    logField[2] != 0
  ) {
    winningFields = [2, 4, 6];
    return true;
  }
}

function displayWinningFields() {
  for (let wField of winningFields) {
    fields[wField].style.backgroundColor = "green";
  }
}

function checkForDraw() {
  let y = 0;
  for (let x = 0; x < 9; x++) {
    if (logField[x] != 0) {
      y++;
    }
  }

  if (y == 9) {
    return true;
  }

  return false;
}

function rematch() {
  modal.style.display = "none";
  logField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  winningFields = [];
  playfield.style.backgroundColor = "black";

  for (let element of fields) {
    element.getElementsByClassName("fa-xmark")[0].style.display = "none";
    element.getElementsByClassName("fa-circle")[0].style.display = "none";
    element.style.backgroundColor = "white";
  }

  gameRunning = true;
  curPlayer = 1;
}
