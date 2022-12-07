import { readLines } from "https://deno.land/std/io/buffer.ts";

export async function readInput(): Promise<string[]>
{
    const lines = [];
    for await (const line of readLines(Deno.stdin)) {
        lines.push(line);
    }
    return lines;
}
