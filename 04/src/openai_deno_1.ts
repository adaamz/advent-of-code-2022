import { readInput } from "./functions.ts";

// Read the input from stdin
const input = await readInput();

// Parse the input and create two lists of ranges: one for group A and one for group B
const rangesA = input
    .map((line) => line.split(",")[0].split("-").map((x) => Number(x)));
const rangesB = input
    .map((line) => line.split(",")[1].split("-").map((x) => Number(x)));

// Keep track of the ranges from group A that have already been counted
const counted = new Set();

// Iterate through the lists of ranges and find all pairs of ranges that are fully intersected by each other
let count = 0;
for (let i = 0; i < rangesA.length; i++) {
    for (let j = 0; j < rangesB.length; j++) {
        if (rangesA[i][0] >= rangesB[j][0] && rangesA[i][1] <= rangesB[j][1] && !counted.has(rangesA[i])) {
            count += 1;
            counted.add(rangesA[i]);
        }
    }
}

// Print the result
console.log(count);