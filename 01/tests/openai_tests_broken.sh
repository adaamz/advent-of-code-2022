#
# This is output of OpenAI chat bot (when i asked how to define solution); path is manually edited ofc
#

solution() {
  # call deno run with the path to your solution script as an argument
  deno run ../src/openai_deno_1.ts
}

#
# This is output of OpenAI chat bot (when i asked on test suite in bash)
#

# define a function to run a single test case
run_test() {
  # get the input and expected output from the test case
  local input=$1
  local expected_output=$2

  # run the solution with the given input
  local output=$(solution <<< "$input")

  # check if the output matches the expected output
  if [ "$output" == "$expected_output" ]; then
    # if the output is correct, print a success message
    echo "SUCCESS"
  else
    # if the output is incorrect, print an error message
    echo "FAILURE"
    echo "Expected output: $expected_output"
    echo "Actual output: $output"
  fi
}

# define the test cases
declare -A tests=(
  ["test1"]="1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
The top three Elves carrying the most Calories are: [[7000, 8000, 9000], [5000, 6000], [4000]]
Total Calories: 45000"
  ["test2"]="1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
11000
12000
13000
The top three Elves carrying the most Calories are: [[11000, 12000, 13000], [7000, 8000, 9000], [5000, 6000]]
Total Calories: 48000"
)

# run each test case
for test in "${!tests[@]}"; do
  echo "Running test: $test"
  run_test "${tests[$test]}"
done
