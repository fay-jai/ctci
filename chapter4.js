(function chapter4 () {
  /*
   * Chapter 4: Trees and Graphs
  */

  var bstNode = function (value) {
    return {
      value : value,
      left  : null,
      right : null
    };
  };

  var binarySearchTree = function () {
    var obj  = Object.create( bstMethods );
    obj.root = null;
    return obj;
  };

  var bstMethods = (function () {
    var insert = function (value) {
      var newNode = bstNode( value );

      if ( this.isEmpty() ) {
        this.root = newNode;
      } else {
        _insert.call( this, this.root, newNode );
      }
    };

    var _insert = function (baseNode, newNode) {
      if ( newNode.value <= baseNode.value ) {
        if ( baseNode.left ) {
          _insert.call( this, baseNode.left, newNode );
        } else {
          baseNode.left = newNode;
        }
      } else {
        if ( baseNode.right ) {
          _insert.call( this, baseNode.right, newNode );
        } else {
          baseNode.right = newNode;
        }
      }
    };

    var remove = function (value) {
      if ( !this.isEmpty() ) {
        this.root = _remove.call( this, value, this.root );
      }
    };

    var _remove = function (value, node) {
      var rightMin;

      if ( node ) {
        if ( value < node.value ) {
          node.left = _remove.call( this, value, node.left );
        } else if ( value > node.value ) {
          node.right = _remove.call( this, value, node.right );
        } else if ( node.left && node.right ) {
          rightMin   = findMinValue.call( this, node.right );
          node.value = rightMin;
          node.right = _remove.call( this, rightMin, node.right );
        } else {
          node = node.left || node.right;
        }
      }
      return node;
    };

    var contains = function (value) {
      var node = Array.prototype.slice.call( arguments )[1];

      if ( !this.isEmpty() ) {
        return _contains.call( this, value, node || this.root );
      }
    };

    var _contains = function (value, node) {
      if ( node === null )        return false;
      if ( value === node.value ) return true;
      if ( value < node.value )   return _contains.call( this, value, node.left );
      return _contains.call( this, value, node.right );
    };

    var findMinValue = function () {
      var node = Array.prototype.slice.call( arguments )[0];
      return _findMinValue.call( this, node || this.root );
    };

    var _findMinValue = function (node) {
      while ( node.left ) {
        node = node.left;
      }
      return node.value;
    };

    var findMaxValue = function () {
      var node = Array.prototype.slice.call( arguments )[0];
      return _findMaxValue.call( this, node || this.root );
    };

    var _findMaxValue = function (node) {
      while ( node.right ) {
        node = node.right;
      }
      return node.value;
    };

    var getHeight = function () {
      var node = Array.prototype.slice.call( arguments )[0];
      if ( !this.isEmpty() ) {
        return _getHeight.call( this, node || this.root );
      }
    };

    var _getHeight = function (node) {
      if ( node.left && node.right ) {
        return 1 + Math.max( _getHeight.call( this, node.left  ),
                             _getHeight.call( this, node.right ));
      }
      if ( node.left  ) return 1 + _getHeight.call( this, node.left  );
      if ( node.right ) return 1 + _getHeight.call( this, node.right );
      return 0;
    };

    var isEmpty = function () {
      return this.root === null;
    };

    // Public API
    return {
      insert       : insert,
      remove       : remove,
      contains     : contains,
      findMinValue : findMinValue,
      findMaxValue : findMinValue,
      getHeight    : getHeight,
      isEmpty      : isEmpty
    };
  })();

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