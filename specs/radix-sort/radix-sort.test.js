/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function radixSort(array) {
  let mainArray = array;
  // create 10 buckets
  let buckets = new Array(10).fill(null).map((_) => []);

  // 1 indexed
  let place = 1;

  while (true) {
    for (const num of mainArray) {
      const bucketIndexValue = bucketIndex(num, place);
      buckets[bucketIndexValue].push(num);
    }

    if (buckets[0].length === array.length) return mainArray;

    mainArray = [];

    for (const bucket of buckets) {
      mainArray = [...mainArray, ...bucket];
    }

    buckets = new Array(10).fill(null).map((_) => []);

    place++;
  }
}

function bucketIndex(num, place) {
  return Math.abs(Math.floor(num / Math.pow(10, place - 1)) % 10);
}

// unit tests
// do not modify the below code
describe('radix sort', function () {
  it('should sort correctly', () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it('should sort 99 random numbers correctly', () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
