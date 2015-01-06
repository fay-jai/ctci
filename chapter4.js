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
  };
})();