import player from "./player";
import ship from "../ship/ship";

test('Player name is properly generated', () => {
    const playerOne = player("Yumi");
    expect(playerOne.name).toBe("Yumi");
});

test('Fire attack is properly handling hits', () => {
    const playerOne = player("Yumi");
    const cruiser = playerOne.navy[2];
    playerOne.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([3, 0])).toBe(true);
});

test('Fire attack is properly handling hits', () => {
    const playerOne = player("Yumi");
    const cruiser = playerOne.navy[2];
    playerOne.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([3, 2])).toBe(true);
});

test('Fire attack is properly handling errors', () => {
    const playerOne = player("Yumi");
    const cruiser = playerOne.navy[2];
    playerOne.place(cruiser, [3, 0]);
    expect(playerOne.fireAttack([8, 0])).toBe(null);
});
