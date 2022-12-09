import { readInput } from "./functions.ts";

const input = await readInput();

const directions = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
};

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;
const visited = new Set();

visited.add(`${tailX},${tailY}`);

for (const line of input) {
    const [direction, steps] = line.split(" ");
    const [dx, dy] = directions[direction];

    for (let i = 0; i < steps; i++) {
        headX += dx;
        headY += dy;

        if (headX !== tailX || headY !== tailY) {
            tailX += dx;
            tailY += dy;
        }

        visited.add(`${tailX},${tailY}`);
        console.log(`${tailX},${tailY}`);
    }
}

console.log(visited.size);
