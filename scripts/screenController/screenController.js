import gameController from "../gameController/gameController.js";


export default function screenController() {
    
    let singlePlayerMode = true;


    const game = gameController(singlePlayerMode);
    let setUpCount = 0;
    let isGameMode = false;
    let currPlayer = game.getCurrPlayer();
    let otherPlayer = game.getOtherPlayer();
    let currPlayerGen = generator(currPlayer.navy);
    let next = currPlayerGen.next();
    let piece = next.value;

    currPlayer.name = prompt("Player One's Name? ");

    const playerTurnDiv = document.querySelector('.turn');
    const playerBoardDiv = document.querySelector('.player-board');
    const oppBoardDiv = document.querySelector('.opponent-board');
    const orientation = document.querySelector('.axis');
    const axisButton = document.querySelector('.axis-button');
    const enemyBoard = document.querySelector('.enemy');
    const sunk = document.querySelector('.sunk');

    if (singlePlayerMode) {
        //set up player board to handle click
        playerBoardDiv.addEventListener("click", singlePlayerClickHandler);
    } else {
        playerBoardDiv.addEventListener("click", dualPlayerClickHandler);
        otherPlayer.name = prompt("Player Two's Name? ");
    }

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
        singlePlayerMode ? playerBoardDiv.removeEventListener("click", singlePlayerClickHandler) : playerBoardDiv.removeEventListener("click", dualPlayerClickHandler);
        singlePlayerMode ? oppBoardDiv.addEventListener("click", singlePlayerClickHandler) : oppBoardDiv.addEventListener("click", dualPlayerClickHandler);
        axisButton.style.display = "none";
        enemyBoard.style.display = "block";
        return isGameMode;
    }
    
    function updateScreen() {
        currPlayer = game.getCurrPlayer();
        otherPlayer = game.getOtherPlayer();
        sunk.textContent = '';
        playerTurnDiv.textContent = `It's ${currPlayer.name}'s turn!`;
        renderBoard(currPlayer.getBoard());
        renderBoard(otherPlayer.getBoard());
    }

    /* || Contained functions are used for dual-player mode ||*/

    function dualPlayerClickHandler(e) {
        const coords = [Number(e.target.dataset.row), Number(e.target.dataset.column)];
        // console.log(coords);
        if (Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
            return;
        }
        if (!isGameMode) {
            placeShipHandler(coords);
        } else {
            attackHandler(coords);
            renderBoard(otherPlayer.getBoard());
            setTimeout(() => updateScreen(), 1500);
        } 
    }

    function placeShipHandler(coords) {
        const success = currPlayer.place(piece, coords, axis);
        if (success) {
            next = currPlayerGen.next(); 
            piece = next.value;
            renderBoard(currPlayer.getBoard());
            if (next.done) {
                playerTurnDiv.textContent = "Switching...";
                setTimeout(() => {
                    game.switchCurrPlayer();
                    //if player is human, use generator, otherwise AIplace function
                    if(singlePlayerMode) {
                        game.getCurrPlayer().computerPlace();
                        setGameModeTrue();
                    } else {
                        nextHumanPlayerPlace();
                    }
                    game.switchCurrPlayer();
                    updateScreen(); 
                }, 1000);
            } else {
                playerTurnDiv.textContent = `Player ${currPlayer.name}, please place your ${piece.name}.`;
            }
        }
    }

    function nextHumanPlayerPlace() {
        currPlayerGen = generator(game.getCurrPlayer().navy);
        piece = currPlayerGen.next().value;
        setUpCount++;
        if ( setUpCount > 1 ) setGameModeTrue();
    }

    /* || Contained functions are used for dual-player mode ||*/

    function attackHandler(coords) {
        const target = otherPlayer.objectAt(coords);
        const landed = game.playRound(coords);
        if (landed !== null) {
            playerTurnDiv.textContent = landed ? `...It's a hit on ${otherPlayer.name}'s ${target.name}!` : `...It's a miss!`;
            if (landed && target.isSunk()) {
                sunk.textContent = `${otherPlayer.name}'s ${target.name} was sunk!`;
            } 
        } else {
            playerTurnDiv.textContent = `Game over! ${currPlayer.name} wins!`;
        }
    }

    function singlePlayerClickHandler(e) {
        const coords = [Number(e.target.dataset.row), Number(e.target.dataset.column)];
        if (!Number.isNaN(coords[0]) && !Number.isNaN(coords[1])) {
            if (isGameMode) {
                attackHandler(coords);
                renderBoard(otherPlayer.getBoard());
                computerAttack();
            } else {
                placeShipHandler(coords);
            }
        }
    }

    function syncScreenAndGame() {
        currPlayer = game.getCurrPlayer();
        otherPlayer = game.getOtherPlayer();
    }

    function computerAttack() {
        syncScreenAndGame();

        const row = Math.floor(Math.random * 9);
        const col = Math.floor(Math.random * 9);

        console.log([row, col]);

        attackHandler([row, col]);
        syncScreenAndGame();
        renderBoard(currPlayer.getBoard());
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
    
    enemyBoard.style.display = "none";
    playerTurnDiv.textContent = `Player ${currPlayer.name}, please place your ${piece.name}.`;
    renderBoard(currPlayer.getBoard());
}