import gameController from "./gameController";


test('Get current player function works correctly', () => {
    const game = gameController();
    expect(game.getCurrPlayer().name).toBe("One");
});

test('Switch current player function works correctly', () => {
    const game = gameController(false);
    game.playRound([0, 0]);
    expect(game.getCurrPlayer().name).toBe("One");
});

test('Place function still works correctly', () => {
    const game = gameController();
    const player = game.getCurrPlayer();
    const carrier = player.navy[0];
    const battleship = player.navy[1];

    player.place(carrier, [0, 0], "Y");
    player.place(battleship, [0, 1], "x");
    expect(battleship.placed).toBe(true);
});

test('Get current player function works correctly', () => {
    const game = gameController();
    const cpu = game.getOtherPlayer();
    console.table(cpu.getBoard());
});