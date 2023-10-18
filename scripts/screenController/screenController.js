import gameController from "../gameController/gameController.js";


export default function screenController() {
    const game = gameController();
    let setUpCount = 0;
    let isGameMode = false;
    let currPlayer = game.getCurrPlayer();
    let otherPlayer = game.getOtherPlayer();
    let currPlayerGen = generator(currPlayer.navy);
    let next = currPlayerGen.next();
    let piece = next.value;

    const playerTurnDiv = document.querySelector('.turn');
    const playerBoardDiv = document.querySelector('.player-board');
    const oppBoardDiv = document.querySelector('.opponent-board');
    const orientation = document.querySelector('.axis');
    const axisButton = document.querySelector('.axis-button');
    let axis;

    axisButton.addEventListener("click", changeAxis);

    function changeAxis(e) {
        const currAxis = orientation.textContent.toLowerCase();
        if (currAxis === 'x') {
            axis = orientation.textContent = 'Y';
        } else {
            axis = orientation.textContent = 'X';
        }
    }

    function* generator(array) {
        for (let i = 0; i < array.length; i+= 1) {
            yield array[i];
        }
    }

    function setGameModeTrue() {
        isGameMode = true;
        playerBoardDiv.removeEventListener("click", boardClickHandler);
        oppBoardDiv.addEventListener("click", boardClickHandler);
        return isGameMode;
    }
    
    function updateScreen() {
        currPlayer = game.getCurrPlayer();
        playerTurnDiv.textContent = isGameMode ? `It's ${currPlayer.name}'s turn!` : `Player ${currPlayer.name}, please place your ${piece.name}.`;
        renderBoard(currPlayer.getBoard());
        renderBoard(otherPlayer.getBoard());
    }

    function boardClickHandler(e) {
        const coords = [Number(e.target.dataset.row), Number(e.target.dataset.column)];
        console.log(coords);
        if (Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
            return;
        }
        if (!isGameMode) {
            currPlayer.place(piece, coords, axis);
            if (piece.placed) {
                next = currPlayerGen.next(); 
                piece = next.value;
                if (!next.done) {
                    updateScreen();
                }
            }
            if (next.done) {
                game.switchCurrPlayer();
                currPlayerGen = generator(game.getCurrPlayer().navy);
                piece = currPlayerGen.next().value;
                setUpCount++;
                if ( setUpCount > 1 ) setGameModeTrue();
            }
        } else {
            game.playRound(coords);
        } updateScreen();
    }

    function renderBoard(board) {

        const boardDiv = board === currPlayer.getBoard() ? playerBoardDiv : oppBoardDiv;
        boardDiv.textContent = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;

                if (cell instanceof Object && (board === currPlayer.getBoard())) {
                    cellButton.style.backgroundColor = 'green';
                };
                if (cell === 2) cellButton.style.backgroundColor = 'pink';
                boardDiv.appendChild(cellButton);
            })
        });
    }

    console.log(game.getCurrPlayer().navy);
    playerBoardDiv.addEventListener("click", boardClickHandler);
    
    updateScreen();
}