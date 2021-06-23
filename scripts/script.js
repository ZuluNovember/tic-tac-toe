const Player = (sign) => {
    const symbol = sign;
    let score = 0;
    const increaseScore = () => score++;
    const getScore = () => score;
    return { increaseScore, getScore }
}

const Gameboard = (() => {
    let board = new Array(9);
    const getBoard = () => board
    const insertSymbol = (index, symbol) => board[index] = symbol
    const checkForWinner = () => {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let combination of winningCombinations) {
            if (gameArr[combination[0]] === gameArr[combination[1]]
                && gameArr[combination[0]] === gameArr[combination[2]]
                && gameArr[combination[0]] !== undefined) {
                return gameArr[combination[0]]
            }
        }
        return false;
    }
    return { getBoard, insertSymbol }
})();

const Gamecontroller = (() =>{
    
})
const DisplayController = (() => {
    const squares = document.querySelectorAll('.square');
    const scoreX = document.querySelector('.x-score');
    const scoreO = document.querySelector('.o-score');

    const displayBoard = () => {
        let gameBoardArr = Gameboard.getBoard();
        for (i in squares) {
            if (gameBoardArr[i]) {
                squares[i].innerText = gameBoardArr[i];
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