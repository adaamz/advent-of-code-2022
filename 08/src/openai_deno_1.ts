import { readInput } from "./functions.ts";

// Read the input from stdin.
const input = await readInput();

// Create a 2D array to represent the grid of trees.
const grid = input.map((row) => row.split("").map(Number));

// Iterate through each tree in the grid.
let visible_tree_count = 0;
const counted_trees = [];
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (counted_trees.includes(i + "," + j)) {
            continue;
        }

        // Check if the current tree is on the edge of the grid.
        if (i == 0 || i == grid.length - 1 || j == 0 || j == grid[i].length - 1) {
            // The current tree is on the edge of the grid.
            visible_tree_count += 1;
            counted_trees.push(i + "," + j);
            continue;
        }

        // Check if the current tree is visible from any direction.
        let is_visible = false;

        // Check if the current tree is visible from the bottom.
        for (let k = 1; k < grid.length - i; k++) {
            if (grid[i][j] <= grid[i + k][j]) {
                // The current tree is not visible from the bottom.
                break;
            }
            if (k == grid.length - i - 1) {
                // The current tree is visible from the bottom.
                is_visible = true;
            }
        }

        // Check if the current tree is visible from the right.
        for (let k = 1; k < grid[i].length - j; k++) {
            if (grid[i][j] <= grid[i][j + k]) {
                // The current tree is not visible from the right.
                break;
            }
            if (k == grid[i].length - j - 1) {
                // The current tree is visible from the right.
                is_visible = true;
            }
        }

        // Check if the current tree is visible from the top.
        for (let k = 1; k <= i; k++) {
            if (grid[i][j] <= grid[i - k][j]) {
                // The current tree is not visible from the top.
                break;
            }
            if (k == i) {
                // The current tree is visible from the top.
                is_visible = true;
            }
        }

        // Check if the current tree is visible from the left.
        for (let k = 1; k <= j; k++) {
            if (grid[i][j] <= grid[i][j - k]) {
                // The current tree is not visible from the left.
                break;
            }
            if (k == j) {
                // The current tree is visible from the left.
                is_visible = true;
            }
        }

        if (is_visible) {
            visible_tree_count += 1;
            counted_trees.push(i + "," + j);
        }
    }
}

// Print the result.
console.log(visible_tree_count);
