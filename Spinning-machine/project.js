// This is a spinning machine game build using JavaScript

const prompt = require("prompt-sync")();

// Global variables
const ROWS = 3;
const COLS = 3;

// Symbols in the spinning machine
const symbolCount = {
    A:2,
    B:4,
    C:6,
    D:8
};

// Values for each symbols
const symbolValue = {
    A:5,
    B:4,
    C:3,
    D:2
       
};

// Function to deposit the initial betting amount
const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter the deposit amount: ")
        const numberdepositAmount = parseFloat(depositAmount);

        if(isNaN(numberdepositAmount) || numberdepositAmount <=0){
            console.log("Invalid amount. Try again.")
        }else{
            return numberdepositAmount;
        }
    }    
};

// Function to bet on the  no. of lines in the spinning machine
const getnoOfLines = () => { 
    while(true){
        const lines = prompt("Enter the no. of lines to bet on (1-3) : ")
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log("Invalid number of lines. Try again.")
        }else{
            return numberOfLines;
        }
    }
};

// Function to bet amount  per line
const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the total bet per line: ")
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines ){
            console.log("Invalid bet. Try again.")
        }else{
            return numberBet;
        }
    }
};

// Function to spin the symbols in the matrix on random order
const spin = () => {
    const symbols = []
    for(const[symbol,count] of Object.entries(symbolCount)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol);

        }
    }
    const reels = [[],[],[]];
    for(let i=0; i<COLS;i++){
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS;j++){
            const RandomIndex = Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol = reelSymbols[RandomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(RandomIndex,1);
        }
    }

    return reels;

};

// Transpose of the matrix
const transpose= (reels) =>{
    const rows =[];

    for(let i=0; i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};

// Displaying the Transpose matrix in form of Spinning reel
const printRows = (rows)=>{
    for(const row of rows){
        let rowString = "";
        for(const[i, symbol]of row.entries()){
            rowString += symbol
            if(i != row.length-1){
                rowString += " | "
            }
        }
        console.log(rowString);

    }
};

// Function to Calculate the Winnings of the user
const getWinnings = (rows, bet, lines) =>{
    let winnings = 0;

    for(let row=0; row<lines; row++){
        const symbols= rows[row];
        let allsame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allsame = false;
                break;
            }
        }

        if(allsame){
            winnings += bet*symbolValue[symbols[0]]
        }
    }

    return winnings;
};

// Function to loop the game
const game = () =>{
    let balance = deposit();
    while(true)
    {
        console.log("You have a balance of $"+ balance);
        const numberOfLines = getnoOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You won, $"+ winnings.toString())

        if(balance <= 0){
            console.log("You ran out of money!!");
            break;
        }

        const playagain = prompt("Do you want to play again (y/n) ?");

        if(playagain != "y")break;

    }
};

game();