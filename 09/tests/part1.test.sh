#!/usr/bin/env bash
echo "Running example for part 1"
deno run ../src/openai_deno_1_4.ts < example.txt
exit
echo "-----"
echo "Running final for part 1"
deno run ../src/openai_deno_1_4.ts < final.txt
