export default function ship(length = 1, name = '') {

    let damage = 0;

    function hit() {
        this.damage = this.damage + 1;
    }

    function isSunk() {
        return this.damage >= this.length;
    }

    const placed = false;

    return { length, damage, isSunk, hit, name, placed }
}