import gameController from "./gameController";


test('Get current player function works correctly', () => {
    const game = gameController();
    expect(game.getCurrPlayer().name).toBe("One");
});

test('Switch current player function works correctly', () => {
    const game = gameController();
    game.playRound([0, 0]);
    expect(game.getCurrPlayer().name).toBe("One");
});

test('Setup function works correctly', () => {
    const game = gameController();
    game.setUp();
    game.playRound([0, 0]);
    expect(game.getCurrPlayer().name).toBe("Two");
});