import { readInput } from "./functions.ts";

// Parse the input from stdin.
const rucksacks = await readInput();

// Define a function that computes the priority of an item type.
const getPriority = (itemType) => {
    if (itemType.toLowerCase() === itemType) {
        // Lowercase item types have priorities 1 through 26.
        return itemType.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        // Uppercase item types have priorities 27 through 52.
        return itemType.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
};

// Define the chunk function.
const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );
};

// Compute the sum of the priorities of the common item types.
let result = 0;
const groups = Array.from(chunk(rucksacks, 3));
for (const group of groups) {
    // Split the items into the first and second compartment.
    const n = group[0].length / 2;
    const firstCompartment = new Set(group[0].slice(0, n));
    const secondCompartment = new Set(group[0].slice(n));

    // Find the common item types.
    const commonItemTypes = new Set();
    firstCompartment.forEach((itemType) => {
        if (secondCompartment.has(itemType)) {
            commonItemTypes.add(itemType);
        }
    });

    // Add the priority of each common item type to the result.
    for (const itemType of commonItemTypes) {
        result += getPriority(itemType);
    }
}

// Print the result.
console.log(result);
