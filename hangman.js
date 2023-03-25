"use strict";

// VARIABLES
const input = document.querySelector("#user-input");
const underscores = document.querySelector("#underscores");
const btnOK = document.querySelector(".button");
const buttons = document.querySelector("#buttons");
const btnLetter = document.querySelectorAll(".letter");
const livesCounter = document.querySelector(".lives-counter");
let userWord = "";
let arrUnderscores = [];
let lives = 10;

underscores.textContent = "H A N G M A N";
livesCounter.textContent = lives;

// FUNCTIONS
const clickOk = function (e) {
    e.preventDefault();

    // Remove focus from user's input
    input.blur();

    // If user input is not empty...
    if (input.value !== "") {
        // Clear data and update UI
        lives = 10;
        livesCounter.textContent = lives;
        arrUnderscores = [];
        userWord = input.value;
        userWord = userWord.toUpperCase();
        input.value = "";

        // Clear buttons UI
        btnLetter.forEach((btn) => {
            btn.disabled = false;
            btn.style.backgroundColor = "";
        });

        // Push underscores into array and display them
        Array.from(userWord).forEach(() => {
            arrUnderscores.push("_");
            underscores.textContent = arrUnderscores.join(" ");
        });
    } else alert("Enter your word!");
};

const clickLetter = function (e) {
    // If user's word contains chosen letter...
    if (
        userWord.includes(e.target.textContent) &&
        e.target.classList.value === "letter" &&
        arrUnderscores.length !== 0
    ) {
        // Replace underscore with chosen letter
        Array.from(userWord).forEach((letter, i) => {
            if (letter === e.target.textContent) arrUnderscores[i] = letter;
        });
        underscores.textContent = arrUnderscores.join(" ");

        // If all underscores are replaced with letters, clear data
        if (!arrUnderscores.includes("_")) {
            arrUnderscores = [];
            userWord = "";
        }

        // Disable button and make it green
        setButtonColor(e.target, "#4DD292");
    }

    // If user's word doesn't contain chosen letter...
    if (
        !userWord.includes(e.target.textContent) &&
        e.target.classList.value === "letter" &&
        arrUnderscores.length !== 0
    ) {
        // Decrease lives counter and update UI
        lives--;
        livesCounter.textContent = lives;

        // If lives counter is 0, display user's word and clear data
        if (lives === 0 || !arrUnderscores.includes("_")) {
            underscores.textContent = Array.from(userWord).join(" ");
            arrUnderscores = [];
            userWord = "";
        }

        // Disable button and make it red
        setButtonColor(e.target, "#DC3221");
    }
};

const pressKey = function (e) {
    const key = e.key.toUpperCase();

    // If user's word contains pressed letter...
    if (userWord.includes(key) && arrUnderscores.length !== 0) {
        // Replace underscore with chosen letter
        Array.from(userWord).forEach((letter, i) => {
            if (letter === key) arrUnderscores[i] = letter;
        });
        underscores.textContent = arrUnderscores.join(" ");

        // If all underscores are replaced with letters, clear data
        if (!arrUnderscores.includes("_")) {
            arrUnderscores = [];
            userWord = "";
        }
        // Disable button and make it green
        btnLetter.forEach((letter) => {
            if (letter.textContent === key) {
                setButtonColor(letter, "#4DD292");
            }
        });
    }

    // If user's word doesn't contain pressed letter...
    if (!userWord.includes(key) && arrUnderscores.length !== 0) {
        // If button is disabled don't decrease lives
        btnLetter.forEach((letter) => {
            if (letter.textContent === key && !letter.disabled) {
                // Decrease lives counter and update UI
                lives--;
                livesCounter.textContent = lives;
            }
        });

        // If lives counter is 0, display user's word and clear data
        if (lives === 0 || !arrUnderscores.includes("_")) {
            underscores.textContent = Array.from(userWord).join(" ");
            arrUnderscores = [];
            userWord = "";
        }

        // Disable button and make it red
        btnLetter.forEach((letter) => {
            if (letter.textContent === key) {
                setButtonColor(letter, "#DC3221");
            }
        });
    }
};

const setButtonColor = function (element, color) {
    element.style.backgroundColor = color;
    element.style.color = "black";
    element.disabled = true;
};

//EVENT LISTENERS

// When user click OK button
btnOK.addEventListener("click", clickOk);

// When user click on a letter
buttons.addEventListener("click", clickLetter);

// When user pressed a key
document.addEventListener("keydown", pressKey);
