const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
};

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
};


// Function to prompt the user for an initial deposit amount
function deposit() {

    // Declare a variable to store the parsed deposit amount
    let numberDepositAmount;

    // Loop until a valid deposit amount is provided
    while (true) {

        // Prompt user for a deposit amount and parse it
        const depositAmount = prompt("Enter a deposit amount: ");
        numberDepositAmount = parseFloat(depositAmount);

        // Check if it's a valid numeric value and greater than zero, then exit the loop
        if (!isNaN(numberDepositAmount) && numberDepositAmount > 0) {
            break;
        }

        // Display an error message for invalid or non-positive input
        console.log("Invalid deposit amount, try again.");
    }

    // Return the valid deposit amount
    return numberDepositAmount;
}

// Function to prompt the user for the number of lines to bet on (between 1 and 3)
function getNumberOfLines() {

    // Declare a variable to store the parsed number of lines
    let numberOfLines;

    // Create a loop to keep prompting until a valid input is provided
    while (true) {

        // Prompt the user for the number of lines and parse it
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        numberOfLines = parseFloat(lines);

        // Check if it's a valid numeric value and within the specified range (1-3)
        if (!isNaN(numberOfLines) && numberOfLines >= 1 && numberOfLines <= 3) {
            // If valid, exit the loop
            break;
        }

        // Display an error message for invalid input
        console.log("Invalid number of lines, try again.");
    }

    // Return the valid number of lines
    return numberOfLines;
}

// Function to prompt the user for the bet amount per line
function getBet(balance, lines) {

    // Declare a variable to store the parsed bet amount
    while (true) {

        // Prompt the user to enter the bet amount per line
        const bet = prompt("Enter the bet per line: ");
        // Parse the user's input as a floating-point number and store it in 'numberBet'
        const numberBet = parseFloat(bet);

        // Check if 'numberBet' is not a valid numeric value, is non-positive,
        // or exceeds the available balance per line
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            // If the input is invalid, display an error message
            console.log("Invalid bet, try again.");
        } else {
            // If the input is valid, exit the loop and return the bet amount
            return numberBet;
        }
    }
}

// Function to simulate spinning the slot machine reels and generating random symbols
function spin() {

    const symbols = [];

    // Generate an array of symbols based on SYMBOLS_COUNT configuration
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (var i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // Initialize an array to represent the reels
    const reels = [[], [], []];

    // Create and populate the reels with random symbols
    for (var i = 0; i < COLS; i++) {

        reels.push([]);
        const reelSymbols = [...symbols]; // Create a copy of the symbols array

        // Fill each reel with random symbols
        for (var j = 0; j < ROWS; j++) {

            // Generate a random index to select a symbol from reelSymbols
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];

            // Push the selected symbol to the current reel and remove it from reelSymbols
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels; // Return the generated reels
}


// Function to transpose the symbols in the reels to rows
function transpose(reels) {

    const rows = [];

    // Loop through the rows (equal to the number of rows in a reel)
    for (var i = 0; i < ROWS; i++) {
        rows.push([]); // Initialize an empty row for each loop iteration

        // Loop through the columns (equal to the number of reels)
        for (var j = 0; j < COLS; j++) {
            // Push the symbol from the corresponding position in the reels to the current row
            rows[i].push(reels[j][i]);
        }
    }

    return rows; // Return the transposed rows
}

// Function to print the rows with symbols
function printRows(rows) {

    for (const row of rows) {
        let rowString = "";

        // Loop through the symbols in the row
        for (const [i, symbol] of row.entries()) {

            rowString += symbol;

            // Add a separator (|) between symbols, except for the last symbol
            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        
        console.log(rowString); // Print the row with symbols
    }
}

// Function to calculate the total winnings based on matched symbols in the rows
function getWinnings(rows, bet, lines) {

    let winnings = 0;

    // Loop through the lines that the user has bet on
    for (var row = 0; row < lines; row++) {

        const symbols = rows[row]; // Get the symbols in the current row
        let allSame = true;

        // Check if all symbols in the row are the same
        for (const symbol of symbols) {

            if (symbol !== symbols[0]) {

                allSame = false;
                break;
            }
        }

        // If all symbols in the row are the same, calculate and add the winnings
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings; // Return the total winnings
}


// Function to simulate the slot machine game
function game() {
    // Initialize the player's balance by calling the 'deposit' function
    let balance = deposit();

    // Create an infinite loop to allow the player to keep playing
    while (true) {
        // Display the player's current balance
        console.log("You have a balance of $" + balance);

        // Prompt the player to enter the number of lines to bet on
        const numberOfLines = getNumberOfLines();
        // Prompt the player to enter the bet amount per line
        const bet = getBet(balance, numberOfLines);
        // Deduct the total bet amount from the player's balance
        balance -= bet * numberOfLines;

        // Spin the reels to generate symbols
        const reels = spin();
        // Transpose the symbols from reels into rows for easier evaluation
        const rows = transpose(reels);
        // Print the generated rows with symbols
        printRows(rows);
        // Calculate the winnings based on matched symbols
        const winnings = getWinnings(rows, bet, numberOfLines);
        // Add the winnings to the player's balance
        balance += winnings;
        // Display the amount won
        console.log("You won, $" + winnings.toString());

        // Check if the player's balance has reached zero or below
        if (balance <= 0) {
            // If the balance is depleted, inform the player and exit the game loop
            console.log("You ran out of money!! Lmao");
            break;
        }

        // Prompt the player to play again or exit the game
        const playAgain = prompt("Do you want to play again? (y/n) ");

        // Check if the player wants to exit the game
        if (playAgain !== "y" && playAgain !== "Y") {
            // If not, exit the game loop
            break;
        }
    }
}

// Start the slot machine game by invoking the 'game' function
game();



//This project was inspired by https://www.youtube.com/watch?v=E3XxeE7NF30&ab_channel=TechWithTim
