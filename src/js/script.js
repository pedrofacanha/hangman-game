document.addEventListener("DOMContentLoaded", () => {
// Fetch HTML elements
const mainKeyboard = document.querySelector(".grid-box");
const placeholder = document.querySelector(".placeholder");
const life = document.querySelector(".life");
const attempts = document.getElementById("attempts");

// List of words
const movies = [  "Shrek","Frozen",
    "Mulan",
    "Aladdin",
    "Moana",
    "Tangled",
    "Coco",
    "Zootopia",
    "The Lion King",
    "Tarzan",
    "Bambi",
    "Dumbo",
    "The Little Mermaid",
    "Pocahontas",
    "Robin Hood",
    "Hercules",
    "Ratatouille",
    "Beauty and the Beast",
    "Snow White",
    "The Hunchback of Notre Dame",
    "The Jungle Book"
];

const HANGMANPICS = [
    `  
      +---+
      |   |
          |
          |
          |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
          |
          |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========`,
    `  
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========`  
    ];

// Initialize hangman pics
attempts.textContent = HANGMANPICS[0];

let correctGuess = 0;
let wrongGuess = 0;
let maxAttempts = 6;

/**
 * Add buttons to a specific <div> in the HTML file
 */
function addButtons(){
    const row1 = document.createElement("div");
    const row2 = document.createElement("div");
    const row3 = document.createElement("div");

    row1.className = "keyboard";
    row2.className = "keyboard";
    row3.className = "keyboard";

    // Loop through ASCII alphabet values to get button's letter
    for (let i = 65; i <= 90; i++) {
        // 1. Assign letter to a variable
        const letter = String.fromCharCode(i);

        // 2. Create button elements and add letters to it
        const btn = document.createElement("button");
        btn.append(letter);

        if(i <= 73){
            row1.append(btn);
            mainKeyboard.appendChild(row1);
        } else if(i > 73 && i <= 81){
            row2.append(btn);
            mainKeyboard.appendChild(row2);
        } else {
            row3.append(btn);
            mainKeyboard.appendChild(row3);
        }

    }
    return mainKeyboard;
}

addButtons();

/**
 * Function generates the random word
 */
function getWord(list){
    // 1. Randomly pick a word from current list
    const n = Math.floor(Math.random() * list.length);

    // 2. Split list element
    const letters = list[n];
    const word = letters.toUpperCase().split("");

    return word; // 3. Returns a word splitted e.g. "a,r,g,e,n,t,i,n,a"
}

// Fetch word
const word = getWord(movies);
console.log(word);

/**
 * Create <div>'s placeholders
 */
function createPlaceholders(word){

    for(i = 0; i < word.length; i++){
        const spot = document.createElement("div");
        spot.textContent = "_";

        // Add "hiphen" if word has whitespace
        if(word[i] === " "){
            spot.textContent = "-";
        }

        placeholder.appendChild(spot);
    }
}

createPlaceholders(word);

/**
 * Function checks attempts and replace placeholders content with letter
 */

// Fetch buttons
const button = document.querySelectorAll('button');

function play(word){
    // Initialize correctGuess based on how many hiphens the word has
    const lastWord = word.join('').split(" ");
    correctGuess = lastWord.length - 1;

    button.forEach(btn => {
        btn.addEventListener('click', function() {
            let match = false; // Inside the listener so it resets each time
    
            for (let i = 0; i < word.length; i++) {
                if (btn.textContent === word[i]) {
                    correctGuess++;

                    // Update placeholder "spot" with the correct letter
                    placeholder.children[i].textContent = word[i];

                    // Update "match variable"
                    match = true;

                    // Check console.log
                    console.log(correctGuess);
                }
            }

            if(correctGuess == word.length){
                alert('Congratulations! You win!');
                window.location.reload();
            }

            if (!match) {
                wrongGuess++;

                // Update hangman image
                attempts.textContent = HANGMANPICS[wrongGuess];

                // Remove one "heart" for every wrong attempt
                life.removeChild(life.children[0]);
                
                // Display the wrong letter to the user
                const p = document.createElement('p');
                p.textContent += btn.textContent + "-";
                life.append(p);

                console.log("Wrong! Total:", wrongGuess);
            }

            if (wrongGuess === maxAttempts) {
                const res = word.join("");
                alert(`The name of the movie was ${res}.\n GAME OVER!`);
                window.location.reload();
            }

            btn.disabled = true;
        });
    });
}

play(word);

});