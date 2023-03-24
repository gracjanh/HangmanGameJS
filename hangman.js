"use strict";

//Variables
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

// Function
const disableBtn = function (element, color) {
    element.style.backgroundColor = color;
    element.style.color = "black";
    element.disabled = true;
};

// Event listener - OK button
btnOK.addEventListener("click", function (e) {
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
});

// Event listener - letter buttons
buttons.addEventListener("click", function (e) {
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
        disableBtn(e.target, "#4DD292");
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
        disableBtn(e.target, "#DC3221");
    }
});

// FIX Don't decrease lives counter if the wrong letter has been pressed more than once

// When user pressed a key
document.addEventListener("keydown", function (e) {
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
        btnLetter.forEach(function (letter) {
            if (letter.textContent === key) {
                disableBtn(letter, "#4DD292");
            }
        });
    }

    // If user's word doesn't contain pressed letter...
    if (!userWord.includes(key) && arrUnderscores.length !== 0) {
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
        btnLetter.forEach(function (letter) {
            if (letter.textContent === key) {
                disableBtn(letter, "#DC3221");
            }
        });
    }
});
