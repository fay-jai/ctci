// 1.2
var reverseString = function (string) {
  var len    = string.length;
  var result = '';
  var i;

  for (i = len - 1; i >= 0; i -= 1) {
    result += string[i];
    console.log('result', result);
  }

  return result;
};

reverseString = function (string) {
  var len = string.length;
  if (len === 0) return string;
  return string[len - 1] + reverseString( string.slice(0, len - 1) );
};

// 1.5
var compress = function (sameCharacterString) {
  var len = sameCharacterString.length;
  var compressed;

  if (len === 0) return sameCharacterString;
  compressed = sameCharacterString[0] + len;
  return compressed.length <= len ? compressed : sameCharacterString;
};

var compression = function (string) {
  var len = string.length;
  if (len === 0) return string;

  var i = 0;
  while (string[i] === string[i + 1]) {
    i += 1;
  }

  return compress(string.slice(0, i + 1)) + compression(string.slice(i + 1));
};

// 1.7
// O(n ^ 2)
var createBooleanHash = function (matrix) {
  var numRows = matrix.length;
  var numCols = matrix[0].length;
  var hash = {};
  var value, i, j;

  for (i = 0; i < numRows; i += 1) {
    for (j = 0; j < numCols; j += 1) {
      value = matrix[i][j];
      hash['r' + i] = hash['r' + i] || value === 0;
      hash['c' + j] = hash['c' + j] || value === 0;
    }
  }

  return hash; // i.e. { r0: true, r1: false, c0: false } means row 0 has a zero in it
};

