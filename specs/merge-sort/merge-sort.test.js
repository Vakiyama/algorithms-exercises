/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  // split array in two
  const middleIndex = Math.floor(nums.length / 2);
  const firstArray = nums.slice(0, middleIndex);
  const secondArray = nums.slice(middleIndex);

  const merged = merge(mergeSort(firstArray), mergeSort(secondArray));
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

// unit tests
// do not modify the below code
test('merge sort', function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
