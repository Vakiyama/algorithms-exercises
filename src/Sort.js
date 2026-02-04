import React from "react";
import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";

import "./sort.css";

function sort(nums) {
  let iterations = 0;
  while (true) { 
    let swapsDone = false; 

    snapshot(nums);
    for (let i = 0; i < nums.length - 1 - iterations; i++) {
      const first = nums[i];
      const second = nums[i + 1];

      if (second < first) {
        nums[i] = second;
        nums[i + 1] = first;
        swapsDone = true;
      }
    }

    iterations++;

    if (swapsDone === false) break;
  }

  return nums;
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(10)));
  done();
  return <App />;
}
