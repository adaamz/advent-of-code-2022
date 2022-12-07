import { readInput } from "./functions.ts";

// Define a function to parse the input and return a tree of directories and files
async function parseInput(): Promise<Map<string, any>> {
    // Read the input from stdin
    const input = await readInput();

    // Create a Map to store the tree of directories and files
    const tree = new Map<string, any>();

    // Keep track of the current directory
    let currentDir = tree;

    // Parse each line of the input
    for (const line of input) {
        // If the line is a command, process it
        if (line.startsWith("$")) {
            // Split the line by the "$" character to get the command and its arguments
            const [_, cmd, ...args] = line.split(" ");
            switch (cmd.trim()) {
                case "cd":
                    // If the command is "cd", change the current directory
                    const [dir] = args;
                    if (dir === "/") {
                        // If the argument is "/", set the current directory to the root
                        currentDir = tree;
                    } else if (dir === "..") {
                        // If the argument is "..", set the current directory to its parent
                        if (currentDir !== tree) {
                            currentDir = [...currentDir.values()].find(
                                (value) => value instanceof Map
                            );
                        }
                    } else if (currentDir.has(dir)) {
                        // If the argument is a subdirectory of the current directory, set the current directory to that subdirectory
                        currentDir = currentDir.get(dir);
                    }
                    break;
                case "ls":
                    // If the command is "ls", print the contents of the current directory
                    for (const [key, value] of currentDir) {
                        console.log(`${typeof value === "number" ? value : "dir"} ${key}`);
                    }
                    break;
                default:
                    break;
            }
        } else {
            // If the line is not a command, it must be a file or directory entry
            const [size, name] = line.split(" ");
            // Add the entry to the current directory
            currentDir.set(name, size === "dir" ? new Map() : parseInt(size));
        }
    }

    // Return the tree of directories and files
    return tree;
}

// Define a function to calculate the total size of a directory
function calculateTotalSize(tree: Map<string, any>): number {
    // Initialize the total size to 0
    let totalSize = 0;

    // Recursively calculate the total size of each subdirectory
    for (const [key, value] of tree) {
        if (value instanceof Map) {
            totalSize += calculateTotalSize(value);
        } else {
            totalSize += value;
        }
    }

    // Return the total size
    return totalSize;
}

// Define a function to find all directories with a total size of at most 100000
function findDirectories(tree: Map<string, any>): number[] {
    // Initialize an array to store the sizes of the directories
    const sizes = [];

    // Recursively find the sizes of the directories
    for (const [key, value] of tree) {
        if (value instanceof Map) {
            const dirSizes = findDirectories(value);
            if (dirSizes.length > 0) {
                sizes.push(...dirSizes);
            }
        }
    }

// If the total size of the current directory is at most 100000, add it to the array of sizes
    const totalSize = calculateTotalSize(tree);
    if (totalSize <= 100000) {
        sizes.push(totalSize);
    }

// Return the array of sizes
    return sizes;
}

// Define the main function
async function main(): Promise<void> {
    // Parse the input to create a tree of directories and files
    const tree = await parseInput();

    // Find all directories with a total size of at most 100000
    const dirSizes = findDirectories(tree);

    // Calculate the sum of the sizes of the directories
    const sum = dirSizes.reduce((a, b) => a + b, 0);

    // Print the result
    console.log(sum);
}

// Call the main function
main();
