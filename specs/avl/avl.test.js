/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    this.root.add(value);
  }

  toObject() {
    return this.root;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }

  // go down and add the same way as before
  // add should update the height of the node,
  // and return this height increase for earlier callers
  // balance will reduce this height, and should also return a height difference
  add(value) {
    const addDirection = this.value > value ? 'left' : 'right';
    const targetWalkNode = addDirection === 'left' ? this.left : this.right;
    const oppositeNode = addDirection === 'left' ? this.right : this.left;

    const previousHeight = this.height;

    if (targetWalkNode === null) {
      this[addDirection] = new Node(value);
      if (oppositeNode === null) {
        this.height++;
      }
    } else {
      this.height += this[addDirection].add(value);
    }

    this.height += this.balance();
    return this.height - previousHeight;
  }

  // returns the new height difference after balancing
  balance() {
    const leftHeight = this.left ? this.left.height : 0;
    const rightHeight = this.right ? this.right.height : 0;

    const balanceFactor = rightHeight - leftHeight;

    if (balanceFactor > 1) {
      const rightLeftHeight = this.right.left ? this.right.left.height : 0;
      const rightRightHeight = this.right.right ? this.right.right.height : 0;

      // left heavy
      if (rightLeftHeight > rightRightHeight) {
        // double rotate
        this.right.rotateLL();
      }
      this.rotateRR();
      return -1;
    }

    if (balanceFactor < -1) {
      const leftRightHeight = this.left.right ? this.left.right.height : 0;
      const leftLeftHeight = this.left.left ? this.left.left.height : 0;

      // left heavy
      if (leftRightHeight > leftLeftHeight) {
        // double rotate
        this.left.rotateRR();
      }
      this.rotateLL();
      return -1;
    }

    return 0;
  }

  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;

    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;

    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }

  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;

    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;

    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }

  updateInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
      return;
    }

    if (!this.right || (this.left && this.right.height < this.left.height)) {
      this.height = this.left.height + 1;
    } else {
      this.height = this.right.height + 1;
    }
  }

  print() {
    console.log({ root: this, left: this.left, right: this.right });
    this.left && this.left.print();
    this.right && this.right.print();
  }
}

// unit tests
// do not modify the below code
describe('AVL Tree', function () {
  test('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
