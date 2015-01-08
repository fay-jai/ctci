(function chapter9 () {
  /*
   * Chapter 9: Recursion and Dynamic Programming
  */

  // 9.1
  var waysToGoUpNsteps = (function () {
    var cache = {};
    return function (num) {
      if (cache[num]) return cache[num];
      if (num <  0 )  return 0;
      if (num === 0)  return 1;

      var minusThree,
          minusTwo,
          minusOne;

      minusThree = waysToGoUpNsteps( num - 3 );
      minusTwo   = waysToGoUpNsteps( num - 2 );
      minusOne   = waysToGoUpNsteps( num - 1 );
      cache[num] = minusThree + minusTwo + minusOne;

      return cache[num];
    };
  })();

  // 9.2
  var numRobotPaths = (function () {
    var cache = {};
    return function (x, y) {
      if (cache['' + x + ',' + y]) return cache['' + x + ',' + y];
      if (x  <  0 || y  <  0)      return 0;
      if (x === 0 && y === 0)      return 1;

      cache['' + x + ',' + y] = numRobotPaths(x, y - 1) + numRobotPaths(x - 1, y);
      return cache['' + x + ',' + y];
    };
  })();
})();