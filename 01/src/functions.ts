import { readLines } from "https://deno.land/std/io/buffer.ts";

export async function readInput(): Promise<string[]>
{
    const lines = [];
    for await (const line of readLines(Deno.stdin)) {
        lines.push(line);
    }
    return lines;
}

export function separateIntoGroups(lines: string[]): number[][]
{
    const groups = [];
    let currentGroup = [];
    for (const line of lines) {
        if (line === "") {
            groups.push(currentGroup);
            currentGroup = [];
        } else {
            currentGroup.push(Number(line));
        }
    }
    return groups;
}
