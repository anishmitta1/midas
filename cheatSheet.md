# Front End Cheat Sheet

## Code Snippets

### Binary Search Implementation

```
const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) {
      return middle;
    } else if (arr[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}
```

### Binary Search Tree Implementation

```
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    if (!this.root) {
      this.root = node;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value === current.value) {
        return undefined;
      }

      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          return this;
        }

        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return this;
        }

        current = current.right;
      }
    }
  }

  find(value) {
    if (!this.root) {
      return false;
    }

    let current = this.root;

    while (current) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }
}
```

### Linked List Implementation

```
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // add a new node to the end of the linked list
  addNode(value) {
    const newNode = new ListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // remove a node from the linked list
  removeNode(value) {
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        if (previousNode === null) {
          this.head = currentNode.next;
        } else {
          previousNode.next = currentNode.next;
        }

        this.size--;
        return true;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return false;
  }

  // print the values of all nodes in the linked list
  printList() {
    let currentNode = this.head;

    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}
```
