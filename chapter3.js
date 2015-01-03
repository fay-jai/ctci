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

  var queue = function () {
    var q = {};

    return q;
  };
})();