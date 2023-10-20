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

    function computerPlace() {
        if (this.type !== "human") {
            for (const ship of navy) {
                while (!ship.placed) {
                    const coords =  generateRandomCoords();
                    const axis = generateRandomAxis();
                    board.place(ship, coords, axis);
                }
            }
            return true;
        }
    }

    function generateRandomAxis() {
        const num = Math.floor(Math.random() * 2);
        if (num < 1) return 'X';
        return 'Y';
    }

    function generateRandomCoords() {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        return [row, col];
    }

    return { name, board, navy, place, fireAttack, type, getBoard, objectAt, computerPlace }

}