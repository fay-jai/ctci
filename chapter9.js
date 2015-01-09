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
    // if the array length is 0 or 1, return the array itself
    if (len < 2) return [ array ];

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

  // 9.5
  var createAllPermutations = function (array) {
    var result = [];
    var other;

    // base case
    if (array.length < 2) return [ array ];

    array.forEach(function (element, idx) {
      other = array.slice(0, idx).concat( array.slice(idx + 1) );
      // recursive call to generate previous permutations
      createAllPermutations( other ).forEach(function (arr) {
        result.push( [ element ].concat(arr) );
      });
    });

    return result;
  };

  // 9.6
  var generateNPairsParens = function (n) {
    var opening = '(';
    var paren   = '()';
    var result  = {};
    var i, j, current, character, before, rest;

    if (n === 0) return [];
    if (n === 1) return Object.keys( {'()': true} );

    var nMinusOne = generateNPairsParens( n - 1 );

    // for each string item in nMinusOne:
    for (i = 0; i < nMinusOne.length; i += 1) {
      current = nMinusOne[i];
      // for each string char:
      for (j = 0; j < current.length; j += 1) {
        character = current[j];
        // if the current character is opening, then do: char + paren + remaining chars in string
        if (character === opening) {
          before = current.slice(0, j + 1);
          rest   = current.slice(j + 1);
          result[ before + ' ' + paren  + ' ' + rest ] = true;
        }
      }
    }

    // concat string with paren
    result[ current + ' ' + paren ] = true; // ex. '()' + '()'
    return Object.keys( result );
  };
})();