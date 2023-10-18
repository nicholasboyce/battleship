import player from "../player/player.js";


export default function gameController() {
    const playerOne = player("One");
    const playerTwo = player("Two");

    const players = [playerOne, playerTwo];
    let currPlayer = players[0];
    let currPlayerIndex = 0;

    let winner = null;

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
        const result = currPlayer.fireAttack(coordinates, otherPlayerBoard);
        if (result !== null) { 
            if ( otherPlayerBoard.allShipsSunk() ) {
                winner = currPlayer;
                console.log(`Game over! ${winner.name} wins!`);
                return null;
            } else {
                switchCurrPlayer();
                return true;
            }
        };
        
    }

    function getOtherPlayer() {
        const otherPlayerIndex = (currPlayerIndex + 1) % 2;
        const otherPlayer = players[otherPlayerIndex];
        return otherPlayer;
    }

    return {
        getCurrPlayer, 
        playRound, 
        getCurrBoard,
        switchCurrPlayer,
        getOtherPlayer
    }
}