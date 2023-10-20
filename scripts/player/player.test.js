import player from "./player";
import ship from "../ship/ship";

test('Player name is properly generated', () => {
    const playerOne = player("Yumi");
    expect(playerOne.name).toBe("Yumi");
});

test('Fire attack is properly handling hits', () => {
    const playerOne = player("Yumi");
    const playerTwo = player("Sissy");
    const oppBoard = playerTwo.board;
    const cruiser = playerTwo.navy[2];
    playerTwo.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([3, 0], oppBoard)).toBe(true);
});

test('Fire attack is properly handling hits', () => {
    const playerOne = player("Yumi");
    const playerTwo = player("Sissy");
    const oppBoard = playerTwo.board;
    const cruiser = playerTwo.navy[2];
    playerTwo.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([3, 2], oppBoard)).toBe(true);
});

test('Fire attack is properly handling errors', () => {
    const playerOne = player("Yumi");
    const cruiser = playerOne.navy[2];
    playerOne.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([8, 0])).toBe(null);
});

test('Player can access board objectAt correctly', () => {
    const playerOne = player("Yumi");
    const cruiser = playerOne.navy[2];
    playerOne.place(cruiser, [3, 0]);
    const target = playerOne.objectAt([3, 0]);
    expect(target.name).toBe("Cruiser");
});

test('Computer AI can accurately place pieces autonomously', () => {
    const playerOne = player("Yumi");
    playerOne.type = "computer";
    expect(playerOne.computerPlace()).toBe(true);
});

test('Computer AI has accurately placed pieces autonomously', () => {
    const playerOne = player("Yumi");
    playerOne.type = "computer";
    playerOne.computerPlace();
    expect(playerOne.navy[4].placed).toBe(true);
});