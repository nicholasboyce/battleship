import gameboard from "./gameboard.js";
import ship from "../ship/ship.js";

test('Check that ship is not at coordinate 0, 0', () => {
    const cruiser = ship();
    const board = gameboard();
    expect(board.isValidPlacement(cruiser, [0, 0])).toBe(true);
});

test('Check that ship is at coordinate 0, 0', () => {
    const cruiser = ship();
    const board = gameboard();
    board.place(cruiser, [3, 7]);
    expect(board.isValidPlacement(cruiser, [0, 0])).toBe(true);
});

test('Check that ship can be placed at coordinate 0, 1', () => {
    const cruiser = ship(5);
    const testShip = ship(4);
    const board = gameboard();
    board.place(cruiser, [0, 0], "Y");
    expect(board.place(testShip, [0, 3], "X")).toBe(true);
});

test('Check that ship can\'t be placed at coordinate 0, 1', () => {
    const cruiser = ship(5);
    const testShip = ship(4);
    const board = gameboard();
    board.place(cruiser, [0, 0], "X");
    expect(board.place(testShip, [0, 1], "X")).toBe(false);
});

test('Check that attack is not received successfully', () => {
    const cruiser = ship(2, "Cruiser");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    expect(board.receiveAttack([0, 0])).toBe(false);
});

test('Check that attack is received successfully', () => {
    const cruiser = ship(2, "Cruiser");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    expect(board.receiveAttack([3, 0])).toBe(true);
});

test('Check that no attack registered', () => {
    const cruiser = ship(2, "Cruiser");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    expect(board.receiveAttack([7, 0])).toBe(false);
});

test('Check that all ships are sunk', () => {
    const cruiser = ship(1, "Cruiser");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    board.receiveAttack([3, 0]);
    expect(board.allShipsSunk()).toBe(true);
});

test('Check that all ships are sunk with more than one ship', () => {
    const cruiser = ship(1, "Cruiser");
    const destroyer = ship(1, "Destroyer");
    const armada = ship(1, "Armada");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    board.place(destroyer, [4, 4]);
    board.place(armada, [0, 7]);
    board.receiveAttack([3, 0]);
    board.receiveAttack([4, 4]);
    board.receiveAttack([0, 7]);
    expect(board.allShipsSunk()).toBe(true);
});

test('Check that all ships are not sunk with more than one ship', () => {
    const cruiser = ship(1, "Cruiser");
    const destroyer = ship(2, "Destroyer");
    const armada = ship(1, "Armada");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    board.place(destroyer, [4, 4]);
    board.place(armada, [0, 7]);
    board.receiveAttack([3, 0]);
    board.receiveAttack([4, 4]);
    board.receiveAttack([0, 7]);
    expect(board.allShipsSunk()).toBe(false);
});

test('Check that all ships are sunk with more than one ship and multiple attacks', () => {
    const cruiser = ship(1, "Cruiser");
    const destroyer = ship(2, "Destroyer");
    const armada = ship(1, "Armada");
    const board = gameboard();
    board.place(cruiser, [3, 0]);
    board.place(destroyer, [4, 4]);
    board.place(armada, [0, 7]);
    board.receiveAttack([3, 0]);
    board.receiveAttack([4, 4]);
    board.receiveAttack([4, 5]);
    board.receiveAttack([0, 7]);
    expect(board.allShipsSunk()).toBe(true);
});