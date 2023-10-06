import player from "../player/player";
i

export default function gameController() {
    const playerOne = player();
    const playerTwo = player();

    const players = [playerOne, playerTwo];
    let currPlayer = players[0];

    function switchCurrPlayer() {
        currPlayer = currPlayer === players[0] ? players[1] : players[0];
    }

    function getCurrPlayer() {
        return currPlayer;
    }

    function getCurrBoard() {
        return currPlayer.board;
    }

    return {
        getCurrPlayer, 
        playRound, 
        getCurrBoard
    }
}