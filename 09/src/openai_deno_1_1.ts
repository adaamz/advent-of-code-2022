import { readInput } from "./functions.ts";

// Read the input from stdin
const input = await readInput();

// Parse the input into an array of motions
const motions = input.map(line => {
    const parts = line.split(" ");
    return {
        direction: parts[0],
        steps: parseInt(parts[1], 10),
    };
});

// Initialize the position of the head and the tail
let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

// Create a set to store the positions that the tail visits at least once
const visitedPositions = new Set();
visitedPositions.add(`${tail.x},${tail.y}`);

// Iterate over the motions and update the position of the head and tail
for (const motion of motions) {
    // Update the position of the head
    switch (motion.direction) {
        case "R":
            head.x += motion.steps;
            break;
        case "U":
            head.y -= motion.steps;
            break;
        case "L":
            head.x -= motion.steps;
            break;
        case "D":
            head.y += motion.steps;
            break;
    }

    // Iterate over the steps of the motion and update the position of the tail
    for (let i = 0; i < motion.steps - 1; i++) {
        // Update the position of the tail based on the rules described in the prompt
        if (head.x === tail.x && head.y === tail.y) {
            // Do nothing if the head and tail are adjacent
        } else if (head.x !== tail.x && head.y !== tail.y) {
            // Move the tail diagonally if the head and tail are not in the same row or column
            tail.x += head.x > tail.x ? 1 : -1;
            tail.y += head.y > tail.y ? 1 : -1;
        } else if (Math.abs(head.x - tail.x) === 2 || Math.abs(head.y - tail.y) === 2) {
            // Move the tail in the same direction as the head if the head is two steps away
            tail.x += head.x > tail.x ? 1 : head.x === tail.x ? 0 : -1;
            tail.y += head.y > tail.y ? 1 : head.y === tail.y ? 0 : -1;
        } else {
            tail.x += head.x > tail.x ? 1 : head.x === tail.x ? 0 : -1;
            tail.y += head.y > tail.y ? 1 : head.y === tail.y ? 0 : -1;
        }

        // Add the current position of the tail to the set of visited positions
        visitedPositions.add(`${tail.x},${tail.y}`);
    }
}

console.log(visitedPositions);

// Print the number of unique positions that the tail visited
console.log(`Number of visited positions: ${visitedPositions.size}`);
