# Casino Slot Machine
Slot Machine in JavaScript with Node.js

**Disclaimer:**

This project is created for educational and recreational purposes only. I do not encourage or support real gambling.

This project is an implementation of a simple casino-style slot machine using JavaScript and Node.js. The slot machine allows users to deposit an initial amount of money and then bet on a configurable number of lines with a set bet amount per line. The game's objective is to spin the slot reels and try to match symbols on the selected lines to win money.

## Key Features:

1) Deposit Functionality: The game starts by prompting the user to enter an initial deposit amount. The user must input a valid positive numeric value, ensuring they start with a valid balance.

2) Line and Bet Configuration: Users are prompted to choose the number of lines they want to bet on (between 1 and 3) and specify their bet amount per line. The game checks for valid inputs to ensure a fair betting experience.

3) Random Reel Spinning: The core gameplay involves randomizing the symbols on the slot machine's reels. Each reel contains symbols with different frequencies (defined in SYMBOLS_COUNT). The spin function generates a random set of symbols for each reel.

4) Symbol Matching and Winnings Calculation: After spinning the reels, the symbols on each line are checked for matches. If all symbols on a line are the same, the player wins a prize based on the symbol's value (defined in SYMBOL_VALUES). The getWinnings function calculates the winnings for the player.

5) Game Loop: The game operates within a loop, allowing the player to continue playing until their balance reaches zero. After each round, the player's balance is updated, and they have the option to play again.


This simple slot machine project provides an enjoyable and interactive gambling experience. Users can deposit, configure their bets, and spin the reels in the hopes of winning big. The game loop ensures an engaging and continuous gaming experience until the player decides to quit or runs out of funds.