var transformMatrix = function (matrix) {
  var numRows  = matrix.length;
  var numCols  = matrix[0].length;
  var boolHash = createBooleanHash(matrix); // O(n ^ 2)
  var i, j;

  // O(n ^ 2)
  for (i = 0; i < numRows; i += 1) {
    for (j = 0; j < numCols; j += 1) {
      if (boolHash['r' + i] || boolHash['c' + j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};

// 2.1
var removeDuplicates = function (linkedList) {
  if (linkedList.isEmpty()) {
    return linkedList;
  } else {
    var current = linkedList.head; // node
    var hash    = {};

    // reset linked list to 'empty'
    linkedList.head = null;
    linkedList.tail = null;

    // O(n)
    while (current !== null) {
      if (!hash[ current.value ]) {
        linkedList.appendToTail( current.value ); // O(n) operation if singly linked list and O(1) operation if doubly linked list
        hash[ current.value ] = true;
      }
      current = current.next;
    }

    return linkedList;
  }
};

removeDuplicates = function (linkedList) {
  if (linkedList.isEmpty() || linkedList.head === linkedList.tail) return linkedList;

  // linkedList has at least 2 nodes
  var inner = function (searchValue, prev, curr) {
    if (!curr) return;

    if (curr.value === searchValue) {
      prev.next = curr.next;
      curr      = prev.next;
      inner(searchValue, prev, curr);
    } else {
      inner(searchValue, prev.next, curr.next);
    }
  };

  var pointer = linkedList.head;
  while (pointer) {
    inner( pointer.value, pointer, pointer.next );
    pointer = pointer.next;
  }

  return linkedList;
};

// 2.4
var partitionLinkedList = function (linkedList, x) {
  if (linkedList.isEmpty()) return linkedList;

  var pointer = linkedList.head;
  var start, end, startRunner, endRunner;

  // reset linked list
  linkedList.head = null;
  linkedList.tail = null;

  while (pointer) {
    if (pointer.value < x) {
      // add to start and update startRunner
      if (start) {
        startRunner.next = pointer;
        startRunner      = pointer;
      } else {
        start       = pointer;
        startRunner = pointer;
      }
    } else {
      // add to tail and update tailRunner
      if (end) {
        endRunner.next = pointer;
        endRunner      = pointer;
      } else {
        end       = pointer;
        endRunner = pointer;
      }
    }
    pointer = pointer.next;
  }

  // merge start and tail together
  if (start && end) {
    startRunner.next = end;
    linkedList.head  = start;
    linkedList.tail  = endRunner;
  } else if (start) {
    linkedList.head = end;
    linkedList.tail = endRunner;
  } else {
    linkedList.head = start;
    linkedList.tail = startRunner;
  }

  return linkedList;
};

var sumLinkedLists = function(list1, list2) {
  if (list1.isEmpty() && list2.isEmpty()) return null;
  var total = 0;
  var base  = 1;

  while (!list1.isEmpty() && !list2.isEmpty()) {
    total += (list1.removeFromHead() + list2.removeFromHead()) * base;
    base *= 10;
  }

  while (!list1.isEmpty()) {
    total += list1.removeFromHead() * base;
    base *= 10;
  }

  while (!list2.isEmpty()) {
    total += list2.removeFromHead() * base;
    base *= 10;
  }

  return total;
};

//2.7
var isPalindrome = function (linkedList) {
  if (linkedList.isEmpty()) return true;

  var first = linkedList.removeFromHead();
  var last  = linkedList.removeFromTail();

  if (!first || !last) return true;
  if (first !== last)  return false;
  return isPalindrome( linkedList );
};

// 3.2
var minStack = function () {
  var obj     = Object.create( minStackMethods );
  obj.storage = {};
  obj.size    = 0;

  obj.minStorage = {};
  obj.minTop     = 0;

  return obj;
};

var minStackMethods = {
  push: function (value) {
    // add to storage
    this.storage[ this.size ] = value;
    this.size += 1;

    // add to minStorage if the value is less than the current min
    if (this.minTop === 0 || value <= this.minStorage[ this.minTop - 1 ]) {
      this.minStorage[ this.minTop ] = value;
      this.minTop += 1;
    }
  },
  pop: function () {
    if (this.size > 0) {
      var remove = this.storage[ this.size - 1 ];
      delete this.storage[ this.size - 1 ];
      this.size -= 1;

      // check if value removed is the current minValue
      if (remove === this.minStorage[ this.minTop - 1 ]) {
        delete this.minStorage[ this.minTop - 1 ];
        this.minTop -= 1;
      }

      return remove;
    }
  },
  peek: function () {
    return this.storage[ this.size - 1 ];
  },
  min: function () {
    return this.minStorage[ this.minTop - 1 ];
  },
  getSize: function () {
    return this.size;
  }
};

// 3.3
var Stack = function () {
  var obj     = Object.create( StackMethods );
  obj.storage = {};
  obj.size    = 0;
  return obj;
};

var StackMethods = {
  push: function (value) {
    this.storage[ this.size ] = value;
    this.size += 1;
  },
  pop: function () {
    if (this.size > 0) {
      var remove = this.storage[ this.size - 1 ];
      delete this.storage[ this.size - 1 ];
      this.size -= 1;
      return remove;
    }
  },
  peek: function () {
    return this.storage[ this.size - 1 ];
  },
  getSize: function () {
    return this.size;
  }
};

var setOfStacks = function (capacity) {
  var obj      = Object.create( setOfStackMethods );
  obj.storage  = {};
  obj.size     = 0;
  obj.capacity = capacity;
  return obj;
};

var setOfStackMethods = {
  push: function (value) {
    var topStack;
    if (this.size === 0) {
      topStack = Stack();
      topStack.push(value);
      this.storage[ this.size ] = topStack;
      this.size += 1;
    } else {
      topStack = this.storage[ this.size - 1 ];

      // check if topStack is not at capacity
      if (topStack.getSize() < this.capacity) {
        topStack.push(value);
      } else {
        topStack = Stack();
        topStack.push(value);
        this.storage[ this.size ] = topStack;
        this.size += 1;
      }
    }
  },
  pop: function () {
    if (this.size > 0) {
      var topStack = this.storage[ this.size - 1 ];
      var remove = topStack.pop();

      // check if topStack is empty
      if (topStack.getSize() === 0) {
        delete this.storage[ this.size - 1 ];
        this.size -= 1;
      }

      return remove;
    }
  },
  popAt: function (idx) {
    if (idx >= 0 && idx < this.size) {
      var idxStack = this.storage[ idx ];
      var remove = idxStack.pop();

      if (idxStack.getSize() === 0) {
        while (idx < this.size) {
          this.storage[ idx ] = this.storage[ idx + 1 ];
          idx += 1;
        }
        this.size -= 1;
        delete this.storage[ this.size ];
      }

      return remove;
    }
  },
  peek: function () {
    var topStack = this.storage[ this.size - 1 ];
    return topStack.peek();
  },
  getSize: function () {
    return this.size;
  }
};

// 3.6
var sortStack = function (stack) {
  var result = Stack();
  var top;

  while (stack.getSize() > 0) {
    top = stack.pop();

    if (result.getSize() === 0) {
      result.push( top );
    } else {
      while (result.peek() > top && result.getSize() > 0) {
        stack.push( result.pop() );
      }
      result.push( top );
    }
  }

  return result;
};