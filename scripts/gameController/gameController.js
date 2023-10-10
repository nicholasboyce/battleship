import player from "../player/player.js";
import promptSync from "prompt-sync";

const prompt = promptSync();



export default function gameController() {
    const playerOne = player("One");
    const playerTwo = player("Two");

    const players = [playerOne, playerTwo];
    let currPlayer = players[0];
    let currPlayerIndex = 0;

    function switchCurrPlayer() {
        currPlayer = currPlayer === players[0] ? players[1] : players[0];
        currPlayerIndex = (currPlayerIndex + 1) % 2;
    }

    function getCurrPlayer() {
        return currPlayer;
    }

    function getCurrBoard() {
        return currPlayer.board;
    }

    function playRound(coordinates) {
        const otherPlayerIndex = (currPlayerIndex + 1) % 2;
        const otherPlayerBoard = players[otherPlayerIndex].board;
        console.log(`It's ${currPlayer.name}'s turn.`);
        const result = currPlayer.fireAttack(coordinates, otherPlayerBoard);
        if (result !== null) { 
            if ( otherPlayerBoard.allShipsSunk() ) {
                console.log("Game over!");
                return null;
            } else {
                switchCurrPlayer();
                return true;
            }
        };
        
    }

    function printBoard() {
        const currBoard = currPlayer.getBoard();
        console.table(currBoard);
    }

    function placePrompt() {
        const navy = currPlayer.navy;

        for (const ship of navy) {
            while(!ship.placed) {
                console.log(`Waiting for ${currPlayer.name} to place their ${ship.name}...`);
                const xCoord = Number(prompt('Please input target X coordinate. '));
                const yCoord = Number(prompt('Please input target Y coordinate. '));
                const coords = [xCoord, yCoord];
                const orientation = prompt('Please input desired orientation. ');
                currPlayer.place(ship, coords, orientation);
            }
            printBoard();
        }
    }

    function setUp() {
        const name = prompt("What's your name? ");
        currPlayer.name = name;
        
        //for current ship; only progress loop to next ship once current ship has been placed. break loop once all finished
        printBoard();
        placePrompt();



        //only do this once all ships have been placed
        switchCurrPlayer();
    }

    // function main() {
    //     setUp();
    //     setUp();
    // }

    // main();

    return {
        getCurrPlayer, 
        playRound, 
        getCurrBoard,
        setUp
    }
}

// gameController();