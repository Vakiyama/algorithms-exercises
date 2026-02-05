import React from 'react';
import { shuffle, range } from 'lodash';
import { App, snapshot, done, clear } from './sort-visualizer';

import './sort.css';

function sort(nums) {
  return mergeSort(nums);
}

function mergeSort(nums) {
  snapshot(nums);
  if (nums.length === 1) return nums;

  // split array in two
  const middleIndex = Math.floor(nums.length / 2);
  const firstArray = nums.slice(0, middleIndex);
  const secondArray = nums.slice(middleIndex);

  const merged = merge(mergeSort(firstArray), mergeSort(secondArray));
  snapshot(merged);
  return merged;
}

// INVARIANT: arrayA && arrayB are sorted
function merge(arrayA, arrayB) {
  const mergedArray = [];
  let pointerA = 0;
  let pointerB = 0;

  while (true) {
    if (pointerA === arrayA.length) {
      return mergedArray.concat(arrayB.slice(pointerB));
    }

    if (pointerB === arrayB.length) {
      return mergedArray.concat(arrayA.slice(pointerA));
    }

    const firstA = arrayA[pointerA];
    const firstB = arrayB[pointerB];

    if (firstA < firstB) {
      mergedArray.push(firstA);
      pointerA++;
    } else {
      mergedArray.push(firstB);
      pointerB++;
    }
  }
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(10)));
  done();
  return <App />;
}
