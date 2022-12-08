import { readInput } from "./functions.ts";

// Read the input from stdin.
const input = await readInput();

// Create a 2D array to represent the grid of trees.
const grid = input.map((row) => row.split("").map(Number));

// Part 2: Calculate the maximum scenic score of all the trees in the grid.
let max_scenic_score = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        // Calculate the scenic score of the current tree.
        let scenic_score = 1;

        // Calculate the viewing distance in the bottom direction.
        let viewing_distance_bottom = 0;
        for (let k = 1; k < grid.length - y; k++) {
            viewing_distance_bottom += 1;
            if (grid[y][x] <= grid[y + k][x]) {
                // The current tree is not visible from the bottom.
                break;
            }
        }
        scenic_score *= viewing_distance_bottom;

        // Calculate the viewing distance in the right direction.
        let viewing_distance_right = 0;
        for (let k = 1; k < grid[y].length - x; k++) {
            viewing_distance_right += 1;
            if (grid[y][x] <= grid[y][x + k]) {
                // The current tree is not visible from the right.
                break;
            }
        }
        scenic_score *= viewing_distance_right;

        // Calculate the viewing distance in the top direction.
        let viewing_distance_top = 0;
        for (let k = 1; k <= y; k++) {
            viewing_distance_top += 1;
            if (grid[y][x] <= grid[y - k][x]) {
                // The current tree is not visible from the top.
                break;
            }
        }
        scenic_score *= viewing_distance_top;

        // Calculate the viewing distance in the left direction.
        let viewing_distance_left = 0;
        for (let k = 1; k <= x; k++) {
            viewing_distance_left += 1;
            if (grid[y][x] <= grid[y][x - k]) {
                // The current tree is not visible from the left.
                break;
            }
        }
        scenic_score *= viewing_distance_left;

        // Update the maximum scenic score.
        max_scenic_score = Math.max(max_scenic_score, scenic_score);
    }
}

// Print the maximum scenic score of all the trees in the grid.
console.log(max_scenic_score);
