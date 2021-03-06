(function chapter2 () {
  /*
   * Chapter 2: Linked Lists
  */

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
      // this._size += 1;
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
      // this._size += 1;
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

        // this._size -= 1;

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

        // this._size -= 1;

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
    // ,
    // getSize: function () {
    //   return this._size;
    // }
  };

  var singlyLinkedList = function () {
    var list   = Object.create( singlyLinkedListMethods );
    list.head  = null;
    list.tail  = null;
    // list._size = 0;

    return list;
  };


  // 2.1 - version 1
  var removeDuplicates1 = function (linkedList) {
    // Time Complexity: O(n) b/c you have to iterate through entire linked list
    // Space Complexity: O(n) b/c you have to build a new linked list of the same size

    var hash = {};
    var newLinkedList = singlyLinkedList();
    var nodeValue;

    // check if linked list is empty
    if ( linkedList.isEmpty() ) return linkedList;

    // continue repeating this while linkedList is not empty
    while ( !linkedList.isEmpty() ) {
      // remove head from linkedList and check if its value is in hash
      nodeValue = linkedList.removeFromHead();
      // if no, add value to hash and add value to newLinkedList
      if ( !hash[nodeValue] ) {
        hash[nodeValue] = true;
        newLinkedList.appendToTail( nodeValue );
      }
    }

    return newLinkedList;
  };

  // 2.1 - version 2
  var removeDuplicates2 = function (linkedList) {
    // Time Complexity: O(n)
    // Space Complexity: O(1)

    // empty or 1 node in linked list
    if ( linkedList.isEmpty() || linkedList.head === linkedList.tail ) return linkedList;

    // at least 2 nodes in linked list
    var hash     = {};
    var previous = linkedList.head;
    var current  = linkedList.head.next;
    // add initial value into hash
    hash[ previous.value ] = true;

    while ( current !== null ) {
      if ( hash[ current.value ] ) {
        previous.next = current.next;
      } else {
        hash[ current.value ] = true;
        previous = previous.next;
      }
      current  = current.next;
    }
  };

  // 2.2
  var kthToLast1 = function (linkedList, k) {
    // Time Complexity: O(n) where n is size of linked list
    // Implementation requires the use of storing the size of a linked list

    var size = linkedList.getSize();
    var i, node;

    if ( k <= 0 ) throw new Error('k must be a positive integer');
    if ( k >= size ) return linkedList.head;

    i    = 0;
    node = linkedList.head;
    // k < size && k > 0
    while ( i < (size - k) ) {
      node = node.next;
      i += 1;
    }

    return node;
  };

  // 2.2 - alternative recursive solution
  var kthToLast2 = function (node, kth) {
    var inner = function (n, k, counter) {
      // base case
      if ( n === null ) return counter + 1;

      counter = inner(n.next, k, counter);
      if ( k === counter ) {
        console.log('n value: ', n.value);
      }

      return counter + 1;
    };

    inner(node, kth, 0);
  };

  // 2.3
  var removeNode = function (linkedList, nodeValueToRemove) {
    var startNode;

    var inner = function (previousNode) {
      // base case - check if current node is null
      if ( previousNode.next === null ) return;

      // check if current node is the node to remove
      if ( previousNode.next.value === nodeValueToRemove ) {
        // check if current node is the tail node
        previousNode.next.next === null ?
          linkedList.removeFromTail() : previousNode.next = previousNode.next.next;
      } else {
        inner( previousNode.next );
      }
    };

    if ( !linkedList.isEmpty() ) {
      startNode = linkedList.head;

      // check first node
      startNode.value === nodeValueToRemove ?
        linkedList.removeFromHead() : inner( startNode );
    }

    return linkedList;
  };

  // 2.4
  var partitionLinkedList = function (linkedList, value) {
    // linked list is empty
    if ( linkedList.isEmpty() ) {
      return linkedList;
    }

    // linked list is not empty
    var newLinkedList = singlyLinkedList();
    var node = linkedList.head;

    var head, headIterator,
        tail, tailIterator,
        tempNode;

    while ( node !== null ) {
      tempNode = makeNode( node.value );

      if ( node.value <= value ) {
        if ( head ) {
          headIterator.next = tempNode;
        } else {
          head = tempNode;
        }
        headIterator = tempNode;
      } else {
        if ( tail ) {
          tailIterator.next = tempNode;
        } else {
          tail = tempNode;
        }
        tailIterator = tempNode;
      }
      node = node.next;
    }

    if ( tail === void 0 ) {
      // there is no tail component (i.e. all values were less than or equal to pivot)
      newLinkedList.head = head;
      newLinkedList.tail = headIterator;
    } else if ( head === void 0 ) {
      // there is no head component (i.e. all values were greater than pivot)
      newLinkedList.head = tail;
      newLinkedList.tail = tailIterator;
    } else {
      // there is both a head and tail component
      // link the two subsections together
      headIterator.next = tail;
      newLinkedList.head = head;
      newLinkedList.tail = tailIterator;
    }

    return newLinkedList;
  };

  // 2.5 - version1 (digits are stored in reverse order)
  var sumLinkedLists1 = function (firstList, secondList) {
    if ( firstList.isEmpty() && secondList.isEmpty() ) return 0;
    if ( firstList.isEmpty() ) return sumLinkList( secondList );
    if ( secondList.isEmpty() ) return sumLinkList( firstList );
    return sumLinkList( firstList ) + sumLinkList( secondList );
  };

  var sumLinkList = function (list) {
    var result = [];
    var base   = 1;
    var node   = list.head;

    while ( node !== null ) {
      result.push( node.value * base );
      base *= 10;
      node = node.next;
    }

    return result.reduce(function (acc, cur) {
      return acc + cur;
    });
  };

  // 2.6
  /*
   * Assume that the loop portion has m nodes and the non-loop portion has
   * n nodes. Therefore, in total there are m + n nodes. Assume 1 runner
   * traverses 1 node at a time while another traverses 2 nodes at a time.
   * Therefore, when the 1-runner has gone m - n nodes in the loop, the 2-runner
   * has gone 2 * (m - n) % m.
  */

  /*
   * One possible solution is to create a hash of the values that have
   * been encountered already. Loop through the nodes and check whether
   * the node's value appears in the hash. The first time that its value
   * appears in the hash already is the beginning of the circular linked
   * list.
  */

  // Another solution using 'breadcrumbs'
  var returnBeginningOfLoop = function (circularLinkedList) {
    // assuming circular linked list, which means there is no terminating node
    var start = circularLinkedList.head;
    var result;

    // add breadcrumbs
    while ( true ) {
      if ( start.breadcrumbs ) {
        result = start;
        break;
      }

      start.breadcrumbs = true;
      start = start.next;
    }

    // remove breadcrumbs
    start = circularLinkedList.head;
    while ( true ) {
      if ( !start.breadcrumbs ) {
        break;
      } else {
        delete start.breadcrumbs;
        start = start.next;
      }
    }

    return result;
  };

  // 2.7
  var isPalindrome = function (linkedList) {
    var values = [];
    var node = linkedList.head;

    while ( node !== null ) {
      values.push( node.value );
      node = node.next;
    }

    return isPalindromeArray( values );
  };

  var isPalindromeArray = function (array) {
    var len = array.length;

    if ( len < 2 ) return true;
    if ( array.shift() !== array.pop() ) return false;
    return isPalindromeArray( array );
  };
})();