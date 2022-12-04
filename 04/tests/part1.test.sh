#!/usr/bin/env bash
echo "Running example for part 1"
deno run ../src/openai_deno_1.ts < example.txt

echo "-----"
echo "Running final for part 1"
deno run ../src/openai_deno_1.ts < final.txt
