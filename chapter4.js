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
      var nextRightValue, nextLeftValue, minRight;

      if ( !this.isEmpty() ) {
        // initialize node
        if ( node === void 0 ) node = this.root;

        // compare the node's value with the value
        if ( value < node.value ) {
          // check if there is a left node
          if ( node.left ) {
            node.left = this.remove( value, node.left );
          }
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
            nextRightValue = node.right.value;
            node.value     = nextRightValue;
            node.right     = this.remove( nextRightValue, node.right );
          } else if ( node.right === null ) {
            nextLeftValue  = node.left.value;
            node.value     = nextLeftValue;
            node.left      = this.remove( nextLeftValue, node.left );
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
})();