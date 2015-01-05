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
  
})();