import './style.css';
import ship from './scripts/ship/ship';
import gameboard from './scripts/gameboard/gameboard';
import player from './scripts/player/player';


function gameController() {
    const playerOne = player();
    const playerTwo = player();

    const players = [playerOne, playerTwo];
    let currPlayer = 0;


    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const orientation = document.querySelector('.axis');
    const axisButton = document.querySelector('.axis-button');

    axisButton.addEventListener("click", changeAxis);

    function changeAxis(e) {
        const currAxis = orientation.textContent.toLowerCase();
        if (currAxis === 'x') {
            orientation.textContent = 'Y';
        } else {
            orientation.textContent = 'X';
        }
    }



    async function validPlacement(board, player, piece, axis) {
        return new Promise((res) => {
            playerTurnDiv.textContent = `Player ${player.name}, please place your ${piece.name}.`;
            board.addEventListener("click", function waiting(e) {
                player.place(piece, [e.target.dataset.row, e.target.dataset.column], axis);
                if (piece.placed) {
                    board.removeEventListener("click", waiting);
                    res();
                }
            });
        });
    }

    async function playerSetUp(player) {
        player.name = prompt("What's your name? ");
        const board = player.getBoard();
        renderBoard(board);
        const navy = player.navy;
        const axis = orientation.textContent;
        for (const piece of navy) {
            await validPlacement(boardDiv, player, piece, axis);
        }
    }

    async function gameSetUp() {

        for (const player of players) {
            await playerSetUp(player);
        }
        
    }

    function updateScreen() {
        boardDiv.textContent = "";


    }

    function switchCurrPlayer() {
        currPlayer = (currPlayer + 1) % 2;
    }

    function getCurrPlayer() {
        return players[currPlayer];
    }

    function renderBoard(board) {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                boardDiv.appendChild(cellButton);
            })
        });
    }

    //   // Add event listener for the board
    // function clickHandlerBoard(e) {
    //     const selectedColumn = e.target.dataset.column;
    //     // Make sure I've clicked a column and not the gaps in between
    //     if (!selectedColumn) return;
        
    //     updateScreen();
    // }
    // boardDiv.addEventListener("click", clickHandlerBoard);
    gameSetUp();
}

gameController();