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
    var list  = Object.create( singlyLinkedListMethods );
    list.head = null;
    list.tail = null;

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
})();