import {readInput,separateIntoGroups} from "./functions.ts";

/*
 This is output of OpenAI chat bot
 */

// read the input
const input = await readInput();

// separate the input into groups of numbers, where each group represents the food carried by a single Elf
const elves = separateIntoGroups(input);

// initialize a list to keep track of the top three Elves carrying the most Calories
const topElves = [];

// iterate over the Elves
for (const elf of elves) {
    // sum the Calories carried by the current Elf
    const totalCalories = elf.reduce((a, b) => a + b, 0);

    // if the list of top Elves is not full, add the current Elf to the list
    if (topElves.length < 3) {
        topElves.push([elf, totalCalories]);

        // if the list of top Elves is full, check if the current Elf has more Calories
        // than the Elf with the least number of Calories in the list
    } else {
        const minElf = topElves.reduce((acc, curr) => (curr[1] < acc[1] ? curr : acc), topElves[0]);
        if (totalCalories > minElf[1]) {
            topElves.splice(topElves.indexOf(minElf), 1);
            topElves.push([elf, totalCalories]);
        }
    }
}

// sort the list of top Elves in descending order of Calories
topElves.sort((a, b) => b[1] - a[1]);

// sum the Calories carried by the top three Elves
const totalCalories = topElves.reduce((acc, curr) => acc + curr[1], 0);

// print the result
console.log("The top three Elves carrying the most Calories are: ", topElves);
console.log("Total Calories: ", totalCalories);