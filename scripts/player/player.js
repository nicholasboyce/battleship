import gameboard from "../gameboard/gameboard.js";
import ship from "../ship/ship.js";

export default function player(name = 'Player', type = 'human') {
    const shipTypes = [
        {
            length: 5,
            name: "Carrier"
        }, {
            length: 4,
            name: "Battleship"
        }, {
            length: 3,
            name: "Cruiser"
        }, {
            length: 3,
            name: "Submarine"
        }, {
            length: 2,
            name: "Destroyer"
        }
    ];

    const board = gameboard();
    const navy = shipTypes.map((model) => ship(model.length, model.name));
    

    function fireAttack(coordinates, board) {
        try {
            return board.receiveAttack(coordinates);
        } catch(err) {
            if (err instanceof TypeError) {
                return null;
            } else {
                throw err;
            }
        }
    }

    function getBoard() {
        return board.getBoard();
    }

    function place(ship, coordinates, orientation) {
        return board.place(ship, coordinates, orientation);
    }

    function objectAt(coords) {
        return board.objectAt(coords);
    }

    return { name, board, navy, place, fireAttack, type, getBoard, objectAt }

}