import React from 'react';
import './tree.css';
import { TreeViz } from './tree-visualizer';
import _ from 'lodash';

class Tree {
  constructor() {
    this.root = null;
  }

  toObject() {
    return this.root;
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

  _find(value) {
    return this._findInner(value, this.root);
  }

  _findInner(value, node) {
    if (node === null) return undefined;

    if (node.value === value) return this.node.value;
    if (node.value > value) return _findInner(value, node.left);
    if (node.value <= value) return _findInner(value, node.right);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(500));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
