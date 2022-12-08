#!/usr/bin/env bash
echo "Running example for part 2"
deno run ../src/openai_deno_2.ts < example.txt

echo "-----"
echo "Running final for part 2"
deno run ../src/openai_deno_2.ts < final.txt
