import { readInput } from "./functions.ts";

// Returns true if all the characters in the queue are different,
// false otherwise.
function allDifferent(queue: string[]): boolean {
    const seen = new Set<string>();

    for (const c of queue) {
        if (seen.has(c)) {
            return false;
        }

        seen.add(c);
    }

    return true;
}

// Finds the first start-of-packet marker in the datastream buffer.
// Returns the number of characters that need to be processed before
// the marker is detected.
function findMarker(buffer: string): number {
    // Initialize the queue with the first 4 characters of the datastream buffer.
    const queue: string[] = buffer.split("").slice(0, 4);

    // Scan the buffer character by character, starting from the 5th character.
    for (let i = 4; i < buffer.length; i++) {
        const c = buffer[i];

        // Add the character to the queue and remove the oldest character.
        queue.push(c);
        queue.shift();

        // Check if the queue has exactly 4 characters and if they are all different.
        if (queue.length === 4 && allDifferent(queue)) {
            return i + 1;
        }
    }

    // Return -1 if no start-of-packet marker was found.
    return -1;
}

// Reads the datastream buffer from standard input and
// prints the number of characters that need to be processed
// before the first start-of-packet marker is detected.
export async function main(): Promise<void> {
    const [buffer] = await readInput();
    const result = findMarker(buffer);
    console.log(result);
}

main();
