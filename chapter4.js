(function chapter4 () {
  /*
   * Chapter 4: Trees and Graphs
  */
  var binaryTreeNode = function (value) {
    return {
      value : value,
      left  : null,
      right : null
    };
  };

  var binarySearchTree = function () {
    var tree  = Object.create( binarySearchTreeMethods );
    tree.root = null;
    return tree;
  };

  var binarySearchTreeMethods = {
    insert: function (value, node) {
      var newNode = binaryTreeNode( value );
      // check if tree is empty
      if ( this.isEmpty() ) {
        this.root = newNode;
        return;
      }

      // initialize node
      if ( node === void 0 ) node = this.root;
      // compare value with node.value
      if ( value <= node.value ) {
        // check if left exists
        if ( node.left ) {
          this.insert( value, node.left );
        } else {
          node.left = newNode;
        }
      } else {
        if ( node.right ) {
          this.insert( value, node.right );
        } else {
          node.right = newNode;
        }
      }
    },
    remove: function (value, node) {
      var minRight;

      if ( !this.isEmpty() ) {
        // initialize node
        if ( node === void 0 ) node = this.root;

        // compare the node's value with the value
        if ( value < node.value ) {
          // check if there is a left node
          if ( node.left ) node.left = this.remove( value, node.left );
        } else if ( value > node.value ) {
          // check if there is a right node
          if ( node.right ) {
            node.right = this.remove( value, node.right );
          }
        } else {
          // at this point, value === node.value
          // check if node is a leaf node
          if ( node.left === null && node.right === null ) {
            // edge case of single node in tree (i.e. root node)
            if ( this.getHeight() === 0 ) {
              this.root = null;
              return this.root;
            } else {
              node = null;
            }
          } else if ( node.left === null ) {
            node = node.right;
          } else if ( node.right === null ) {
            node = node.left;
          } else {
            // node has both left and right
            minRight   = this.findMinValue( node.right );
            node.value = minRight;
            node.right = this.remove( minRight, node.right );
          }
        }
        return node;
      }
    },
    contains: function (value, node) {
      if ( this.isEmpty() ) return false;
      // tree is not empty - initialize node
      if ( node === void 0 ) node = this.root;

      // check if node's value is the value
      if ( value === node.value ) return true;
      if ( value < node.value ) {
        // check if left node exists
        return node.left ? this.contains( value, node.left ) : false;
      } else {
        // check if right node exists
        return node.right ? this.contains( value, node.right ) : false;
      }
    },
    findMaxValue: function (node) {
      if ( !this.isEmpty() ) {
        if ( node === void 0 ) node = this.root;
        while ( node.right ) {
          node = node.right;
        }
        return node.value;
      }
    },
    findMinValue: function (node) {
      if ( !this.isEmpty() ) {
        if ( node === void 0 ) node = this.root;
        while ( node.left ) {
          node = node.left;
        }
        return node.value;
      }
    },
    getHeight: function (node) {
      if ( !this.isEmpty() ) {
        // initialize node
        if ( node === void 0 ) node = this.root;

        // base case
        if ( node.left  === null && node.right === null ) return 0;
        if ( node.left  === null ) return 1 + this.getHeight( node.right );
        if ( node.right === null ) return 1 + this.getHeight( node.left );
        return 1 + Math.max( this.getHeight( node.left ), this.getHeight( node.right ) );
      }
    },
    isEmpty: function () {
      return this.root === null;
    }
  };

  // 4.1
  var isBalanced = function (binaryTree) {
    // a balanced tree is defined to be a tree such that the heights of the 2 subtrees
    // of any node never differ by more than one

    var node, leftSubtreeHeight, rightSubtreeHeight;

    if ( binaryTree.isEmpty() ) return true; // empty binary tree is balanced

    node = binaryTree.root;
    if ( node.left && node.right ) {
      leftSubtreeHeight  = binaryTree.getHeight( node.left );
      rightSubtreeHeight = binaryTree.getHeight( node.right );
      return Math.abs( leftSubtreeHeight - rightSubtreeHeight ) <= 1;
    } else if ( node.left ) {
      leftSubtreeHeight  = binaryTree.getHeight( node.left );
      return leftSubtreeHeight === 0;
    } else if ( node.right ) {
      rightSubtreeHeight = binaryTree.getHeight( node.right );
      return rightSubtreeHeight === 0;
    } else {
      // leaf node
      return true;
    }
  };

  // 4.3
  var createBinarySearchTree = function (sortedArray) {
    var result = binarySearchTree();

    var inner = function (array) {
      var len = array.length;
      var mid, leftArray, rightArray;
      // base case
      if ( len === 0 ) return;

      // greater than 1
      mid        = Math.floor( len / 2 );
      leftArray  = array.slice(0, mid);
      rightArray = array.slice(mid + 1);

      result.insert( array[mid] );
      inner( leftArray );
      inner( rightArray );
    };

    inner(sortedArray);

    return result;
  };

  // alternative to 4.3
  var createMinimalBST = function (array) {
    if ( array.length === 0 ) return null;

    var mid   = Math.floor( array.length / 2 );
    var left  = array.slice(0, mid);
    var right = array.slice(mid + 1);

    var tNode   = binaryTreeNode( array[mid] );
    tNode.left  = createMinimalBST( left );
    tNode.right = createMinimalBST( right );

    return tNode;
  };

  createBinarySearchTree = function (sortedArray) {
    var result = binarySearchTree();
    if ( sortedArray.length === 0 ) return result;

    result.root = createMinimalBST( sortedArray );
    return result;
  };

  // 4.4
  var makeNode = function (value) {
    return {
      value : value,
      next  : null
    };
  };

  var singlyLinkedListMethods = {
    appendToHead: function (value) {
      var node = makeNode( value );
      if ( this.isEmpty() ) {
        this.head = node;
        this.tail = node;
      } else {
        node.next = this.head;
        this.head = node;
      }
    },
    appendToTail: function (value) {
      var node = makeNode( value );
      if ( this.isEmpty() ) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail      = node;
      }
    },
    removeFromHead: function () {
      var remove;
      if ( !this.isEmpty() ) {
        remove = this.head.value;

        // only one node in linked list
        if ( this.head === this.tail ) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
        }

        return remove;
      }
    },
    removeFromTail: function () {
      var remove, node;
      if ( !this.isEmpty() ) {
        remove = this.tail.value;

        if ( this.head === this.tail ) {
          this.head = null;
          this.tail = null;
        } else {
          // iterate through linked list until reaching node prior to tail
          node = this.head;
          while ( node.next !== this.tail ) {
            node = node.next;
          }
          // remove link to previous tail
          node.next = null;
          this.tail = node;
        }

        return remove;
      }
    },
    contains: function (value, node) {
      // initialization logic
      if ( node === void 0 ) node = this.head;

      // base case
      if ( node === null ) return false;
      if ( node.value === value ) return true;
      return this.contains( value, node.next );
    },
    isEmpty: function () {
      return this.head === null && this.tail === null;
    }
  };

  var singlyLinkedList = function () {
    var list   = Object.create( singlyLinkedListMethods );
    list.head  = null;
    list.tail  = null;
    return list;
  };

  var Queue = function () {
    var q     = Object.create( queueMethods );
    q.storage = {};
    q.start   = 0;
    q.end     = 0;

    return q;
  };

  var queueMethods = {
    enqueue: function (value) {
      this.storage[ this.end ] = value;
      this.end += 1;
    },
    dequeue: function () {
      var removed;
      if ( !this.isEmpty() ) {
        removed = this.storage[ this.start ];
        delete this.storage[ this.start ];
        this.start += 1;
        return removed;
      }
    },
    top: function () {
      return this.storage[ this.start ];
    },
    isEmpty: function () {
      return this.start >= this.end;
    }
  };

  var breadthFirstMap = function (node, fn) {
    var q = Queue();
    var removed;

    // add [depth, node] to queue
    q.enqueue( [ 0, node ] );

    // while queue isn't empty
    while ( !q.isEmpty() ) {
      removed = q.dequeue();
      fn( removed[0], removed[1] );

      removed[0] += 1;

      // if left child exists
      if ( removed[1].left ) {
        q.enqueue( [ removed[0], removed[1].left  ] );
      }

      // if right child exists
      if ( removed[1].right ) {
        q.enqueue( [ removed[0], removed[1].right ] );
      }
    }
  };

  var createLinkedListFromBinaryTree = function (tree) {
    var result = {};
    if ( !tree.isEmpty() ) {
      breadthFirstMap(tree.root, function (depth, node) {
        result[depth] = result[depth] || singlyLinkedList();
        result[depth].appendToTail( node.value );
      });
    }
    return result;
  };

  // 4.5
  var isBinarySearchTree = function (node, min, max) {
    var left, right;
    min = min || Number.MIN_VALUE;
    max = max || Number.MAX_VALUE;

    // check if left and right exist
    if ( node.left === null && node.right === null ) return true;

    if ( node.left && node.right ) {
      if ( node.left.value <= node.value && node.right > node.value ) {
        if ( node.left.value <= max && node.right.value > min ) {
          return isBinarySearchTree( node.left, min, node.value ) &&
                 isBinarySearchTree( node.right, node.value, max );
        }
      }
      return false;
    }

    if ( node.left ) {
      if ( node.left.value <= node.value && node.left.value <= max ) {
        return isBinarySearchTree( node.left, min, node.value );
      }
      return false;
    }

    if ( node.right ) {
      if ( node.right.value > node.value && node.right.value > min ) {
        return isBinarySearchTree( node.right, node.value, max );
      }
      return false;
    }
  };
})();