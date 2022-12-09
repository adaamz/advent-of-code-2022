import { readInput } from "./functions.ts";

// Read the instructions from stdin
const instructions = await readInput();

// Create a Set to store the visited positions of the tail
const visitedPositions = new Set<string>();

// Initialize the positions of the head and tail
let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

// Loop through the instructions
for (const instruction of instructions) {
    // Parse the instruction
    const [direction, steps] = instruction.split(" ");

    // Update the position of the head
    switch (direction) {
        case "U":
            headY -= Number(steps);
            break;
        case "D":
            headY += Number(steps);
            break;
        case "L":
            headX -= Number(steps);
            break;
        case "R":
            headX += Number(steps);
            break;
    }

    // Update the position of the tail
    if (Math.abs(headX - tailX) > 1 || Math.abs(headY - tailY) > 1) {
        // The head and tail are not in the same row or column, so the tail moves diagonally to keep up
        tailX += headX > tailX ? 1 : -1;
        tailY += headY > tailY ? 1 : -1;
    } else if (headX === tailX + 2) {
        // The head is two steps to the right of the tail, so the tail moves one step to the right
        tailX++;
    } else if (headX === tailX - 2) {
        // The head is two steps to the left of the tail, so the tail moves one step to the left
        tailX--;
    } else if (headY === tailY + 2) {
        // The head is two steps below the tail, so the tail moves one step down
        tailY++;
    } else if (headY === tailY - 2) {
        // The head is two steps above the tail, so the tail moves one step up
        tailY--;
    }

    // Add the current position of the tail to the set of visited positions
    visitedPositions.add(`${tailX},${tailY}`);
}

// Return the number of visited positions
console.log(visitedPositions.size);
