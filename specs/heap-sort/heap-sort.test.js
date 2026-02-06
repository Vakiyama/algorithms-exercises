/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

function heapSort(array) {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i, array.length);
  }

  for (let i = 0; i < array.length; i++) {
    // swap 0 with end - 1
    const heapSize = array.length - 1 - i;
    const temp = array[0];
    array[0] = array[heapSize];
    array[heapSize] = temp;
    heapify(array, 0, heapSize);
  }
}

function heapify(array, index, heapSize) {
  const numAtIndex = array[index];
  if (!numAtIndex) return;

  const leftChildIndex = index * 2 + 1;
  const rightChildIndex = leftChildIndex + 1;

  const leftChild =
    leftChildIndex < heapSize ? array[leftChildIndex] : -Infinity;
  const rightChild =
    leftChildIndex + 1 < heapSize ? array[leftChildIndex + 1] : -Infinity;

  if (leftChild > rightChild && numAtIndex < leftChild) {
    // swap num with leftchild
    const temp = leftChild;
    array[leftChildIndex] = numAtIndex;
    array[index] = temp;
    heapify(array, leftChildIndex, heapSize);
  }

  if (rightChild > leftChild && numAtIndex < rightChild) {
    // swap num with leftchild
    const temp = rightChild;
    array[rightChildIndex] = numAtIndex;
    array[index] = temp;
    heapify(array, rightChildIndex, heapSize);
  }
}

// unit tests
// do not modify the below code
test('heap sort', function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
