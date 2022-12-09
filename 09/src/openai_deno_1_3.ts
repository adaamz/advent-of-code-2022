#!/usr/bin/env deno
import { readInput } from "./functions.ts";

// Read input from stdin
const input: string[] = await readInput();

// Set initial position for head and tail
let [x, y] = [0, 0];
let tail = [0, 0];

// Create a set to store visited positions
const visited: Set<string> = new Set();
visited.add(`${tail[0]},${tail[1]}`);

for (let i = 0; i < input.length; i++) {
    // Split the input string into direction and distance
    const [direction, distance] = input[i].split(" ");
    switch (direction) {
        case "U":
            y += Number(distance);
            break;
        case "D":
            y -= Number(distance);
            break;
        case "L":
            x -= Number(distance);
            break;
        case "R":
            x += Number(distance);
            break;
    }

    // Update the position of the tail
    while (Math.abs(tail[0] - x) + Math.abs(tail[1] - y) > 1) {
        // Move the tail one step towards the head in the correct direction
        if (tail[0] < x) tail[0]++;
        else if (tail[0] > x) tail[0]--;
        if (tail[1] < y) tail[1]++;
        else if (tail[1] > y) tail[1]--;

        visited.add(`${tail[0]},${tail[1]}`);
    }
}

console.log(`The tail visited ${visited.size} positions.`);
