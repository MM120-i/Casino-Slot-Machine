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


function deposit(){

    while(true){

        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
    
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
    
            console.log("Invalid deposit amount, try again.");
        }
        else{

            return numberDepositAmount;
        }
    }
}

function getNumberOfLines(){

    while(true){

        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){

            console.log("Invalid number of lines, try again.")
        }
        else{

            return numberOfLines;
        }
    }
}

function getBet(balance, lines){

    while(true){

        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){

            console.log("Invalid bet, try again.")
        }
        else{

            return numberBet;
        }
    }
}

function spin(){

    const symbols = [];

    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(var i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];

    for(var i = 0; i < COLS; i++){
        
        reels.push([]);
        const reelSymbols = [...symbols];
        for(var j = 0; j < ROWS; j++){

            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

function transpose(reels){

    const rows = [];

    for(var i = 0; i < ROWS; i++){

        rows.push([]);
        for(var j = 0; j < COLS; j++){

            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

function printRows(rows){

    for(const row of rows){

        let rowString = "";
        for(const [i, symbol] of row.entries()){

            rowString += symbol;

            if(i != row.length - 1){

                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

function getWinnings(rows, bet, lines){

    let winnings = 0;

    for(var row = 0; row < lines; row++){

        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){

            if(symbol != symbols[0]){

                allSame = false;
                break;
            }
        }
        
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    
    return winnings;
}

function game(){

    let balance =  deposit();

    while(true){    

        console.log("You have a balance of $" + balance);

        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winings = getWinnings(rows, bet, numberOfLines);

        balance += winings;
        console.log("You won, $" + winings.toString());

        if(balance <= 0){

            console.log("You ran out of money!! Lmao");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n) ");

        if(playAgain != "y" || playAgain != "Y"){
            break;
        }
    }
}

game();


//This project was inspired by https://www.youtube.com/watch?v=E3XxeE7NF30&ab_channel=TechWithTim
