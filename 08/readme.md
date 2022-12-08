Part 1 was about how to tell bot that it should check trees in all directions 
and not only its neighbours (it compared height of x+1, x-1; y+1, y-1 trees around).
But finally we made it work and part 1 succeeded.
I would say that after 1-2 fixing rounds I would be able to fix it in shorter time by hand than 
telling bot what to fix.
Note: without reading task description and know how to implement it, I wouldn't by able to finish this

Part 2 after few iterations it wrote almost correct code. Just before the final version chabot went down
so I manually moved incrementing of trees above breaking condition
e.g.
```ts
// Calculate the viewing distance in the top direction.
let viewing_distance_top = 0;
for (let k = 1; k <= y; k++) {
    viewing_distance_top += 1;  // this was wrongly below the condition
    if (grid[y][x] <= grid[y - k][x]) {
        // The current tree is not visible from the top.
        break;
    }
}
scenic_score *= viewing_distance_top;
```
