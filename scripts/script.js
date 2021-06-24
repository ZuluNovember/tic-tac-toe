const Player = (sign) => {
    const symbol = sign;
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;
    return { increaseScore, getScore, symbol }
}

const Gameboard = (() => {
    let board = new Array(9);
    const getBoard = () => board
    const resetBoard = () => board = new Array(9)
    const insertSymbol = (index, symbol) => board[index] = symbol;
    const checkForWinner = () => {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let combination of winningCombinations) {
            if (board[combination[0]] === board[combination[1]]
                && board[combination[0]] === board[combination[2]]
                && board[combination[0]] !== undefined) {
                return combination
            }
        }
        return false;
    }
    return { getBoard, insertSymbol, resetBoard, checkForWinner }
})();

const Gamecontroller = (() =>{
    const player1 = Player('X')
    const player2 = Player('O')
    let playerOfTurn = player1
    const changeTurn = () => {playerOfTurn === player1 ? playerOfTurn = player2 : playerOfTurn = player1}
    const appendSymbol = (index, symbol) =>{
        Gameboard.insertSymbol(index, symbol)
        DisplayController.displayBoard()
    }
    const setScore = () =>{
        playerOfTurn.increaseScore()
        DisplayController.displayScore(player1.getScore(), player2.getScore())
    }
    const isWinning = () => Gameboard.checkForWinner()
    const isTie = () => Gameboard.getBoard().filter(x => x !== undefined).length === 9;
    const resetGameboard = () =>{
        Gameboard.resetBoard()
        DisplayController.displayBoard()
    }
    const gameFlowFunction = (target) => {
        if(target.innerText == ''){
            appendSymbol(target.dataset.index, playerOfTurn.symbol)
            if(isWinning()){
                setScore()
                resetGameboard()
            }else if(isTie()){
                resetGameboard()
            }
            changeTurn()
        }
    }
    
    return { gameFlowFunction }
})()
const DisplayController = (() => {
    const squares = document.querySelectorAll('.square');
    const scoreX = document.querySelector('.x-score');
    const scoreO = document.querySelector('.o-score');

    const displayBoard = () => {
        let gameBoardArr = Gameboard.getBoard();
        for (i in squares) {
            if (gameBoardArr[i]) {
                squares[i].innerText = gameBoardArr[i];
            }else{
                squares[i].innerText = ''
            }
        }
    }

    const displayScore = (x, o) =>{
        scoreX.innerText = x;
        scoreO.innerText = o;
    }

    const cleanBoard = () => squares.forEach(x => x.textContent = '')


    return { displayBoard, displayScore, cleanBoard }
}
)()

document.querySelectorAll('.square').forEach(x => x.addEventListener('click', e => Gamecontroller.gameFlowFunction(e.target)))
