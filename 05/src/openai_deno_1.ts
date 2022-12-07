import { readInput } from "./functions.ts";

// Parse the input data.
async function parseInput(): Promise<{ start: string[][]; steps: { from: number; to: number; number: number; }[]; }> {
    // Read the input data.
    const input = await readInput();

    // Parse the input data.
    const [startString, ...steps] = input;
    const start: string[][] = startString
        .split("\n")
        .map((row) => row.trim().split(" "));

    const parsedSteps = steps.map((step) => {
        const [from, , to, , , , numberString, ...rest] = step.split(" ");
        return {
            from: parseInt(from),
            to: parseInt(to),
            number: parseInt(numberString),
        };
    });

    return { start, steps: parsedSteps };
}

// Apply the rearrangement procedure step by step to determine the top crates
// on each stack after the procedure completes.
async function solve(): Promise<string> {
    // Parse the input data.
    const { start, steps } = await parseInput();

    // Initialize the stacks of crates.
    const stacks: string[][] = start.map((row) => row.map((label) => label[0]));

    // Apply the rearrangement procedure step by step.
    for (const { from, to, number } of steps) {
        // Move the specified number of crates from the source stack to the
        // destination stack.
        const movedCrates = stacks[from - 1].splice(-number);
        stacks[to - 1] = [...stacks[to - 1], ...movedCrates];
    }

    // Return the top crate on each stack.
    return stacks.map((stack) => stack[stack.length - 1]).join("");
}

// Print the solution.
console.log(await solve());