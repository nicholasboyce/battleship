import ship from "./ship";

test('Check ship length default property', () => {
    expect(ship().length).toBe(1);
});

test('Check ship damage default property', () => {
    expect(ship().damage).toBe(0);
});

test('Check ship isSunk function', () => {
    expect(ship().isSunk()).toBe(false);
});

test('Check ship hit function increases damage', () => {
    const cruiser = ship();
    cruiser.hit();
    expect(cruiser.damage).toBe(1);
});

test('Check ship isSunk function works with damage', () => {
    const cruiser = ship();
    cruiser.hit();
    expect(cruiser.isSunk()).toBe(true);
});

test('Check ship length setting property', () => {
    expect(ship(4).length).toBe(4);
});

test('Check ship hit function increases damage multiple times', () => {
    const cruiser = ship();
    cruiser.hit();
    cruiser.hit();
    cruiser.hit();
    cruiser.hit();
    cruiser.hit();
    expect(cruiser.damage).toBe(5);
});

test('Check ship name setting property', () => {
    expect(ship(4, "Destroyer").name).toBe("Destroyer");
});

test('Check ship placed property', () => {
    const cruiser = ship();
    cruiser.placed = true;
    expect(cruiser.placed).toBe(true);
});

test('Check ship placed setting property', () => {
    expect(ship(4, "Destroyer").placed).toBe(false);
});