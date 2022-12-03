import {readInput,separateIntoGroups} from "./functions.ts";

/*
 This is output of OpenAI chat bot
 */

// read the input
const input = await readInput();

// separate the input into groups of numbers, where each group represents the food carried by a single Elf
const elves = separateIntoGroups(input);

// initialize a variable to keep track of the Elf with the most Calories
let maxCalories = 0;
let maxElf = null;

// iterate over the Elves
for (const elf of elves) {
    // sum the Calories carried by the current Elf
    const totalCalories = elf.reduce((a, b) => a + b, 0);

    // if the current Elf is carrying more Calories than the previous ones,
    // update the max_calories and max_elf variables
    if (totalCalories > maxCalories) {
        maxCalories = totalCalories;
        maxElf = elf;
    }
}

// print the result
console.log("The Elf carrying the most Calories is: ", maxElf);
console.log("Total Calories: ", maxCalories);
