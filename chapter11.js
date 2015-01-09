(function chapter11 () {
  /*
   * Chapter 11: Sorting and Searching
  */

  // 11.1
  var mergeSorted = function (arrayA, arrayB) {
    // assumption here is that both arrays are in sorted order
    var result = [];
    var lenA = arrayA.length;
    var lenB = arrayB.length;
    var i, j;

    i = 0;
    j = 0;

    while (i < lenA && j < lenB) {
      if ( arrayA[i] <= arrayB[j] ) {
        result.push( arrayA[i] );
        i += 1;
      } else {
        result.push( arrayB[j] );
        j += 1;
      }
    }

    // only one of the two while loops below will run
    while (i < lenA) {
      result.push( arrayA[i] );
      i += 1;
    }

    while (j < lenB) {
      result.push( arrayB[j] );
      j += 1;
    }

    return result;
  };
})();