/*

Binary Search Tree!

Name your class Tree. 

I'd suggest making another class called Node. You don't have to; you can make them all plain JS objects

Here you'll make a BST. Your Tree class will have keep track of a root which will be the first item added
to your tree. From there, if the item is less than the value of that node, it will go into its left subtree
and if greater it will go to the right subtree.

value - integer     - value being contained in the node
left  - Node/object - the left node which itself may be another tree
right - Node/object - the right node which itself may be another tree

*/

class Tree {
  constructor() {
    this.root = null;
  }

  toObject() {
    return this.root;
  }

  delete(value) {
    this._deleteInner(value, this.root);
  }

  _deleteInner(value, node) {
    // if (node === null) return;
    // const node = this._findInner(value, node);
    // // replace this node with the value of the smallest left child
    // const smallestChildNode = this._findSmallestLeftChild(node, undefined);
    // if (!smallestChildNode) {
    //   const parentNode = this._findParentInner(value, node);
    //   // leaf, remove this node from parent
    //   if (node.value >= parentNode.value) parentNode.right = null;
    //   if (node.value < parentNode.value) parentNode.left = null;
    // } else {
    //   node.value = smallestChildNode.value;
    //   this._deleteInner(smallestChildNode.value, node.left);
    // }
  }

  _findSmallestLeftChild(node, smallest) {
    if (node === null) return smallest;

    let newSmallest;

    if (!smallest) {
      newSmallest = node;
    } else {
      newSmallest = node.value < smallest.value ? node : smallest;
    }

    return this._findSmallestLeftChild(node.left, newSmallest);
  }

  add(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    this._addInner(value, this.root);
  }

  _addInner(value, node) {
    if (node.value >= value) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }
      this._addInner(value, node.left);
    } else {
      if (node.right === null) {
        node.right = new Node(value);
        return;
      }
      this._addInner(value, node.right);
    }
  }

  _findParent(value) {
    return this._findParentInner(value, this.root, undefined);
  }

  _findParentInner(value, node, parent) {
    if (node === null) return undefined;

    if (node.value === value) return parent;
    if (node.value >= value) return _findParentInner(value, node.left, node);
    if (node.value < value) return _findParentInner(value, node.right, node);
  }

  _find(value) {
    return this._findInner(value, this.root);
  }

  _findInner(value, node) {
    if (node === null) return undefined;

    if (node.value === value) return node;
    if (node.value >= value) return _findInner(value, node.left);
    if (node.value < value) return _findInner(value, node.right);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// unit tests
// do not modify the below code
describe('Binary Search Tree', function () {
  it('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    // render(objs, nums);

    expect(objs.value).toEqual(3);

    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeNull();

    expect(objs.left.right.value).toEqual(2);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(4);
    expect(objs.right.left.left).toBeNull();

    expect(objs.right.left.right.value).toEqual(6);
    expect(objs.right.left.right.left.value).toEqual(5);
    expect(objs.right.left.right.left.right).toBeNull();
    expect(objs.right.left.right.left.left).toBeNull();

    expect(objs.right.right.value).toEqual(10);
    expect(objs.right.right.right).toBeNull();

    expect(objs.right.right.left.value).toEqual(9);
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.left.left.value).toEqual(8);
    expect(objs.right.right.left.left.right).toBeNull();
    expect(objs.right.right.left.left.left).toBeNull();
  });
});
