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

  // 9.3
  var magicIndex = function (array) {
    if (array.length === 0) return null;

    var len = array.length;
    var i;

    for (i = 0; i < len; i += 1) {
      if (array[i] === i) return i;
    }

    return null;
  };

  // 9.4
  var createAllSubsets = function (array) {
    // base case
    var len = array.length;
    // if the array is length 0, then there are no subsets
    if (len === 0) return [];
    // if the array is length 1, then there is only 1 subset (the array itself)
    if (len === 1) return [ array ];

    var result = [];
    var head   = array.slice(0, len - 1);
    var last   = array.slice(len - 1);

    // recursive case
    var allSubsetsSoFar = createAllSubsets( head );

    allSubsetsSoFar.forEach(function (arr) {
      // for each arr in allSubsetsSoFar, push a copy of arr without the last value
      // and a copy with the last value
      result.push( arr );
      result.push( arr.concat(last) );
    });

    // add the last element onto the result by itself
    result.push( last );
    return result;
  };
})();