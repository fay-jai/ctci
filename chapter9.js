(function chapter9 () {
  /*
   * Chapter 9: Recursion and Dynamic Programming
  */

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
})();