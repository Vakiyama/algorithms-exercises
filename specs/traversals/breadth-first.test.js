function breadthFirstTraverse(queue, array) {
  if (queue.length === 0) return array;

  const [firstNode, ...restNodes] = queue;

  array.push(firstNode.value);

  if (firstNode.left) restNodes.push(firstNode.left);
  if (firstNode.right) restNodes.push(firstNode.right);

  breadthFirstTraverse(restNodes, array);
  return array;
}

// unit tests
// do not modify the below code
describe('breadth-first tree traversal', function () {
  const answer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  const tree = {
    value: 'A',
    left: {
      value: 'B',
      left: {
        value: 'D',
        left: {
          value: 'G',
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 'E',
        left: null,
        right: {
          value: 'H',
          left: {
            value: 'K',
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: 'C',
      left: {
        value: 'F',
        left: {
          value: 'I',
          left: null,
          right: null,
        },
        right: {
          value: 'J',
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  test('breadthFirstTraverse', () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
  });
});
