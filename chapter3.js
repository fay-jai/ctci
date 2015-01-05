(function chapter3 () {
  /*
   * Chapter 3: Stacks and Queues
  */

  var Stack = function () {
    var s     = Object.create( stackMethods );
    s.storage = {};
    s.size    = 0;
    return s;
  };

  var stackMethods = {
    push: function (value) {
      this.storage[ this.size ] = value;
      this.size += 1;
    },
    pop: function () {
      var removed;
      if ( !this.isEmpty() ) {
        removed = this.storage[ this.size - 1 ];
        delete this.storage[ this.size - 1 ];
        this.size -= 1;
        return removed;
      }
    },
    peek: function () {
      return this.storage[ this.size - 1 ];
    },
    getSize: function () {
      return this.size;
    },
    isEmpty: function () {
      return this.size === 0;
    }
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

  // 3.1 - Describe how to use a single array to create 3 stacks
  /*
   * Let's assume you have an array of size n. You can allocation the first n / 3 positions
   * to stack1, the next n / 3 positions to stack2, and the final n / 3 positions to
   * stack3. In addition, you'll have to store the starting positions of each of the stacks
   * (i.e. the index within the array which will be the starting position). You'll also
   * need to store the top positions of each of the stacks as you're 'pushing' and 'popping'
   * values onto the stacks.
   *
   * In terms of implementing 'push', you'll have to specify which stack to push to. Once
   * you know which stack to push to, you can get the top position and store the value at
   * that position within the array before incrementing the top position for that stack and
   * updating it.
   *
   * In terms of implementing 'pop', you'll have to specify which stack to pop from. Once
   * you know which stack to pop from, you can first check if that stack is empty by comparing
   * the top and starting positions for that stack. The stack is empty only when the top and
   * starting positions are identical. Assuming the specific stack is not empty, you can save
   * the value at the top position of that stack and delete the data in that position before
   * returning the value.
   *
   * Implementing 'peek' will be very similar to pop - since you'll have to specify which stack
   * to peek at, you'll have access to that stack's top position and be able to return the value
   * at that top position.
  */

  // 3.2 - How would you design a stack which, in addition to push and pop, also has a function min which returns the minimum value?
  /*
   * The stack data structure would need to have another property called minValue that is a
   * list data structure itself (either array or linked list). Let's assume that its a linked
   * list.
   *
   * The implementation of 'push' would be modified to check whether the current value
   * is the first value to be pushed onto the stack. If it is, then also add the value to the
   * head of the minValue linked list. If it is not the first value to be pushed onto the stack,
   * then for every subsequent push, check whether the value being pushed on is less than or
   * equal to the head of the minValue linked list. If it is, then add the value to the head
   * of the linked list.
   *
   * The implementation of 'pop' would be modified slightly; once the 'pop' code has determined
   * which value to pop off, it needs to subsequently check whether the popped value is equal
   * to the head of the minValue linked list. If it is, then remove the head value from the
   * minValue linked list.
   *
   * The min function would simply return the head value of the minValue linked list. And since
   * adding to the head and removing from the head of a linked list are both O(1) operations,
   * both push and pop are still O(1) as well as the min function.
  */

  // 3.3
  var setOfStacks = function (threshold) {
    var result       = {};
    var hash         = {}; // key = number, value = stack data structure
    var indices      = []; // keep track of all indices in 'hash'
    var numSubStacks = 0;  // keep track of number of substacks


    result.push = function (value) {
      var newStack;
      // if there are no substacks or if the existing substack is at the threshold
      if ( result.isEmpty() || hash[ indices[indices.length - 1] ].getSize() >= threshold ) {
        // create new substack
        newStack = Stack();
        newStack.push( value );
        hash[ numSubStacks ] = newStack;

        indices.push( numSubStacks );
        numSubStacks += 1;
      } else {
        // indices[indices.length - 1] simply returns the last index value in the indices array
        hash[ indices[indices.length - 1] ].push( value );
      }
    };

    result.pop = function () {
      var currentStack, popped;
      if ( !result.isEmpty() ) {
        // take current stack and save the popped value
        currentStack = hash[ indices[indices.length - 1] ];
        popped       = currentStack.pop();

        // check if current stack (once popped) is empty
        if ( currentStack.isEmpty() ) {
          // if empty, then delete stack from hash and decrement numSubStacks
          // remove the last index in the indices array
          delete hash[ indices.pop() ];
          numSubStacks -= 1;
        }

        return popped;
      }
    };

    result.popAt = function (idx) {
      var specificStack, popped, spliceIdx;
      if ( hash[ idx ] ) {
        specificStack = hash[ idx ];
        popped        = specificStack.pop();

        if ( specificStack.isEmpty() ) {
          // find the position of 'idx' within the indices array
          spliceIdx = indices.indexOf( idx );
          if ( spliceIdx === -1 ) throw new Error('Error with popAt');

          indices.splice( spliceIdx, 1 ); // modifies indices in place
          delete hash[ idx ];
          numSubStacks -= 1;
        }

        return popped;
      }
    };

    result.isEmpty = function () {
      return numSubStacks === 0;
    };

    return result;
  };

  // 3.4
  var towersOfHanoi = function (num, start, temp, end) {
    if ( num > 0 ) {
      towersOfHanoi( num - 1, start, end, temp );
      console.log( 'Move ' + num + ' from ' + start + ' to ' + end );
      towersOfHanoi( num - 1, temp, start, end);
    }
  };

  var Tower = function (towerNumber) {
    var t    = {};
    var disk = Stack();
    var idx  = towerNumber;

    t.getIndex = function () {
      return idx;
    };

    t.add = function (diskNum) {
      if ( !disk.isEmpty() && disk.peek() <= diskNum ) throw new Error('Error placing disk ' + diskNum);
      disk.push( diskNum );
    };

    t.moveTopTo = function (tower) {
      var top = disk.pop();
      tower.add( top );
      console.log( 'Move disk ' + top + ' from ' + t.getIndex() + ' to ' + tower.getIndex() );
    };

    t.moveDisk = function (num, towerDestination, towerBuffer) {
      if ( num > 0 ) {
        t.moveDisk( num - 1, towerBuffer, towerDestination );
        t.moveTopTo( towerDestination );
        towerBuffer.moveDisk( num - 1, towerDestination, t);
      }
    };

    return t;
  };

  // 3.5
  var MyQueue = function () {
    var q      = {};
    var inbox  = Stack();
    var outbox = Stack();

    q.enqueue = function (value) {
      inbox.push( value );
    };

    q.dequeue = function () {
      // pop everything out of inbox and push into outbox
      var popped, result;

      while ( !inbox.isEmpty() ) {
        popped = inbox.pop();
        outbox.push( popped );
      }

      // then pop from outbox and store as result
      result = outbox.pop();

      // pop everything from outbox back to inbox
      while ( !outbox.isEmpty() ) {
        popped = outbox.pop();
        inbox.push( popped );
      }

      return result;
    };

    q.isEmpty = function () {
      return inbox.isEmpty();
    };

    return q;
  };

  // 3.6
  var sortStack = function (stack) {
    var result = Stack();
    var temp   = Stack();
    var currentValue;

    while ( !stack.isEmpty() ) {
      // pop off from stack (value) and check if result is empty
      currentValue = stack.pop();

      if ( result.isEmpty() ) {
        result.push( currentValue );
      } else {
        // take all values in result that are greater than current value and move them to temp
        while ( result.peek() > currentValue ) {
          temp.push( result.pop() );
        }

        // at this point, result.peek() is <= currentValue
        result.push( currentValue );

        // take everything from temp and move back to original stack
        while ( !temp.isEmpty() ) {
          stack.push( temp.pop() );
        }
      }
    }

    return result;
  };
})();