(function chapter17 () {
  /*
   * Chapter 17: Moderate
  */

  // 17.8
  var maxContiguousSum = function (array) {
    var len = array.length;
    if (len === 0) return 0;
    if (len === 1) return array[0];

    return Math.max.apply(null, allSums(array));
  };

  var allSums = function (array) {
    var len = array.length;
    var i, j, chunk, result;

    if (len === 0) return [];

    result = [];
    for (i = 0; i < len - 1; i += 1) {
      for (j = i + 1; j < len; j += 1) {
        chunk = array.slice(i, j);
        result.push( chunk.reduce(function (a, c) { return a + c; }, 0) );
      }
    }
    return result;
  };
})();