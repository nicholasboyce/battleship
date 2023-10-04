/**
 * 
 * Creates a gameboard where 0 means untouched, 1 means missed, 2 means ship destroyed
 * 
 * @returns void
 */
export default function gameboard() {
    const board = [];
    const rows = 8;
    const columns = 8;
    let sunken = 0;
    const navy = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(0);
        }
    }

    function getBoard() {
        return board;
    };

    function place(ship, coordinates, orientation = 'x') {
        orientation = orientation.toLowerCase();

        if (!isInvalidPlacement(ship, coordinates, orientation)) {
            //Determine the orientation of the ship
            const rowCoord = coordinates[0];
            const colCoord = coordinates[1];
            if (orientation === 'x') {
                for (let i = colCoord; i < coordinates[1] + ship.length; i++) {
                    board[coordinates[0]][i] = ship;
                }
                navy.push(ship);
                ship.placed = true;
            } else {
                for (let i = rowCoord; i < coordinates[0] + ship.length; i++) {
                    board[i][coordinates[1]] = ship;
                }
                navy.push(ship);
                ship.placed = true;
            }   
        }
    }

    //only used for setting up board initially
    function isInvalidPlacement(ship, coordinates, orientation = 'x') {
        const rowCoord = coordinates[0];
        const colCoord = coordinates[1];

        if (orientation === 'x') {
            for (let i = colCoord; i < coordinates[1] + ship.length; i++) {
                if ( (board[coordinates[0]][i] !== 0) && (board[coordinates[0]][i] !== 1)) {
                    return true; //If not 0 or 1, then it's ship.
                }
            }
        } else {
            for (let i = rowCoord; i < coordinates[0] + ship.length; i++) {
                if ((board[i][coordinates[1]] !== 0) && (board[coordinates[0]][i] !== 1)) {
                    console.log(true);
                    return true;
                }
            }
        } return false;
    }

    function missed(coordinates) {
        return (board[coordinates[0]][coordinates[1]]) === 1; 
    }

    function receiveAttack(coordinates) {
        const valid = isValidTarget(board[coordinates[0]][coordinates[1]]);
        if (!valid) return;

        const target = board[coordinates[0]][coordinates[1]];
        if (target === 0) {
            board[coordinates[0]][coordinates[1]] = 1; //show that they missed
            return false;
        } else {
            target.hit();
            if (target.isSunk()) {
                sunken = sunken + 1;
            } 
            return true; 
        }
    }
    

    /**
     * If coordinate is either off the board (undefined), an already hit target(2), or an already missed target(1), return false.
     * Else if coordinate is an unhit target (Object), or open sea(0), return true.
     * This is about the validity of the target, not the SUCCESS.
     * @param {Array} coordinates 
     */
    function isValidTarget(target) {

        if (typeof target === "object") {
            return true;
        } else if (target === 0) {
            return true;
        } else {
            return false;
        }
    }

    function allShipsSunk() {
        return sunken >= navy.length;
    }

    return { place, isInvalidPlacement, missed, getBoard, receiveAttack, allShipsSunk }
}
