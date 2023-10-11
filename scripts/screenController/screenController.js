import gameController from "../gameController/gameController.js";


export default function screenController() {
    const game = gameController();
    let isGameMode = false;
    let currPlayer = game.getCurrPlayer();
    let currPlayerGen;

    function* generator(array) {
        for (item of array) {
            yield item;
        }
    }
    
    function placementPageLoad() {
        renderBoard();
        currPlayerGen = generator(currPlayer);
        boardDiv.addEventListener("click", boardClickHandler);
    }

    function boardClickHandler(e) {
        if (!isGameMode) {
            let piece = currPlayerGen.next().value();
            currPlayer.place(piece, [e.target.dataset.row, e.target.dataset.column], axis);
            if (piece.placed) {
                piece = currPlayerGen.next().value();
            }
            if (currPlayerGen.done) {
                game.switchCurrPlayer();
            }
        } else {
            game.playRound([e.target.dataset.row, e.target.dataset.column]);
        } 
    }


}