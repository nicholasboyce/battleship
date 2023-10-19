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
    const enemyBoard = document.querySelector('.enemy');

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
        axisButton.style.display = "none";
        enemyBoard.style.display = "block";
        return isGameMode;
    }
    
    function updateScreen() {
        currPlayer = game.getCurrPlayer();
        otherPlayer = game.getOtherPlayer();
        playerTurnDiv.textContent = isGameMode ? `It's ${currPlayer.name}'s turn!` : `Player ${currPlayer.name}, please place your ${piece.name}.`;
        renderBoard(currPlayer.getBoard());
        renderBoard(otherPlayer.getBoard());
    }

    function boardClickHandler(e) {
        const coords = [Number(e.target.dataset.row), Number(e.target.dataset.column)];
        // console.log(coords);
        if (Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
            return;
        }
        if (!isGameMode) {
            const success = currPlayer.place(piece, coords, axis);
            if (!success) {
                return;
            }
            next = currPlayerGen.next(); 
            piece = next.value;
            renderBoard(currPlayer.getBoard());
            if (next.done) {
                playerTurnDiv.textContent = "Switching...";
                setTimeout(() => {
                    game.switchCurrPlayer();
                    currPlayerGen = generator(game.getCurrPlayer().navy);
                    piece = currPlayerGen.next().value;
                    setUpCount++;
                    if ( setUpCount > 1 ) setGameModeTrue();
                    updateScreen();
                }, 1000);
            } else {
                playerTurnDiv.textContent = `Player ${currPlayer.name}, please place your ${piece.name}.`;
            }
        } else {
            const target = otherPlayer.objectAt(coords);
            const landed = game.playRound(coords);
            if (landed !== null) {
                playerTurnDiv.textContent = landed ? `...It's a hit on ${otherPlayer.name}'s ${target.name}!` : `...It's a miss!`;
            } else {
                playerTurnDiv.textContent = `Game over! ${currPlayer.name} wins!`;
            }
            renderBoard(otherPlayer.getBoard());
            setTimeout(() => updateScreen(), 1000);
        } 
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
                if (cell === 1) cellButton.style.backgroundColor = 'lightblue';
                boardDiv.appendChild(cellButton);
            })
        });
    }

    // console.log(game.getCurrPlayer().navy);
    playerBoardDiv.addEventListener("click", boardClickHandler);
    currPlayer.name = prompt("Player One's Name? ");
    otherPlayer.name = prompt("Player Two's Name? ");
    
    enemyBoard.style.display = "none";
    playerTurnDiv.textContent = `Player ${currPlayer.name}, please place your ${piece.name}.`;
    renderBoard(currPlayer.getBoard());
}